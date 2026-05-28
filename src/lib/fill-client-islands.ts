import React from "react";

import { clientServerComponents } from "@/generated/client-server-registry";
import { sha256Hex } from "@/lib/content-hash";
import { renderComponentHtml } from "@/lib/render-component-html";

function parseIslandProps(typeAttr: string | null, textContent: string): unknown {
  if (typeAttr === "application/json") {
    return JSON.parse(textContent || "{}");
  }
  // Keep behavior aligned with react-loader.tsx (it supports YAML), but server
  // side we only generate JSON currently. Non-JSON types fall back to {}.
  return {};
}

/**
 * Replaces SSR placeholders emitted by `ClientComponentWrapper` with SSR HTML
 * rendered from the actual client component root (so `useId`/Radix ids match
 * what hydrateRoot will produce for that island).
 *
 * Also adds `data-rcid` to the corresponding `<script data-rct>` so the client
 * loader can pass the same `identifierPrefix` into `hydrateRoot`.
 */
export async function fillClientIslands(html: string): Promise<string> {
  // We avoid parsing nested HTML. Instead, we target the SSR-only placeholder by id
  // via `data-rc-target` on the corresponding `<script data-rct>`.
  //
  // Client hydrate uses the same `data-rc-target` (react-loader.tsx), so server and
  // client agree on the DOM node without relying on sibling adjacency.
  const scriptRe = /(<script\b[^>]*\bdata-rct=(?:"[^"]+"|'[^']+')[^>]*>)([\s\S]*?)(<\/script>)/g;

  let out = "";
  let lastIdx = 0;

  for (const match of html.matchAll(scriptRe)) {
    const fullMatch = match[0];
    const start = match.index ?? 0;
    const end = start + fullMatch.length;

    const scriptOpen = match[1] ?? "";
    const scriptText = match[2] ?? "";
    const scriptClose = match[3] ?? "";

    const islandType = (getAttr(scriptOpen, "data-rct") ?? "").trim();
    const targetId = (getAttr(scriptOpen, "data-rc-target") ?? "").trim();

    if (!scriptOpen || !scriptClose || !islandType || !targetId) {
      out += html.slice(lastIdx, end);
      lastIdx = end;
      continue;
    }

    const scriptTypeRe = /\btype=(?:"([^"]+)"|'([^']+)')/;
    const scriptTypeExec = scriptTypeRe.exec(scriptOpen);
    const scriptTypeAttr = scriptTypeExec?.[1] ?? scriptTypeExec?.[2] ?? null;

    const props = parseIslandProps(scriptTypeAttr, scriptText);
    const Component = clientServerComponents[islandType];

    if (!Component) {
      out += html.slice(lastIdx, end);
      lastIdx = end;
      continue;
    }

    const islandRcid = sha256Hex(JSON.stringify({ islandType, props }));
    const islandHtml = await renderComponentHtml(React.createElement(Component, props as any), {
      identifierPrefix: islandRcid,
    });

    const scriptOpenWithRcid =
      scriptOpen.includes("data-rcid=")
        ? scriptOpen
        : scriptOpen.replace(/<script\b/, `<script data-rcid="${islandRcid}"`);

    // Replace the *contents* of the placeholder div identified by targetId.
    // Keep the div wrapper (attributes/classes) intact.
    const escapedTargetId = escapeRegExp(targetId);
    const placeholderRe = new RegExp(
      String.raw`(<div\b[^>]*\bid=(?:"${escapedTargetId}"|'${escapedTargetId}')[^>]*>)([\s\S]*?)(</div>)`,
      "g",
    );

    const beforeScript = html.slice(lastIdx, start);
    out += beforeScript.replace(placeholderRe, `$1${islandHtml}$3`);
    out += `${scriptOpenWithRcid}${scriptText}${scriptClose}`;

    lastIdx = end;
  }

  out += html.slice(lastIdx);
  return out;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

function getAttr(tagOpen: string, attrName: string): string | null {
  const re = new RegExp(
    String.raw`\b${escapeRegExp(attrName)}=(?:"([^"]*)"|'([^']*)')`,
    "i",
  );
  const exec = re.exec(tagOpen);
  return exec?.[1] ?? exec?.[2] ?? null;
}


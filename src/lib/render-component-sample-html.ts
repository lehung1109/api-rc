import React from "react";
import prettier from "prettier";

import type { ComponentRenderEntry } from "./build-component-render-map";
import { fillClientIslands } from "./fill-client-islands";
import { renderComponentHtml } from "./render-component-html";

export async function renderComponentSampleHtml(
  entry: ComponentRenderEntry,
): Promise<string> {
  let html = await renderComponentHtml(
    React.createElement(entry.component, entry.model),
  );

  html = await fillClientIslands(html);

  if (entry.needFormat) {
    try {
      // Prettier's HTML parser expects valid HTML structure.
      // Many of our SSR outputs are fragments (no <html>/<body>), so we wrap them
      // before formatting, then unwrap to keep output identical.
      const WRAP_START = '<div data-prettier-fragment="1">';
      const WRAP_END = "</div>";
      const wrapped = `${WRAP_START}${html}${WRAP_END}`;
      const formattedWrapped = await prettier.format(wrapped, { parser: "html" });

      const startIdx = formattedWrapped.indexOf(WRAP_START);
      const endIdx = formattedWrapped.lastIndexOf(WRAP_END);

      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        html = formattedWrapped.slice(startIdx + WRAP_START.length, endIdx);
      } else {
        html = await prettier.format(html, { parser: "html" });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown prettier error";
      console.warn(
        `[render-component-sample-html] Prettier failed for ${entry.source}: ${message}`,
      );
    }
  }

  return html;
}

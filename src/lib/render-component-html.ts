import React from "react";
import { renderToReadableStream } from "react-dom/server";

const IMAGE_PRELOAD_LINK_RE =
  /<link\s+[^>]*rel=["']preload["'][^>]*as=["']image["'][^>]*\/?>\s*/gi;

export function stripImagePreloadLinks(html: string): string {
  return html.replace(IMAGE_PRELOAD_LINK_RE, "");
}

type RenderComponentHtmlOptions = {
  identifierPrefix?: string;
};

export async function renderComponentHtml(
  element: React.ReactElement,
  options: RenderComponentHtmlOptions = {},
): Promise<string> {
  const stream = await renderToReadableStream(element, {
    ...(options.identifierPrefix ? { identifierPrefix: options.identifierPrefix } : {}),
  });

  // Ensure all content is ready to be read.
  // (react-dom's ReadableStream has `.allReady` in Node/Bun environments)
  if ("allReady" in stream && typeof stream.allReady === "object") {
    await (stream as unknown as { allReady: Promise<void> }).allReady;
  }

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let html = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  html += decoder.decode();

  return stripImagePreloadLinks(html);
}

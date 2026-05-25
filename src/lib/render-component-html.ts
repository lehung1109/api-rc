import React from "react";
import { renderToString } from "react-dom/server";

const IMAGE_PRELOAD_LINK_RE =
  /<link\s+[^>]*rel=["']preload["'][^>]*as=["']image["'][^>]*\/?>\s*/gi;

export function stripImagePreloadLinks(html: string): string {
  return html.replace(IMAGE_PRELOAD_LINK_RE, "");
}

export function renderComponentHtml(element: React.ReactElement): string {
  return stripImagePreloadLinks(renderToString(element));
}

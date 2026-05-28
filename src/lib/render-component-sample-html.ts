import React from "react";
import prettier from "prettier";

import type { ComponentRenderEntry } from "./build-component-render-map";
import { renderComponentHtml } from "./render-component-html";

export async function renderComponentSampleHtml(
  entry: ComponentRenderEntry,
): Promise<string> {
  let html = await renderComponentHtml(
    React.createElement(entry.component, entry.model),
  );

  if (entry.needFormat) {
    html = await prettier.format(html, { parser: "html" });
  }

  return html;
}

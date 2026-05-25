import fs from "node:fs";

import { buildComponentRenderMap } from "../src/lib/build-component-render-map";
import { renderComponentSampleHtml } from "../src/lib/render-component-sample-html";

const componentMap = await buildComponentRenderMap();

if (!fs.existsSync("html")) {
  fs.mkdirSync("html");
}

for (const [key, entry] of Object.entries(componentMap)) {
  const html = await renderComponentSampleHtml(entry);
  fs.writeFileSync(`html/${key}.html`, html);
}

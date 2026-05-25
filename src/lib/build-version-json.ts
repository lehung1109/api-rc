import fs from "node:fs";
import path from "node:path";

import { buildComponentRenderMap } from "./build-component-render-map";
import { hashContent, sha256Hex } from "./content-hash";
import { renderComponentSampleHtml } from "./render-component-sample-html";

export const DEFAULT_BUNDLE_JS = "react-loader.js";
export const DEFAULT_BUNDLE_CSS = "react-loader.css";

export type ComponentVersionEntry = {
  version: string;
  source: string;
  data?: string;
};

export type VersionJson = {
  version: string;
  file: string;
  cssFile: string;
  components: Record<string, ComponentVersionEntry>;
};

function hashFiles(distDir: string, filenames: string[]): string {
  const parts: Buffer[] = [];

  for (const name of filenames) {
    const filePath = path.join(distDir, name);
    if (!fs.existsSync(filePath)) {
      continue;
    }
    parts.push(fs.readFileSync(filePath));
  }

  return hashContent(Buffer.concat(parts));
}

export async function buildVersionJson(
  distDir: string,
  options: {
    bundleFile?: string;
    cssFile?: string;
  } = {},
): Promise<VersionJson> {
  const bundleFile = options.bundleFile ?? DEFAULT_BUNDLE_JS;
  const cssFile = options.cssFile ?? DEFAULT_BUNDLE_CSS;

  const renderMap = await buildComponentRenderMap();
  const components: Record<string, ComponentVersionEntry> = {};

  for (const [name, entry] of Object.entries(renderMap)) {
    const html = await renderComponentSampleHtml(entry);
    components[name] = {
      version: sha256Hex(html),
      source: entry.source,
      ...(entry.data ? { data: entry.data } : {}),
    };
  }

  const sortedComponents = Object.fromEntries(
    Object.entries(components).sort(([a], [b]) => a.localeCompare(b)),
  );

  return {
    version: hashFiles(distDir, [bundleFile, cssFile]),
    file: bundleFile,
    cssFile,
    components: sortedComponents,
  };
}

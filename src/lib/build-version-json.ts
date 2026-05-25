import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { discoverRenderComponents } from "./discover-render-components";

const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const COMPONENTS_DIR = path.join(PROJECT_ROOT, "src/components");

export const DEFAULT_BUNDLE_JS = "react-loader.js";
export const DEFAULT_BUNDLE_CSS = "react-loader.css";

export type ComponentVersionEntry = {
  version: string;
  source: string;
};

export type VersionJson = {
  version: string;
  file: string;
  cssFile: string;
  components: Record<string, ComponentVersionEntry>;
};

export function hashContent(content: Buffer | string): string {
  const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content);
  return crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 12);
}

function hashFiles(distDir: string, filenames: string[]): string {
  const hash = crypto.createHash("sha256");

  for (const name of filenames) {
    const filePath = path.join(distDir, name);
    if (!fs.existsSync(filePath)) {
      continue;
    }
    hash.update(fs.readFileSync(filePath));
  }

  return hash.digest("hex").slice(0, 12);
}

function componentSourcePath(source: string): string {
  return path.join(COMPONENTS_DIR, `${source}.tsx`);
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

  const files = await discoverRenderComponents();
  const components: Record<string, ComponentVersionEntry> = {};

  for (const file of files) {
    const sourcePath = componentSourcePath(file.source);
    const sourceRelative = path
      .relative(PROJECT_ROOT, sourcePath)
      .replace(/\\/g, "/");

    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Component source not found: ${sourceRelative}`);
    }

    const fileVersion = hashContent(fs.readFileSync(sourcePath));
    const bindings = [
      ...(file.defaultExport ? [file.defaultExport] : []),
      ...file.namedExports,
    ];

    for (const binding of bindings) {
      components[binding.registryKey] = {
        version: fileVersion,
        source: sourceRelative,
      };
    }
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

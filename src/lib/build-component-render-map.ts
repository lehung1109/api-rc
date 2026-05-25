import fs from "node:fs";
import path from "node:path";
import type React from "react";
import { fileURLToPath, pathToFileURL } from "node:url";

import { buildServerRegistry } from "../generated/server-registry";
import { pascalToCamel } from "./discover-client-components";

const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const DATA_DIR = path.join(PROJECT_ROOT, "src/data");
const COMPONENTS_DIR = path.join(PROJECT_ROOT, "src/components");

/** Components whose sample HTML is formatted with Prettier (static page output). */
const NEED_FORMAT = new Set(["Header"]);

export type ComponentRenderEntry = {
  component: React.ComponentType<Record<string, unknown>>;
  model: Record<string, unknown>;
  needFormat: boolean;
  source: string;
  data: string;
};

export function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function componentSourcePath(componentName: string): string | null {
  const walk = (dir: string): string | null => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = walk(fullPath);
        if (found) {
          return found;
        }
      } else if (
        entry.isFile() &&
        entry.name === `${componentName}.tsx`
      ) {
        return fullPath;
      }
    }
    return null;
  };

  return walk(COMPONENTS_DIR);
}

export async function buildComponentRenderMap(): Promise<
  Record<string, ComponentRenderEntry>
> {
  if (!fs.existsSync(DATA_DIR)) {
    return {};
  }

  const registry = buildServerRegistry();
  const map: Record<string, ComponentRenderEntry> = {};

  const dataFiles = fs
    .readdirSync(DATA_DIR)
    .filter((name) => name.endsWith(".ts"))
    .sort();

  for (const fileName of dataFiles) {
    const kebab = fileName.replace(/\.ts$/, "");
    const componentName = kebabToPascal(kebab);
    const Component = registry.get(componentName);

    if (!Component) {
      console.warn(
        `[build-component-render-map] Skipping src/data/${fileName}: no server component "${componentName}"`,
      );
      continue;
    }

    const dataPath = path.join(DATA_DIR, fileName);
    const dataMod = (await import(pathToFileURL(dataPath).href)) as Record<
      string,
      unknown
    >;
    const exportName = pascalToCamel(componentName);
    const model = dataMod[exportName] ?? dataMod.default;

    if (model === undefined) {
      console.warn(
        `[build-component-render-map] Skipping src/data/${fileName}: missing export "${exportName}" or default`,
      );
      continue;
    }

    const sourcePath = componentSourcePath(componentName);
    if (!sourcePath) {
      throw new Error(
        `Component source not found for "${componentName}" (data: src/data/${fileName})`,
      );
    }

    map[componentName] = {
      component: Component,
      model: model as Record<string, unknown>,
      needFormat: NEED_FORMAT.has(componentName),
      source: path.relative(PROJECT_ROOT, sourcePath).replace(/\\/g, "/"),
      data: path.relative(PROJECT_ROOT, dataPath).replace(/\\/g, "/"),
    };
  }

  return map;
}

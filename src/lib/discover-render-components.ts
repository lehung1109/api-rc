import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const COMPONENTS_DIR = path.join(PROJECT_ROOT, "src/components");
const GENERATED_DIR = path.join(PROJECT_ROOT, "src/generated");

const EXCLUDE_BASENAMES = new Set([
  "ClientComponentWrapper.tsx",
  "ReactSection.tsx",
  "client-components.tsx",
]);

export type RenderComponentBinding = {
  registryKey: string;
  localName: string;
};

export type RenderComponentFile = {
  source: string;
  importPath: string;
  defaultExport?: RenderComponentBinding;
  namedExports: RenderComponentBinding[];
};

function isReactComponent(value: unknown): boolean {
  if (typeof value === "function") {
    return true;
  }
  if (typeof value === "object" && value !== null && "$$typeof" in value) {
    return true;
  }
  return false;
}

function shouldSkip(filePath: string): boolean {
  const normalized = filePath.replace(/\\/g, "/");
  if (normalized.includes("/ui/")) {
    return true;
  }
  return EXCLUDE_BASENAMES.has(path.basename(filePath));
}

function walkTsxFiles(dir: string): string[] {
  const results: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walkTsxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      results.push(fullPath);
    }
  }

  return results;
}

function toImportPath(componentFilePath: string): string {
  return path
    .relative(GENERATED_DIR, componentFilePath)
    .replace(/\\/g, "/")
    .replace(/\.tsx$/, "");
}

export async function discoverRenderComponents(): Promise<
  RenderComponentFile[]
> {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    return [];
  }

  const files = walkTsxFiles(COMPONENTS_DIR).filter((file) => !shouldSkip(file));

  const results: RenderComponentFile[] = [];
  const usedKeys = new Map<string, string>();

  for (const filePath of files) {
    const mod = (await import(pathToFileURL(filePath).href)) as Record<
      string,
      unknown
    >;
    const componentName = path.basename(filePath, ".tsx");
    const source = path
      .relative(COMPONENTS_DIR, filePath)
      .replace(/\\/g, "/")
      .replace(/\.tsx$/, "");
    const importPath = toImportPath(filePath);

    const fileEntry: RenderComponentFile = {
      source,
      importPath,
      namedExports: [],
    };

    const registerKey = (registryKey: string) => {
      const existing = usedKeys.get(registryKey);
      if (existing) {
        throw new Error(
          `Duplicate component key "${registryKey}" (${existing} vs ${source})`,
        );
      }
      usedKeys.set(registryKey, source);
    };

    if (mod.default !== undefined && isReactComponent(mod.default)) {
      registerKey(componentName);
      fileEntry.defaultExport = {
        registryKey: componentName,
        localName: componentName,
      };
    }

    for (const [exportName, exportValue] of Object.entries(mod)) {
      if (exportName === "default") {
        continue;
      }
      if (!/^[A-Z]/.test(exportName)) {
        continue;
      }
      if (!isReactComponent(exportValue)) {
        continue;
      }
      registerKey(exportName);
      fileEntry.namedExports.push({
        registryKey: exportName,
        localName: exportName,
      });
    }

    if (!fileEntry.defaultExport && fileEntry.namedExports.length === 0) {
      console.warn(
        `[discover-render-components] Skipping ${source}: no renderable exports`,
      );
      continue;
    }

    results.push(fileEntry);
  }

  results.sort((a, b) => a.source.localeCompare(b.source));
  return results;
}

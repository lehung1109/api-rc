import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const COMPONENTS_DIR = path.join(PROJECT_ROOT, "src/components");
const DATA_DIR = path.join(PROJECT_ROOT, "src/data");

const USE_CLIENT_RE = /^["']use client["'];?\s*$/;

const EXCLUDE_BASENAMES = new Set([
  "ClientComponentWrapper.tsx",
  "ReactSection.tsx",
  "client-components.tsx",
]);

export type ClientComponentEntry = {
  componentName: string;
  rctKey: string;
  componentImportPath: string;
  lazyImportPath: string;
  dataImportPath: string;
  dataExportName: string;
  needFormat: boolean;
};

export function pascalToKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

export function pascalToCamel(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function hasUseClientDirective(filePath: string): boolean {
  const head = fs.readFileSync(filePath, "utf8").split("\n").slice(0, 5);
  return head.some((line) => USE_CLIENT_RE.test(line.trim()));
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

function buildEntry(componentFilePath: string): ClientComponentEntry | null {
  const componentName = path.basename(componentFilePath, ".tsx");
  const dataKebab = pascalToKebab(componentName);
  const dataExportName = pascalToCamel(componentName);
  const dataFilePath = path.join(DATA_DIR, `${dataKebab}.ts`);

  if (!fs.existsSync(dataFilePath)) {
    console.warn(
      `[discover-client-components] Skipping ${componentName}: missing ${path.relative(PROJECT_ROOT, dataFilePath)}`,
    );
    return null;
  }

  const componentImportPath = componentFilePath;
  const dataImportPath = dataFilePath;
  const relativeFromComponents = path
    .relative(COMPONENTS_DIR, componentFilePath)
    .replace(/\\/g, "/")
    .replace(/\.tsx$/, "");
  const lazyImportPath = `./${relativeFromComponents}`;

  return {
    componentName,
    rctKey: dataExportName,
    componentImportPath,
    lazyImportPath,
    dataImportPath,
    dataExportName,
    needFormat: false,
  };
}

export async function discoverClientComponents(): Promise<
  ClientComponentEntry[]
> {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    return [];
  }

  const files = walkTsxFiles(COMPONENTS_DIR)
    .filter((file) => !shouldSkip(file))
    .filter((file) => hasUseClientDirective(file));

  const entries = files
    .map(buildEntry)
    .filter((entry): entry is ClientComponentEntry => entry !== null);

  entries.sort((a, b) => a.componentName.localeCompare(b.componentName));

  return entries;
}

// vite.config.ts
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs";
import { resolve, relative, dirname } from "node:path";

function scanIndexHtml(dir: string, base = dir) {
  const entries: Record<string, string> = {};

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, item.name);

    if (item.isDirectory()) {
      Object.assign(entries, scanIndexHtml(fullPath, base));
      continue;
    }

    if (item.isFile() && item.name === "index.html") {
      const relDir = relative(base, dirname(fullPath));
      entries[relDir] = fullPath;
    }
  }

  return entries;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: scanIndexHtml(resolve(__dirname, "pages"), resolve(__dirname)),
    },
  },
  plugins: [tsconfigPaths()],
});

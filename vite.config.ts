// vite.config.ts
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs";
import { resolve, relative, dirname } from "node:path";

const previewPagesModuleId = "virtual:preview-pages";
const resolvedPreviewPagesModuleId = `\0${previewPagesModuleId}`;

type PreviewPage = {
  slug: string;
  title: string;
  path: string;
};

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

function getPreviewPages(): PreviewPage[] {
  const pagesDir = resolve(__dirname, "pages");

  return Object.keys(scanIndexHtml(pagesDir, pagesDir))
    .sort((a, b) => a.localeCompare(b))
    .map((slug) => ({
      slug,
      title: slug,
      path: `/pages/${slug}/`,
    }));
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: scanIndexHtml(resolve(__dirname, "pages"), resolve(__dirname)),
    },
  },
  plugins: [
    tsconfigPaths(),
    {
      name: "preview-pages-module",
      resolveId(id) {
        if (id === previewPagesModuleId) {
          return resolvedPreviewPagesModuleId;
        }
      },
      load(id) {
        if (id === resolvedPreviewPagesModuleId) {
          return `export const previewPages = ${JSON.stringify(getPreviewPages())};`;
        }
      },
    },
    {
      name: "pages-trailing-slash",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split("?")[0] ?? "";

          if (
            url.startsWith("/pages/") &&
            !url.endsWith("/") &&
            !url.includes(".")
          ) {
            const query = req.url?.includes("?")
              ? req.url.slice(req.url.indexOf("?"))
              : "";
            res.writeHead(301, { Location: `${url}/${query}` });
            res.end();
            return;
          }

          next();
        });
      },
    },
  ],
});

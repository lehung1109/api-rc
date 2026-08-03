// vite.config.ts
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs";
import { resolve, relative, dirname } from "node:path";

const previewPagesModuleId = "virtual:preview-pages";
const resolvedPreviewPagesModuleId = `\0${previewPagesModuleId}`;
let generatedTsxHtmlEntries: Record<string, string> = {};

type PreviewPage = {
  slug: string;
  title: string;
  path: string;
  source: "html" | "tsx";
};

function scanIndexHtml(dir: string, base = dir) {
  const entries: Record<string, string> = {};

  if (!fs.existsSync(dir)) {
    return entries;
  }

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

function scanPageTsx(dir: string, base = dir) {
  const entries: Record<string, string> = {};

  if (!fs.existsSync(dir)) {
    return entries;
  }

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, item.name);

    if (item.isDirectory()) {
      Object.assign(entries, scanPageTsx(fullPath, base));
      continue;
    }

    if (item.isFile() && item.name === "page.tsx") {
      const relDir = relative(base, dirname(fullPath)).replaceAll("\\", "/");
      entries[relDir] = fullPath;
    }
  }

  return entries;
}

function titleFromSlug(slug: string) {
  return slug
    .split("/")
    .at(-1)!
    .split("-")
    .map((part) => (part.toLowerCase() === "tsx" ? "TSX" : part))
    .join(" ");
}

function readPageTitle(filePath: string, slug: string) {
  const content = fs.readFileSync(filePath, "utf8");
  const titleMatch = /title\s*:\s*["'`]([^"'`]+)["'`]/.exec(content);

  return titleMatch?.[1] ?? titleFromSlug(slug);
}

function getPreviewPages(): PreviewPage[] {
  const pagesDir = resolve(__dirname, "pages");
  const pagesBySlug = new Map<string, PreviewPage>();

  for (const slug of Object.keys(scanIndexHtml(pagesDir, pagesDir))) {
    pagesBySlug.set(slug, {
      slug,
      title: slug,
      path: `/pages/${slug}/`,
      source: "html",
    });
  }

  for (const [slug, filePath] of Object.entries(scanPageTsx(pagesDir, pagesDir))) {
    pagesBySlug.set(slug, {
      slug,
      title: readPageTitle(filePath, slug),
      path: `/pages/${slug}/`,
      source: "tsx",
    });
  }

  return [...pagesBySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

function getGeneratedTsxHtmlEntries() {
  const pagesDir = resolve(__dirname, "pages");
  const existingHtmlPages = scanIndexHtml(pagesDir, pagesDir);
  const tsxPages = scanPageTsx(pagesDir, pagesDir);
  const entries: Record<string, string> = {};

  for (const slug of Object.keys(tsxPages)) {
    if (existingHtmlPages[slug]) {
      continue;
    }

    entries[`pages/${slug}`] = resolve(pagesDir, slug, "index.html");
  }

  return entries;
}

function renderTsxPageShell(slug: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${slug}</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/src/page-entry.tsx" type="module"></script>
  </body>
</html>`;
}

export default defineConfig(({ command }) => ({
  build: {
    rollupOptions: {
      input: {
        ...scanIndexHtml(resolve(__dirname, "pages"), resolve(__dirname)),
        ...(command === "build" ? getGeneratedTsxHtmlEntries() : {}),
      },
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
    {
      name: "tsx-preview-pages",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split("?")[0] ?? "";
          const match = /^\/pages\/(.+)\/$/.exec(url);

          if (!match) {
            next();
            return;
          }

          const slug = decodeURIComponent(match[1]);
          const page = getPreviewPages().find(
            (previewPage) => previewPage.slug === slug && previewPage.source === "tsx",
          );

          if (!page) {
            next();
            return;
          }

          res.setHeader("Content-Type", "text/html");
          res.end(renderTsxPageShell(page.title));
        });
      },
    },
    {
      name: "tsx-page-html-build-entries",
      apply: "build",
      buildStart() {
        generatedTsxHtmlEntries = getGeneratedTsxHtmlEntries();

        for (const [inputName, filePath] of Object.entries(generatedTsxHtmlEntries)) {
          fs.mkdirSync(dirname(filePath), { recursive: true });
          fs.writeFileSync(filePath, renderTsxPageShell(inputName), "utf8");
        }
      },
      closeBundle() {
        for (const filePath of Object.values(generatedTsxHtmlEntries)) {
          if (fs.existsSync(filePath)) {
            fs.rmSync(filePath, { force: true });
          }
        }

        generatedTsxHtmlEntries = {};
      },
    },
  ],
}));

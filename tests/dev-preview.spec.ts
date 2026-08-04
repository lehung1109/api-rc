import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const viteCliPath = path.resolve(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');

const migratedPageSlugs = ['autocomplete-search', 'carousel', 'home', 'table-of-contents'];

async function createStaticServer(rootDir: string) {
  const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url ?? '/', 'http://localhost');
    const pathname = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
    const filePath = path.join(rootDir, decodeURIComponent(pathname));

    try {
      const content = await fs.readFile(filePath);
      const extension = path.extname(filePath);
      const contentType = extension === '.html'
        ? 'text/html; charset=utf-8'
        : extension === '.css'
          ? 'text/css; charset=utf-8'
          : extension === '.js'
            ? 'text/javascript; charset=utf-8'
            : 'application/octet-stream';

      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();

  if (!address || typeof address === 'string') {
    server.close();
    throw new Error('Unable to start static server for browser asset test.');
  }

  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    }),
  };
}

async function expectPageRender(
  context: BrowserContext,
  url: string,
  assertPage: (previewPage: Page) => Promise<void>,
) {
  const previewPage = await context.newPage();

  try {
    await previewPage.goto(url);
    await assertPage(previewPage);
  } finally {
    await previewPage.close();
  }
}

test.describe.configure({ mode: 'serial' });

test('root dev preview lists pages and updates the iframe selection', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('heading', { name: 'Preview pages' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'carousel' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'autocomplete-search' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'table-of-contents' })).toBeVisible();

  const previewFrame = page.frameLocator('iframe[title="Selected preview page"]');
  await expect(previewFrame.locator('body')).toBeVisible();
  await expect(page.locator('iframe[title="Selected preview page"]')).toHaveAttribute(
    'src',
    '/pages/home/',
  );

  await page.getByRole('link', { name: 'carousel' }).click();

  await expect(page).toHaveURL('http://localhost:5173/?page=carousel');
  await expect(page.locator('iframe[title="Selected preview page"]')).toHaveAttribute(
    'src',
    '/pages/carousel/',
  );
});

test('legacy html preview pages are migrated to tsx page files', async ({ context }) => {
  for (const slug of migratedPageSlugs) {
    await expect(async () => {
      await fs.access(path.resolve(process.cwd(), 'pages', slug, 'page.tsx'));
    }).toPass();

    await expect(async () => {
      await fs.access(path.resolve(process.cwd(), 'pages', slug, 'index.html'));
    }).not.toPass();
  }

  await expectPageRender(context, 'http://localhost:5173/pages/home/', async (previewPage) => {
    await expect(previewPage.getByText('Thi công nội thất chung cư đẹp')).toBeVisible();
  });

  await expectPageRender(context, 'http://localhost:5173/pages/carousel/', async (previewPage) => {
    await expect(previewPage.locator('.swiper')).toBeVisible();
  });

  await expectPageRender(context, 'http://localhost:5173/pages/autocomplete-search/', async (previewPage) => {
    await expect(previewPage.getByPlaceholder('Gõ tìm kiếm...')).toBeVisible();
  });

  await expectPageRender(context, 'http://localhost:5173/pages/table-of-contents/', async (previewPage) => {
    await expect(previewPage.getByRole('navigation', { name: /mục lục/i })).toBeVisible();
  });
});

test('tsx page files are listed and render as independent page urls', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('link', { name: 'table-of-contents' }).click();

  await expect(page).toHaveURL('http://localhost:5173/?page=table-of-contents');
  await expect(page.locator('iframe[title="Selected preview page"]')).toHaveAttribute(
    'src',
    '/pages/table-of-contents/',
  );

  const previewFrame = page.frameLocator('iframe[title="Selected preview page"]');
  await expect(previewFrame.getByRole('navigation', { name: /mục lục/i })).toBeVisible();

  await page.goto('http://localhost:5173/pages/table-of-contents/');

  await expect(page.getByRole('navigation', { name: /mục lục/i })).toBeVisible();
});

test('tsx page variants are listed and render from query string urls', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('heading', { name: 'home' })).toBeVisible();
  await page.getByRole('link', { name: 'Apartment variant' }).click();

  await expect(page).toHaveURL('http://localhost:5173/?page=home&variant=apartment');
  await expect(page.locator('iframe[title="Selected preview page"]')).toHaveAttribute(
    'src',
    '/pages/home/?variant=apartment',
  );

  const previewFrame = page.frameLocator('iframe[title="Selected preview page"]');
  await expect(previewFrame.getByText('Home apartment variant')).toBeVisible();

  await page.goto('http://localhost:5173/pages/home/?variant=apartment');

  await expect(page.getByText('Home apartment variant')).toBeVisible();

  await page.goto('http://localhost:5173/pages/home/?variant=missing');

  await expect(page.getByText('Thi công nội thất chung cư đẹp')).toBeVisible();
});

test('tsx page files build as independent static html entries', async ({ browserName }) => {
  test.skip(browserName !== 'chromium', 'Vite build output is browser-independent.');
  test.setTimeout(90_000);

  const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'api-rc-vite-build-'));

  try {
    await execFileAsync(process.execPath, [viteCliPath, 'build', '--outDir', outDir, '--emptyOutDir'], {
      cwd: process.cwd(),
    });

    const builtPage = await fs.readFile(
      path.join(outDir, 'pages', 'table-of-contents', 'index.html'),
      'utf8',
    );

    expect(builtPage).toContain('<div id="app"></div>');
    expect(builtPage).toContain('type="module"');
    expect(builtPage).not.toContain('/src/page-entry.tsx');
  } finally {
    await fs.rm(outDir, { recursive: true, force: true });
  }
});

test('browser assets build with stable loader and stylesheet filenames', async ({ browserName }) => {
  test.skip(browserName !== 'chromium', 'Vite build output is browser-independent.');
  test.setTimeout(90_000);

  const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'api-rc-browser-build-'));

  try {
    await execFileAsync(process.execPath, [
      viteCliPath,
      'build',
      '--config',
      'vite.browser.config.ts',
      '--outDir',
      outDir,
      '--emptyOutDir',
    ], {
      cwd: process.cwd(),
    });

    const builtFiles = await fs.readdir(outDir);
    const loader = await fs.readFile(path.join(outDir, 'react-loader.js'), 'utf8');
    const stylesheet = await fs.readFile(path.join(outDir, 'react-loader.css'), 'utf8');

    expect(builtFiles).toContain('react-loader.js');
    expect(builtFiles).toContain('react-loader.css');
    expect(loader).toContain('hydrateRoot');
    expect(stylesheet).toContain('--e-global-color-primary');
  } finally {
    await fs.rm(outDir, { recursive: true, force: true });
  }
});

test('browser loader shares React runtime between versioned entry and lazy chunks', async ({ browserName, page }) => {
  test.skip(browserName !== 'chromium', 'Vite build output is browser-independent.');
  test.setTimeout(90_000);

  const readme = await fs.readFile(path.resolve(process.cwd(), 'README.md'), 'utf8');

  expect(readme).toContain('<script type="module" src="/path/to/react-loader.js"></script>');
  expect(readme).toContain('copy toàn bộ `dist/`');
  expect(readme).toContain('react-vendor.*.js');

  const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'api-rc-browser-module-'));
  let staticServer: Awaited<ReturnType<typeof createStaticServer>> | undefined;

  try {
    await execFileAsync(process.execPath, [
      viteCliPath,
      'build',
      '--config',
      'vite.browser.config.ts',
      '--outDir',
      outDir,
      '--emptyOutDir',
    ], {
      cwd: process.cwd(),
    });

    const builtFiles = await fs.readdir(outDir);
    expect(builtFiles.some((file) => /^react-vendor\..+\.js$/.test(file))).toBe(true);

    await fs.writeFile(path.join(outDir, 'index.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/react-loader.css" />
  </head>
  <body>
    <div id="rc-island-autocomplete-search"></div>
    <script
      data-rct="autocompleteSearch"
      data-rc-target="rc-island-autocomplete-search"
      type="application/json"
    >{"placeholder":"Search posts","api_url":"/wp-json/wp/v2/search"}</script>
    <script type="module" src="/react-loader.js?ver=test"></script>
  </body>
</html>`);

    staticServer = await createStaticServer(outDir);

    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto(staticServer.url);
    await expect.poll(() => page.evaluate(() => typeof (globalThis as any).renderComponents)).toBe('function');
    await expect(page.getByPlaceholder('Search posts')).toBeVisible();

    expect(pageErrors).not.toContain("Cannot use 'import.meta' outside a module");
    expect(pageErrors).not.toContain("Cannot read properties of null (reading 'useState')");
  } finally {
    await staticServer?.close();
    await fs.rm(outDir, { recursive: true, force: true });
  }
});

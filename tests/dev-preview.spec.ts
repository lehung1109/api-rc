import { expect, test } from '@playwright/test';
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const viteCliPath = path.resolve(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');

const tsxFixtureSlug = 'tsx-fixture';
const tsxFixtureDir = path.resolve(process.cwd(), 'pages', tsxFixtureSlug);
const tsxFixtureFile = path.join(tsxFixtureDir, 'page.tsx');
const migratedPageSlugs = ['autocomplete-search', 'carousel', 'home', 'table-of-contents'];

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  await fs.mkdir(tsxFixtureDir, { recursive: true });
  await fs.writeFile(
    tsxFixtureFile,
    `export const pageMeta = {
  title: 'TSX fixture',
};

export default function TsxFixturePage() {
  return (
    <main>
      <h1>TSX fixture page</h1>
      <p>Rendered from page.tsx</p>
    </main>
  );
}
`,
    'utf8',
  );
});

test.afterAll(async () => {
  await fs.rm(tsxFixtureDir, { recursive: true, force: true });
});

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

test('legacy html preview pages are migrated to tsx page files', async ({ page }) => {
  for (const slug of migratedPageSlugs) {
    await expect(async () => {
      await fs.access(path.resolve(process.cwd(), 'pages', slug, 'page.tsx'));
    }).toPass();

    await expect(async () => {
      await fs.access(path.resolve(process.cwd(), 'pages', slug, 'index.html'));
    }).not.toPass();
  }

  await page.goto('http://localhost:5173/pages/home/');
  await expect(page.getByText('Thi công nội thất chung cư đẹp')).toBeVisible();

  await page.goto('http://localhost:5173/pages/carousel/');
  await expect(page.locator('.swiper')).toBeVisible();

  await page.goto('http://localhost:5173/pages/autocomplete-search/');
  await expect(page.getByPlaceholder('Gõ tìm kiếm...')).toBeVisible();

  await page.goto('http://localhost:5173/pages/table-of-contents/');
  await expect(page.getByRole('navigation', { name: /mục lục/i })).toBeVisible();
});

test('tsx page files are listed and render as independent page urls', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('link', { name: 'TSX fixture' }).click();

  await expect(page).toHaveURL(`http://localhost:5173/?page=${tsxFixtureSlug}`);
  await expect(page.locator('iframe[title="Selected preview page"]')).toHaveAttribute(
    'src',
    `/pages/${tsxFixtureSlug}/`,
  );

  const previewFrame = page.frameLocator('iframe[title="Selected preview page"]');
  await expect(previewFrame.getByRole('heading', { name: 'TSX fixture page' })).toBeVisible();

  await page.goto(`http://localhost:5173/pages/${tsxFixtureSlug}/`);

  await expect(page.getByRole('heading', { name: 'TSX fixture page' })).toBeVisible();
});

test('tsx page files build as independent static html entries', async () => {
  test.setTimeout(90_000);

  const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'api-rc-vite-build-'));

  try {
    await execFileAsync(process.execPath, [viteCliPath, 'build', '--outDir', outDir, '--emptyOutDir'], {
      cwd: process.cwd(),
    });

    const builtPage = await fs.readFile(
      path.join(outDir, 'pages', tsxFixtureSlug, 'index.html'),
      'utf8',
    );

    expect(builtPage).toContain('<div id="app"></div>');
    expect(builtPage).toContain('type="module"');
    expect(builtPage).not.toContain('/src/page-entry.tsx');
  } finally {
    await fs.rm(outDir, { recursive: true, force: true });
  }
});
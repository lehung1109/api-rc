import { expect, test } from '@playwright/test';

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
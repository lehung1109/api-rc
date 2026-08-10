import { expect, test, type Page } from "@playwright/test";

const previewUrl = "http://127.0.0.1:5173/pages/post-hero-banner/";

async function expectBannerLayout(
  page: Page,
  viewport: { width: number; height: number },
) {
  await page.setViewportSize(viewport);
  await page.goto(previewUrl);

  const banner = page.locator(".post-hero-banner");
  await expect(banner).toBeVisible();

  const bannerBox = await banner.boundingBox();
  expect(bannerBox).not.toBeNull();
  expect(bannerBox!.height).toBeCloseTo(viewport.height * 0.8, 0);

  const background = banner.locator(".post-hero-banner-background");
  await expect(background).toHaveCSS("object-fit", "cover");

  const content = banner.locator(".post-hero-banner-content");
  const contentBox = await content.boundingBox();
  expect(contentBox).not.toBeNull();
  expect(bannerBox!.y + bannerBox!.height - (contentBox!.y + contentBox!.height)).toBeCloseTo(80, 0);
}

test.describe("PostHeroBanner", () => {
  test("desktop: renders the centered 80vh hero with two breadcrumb links", async ({ page }) => {
    await expectBannerLayout(page, { width: 1280, height: 800 });

    const banner = page.locator(".post-hero-banner");
    const breadcrumb = banner.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link")).toHaveCount(2);
    await expect(breadcrumb).toContainText("/");
    await expect(breadcrumb).toHaveCSS("font-size", "16px");
    await expect(breadcrumb).toHaveCSS("text-transform", "uppercase");

    const title = banner.getByRole("heading", { level: 1 });
    await expect(title).toHaveCSS("font-size", "48px");
    await expect(title).toHaveCSS("font-weight", "700");
    await expect(title).toHaveCSS("text-transform", "uppercase");
    await expect(title).toHaveCSS("color", "rgb(255, 255, 255)");
  });

  test("mobile: preserves hero height, bottom spacing, and centered content", async ({ page }) => {
    await expectBannerLayout(page, { width: 375, height: 812 });

    const banner = page.locator(".post-hero-banner");
    await expect(banner.getByRole("heading", { level: 1 })).toHaveCSS("font-size", "24px");
    await expect(banner.locator(".post-hero-banner-content")).toHaveCSS("text-align", "center");
  });
});

import { expect, test } from "@playwright/test";

const keyPersonnelUrl = "http://127.0.0.1:5173/pages/key-personnel/";

test.describe("KeyPersonnel", () => {
  test("keeps the swiper geometry stable after hydration", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(keyPersonnelUrl);

    const swiper = page.locator(".key-personnel-swiper");
    await expect(swiper).toBeVisible();

    const before = await swiper.boundingBox();
    const slides = swiper.locator(":scope > .swiper-wrapper > .swiper-slide");
    await expect(slides).toHaveCount(5);
    const firstBefore = await slides.first().boundingBox();
    const secondBefore = await slides.nth(1).boundingBox();
    expect(firstBefore).not.toBeNull();
    expect(secondBefore).not.toBeNull();
    expect(secondBefore!.x - firstBefore!.x - firstBefore!.width).toBeCloseTo(24, 0);

    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

    const after = await swiper.boundingBox();
    const firstAfter = await slides.first().boundingBox();
    expect(after).not.toBeNull();
    expect(firstAfter).not.toBeNull();
    expect(Math.abs(after!.width - before!.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(after!.height - before!.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(firstAfter!.width - firstBefore!.width)).toBeLessThanOrEqual(1);
  });

  test("uses two columns below the desktop breakpoint", async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 900 });
    await page.goto(keyPersonnelUrl);

    const slides = page.locator(
      ".key-personnel-swiper > .swiper-wrapper > .swiper-slide",
    );
    const firstSlide = await slides.first().boundingBox();
    const secondSlide = await slides.nth(1).boundingBox();
    expect(firstSlide).not.toBeNull();
    expect(secondSlide).not.toBeNull();
    expect(secondSlide!.x - firstSlide!.x - firstSlide!.width).toBeCloseTo(48, 0);
    await expect(slides.first().locator(".key-personnel-card-media")).toHaveCSS(
      "aspect-ratio",
      "4 / 5",
    );
  });
});

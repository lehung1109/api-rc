import { expect, test } from "@playwright/test";

const jobListingListUrl = "http://127.0.0.1:5173/pages/construction/";

test.describe("JobListingList", () => {
  test("fits listing images within their mobile media frame", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(jobListingListUrl);

    const image = page.locator(".job-listing-list-item-image").first();

    await expect(image).toBeVisible();
    await expect(image).toHaveCSS("object-fit", "contain");
  });

  test("keeps listing images cropped on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(jobListingListUrl);

    const image = page.locator(".job-listing-list-item-image").first();

    await expect(image).toBeVisible();
    await expect(image).toHaveCSS("object-fit", "cover");
  });
});

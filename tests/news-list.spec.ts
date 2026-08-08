import { expect, test } from "@playwright/test";

const newsListUrl = "http://127.0.0.1:5173/pages/construction/";

test.describe("NewsList", () => {
  test("shows a featured article only on the first page and loads page two", async ({
    page,
  }) => {
    await page.goto(newsListUrl);

    await expect(page.locator(".news-list-featured-card")).toBeVisible();
    await expect(page.locator(".news-list-grid .news-list-card")).toHaveCount(4);

    await page
      .getByRole("navigation", { name: "Phân trang tin tức" })
      .getByRole("button", { name: "Trang 2" })
      .click();
    await expect(page.locator(".news-list-loading")).toBeVisible();
    await expect(page).toHaveURL(/paged=2/);
    await expect(page.locator(".news-list-featured-card")).toHaveCount(0, {
      timeout: 5000,
    });
    await expect(page.locator(".news-list-grid .news-list-card")).toHaveCount(5, {
      timeout: 5000,
    });
  });
});

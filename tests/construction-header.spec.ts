import { expect, test } from "@playwright/test";
import path from "node:path";

const constructionUrl = "http://localhost:5173/pages/construction/";
const fixturesDir = path.join("tests", "fixtures", "construction-header");

test.describe.configure({ mode: "serial" });

test.describe("ConstructionHeader", () => {
  test("mobile: search + hamburger, open/close search modal", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(constructionUrl);

    const header = page.locator("#construction-header");
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS("position", "fixed");
    await expect(page.locator(".construction-header-top")).toBeHidden();
    await expect(
      page.locator(".construction-header-search-open"),
    ).toBeVisible();
    await expect(page.locator(".construction-header-menu-open")).toBeVisible();

    await page.locator(".construction-header-search-open").click();

    const searchModal = page.locator(".construction-header-search-modal");
    await expect(searchModal).toBeVisible();
    await expect(
      page.locator(".construction-header-search-modal-close"),
    ).toBeVisible();
    await expect(page.getByPlaceholder("Gõ tìm kiếm...")).toBeVisible();

    await page.screenshot({
      path: path.join(fixturesDir, "mobile-search-modal.png"),
      fullPage: false,
    });

    await page.locator(".construction-header-search-modal-close").click();
    await expect(searchModal).toBeHidden();
  });

  test("mobile: open menu modal with background, logo, social, dropdown", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(constructionUrl);

    await page.locator(".construction-header-menu-open").click();

    const menuModal = page.locator(".construction-header-menu-modal");
    await expect(menuModal).toBeVisible();
    await expect(
      page.locator(".construction-header-menu-modal-close"),
    ).toBeVisible();
    await expect(
      page.locator(".construction-header-menu-modal-background img"),
    ).toBeVisible();
    await expect(
      page.locator(".construction-header-menu-modal-logo"),
    ).toBeVisible();
    await expect(
      page.locator(".construction-header-menu-modal-social"),
    ).toBeVisible();
    await expect(
      page.locator(".construction-header-menu-modal-underline"),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Điều hướng chính" }),
    ).toBeVisible();

    await page.screenshot({
      path: path.join(fixturesDir, "mobile-menu-modal.png"),
      fullPage: false,
    });

    const dichVuToggle = page.getByLabel("Mở menu Dịch vụ");
    await dichVuToggle.click();
    await expect(page.getByRole("link", { name: "Thiết kế kiến trúc" })).toBeVisible();

    await page.locator(".construction-header-menu-modal-close").click();
    await expect(menuModal).toBeHidden();
  });

  test("desktop: menu dropdown hover and Liên hệ border + search item", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(constructionUrl);

    const header = page.locator("#construction-header");
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS("position", "absolute");
    await expect(page.locator(".construction-header-top")).toBeVisible();
    await expect(
      page.locator(".construction-header-top-hotline"),
    ).toHaveText("Hotline: 0000 000 000");
    await expect(
      page.locator(".construction-header-search-open"),
    ).toBeHidden();
    await expect(page.locator(".construction-header-menu-open")).toBeHidden();

    const nav = page.getByRole("navigation", { name: "Điều hướng chính" });
    await expect(nav).toBeVisible();

    const contactLink = header.getByRole("link", { name: "Liên hệ", exact: true });
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveClass(/border/);

    const dichVuItem = header.locator(".construction-header-menu-item", {
      hasText: "Dịch vụ",
    });
    await dichVuItem.hover();
    await expect(
      dichVuItem.locator(".construction-header-menu-dropdown"),
    ).toBeVisible();
    await expect(
      header.getByRole("link", { name: "Thiết kế kiến trúc" }),
    ).toBeVisible();

    await page.screenshot({
      path: path.join(fixturesDir, "desktop-menu.png"),
      fullPage: false,
    });

    await header.locator(".construction-header-menu-item--search label").click();
    await expect(page.locator(".construction-header-search-modal")).toBeVisible();
    await expect(page.getByPlaceholder("Gõ tìm kiếm...")).toBeVisible();
  });

  test("desktop: fixed + hide top after scroll threshold", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(constructionUrl);

    const header = page.locator("#construction-header");
    const headerTop = page.locator(".construction-header-top");
    await expect(header).not.toHaveAttribute("data-scrolled", "true");
    await expect(header).toHaveCSS("position", "absolute");
    await expect(headerTop).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 200));
    await expect(header).toHaveAttribute("data-scrolled", "true");
    await expect(header).toHaveCSS("position", "fixed");
    await expect(headerTop).toBeHidden();

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).not.toHaveAttribute("data-scrolled", "true");
    await expect(header).toHaveCSS("position", "absolute");
    await expect(headerTop).toBeVisible();
  });
});

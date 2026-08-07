import { expect, test } from "@playwright/test";

const constructionUrl = "http://127.0.0.1:5173/pages/construction/";

test.describe("FieldsOfActivity", () => {
  test("desktop: keeps the expanded icon fully visible outside the accordion", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(constructionUrl);

    const section = page.locator(".fields-of-activity");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();

    const title = section.locator(".fields-of-activity-title");
    await expect(title).toHaveCSS("font-size", "16px");
    await expect(title).toHaveCSS("font-weight", "400");
    await expect(title).toHaveCSS("text-transform", "uppercase");
    await expect(title).toHaveCSS("color", "rgb(217, 164, 65)");

    const accordion = section.locator(".fields-of-activity-accordion");
    await expect(accordion).toHaveCSS("padding-left", "0px");

    const icon = accordion
      .locator(".fields-of-activity-item")
      .first()
      .locator(".fields-of-activity-item-icon");
    await expect(icon).toBeVisible();
    await expect(icon).toHaveCSS("width", "40px");
    await expect(icon).toHaveCSS("height", "40px");

    const accordionBox = await accordion.boundingBox();
    const iconBox = await icon.boundingBox();

    expect(accordionBox).not.toBeNull();
    expect(iconBox).not.toBeNull();
    expect(iconBox!.x).toBeLessThan(accordionBox!.x);
    await expect(section).toHaveCSS("overflow", "visible");
  });
});

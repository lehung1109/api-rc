import { expect, test } from "@playwright/test";

const PREVIEW_URL = "http://127.0.0.1:5173/pages/ocean-park/";

const REQUIRED_KEYWORDS = [
  "Ocean Park 1",
  "The Paris",
  "The Paris Ocean Park 1",
  "The London",
  "The London Ocean Park 1",
  "Tòa LD1",
  "Tòa LD2",
  "Tòa LD3",
  "The Beverly",
  "The Beverly Ocean Park 1",
  "Tòa BE1",
  "Tòa BE2",
  "Tòa BE3",
  "Tòa BE4",
  "Ocean Park 2",
  "LUMIÈRE SpringBay",
  "LUMIÈRE SpringBay Ocean Park 2",
  "Masteri Trinity Square",
  "Masteri Trinity Square Ocean Park 2",
  "Ocean Park 3",
  "Căn hộ cao tầng Ocean Park 3",
  "Dự án căn hộ Ocean Park 3",
  "Chung cư Ocean Park 1",
  "Căn hộ The Beverly",
  "Căn hộ The London",
  "Dự án Masteri Trinity Square",
  "Căn hộ LUMIÈRE SpringBay",
];

test.describe("Ocean Park Luxury Interior Preview Page", () => {
  test("desktop & mobile: renders Header, preserved HeroSection banner, all 6 sections, 3 IC HOUSE local addresses, 27 keywords, and Footer", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(PREVIEW_URL);

    await expect(page.locator("header").first()).toBeVisible();
    const hero = page.locator(".hero-section");
    await expect(hero).toBeVisible();
    await expect(hero).toContainText("Làm việc cùng nội thất IC HOUSE");
    await expect(hero).toContainText(
      "Thi công nội thất căn hộ tại Vinhomes Ocean Park - Gia Lâm - Hà Nội.",
    );

    await expect(page.locator(".ocean-park-intro")).toBeVisible();
    await expect(page.locator(".ocean-park-project-samples")).toBeVisible();
    await expect(page.locator(".ocean-park-pricing")).toBeVisible();
    await expect(page.locator(".ocean-park-advantages")).toBeVisible();
    await expect(page.locator(".ocean-park-contact-form")).toBeVisible();
    await expect(page.locator(".ocean-park-faq")).toBeVisible();
    await expect(page.locator("footer").first()).toBeVisible();

    const advantagesSection = page.locator(".ocean-park-advantages");
    await expect(advantagesSection).toContainText(
      "Sao Biển 23, KĐT Vinhomes Ocean Park, Gia Lâm, Hà Nội",
    );
    await expect(advantagesSection).toContainText(
      "Số 01 Voi Phục, Gia Lâm, Hà Nội",
    );
    await expect(advantagesSection).toContainText(
      "Thôn Ngọc Trai, Xã Như Quỳnh, Tỉnh Hưng Yên",
    );

    const htmlContent = await page.content();
    for (const keyword of REQUIRED_KEYWORDS) {
      expect(htmlContent).toContain(keyword);
    }

    // Verify Mobile viewport layout
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator("header").first()).toBeVisible();
    await expect(hero).toBeVisible();
    await expect(page.locator(".ocean-park-intro")).toBeVisible();
    await expect(page.locator(".ocean-park-project-samples")).toBeVisible();
    await expect(page.locator(".ocean-park-pricing")).toBeVisible();
    await expect(page.locator(".ocean-park-advantages")).toBeVisible();
    await expect(page.locator(".ocean-park-contact-form")).toBeVisible();
    await expect(page.locator(".ocean-park-faq")).toBeVisible();
    await expect(page.locator("footer").first()).toBeVisible();
  });

  test("OceanParkProjectSamples: filters apartment cards by zone and unit type tabs", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(PREVIEW_URL);

    const cards = page.locator(".ocean-park-project-card");
    await expect(cards).toHaveCount(7);

    const londonTab = page.locator('button[data-zone-tab="the-london"]');
    await londonTab.click();
    await expect(londonTab).toHaveAttribute("aria-selected", "true");
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText("LD1-08");

    const beverlyTab = page.locator('button[data-zone-tab="the-beverly"]');
    await beverlyTab.click();
    await expect(beverlyTab).toHaveAttribute("aria-selected", "true");
    await expect(cards).toHaveCount(2);

    const unit3pnTab = page.locator('button[data-unit-tab="3pn"]');
    await unit3pnTab.click();
    await expect(unit3pnTab).toHaveAttribute("aria-selected", "true");
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText("BE3-05");

    const springBayTab = page.locator(
      'button[data-zone-tab="lumiere-springbay"]',
    );
    const allUnitsTab = page.locator('button[data-unit-tab="all"]');
    await springBayTab.click();
    await allUnitsTab.click();
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText("LSB-09");

    // 0-match combined filter (e.g. LUMIÈRE SpringBay + Studio) shows notice and reset button
    const studioTab = page.locator('button[data-unit-tab="studio"]');
    await studioTab.click();
    const emptyNotice = page.locator(".ocean-park-project-filter-empty-notice");
    await expect(emptyNotice).toBeVisible();
    const resetBtn = page.locator(".ocean-park-project-filter-reset-btn");
    await resetBtn.click();
    await expect(emptyNotice).toHaveCount(0);
    await expect(cards).toHaveCount(7);
  });

  test("OceanParkContactForm: validates required and phone format fields and shows success message on valid submit", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(PREVIEW_URL);

    const formSection = page.locator("#dang-ky-tu-van");
    const nameInput = formSection.locator(".ocean-park-input-name");
    const phoneInput = formSection.locator(".ocean-park-input-phone");
    const apartmentInput = formSection.locator(".ocean-park-input-apartment");
    const submitBtn = formSection.locator(".ocean-park-submit-btn");

    await nameInput.fill("Anh Minh");
    await phoneInput.fill("");
    await submitBtn.click();

    const errorAlert = formSection.locator(".ocean-park-form-error");
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText(
      "Vui lòng nhập đầy đủ Họ tên và Số điện thoại",
    );
    await expect(
      formSection.locator(".ocean-park-contact-form-success"),
    ).toHaveCount(0);

    // Invalid phone format (non-digits / too short)
    await phoneInput.fill("abc-123");
    await submitBtn.click();
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText("Số điện thoại không hợp lệ");
    await expect(
      formSection.locator(".ocean-park-contact-form-success"),
    ).toHaveCount(0);

    await phoneInput.fill("0988123456");
    await apartmentInput.fill("Căn 2PN - LD1-08");
    await submitBtn.click();

    await expect(errorAlert).toHaveCount(0);
    const successBanner = formSection.locator(
      ".ocean-park-contact-form-success",
    );
    await expect(successBanner).toBeVisible();
    await expect(successBanner).toContainText(
      "Cảm ơn Quý cư dân! Kiến trúc sư trưởng IC HOUSE tại Sao Biển 23 Vinhomes Ocean Park đã tiếp nhận yêu cầu",
    );
  });

  test("OceanParkFaq: exclusive accordion sync opens clicked question and closes previous question", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PREVIEW_URL);

    const input0 = page.locator("#ocean-park-faq-item-0");
    const input1 = page.locator("#ocean-park-faq-item-1");
    const trigger1 = page.locator('label[for="ocean-park-faq-item-1"]');
    const answer0 = page.locator(".ocean-park-faq-answer").nth(0);
    const answer1 = page.locator(".ocean-park-faq-answer").nth(1);

    await expect(input0).toBeChecked();
    await expect(input1).not.toBeChecked();
    await expect(answer0).toBeVisible();
    await expect(answer1).toBeHidden();

    await trigger1.click();

    await expect(input1).toBeChecked();
    await expect(input0).not.toBeChecked();
    await expect(answer1).toBeVisible();
    await expect(answer0).toBeHidden();
  });
});

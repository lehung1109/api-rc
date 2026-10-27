# Ocean Park Project Cards, Phone Number & Mobile Form Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 2 toggleable blurred/locked `ocean-park-project-card` items (Variant A), update phone number `0869 855 885` to `0978 305 740` across both repos (with legacy normalization), and fix mobile scrolling from `.ocean-park-intro-secondary-cta` to the consultation form.

**Architecture:** Extend `OceanParkProjectCardModel` and `OceanParkProjectSamples.tsx` in `api-rc` with `isLocked?: boolean` to render a full-card blur + centered lock overlay linking to `#dang-ky-tu-van`, while reordering `.ocean-park-contact-form-card` first on mobile (`!order-first lg:!order-none`) and attaching a smooth-scroll click handler for in-page `#dang-ky-tu-van` links. Mirror the schema and defaults in `elementor-addon-ichouse` with an Elementor repeater switcher (`is_locked`), auto-migration for legacy 7-card saved repeaters, and automatic normalization of `0869 855 885` / `0869855885` to `0978 305 740` / `0978305740`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Vite, Playwright (`api-rc`), PHP 8+, Elementor Widget API, PHPUnit (`elementor-addon-ichouse`).

**Spec:** `docs/superpowers/specs/2026-10-27-ocean-park-updates-design.md`

## Global Constraints

- Preserve existing CSS selectors: `.ocean-park-project-card`, `.ocean-park-intro-secondary-cta`, `#dang-ky-tu-van`, `.ocean-park-contact-form-card`, `.ocean-park-contact-info`.
- Locked cards (`isLocked: true`) must use the exact same data fields as unlocked cards and remain filterable by `zoneId` and `unitTypeId`.
- Replace all occurrences of `0869 855 885` with `0978 305 740` and `0869855885` with `0978305740` across `api-rc` and `elementor-addon-ichouse`.
- Keep SSR HTML output (`bun run build:html`) and client hydration (`OceanParkProjectSamplesWrapper`, `OceanParkContactFormWrapper`) identical on initial render.

## Review Focus

- Clicking `.ocean-park-intro-secondary-cta` on mobile when `window.location.hash` is already `#dang-ky-tu-van` (e.g. second tap after scrolling back up) must still scroll `.ocean-park-contact-form-card` into the mobile viewport.
- Saved Elementor pages in WordPress DB whose settings still store `0869 855 885` or `tel:0869855885` must output `0978 305 740` and `tel:0978305740` without requiring manual re-entry.
- Saved Elementor `manual_entries` repeaters that were persisted before `is_locked` existed (7 legacy items without `is_locked` keys) should automatically append the 2 default locked cards, while any repeater item edited after this update (containing the `is_locked` key) must strictly obey its switcher state (`'yes'` vs `''`).
- Locked project cards with empty `detailLink.url` must fall back to `#dang-ky-tu-van` on their lock overlay CTA link.
- Filtering by zone or unit type tab (e.g. `the-london` or `3pn`) must include matching locked cards alongside unlocked cards.

---

### Task 1: Locked Project Cards, Mobile Form Scroll & Phone Update in `api-rc`

**Files:**
- Modify: `src/components/ocean-park-project-samples/OceanParkProjectSamples.tsx:17-345`
- Modify: `src/data/ocean-park-project-samples-wrapper.ts:28-212`
- Modify: `src/components/ocean-park-contact-form/OceanParkContactForm.tsx:159-400`
- Modify: `src/data/ocean-park-intro.ts:65-72`
- Modify: `src/data/ocean-park-pricing.ts:21-26`
- Modify: `src/data/ocean-park-contact-form-wrapper.ts:12`
- Modify: `src/data/header-top.ts:5`
- Modify: `src/data/footer.ts:155-178`
- Modify: `src/data/floating-contact.ts:32-33`
- Modify: `src/data/construction-header.ts:16`
- Modify: `src/data/construction-footer.ts:69-70`
- Modify: `src/data/table-of-contents-content.ts:40`
- Test: `tests/ocean-park.spec.ts`
- Test: `tests/construction-header.spec.ts`

**Interfaces:**
- Produces:
  - `OceanParkProjectCardModel.isLocked?: boolean` in `src/components/ocean-park-project-samples/OceanParkProjectSamples.tsx`
  - DOM attributes on locked cards: `article.ocean-park-project-card[data-locked="true"]` containing `.ocean-park-project-card-lock-overlay`

- [ ] **Step 1: Update `tests/ocean-park.spec.ts` and `tests/construction-header.spec.ts` with failing assertions**

In `tests/ocean-park.spec.ts`, update card counts from `7` to `9` and add assertions for the 2 locked cards, updated phone number, and mobile scroll behavior:

```ts
  test("OceanParkProjectSamples: filters apartment cards by zone and unit type tabs and renders 2 locked cards", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(PREVIEW_URL);

    const cards = page.locator(".ocean-park-project-card");
    await expect(cards).toHaveCount(9);

    const lockedCards = page.locator('.ocean-park-project-card[data-locked="true"]');
    await expect(lockedCards).toHaveCount(2);
    await expect(lockedCards.first().locator(".ocean-park-project-card-lock-overlay")).toContainText(
      "Đăng ký để mở khóa",
    );

    const londonTab = page.locator('button[data-zone-tab="the-london"]');
    await londonTab.click();
    await expect(londonTab).toHaveAttribute("aria-selected", "true");
    await expect(cards).toHaveCount(2);
    await expect(cards.first()).toContainText("LD1-08");
    await expect(cards.nth(1)).toContainText("LD2-15");

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
    await expect(cards).toHaveCount(2);
    await expect(cards.first()).toContainText("LSB-09");
    await expect(cards.nth(1)).toContainText("LSB-18");

    const studioTab = page.locator('button[data-unit-tab="studio"]');
    await studioTab.click();
    const emptyNotice = page.locator(".ocean-park-project-filter-empty-notice");
    await expect(emptyNotice).toBeVisible();
    const resetBtn = page.locator(".ocean-park-project-filter-reset-btn");
    await resetBtn.click();
    await expect(emptyNotice).toHaveCount(0);
    await expect(cards).toHaveCount(9);
  });

  test("mobile: clicking ocean-park-intro-secondary-cta scrolls consultation form card into viewport even on repeated taps, and uses hotline 0978 305 740", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PREVIEW_URL);

    await expect(page.locator(".ocean-park-intro-primary-cta")).toContainText("0978 305 740");
    await expect(page.locator(".ocean-park-intro-primary-cta")).toHaveAttribute("href", "tel:0978305740");

    const secondaryCta = page.locator(".ocean-park-intro-secondary-cta");
    await secondaryCta.scrollIntoViewIfNeeded();
    await secondaryCta.click();

    const formCard = page.locator(".ocean-park-contact-form-card");
    await expect
      .poll(async () => {
        const box = await formCard.boundingBox();
        return box !== null && box.y >= -50 && box.y < 400;
      })
      .toBe(true);

    // Scroll back up to intro while #dang-ky-tu-van hash is already set, then click again
    await secondaryCta.scrollIntoViewIfNeeded();
    await secondaryCta.click();
    await expect
      .poll(async () => {
        const box = await formCard.boundingBox();
        return box !== null && box.y >= -50 && box.y < 400;
      })
      .toBe(true);
  });
```

Also update `tests/construction-header.spec.ts:97` to expect `"Hotline: 0978 305 740"`.

- [ ] **Step 2: Run Playwright tests to verify they fail**

Run: `npx playwright test tests/ocean-park.spec.ts tests/construction-header.spec.ts`
Expected: FAIL (7 cards instead of 9, old phone `0869 855 885`, mobile `formCard` `box.y` > 1000).

- [ ] **Step 3: Implement locked card UI in `src/components/ocean-park-project-samples/OceanParkProjectSamples.tsx` and add 2 locked items in `src/data/ocean-park-project-samples-wrapper.ts`**

1. In `src/components/ocean-park-project-samples/OceanParkProjectSamples.tsx`:
   - Import `Lock` from `lucide-react`.
   - Add `isLocked?: boolean;` to `OceanParkProjectCardModel`.
   - For each card in `displayProjects.map`:
     - Set `const isLocked = Boolean(project.isLocked);` and `const targetUrl = (project.detailLink?.url ?? "").trim() || "#dang-ky-tu-van";`.
     - Add `data-locked={isLocked ? "true" : undefined}` and `!relative` to `article.ocean-park-project-card`.
     - Wrap the inner media + body in a container with `cn("!flex !flex-1 !flex-col", isLocked && "!blur-[3.5px] !opacity-60 !select-none !pointer-events-none")` and `aria-hidden={isLocked ? "true" : undefined}`.
     - When `isLocked` is true, render an overlay `<Link>` (`.ocean-park-project-card-lock-overlay !absolute !inset-0 !z-10 !flex !flex-col !items-center !justify-center !bg-brand-navy/35 !p-5 !text-center !no-underline !backdrop-blur-[2px]`) pointing to `{ url: targetUrl, is_external: Boolean(project.detailLink?.is_external), nofollow: Boolean(project.detailLink?.nofollow) }` containing the navy/gold lock card:
       - `Lock` icon in `.ocean-park-project-card-lock-badge`
       - Eyebrow `"Hồ sơ mẫu độc quyền"`
       - Description `"Đăng ký để mở khóa trọn bộ mặt bằng 2D, phối cảnh 3D & dự toán chi tiết"`
       - Button pill `"Đăng ký nhận thông tin"` with `ArrowRight`.

2. In `src/data/ocean-park-project-samples-wrapper.ts`:
   - Append 2 locked items to `featuredProjects`:
     - Item 8: `title: "Thiết kế & Thi công nội thất Căn góc 3PN The London Ocean Park 1 — Tòa LD2"`, `zoneId: "the-london"`, `zoneLabel: "The London Ocean Park 1"`, `towerLabel: "Tòa LD2"`, `unitTypeId: "3pn"`, `unitTypeLabel: "Căn góc 3PN"`, `area: "84.2m²"`, `apartmentCode: "LD2-15"`, `style: "Modern British Bespoke"`, `budget: "245 – 310 triệu"`, `summary: "Hồ sơ mặt bằng bố trí nội thất 2D, phối cảnh 3D Bespoke và bảng dự toán BOQ chi tiết căn góc 3PN Tòa LD2 phân khu The London Ocean Park 1 gia công tại xưởng IC HOUSE Như Quỳnh."`, `image.url: "https://noithat.ichouse.vn/wp-content/uploads/2026/05/Du-an-noi-that-can-ho-toa-H2-masteri-OCP-2.jpg"`, `detailLink.url: "#dang-ky-tu-van"`, `isRealProject: true`, `isLocked: true`.
     - Item 9: `title: "Thiết kế & Thi công nội thất Căn hộ 3PN VIP LUMIÈRE SpringBay Ocean Park 2"`, `zoneId: "lumiere-springbay"`, `zoneLabel: "LUMIÈRE SpringBay Ocean Park 2"`, `towerLabel: "Tòa Feliz • Tòa Vida"`, `unitTypeId: "3pn"`, `unitTypeLabel: "Căn góc 3PN Panorama"`, `area: "96.8m²"`, `apartmentCode: "LSB-18"`, `style: "Quiet Luxury & Bespoke"`, `budget: "280 – 360 triệu"`, `summary: "Trọn bộ hồ sơ phối cảnh 3D, bản vẽ kỹ thuật hệ tủ cong kịch trần Low-E và bảng bóc tách khối lượng thi công thực tế căn hộ 3PN VIP LUMIÈRE SpringBay Ocean Park 2."`, `image.url: "https://noithat.ichouse.vn/wp-content/uploads/2026/05/thiet-ke-noi-that-chung-cu-tone-den-trang-hm18_1.jpg"`, `detailLink.url: "#dang-ky-tu-van"`, `isRealProject: true`, `isLocked: true`.

- [ ] **Step 4: Implement mobile form order & smooth scroll in `src/components/ocean-park-contact-form/OceanParkContactForm.tsx` and update phone numbers in `src/data/`**

1. In `src/components/ocean-park-contact-form/OceanParkContactForm.tsx`:
   - Add `const sectionRef = useRef<HTMLElement>(null);` and `const formCardRef = useRef<HTMLDivElement>(null);`.
   - Attach `ref={sectionRef}` to `<section id={resolvedSectionId} ...>` and `ref={formCardRef}` to `.ocean-park-contact-form-card`.
   - Add `!order-first lg:!order-none` to `.ocean-park-contact-form-card` class list so the form card is at the top of `#dang-ky-tu-van` on mobile viewports (`< 1024px`).
   - Add a `useEffect` listening for `click` events on `document`: when the clicked target is inside an `<a>` whose `getAttribute("href")` equals `#${resolvedSectionId}` (or ends with `#${resolvedSectionId}` on the same pathname), locate `formCardRef.current ?? sectionRef.current`, call `preventDefault()`, update `window.history.pushState(null, "", `#${resolvedSectionId}`)` if needed, and call `targetEl.scrollIntoView({ behavior: "smooth", block: "start" })`.

2. Replace `0869 855 885` → `0978 305 740` and `0869855885` → `0978305740` in:
   - `src/data/ocean-park-intro.ts`
   - `src/data/ocean-park-pricing.ts`
   - `src/data/ocean-park-contact-form-wrapper.ts`
   - `src/data/header-top.ts`
   - `src/data/footer.ts`
   - `src/data/floating-contact.ts`
   - `src/data/construction-header.ts`
   - `src/data/construction-footer.ts`
   - `src/data/table-of-contents-content.ts`

- [ ] **Step 5: Run typecheck, build, and Playwright tests to verify they pass**

Run: `bun run typecheck && bun run build && npx playwright test tests/ocean-park.spec.ts tests/construction-header.spec.ts`
Expected: PASS (all tests in both spec files pass, static HTML and browser/server bundles generated cleanly).

- [ ] **Step 6: Commit `api-rc` changes**

```bash
git add src/ tests/
git commit -m "feat(ocean-park): add locked project cards, update phone to 0978 305 740, and fix mobile form scroll"
```

---

### Task 2: Elementor `is_locked` Control, Default Locked Cards & Phone Normalization in `elementor-addon-ichouse`

**Files:**
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\helpers\ocean-park-project-samples.php:317-518`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\widgets\EAI-ocean-park-project-samples.php:190-462`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\helpers\ocean-park-intro.php:96-209`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\helpers\ocean-park-pricing.php:127-292`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\helpers\ocean-park-contact-form.php:138-271`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\widgets\EAI-ocean-park-intro.php:72-86`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\widgets\EAI-ocean-park-pricing.php:108-122`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\widgets\EAI-ocean-park-contact-form.php:88-96`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\widgets\EAI-header.php:82`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\widgets\EAI-footer.php:355-430`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\widgets\EAI-floating-contact.php:166-179`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\widgets\EAI-construction-header.php:53`
- Modify: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\includes\widgets\EAI-construction-footer.php:205`
- Test: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\tests\OceanParkProjectSamplesHelperTest.php`
- Test: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\tests\OceanParkIntroHelperTest.php`
- Test: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\tests\OceanParkPricingHelperTest.php`
- Test: `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\tests\OceanParkContactFormHelperTest.php`

**Interfaces:**
- Consumes: `OceanParkProjectCardModel.isLocked?: boolean` from Task 1.
- Produces:
  - `eai_ocean_park_normalize_legacy_phone(string $value): string` in `includes/helpers/ocean-park-intro.php`
  - `eai_ocean_park_project_samples_default_locked_entries(): array` in `includes/helpers/ocean-park-project-samples.php`

- [ ] **Step 1: Update PHPUnit tests in `elementor-addon-ichouse/tests/` with failing assertions**

1. In `tests/OceanParkProjectSamplesHelperTest.php`:
   - Update `testBuildsEditorSampleWithSevenCardsAndFilterTabs` to assert `self::assertCount(9, $sample['featuredProjects']);`, `self::assertFalse($sample['featuredProjects'][0]['isLocked']);`, `self::assertTrue($sample['featuredProjects'][7]['isLocked']);`, `self::assertTrue($sample['featuredProjects'][8]['isLocked']);`.
   - Assert `$widget` contains `'is_locked'` in `testSourceWiringUsesWrapperComponentAndPostSelectionControls`.
2. In `tests/OceanParkIntroHelperTest.php`, `tests/OceanParkPricingHelperTest.php`, and `tests/OceanParkContactFormHelperTest.php`:
   - Assert that passing legacy `'0869 855 885'` and `'tel:0869855885'` into `eai_ocean_park_intro_get_rc_props()`, `eai_ocean_park_pricing_get_rc_props()`, and `eai_ocean_park_contact_form_get_rc_props()` normalizes to `'0978 305 740'` and `'tel:0978305740'`.

- [ ] **Step 2: Run PHPUnit to verify tests fail**

Run: `php "C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\vendor\bin\phpunit" --configuration "C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\phpunit.xml.dist"`
Expected: FAIL (7 cards instead of 9, missing `is_locked`, legacy phone `0869 855 885` not normalized).

- [ ] **Step 3: Implement `is_locked` repeater switcher, 2 default locked cards, and legacyphone normalization in `elementor-addon-ichouse`**

1. In `includes/helpers/ocean-park-intro.php`:
   - Define `eai_ocean_park_normalize_legacy_phone(string $value): string` replacing `'0869 855 885'` → `'0978 305 740'` and `'0869855885'` → `'0978305740'`.
   - Apply `eai_ocean_park_normalize_legacy_phone()` to `primaryCta.label` and `primaryCta.link.url` in `eai_ocean_park_intro_get_rc_props()` and update defaults in `eai_ocean_park_intro_get_editor_sample_props()`.
2. In `includes/helpers/ocean-park-pricing.php` and `includes/helpers/ocean-park-contact-form.php`:
   - Apply `eai_ocean_park_normalize_legacy_phone()` to `primaryCta.label`, `primaryCta.link.url`, and `hotline` in `get_rc_props()` and update editor sample defaults to `0978 305 740` / `tel:0978305740`.
3. In `includes/helpers/ocean-park-project-samples.php`:
   - Define `eai_ocean_park_project_samples_default_locked_entries(): array` returning the 2 locked repeater rows (`LD2-15` and `LSB-18` with `'is_locked' => 'yes'`).
   - Update `eai_ocean_park_project_samples_get_editor_sample_props()` so the 7 initial rows have `'isLocked' => false` and the 2 locked rows (`LD2-15`, `LSB-18`) are appended with `'isLocked' => true`.
4. In `includes/widgets/EAI-ocean-park-project-samples.php`:
   - Add `is_locked` (`Controls_Manager::SWITCHER`, label `'Làm mờ / Yêu cầu đăng ký'`, `return_value => 'yes'`, `default => ''`) to `$manual_repeater`.
   - Append the 2 locked items from `eai_ocean_park_project_samples_default_locked_entries()` to the `manual_entries` control `default`.
   - In `build_props_from_manual()`: if `$entries` has exactly 7 items and none of them contain the `'is_locked'` array key (legacy saved repeater), merge `eai_ocean_park_project_samples_default_locked_entries()` onto `$entries`. Map `'isLocked' => ($entry['is_locked'] ?? '') === 'yes'` on each item in `$featured_projects`.
5. Update `0869 855 885` → `0978 305 740` and `0869855885` → `0978305740` in `includes/widgets/EAI-ocean-park-intro.php`, `includes/widgets/EAI-ocean-park-pricing.php`, `includes/widgets/EAI-ocean-park-contact-form.php`, `includes/widgets/EAI-header.php`, `includes/widgets/EAI-footer.php`, `includes/widgets/EAI-floating-contact.php`, `includes/widgets/EAI-construction-header.php`, and `includes/widgets/EAI-construction-footer.php`.

- [ ] **Step 4: Run PHPUnit test suite to verify all tests pass**

Run: `php "C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\vendor\bin\phpunit" --configuration "C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse\phpunit.xml.dist"`
Expected: PASS (0 failures, 0 errors).

- [ ] **Step 5: Commit `elementor-addon-ichouse` changes**

```bash
git -C "C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse" add includes/ tests/
git -C "C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse" commit -m "feat(ocean-park): add is_locked card toggle, 2 locked sample cards, and update phone to 0978 305 740"
```

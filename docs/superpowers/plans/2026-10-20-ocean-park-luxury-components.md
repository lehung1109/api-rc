# Vinhomes Ocean Park Luxury Interior Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 6 modular, high-end Vinhomes Ocean Park 1, 2, 3 interior design & construction components plus a full preview page (`pages/ocean-park/page.tsx`) optimized for Google Ads keyword density, mobile horizontal scroll-snap UX, and IC HOUSE's 3 local advantages.

**Architecture:** Each section is implemented as a standalone component under `src/components/<kebab-name>/<PascalName>.tsx` with corresponding static render data in `src/data/<kebab-name>.ts`. Interactive sections (`OceanParkProjectSamples` and `OceanParkContactForm`) use the `Wrapper` + `ClientComponentWrapper` island pattern so `fillClientIslands` pre-renders 100% of the HTML for SEO/Google Ads while hydrating client interactivity in the browser; `OceanParkFaq` uses `AccordionExclusiveSync` to keep mobile vertical height compact.

**Tech Stack:** React 19, TypeScript, Tailwind CSS (`brand-navy`, `brand-gold`, `brand-white`), Lucide React icons, Bun test runner (`node:test` + `react-dom/server`), Vite, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-20-ocean-park-luxury-components-design.md`

## Global Constraints

- Preserve IC HOUSE brand frame (`Header`, `HeroSection` banner, `FloatingContact`, `Footer`) and brand palette (`brand-navy`, `brand-gold`, `brand-white`, `brand-white-hover`).
- Target the high-end / bespoke luxury segment (3D design `250.000đ – 350.000đ/m²` free 100% on construction contract; full luxury package from `120 triệu/căn`, popular bespoke package `180 – 260 triệu/căn`, `35 – 60 triệu/căn` savings for buildings handed over with kitchens).
- Include all 27 target Google Ads keywords across the data files: `Ocean Park 1`, `The Paris`, `The Paris Ocean Park 1`, `The London`, `The London Ocean Park 1`, `Tòa LD1`, `Tòa LD2`, `Tòa LD3`, `The Beverly`, `The Beverly Ocean Park 1`, `Tòa BE1`, `Tòa BE2`, `Tòa BE3`, `Tòa BE4`, `Ocean Park 2`, `LUMIÈRE SpringBay`, `LUMIÈRE SpringBay Ocean Park 2`, `Masteri Trinity Square`, `Masteri Trinity Square Ocean Park 2`, `Ocean Park 3`, `Căn hộ cao tầng Ocean Park 3`, `Dự án căn hộ Ocean Park 3`, `Chung cư Ocean Park 1`, `Căn hộ The Beverly`, `Căn hộ The London`, `Dự án Masteri Trinity Square`, `Căn hộ LUMIÈRE SpringBay`.
- Highlight IC HOUSE's 3 real local addresses: Office (`Số 01 Voi Phục, Gia Lâm, Hà Nội`), Model Home (`Sao Biển 23, KĐT Vinhomes Ocean Park, Gia Lâm, Hà Nội`), Factory (`Thôn Ngọc Trai, Xã Như Quỳnh, Tỉnh Hưng Yên`).
- Do not manually edit `src/generated/`, `html/`, or `dist/`; run `bun run generate` instead.

---

### Task 1: `OceanParkIntro` Component & Data

**Files:**
- Create: `src/components/ocean-park-intro/OceanParkIntro.tsx`
- Create: `src/data/ocean-park-intro.ts`
- Test: `scripts/ocean-park-components.test.ts`

**Interfaces:**
- Consumes: `LinkModel` from `src/components/link/Link.tsx`
- Produces: `OceanParkIntro` default export and `OceanParkIntroModel` interface in `src/components/ocean-park-intro/OceanParkIntro.tsx`; `oceanParkIntro` default/named export in `src/data/ocean-park-intro.ts`

- [ ] **Step 1: Write the failing unit test for `OceanParkIntro`**

Create `scripts/ocean-park-components.test.ts`:

```ts
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import OceanParkIntro from "../src/components/ocean-park-intro/OceanParkIntro";
import { oceanParkIntro } from "../src/data/ocean-park-intro";

describe("OceanParkIntro", () => {
  test("renders high-end policies, process steps, subdivision badges, and CTAs", () => {
    const html = renderToStaticMarkup(createElement(OceanParkIntro, oceanParkIntro));

    assert.ok(html.includes("ocean-park-intro"));
    assert.ok(html.includes("The London"));
    assert.ok(html.includes("The Paris"));
    assert.ok(html.includes("The Beverly"));
    assert.ok(html.includes("LUMIÈRE SpringBay"));
    assert.ok(html.includes("Masteri Trinity Square"));
    assert.ok(html.includes("120 triệu"));
    assert.ok(html.includes("0869 855 885"));
  });

  test("returns empty string when all fields are empty", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkIntro, {
        eyebrow: "  ",
        title: "  ",
        leadHtml: "  ",
        highlights: [],
        subdivisionBadges: [],
        steps: [],
        primaryCta: {
          label: "",
          link: { url: "", is_external: false, nofollow: false },
        },
        secondaryCta: {
          label: "",
          link: { url: "", is_external: false, nofollow: false },
        },
      }),
    );

    assert.equal(html, "");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: FAIL with module not found `../src/components/ocean-park-intro/OceanParkIntro`

- [ ] **Step 3: Implement `OceanParkIntro.tsx` and `src/data/ocean-park-intro.ts`**

Create `src/components/ocean-park-intro/OceanParkIntro.tsx`:

```tsx
import { PhoneCall, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface OceanParkIntroHighlightModel {
  label: string;
  value: string;
  note?: string;
}

export interface OceanParkIntroStepModel {
  number: string;
  title: string;
  description: string;
}

export interface OceanParkIntroCtaModel {
  label: string;
  link: LinkModel;
}

export interface OceanParkIntroModel {
  className?: string;
  eyebrow: string;
  title: string;
  leadHtml: string;
  highlights: OceanParkIntroHighlightModel[];
  subdivisionBadges: string[];
  steps: OceanParkIntroStepModel[];
  primaryCta: OceanParkIntroCtaModel;
  secondaryCta: OceanParkIntroCtaModel;
}

const OceanParkIntro = (model: OceanParkIntroModel) => {
  const {
    className,
    eyebrow,
    title,
    leadHtml,
    highlights,
    subdivisionBadges,
    steps,
    primaryCta,
    secondaryCta,
  } = model;

  const eyebrowText = eyebrow.trim();
  const titleText = title.trim();
  const leadContent = leadHtml.trim();
  const validHighlights = highlights.filter(
    (item) => item.label.trim().length > 0 && item.value.trim().length > 0,
  );
  const validBadges = subdivisionBadges
    .map((badge) => badge.trim())
    .filter((badge) => badge.length > 0);
  const validSteps = steps.filter(
    (step) => step.title.trim().length > 0 && step.description.trim().length > 0,
  );
  const hasPrimaryCta =
    primaryCta.label.trim().length > 0 && primaryCta.link.url.trim().length > 0;
  const hasSecondaryCta =
    secondaryCta.label.trim().length > 0 &&
    secondaryCta.link.url.trim().length > 0;

  if (
    !eyebrowText &&
    !titleText &&
    !leadContent &&
    validHighlights.length === 0 &&
    validSteps.length === 0 &&
    !hasPrimaryCta &&
    !hasSecondaryCta
  ) {
    return null;
  }

  return (
    <section
      className={cn(
        "ocean-park-intro !w-full !bg-brand-white !px-4 !py-10 !text-brand-navy md:!px-6 md:!py-14",
        className,
      )}
    >
      <div className="ocean-park-intro-inner !mx-auto !w-full !max-w-7xl !overflow-hidden !rounded-2xl !border !border-brand-gold/40 !bg-brand-white !shadow-lg !shadow-brand-navy/10">
        <div className="ocean-park-intro-top !grid !grid-cols-1 !gap-6 !bg-brand-navy !p-5 !text-brand-white md:!p-8 lg:!grid-cols-12 lg:!gap-8 lg:!p-10">
          <div className="ocean-park-intro-copy lg:!col-span-7">
            {eyebrowText ? (
              <p className="ocean-park-intro-eyebrow !mb-2 !inline-flex !items-center !gap-2 !rounded-full !border !border-brand-gold/50 !bg-brand-gold/15 !px-3.5 !py-1 !text-xs !font-semibold !uppercase !tracking-wider !text-brand-gold md:!text-sm">
                <Sparkles className="!h-3.5 !w-3.5 !shrink-0" aria-hidden="true" />
                <span>{eyebrowText}</span>
              </p>
            ) : null}

            {titleText ? (
              <h2 className="ocean-park-intro-title !mt-1 !text-2xl !font-bold !leading-snug !text-brand-white md:!text-3xl lg:!text-4xl">
                {titleText}
              </h2>
            ) : null}

            {leadContent ? (
              <div
                className="ocean-park-intro-lead !mt-3 !space-y-2.5 !text-sm !leading-relaxed !text-brand-white-hover md:!text-base [&_strong]:!font-semibold [&_strong]:!text-brand-gold"
                dangerouslySetInnerHTML={{ __html: leadContent }}
              />
            ) : null}

            {validBadges.length > 0 ? (
              <div className="ocean-park-intro-badges !mt-4 !flex !flex-nowrap !gap-2 !overflow-x-auto !pb-1 md:!flex-wrap md:!overflow-visible">
                {validBadges.map((badge, index) => (
                  <span
                    key={`${badge}-${index}`}
                    className="ocean-park-intro-badge !shrink-0 !rounded-full !border !border-brand-white/20 !bg-brand-white/10 !px-3 !py-1 !text-xs !font-medium !text-brand-white-hover"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : null}

            {hasPrimaryCta || hasSecondaryCta ? (
              <div className="ocean-park-intro-actions !mt-5 !flex !flex-wrap !items-center !gap-3 md:!mt-6">
                {hasPrimaryCta ? (
                  <Link
                    {...primaryCta.link}
                    className={cn(
                      "ocean-park-intro-primary-cta !inline-flex !items-center !justify-center !gap-2 !rounded-full !bg-brand-gold !px-6 !py-2.5 !text-sm !font-bold !uppercase !tracking-wide !text-brand-white !no-underline !shadow-md !transition-colors hover:!bg-brand-gold-hover md:!px-7 md:!py-3 md:!text-base",
                      primaryCta.link.className,
                    )}
                  >
                    <PhoneCall className="!h-4 !w-4 !shrink-0" aria-hidden="true" />
                    <span>{primaryCta.label}</span>
                  </Link>
                ) : null}

                {hasSecondaryCta ? (
                  <Link
                    {...secondaryCta.link}
                    className={cn(
                      "ocean-park-intro-secondary-cta !inline-flex !items-center !justify-center !rounded-full !border !border-brand-gold !bg-transparent !px-6 !py-2.5 !text-sm !font-semibold !uppercase !tracking-wide !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white md:!px-7 md:!py-3 md:!text-base",
                      secondaryCta.link.className,
                    )}
                  >
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          {validHighlights.length > 0 ? (
            <div className="ocean-park-intro-highlights !grid !grid-cols-2 !gap-3 !self-center lg:!col-span-5">
              {validHighlights.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="ocean-park-intro-highlight-card !flex !flex-col !justify-between !rounded-xl !border !border-brand-gold/35 !bg-brand-white/10 !p-3.5 !backdrop-blur-sm md:!p-4"
                >
                  <span className="ocean-park-intro-highlight-label !text-xs !font-medium !uppercase !tracking-wide !text-brand-white-hover">
                    {item.label}
                  </span>
                  <strong className="ocean-park-intro-highlight-value !mt-1.5 !text-lg !font-bold !leading-tight !text-brand-gold md:!text-xl">
                    {item.value}
                  </strong>
                  {item.note?.trim() ? (
                    <span className="ocean-park-intro-highlight-note !mt-1 !text-xs !text-brand-white-hover/85">
                      {item.note}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {validSteps.length > 0 ? (
          <div className="ocean-park-intro-steps !flex !flex-nowrap !gap-3 !overflow-x-auto !bg-brand-white-hover/50 !p-4 !snap-x !snap-mandatory md:!grid md:!grid-cols-3 md:!gap-5 md:!overflow-visible md:!p-6">
            {validSteps.map((step, index) => (
              <article
                key={`${step.number}-${step.title}-${index}`}
                className="ocean-park-intro-step !w-[82%] !shrink-0 !snap-start !rounded-xl !border !border-brand-navy/10 !bg-brand-white !p-4 !shadow-sm md:!w-auto"
              >
                <div className="!flex !items-center !gap-3">
                  <span className="ocean-park-intro-step-number !inline-flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-full !bg-brand-navy !text-sm !font-bold !text-brand-gold">
                    {step.number.trim() || `0${index + 1}`}
                  </span>
                  <h3 className="ocean-park-intro-step-title !text-base !font-bold !text-brand-navy md:!text-lg">
                    {step.title}
                  </h3>
                </div>
                <p className="ocean-park-intro-step-desc !mt-2 !mb-0 !text-sm !leading-relaxed !text-brand-navy/80">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OceanParkIntro;
```

Create `src/data/ocean-park-intro.ts`:

```ts
import type { OceanParkIntroModel } from "@/components/ocean-park-intro/OceanParkIntro";

export const oceanParkIntro: OceanParkIntroModel = {
  eyebrow: "IC HOUSE LUXURY — NỘI THẤT MAY ĐO ĐẠI ĐÔ THỊ OCEAN PARK 1 • 2 • 3",
  title:
    "Chuyên Thiết Kế & Thi Công Nội Thất Cao Cấp Tại Vinhomes Ocean Park",
  leadHtml: [
    "<p><strong>IC HOUSE</strong> định vị giải pháp tư vấn mặt bằng chuyên sâu, thiết kế 3D Bespoke và sản xuất – thi công nội thất trọn gói phân khúc <strong>Trung – Cao cấp & Luxury</strong> cho các tòa căn hộ tại <strong>Ocean Park 1</strong> (<strong>The Paris Ocean Park 1</strong>, <strong>The London Ocean Park 1</strong> – <strong>Tòa LD1</strong>, <strong>Tòa LD2</strong>, <strong>Tòa LD3</strong>; <strong>The Beverly Ocean Park 1</strong> – <strong>Tòa BE1</strong>, <strong>Tòa BE2</strong>, <strong>Tòa BE3</strong>, <strong>Tòa BE4</strong>), <strong>Ocean Park 2</strong> (<strong>LUMIÈRE SpringBay Ocean Park 2</strong>, <strong>Masteri Trinity Square Ocean Park 2</strong>) và <strong>Dự án căn hộ cao tầng Ocean Park 3</strong>.</p>",
    "<p>Sở hữu <strong>Nhà mẫu ngay tại Sao Biển 23 Vinhomes Ocean Park</strong>, <strong>Văn phòng tại Số 01 Voi Phục Gia Lâm</strong> và <strong>Nhà máy sản xuất 2.000m² tại Như Quỳnh</strong> sát vách đại đô thị, IC HOUSE cam kết tiến độ chuẩn xác và chất lượng hoàn thiện tinh xảo cho từng căn hộ.</p>",
  ].join(""),
  highlights: [
    {
      label: "Thiết kế 3D Bespoke",
      value: "250.000đ – 350.000đ/m²",
      note: "KTS trưởng 5–15 năm kinh nghiệm chủ trì",
    },
    {
      label: "Thi công trọn gói Cao cấp",
      value: "Từ 120 triệu/căn",
      note: "Gói Luxury đồng bộ: 180 – 260 triệu/căn",
    },
    {
      label: "Ưu đãi ký HĐ thi công",
      value: "Miễn phí 100% TK",
      note: "Hoàn trả toàn bộ phí thiết kế 3D & hồ sơ kỹ thuật",
    },
    {
      label: "Nhà mẫu & Xưởng tại chỗ",
      value: "Sao Biển 23 OCP",
      note: "Bảo hành 2 năm • Bảo trì 5 năm tận căn hộ",
    },
  ],
  subdivisionBadges: [
    "The London (Tòa LD1 • LD2 • LD3)",
    "The Beverly (Tòa BE1 • BE2 • BE3 • BE4)",
    "The Paris Ocean Park 1",
    "LUMIÈRE SpringBay Ocean Park 2",
    "Masteri Trinity Square Ocean Park 2",
    "Căn hộ cao tầng Ocean Park 3",
  ],
  steps: [
    {
      number: "01",
      title: "Khảo sát thực tế tại tòa trong 15 phút",
      description:
        "KTS từ văn phòng Số 01 Voi Phục có mặt đo đạc trực tiếp từng góc căn hộ Chung cư Ocean Park 1, Ocean Park 2, Ocean Park 3 và tư vấn công năng tại chỗ.",
    },
    {
      number: "02",
      title: "Thiết kế 3D & Trải nghiệm Nhà mẫu Sao Biển 23",
      description:
        "Cá nhân hóa phong cách Modern Luxury, Japandi, Neoclassic, Wabi Sabi; mời gia chủ kiểm chứng trực tiếp cốt gỗ An Cường, đá Vicostone và sơn Inchem tại nhà mẫu.",
    },
    {
      number: "03",
      title: "Sản xuất giá xưởng & Thi công đúng cam kết",
      description:
        "Gia công CNC tự động tại nhà máy Ngọc Trai – Như Quỳnh ngay sát dự án, báo giá minh bạch không phát sinh, hỗ trợ trọn gói thủ tục ban quản lý tòa nhà.",
    },
  ],
  primaryCta: {
    label: "Gọi tư vấn: 0869 855 885",
    link: {
      url: "tel:0869855885",
      is_external: false,
      nofollow: false,
    },
  },
  secondaryCta: {
    label: "Nhận báo giá theo mã căn",
    link: {
      url: "#dang-ky-tu-van",
      is_external: false,
      nofollow: false,
    },
  },
};

export default oceanParkIntro;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ocean-park-intro/OceanParkIntro.tsx src/data/ocean-park-intro.ts scripts/ocean-park-components.test.ts
git commit -m "feat(ocean-park): add OceanParkIntro component and sample data"
```

---

### Task 2: `OceanParkProjectSamples` & `OceanParkProjectSamplesWrapper`

**Files:**
- Create: `src/components/ocean-park-project-samples/OceanParkProjectSamples.tsx`
- Create: `src/components/ocean-park-project-samples/OceanParkProjectSamplesWrapper.tsx`
- Create: `src/data/ocean-park-project-samples-wrapper.ts`
- Create: `src/data/ocean-park-project-samples.ts`
- Modify: `scripts/ocean-park-components.test.ts`

**Interfaces:**
- Consumes: `ClientComponentWrapper` from `src/components/ClientComponentWrapper.tsx`, `MediaModel` from `src/components/media/Media.tsx`, `LinkModel` from `src/components/link/Link.tsx`
- Produces: `OceanParkProjectSamples` (`"use client"`, hydration key `oceanParkProjectSamples`), `OceanParkProjectSamplesWrapper` (Server wrapper), `OceanParkProjectSamplesModel`

- [ ] **Step 1: Add failing unit tests for `OceanParkProjectSamples` to `scripts/ocean-park-components.test.ts`**

Append to `scripts/ocean-park-components.test.ts`:

```ts
import OceanParkProjectSamples from "../src/components/ocean-park-project-samples/OceanParkProjectSamples";
import oceanParkProjectSamples from "../src/data/ocean-park-project-samples";

describe("OceanParkProjectSamples", () => {
  test("renders zone filter tabs, unit type tabs, and luxury apartment cards with tower codes", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkProjectSamples, oceanParkProjectSamples),
    );

    assert.ok(html.includes("ocean-park-project-samples"));
    assert.ok(html.includes("Tòa LD1"));
    assert.ok(html.includes("Tòa LD2"));
    assert.ok(html.includes("Tòa LD3"));
    assert.ok(html.includes("Tòa BE1"));
    assert.ok(html.includes("Tòa BE2"));
    assert.ok(html.includes("Tòa BE3"));
    assert.ok(html.includes("Tòa BE4"));
    assert.ok(html.includes("Căn hộ The London"));
    assert.ok(html.includes("Căn hộ The Beverly"));
    assert.ok(html.includes("Căn hộ LUMIÈRE SpringBay"));
    assert.ok(html.includes("Dự án Masteri Trinity Square"));
    assert.ok(html.includes("Căn hộ cao tầng Ocean Park 3"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: FAIL with module not found `../src/components/ocean-park-project-samples/OceanParkProjectSamples`

- [ ] **Step 3: Implement `OceanParkProjectSamples.tsx`, `OceanParkProjectSamplesWrapper.tsx`, and data files**

Create `src/components/ocean-park-project-samples/OceanParkProjectSamples.tsx`:

```tsx
"use client";

import { ArrowRight, Building2, Layers } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface OceanParkFilterTabModel {
  id: string;
  label: string;
}

export interface OceanParkProjectCardModel {
  title: string;
  zoneId: string;
  zoneLabel: string;
  towerLabel: string;
  unitTypeId: string;
  unitTypeLabel: string;
  area: string;
  apartmentCode: string;
  style: string;
  budget: string;
  summary: string;
  image: MediaModel;
  detailLink: LinkModel;
  isRealProject?: boolean;
}

export interface OceanParkProjectCtaBannerModel {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: LinkModel;
}

export interface OceanParkProjectSamplesModel {
  className?: string;
  eyebrow: string;
  title: string;
  description: string;
  zoneTabs: OceanParkFilterTabModel[];
  unitTypeTabs: OceanParkFilterTabModel[];
  featuredProjects: OceanParkProjectCardModel[];
  ctaBanner: OceanParkProjectCtaBannerModel;
}

const OceanParkProjectSamples = (model: OceanParkProjectSamplesModel) => {
  const {
    className,
    eyebrow,
    title,
    description,
    zoneTabs,
    unitTypeTabs,
    featuredProjects,
    ctaBanner,
  } = model;

  const [activeZone, setActiveZone] = useState<string>("all");
  const [activeUnitType, setActiveUnitType] = useState<string>("all");

  const validProjects = useMemo(
    () =>
      featuredProjects.filter(
        (item) => item.title.trim().length > 0 && item.image.url.trim().length > 0,
      ),
    [featuredProjects],
  );

  const filteredProjects = useMemo(() => {
    return validProjects.filter((item) => {
      const matchZone = activeZone === "all" || item.zoneId === activeZone;
      const matchUnit =
        activeUnitType === "all" || item.unitTypeId === activeUnitType;
      return matchZone && matchUnit;
    });
  }, [validProjects, activeZone, activeUnitType]);

  const displayProjects =
    filteredProjects.length > 0 ? filteredProjects : validProjects;

  if (validProjects.length === 0 && !title.trim()) {
    return null;
  }

  return (
    <section
      id="du-an-mau-ocean-park"
      className={cn(
        "ocean-park-project-samples !w-full !bg-brand-white-hover/40 !px-4 !py-10 !text-brand-navy md:!px-6 md:!py-16",
        className,
      )}
    >
      <div className="ocean-park-project-samples-inner !mx-auto !w-full !max-w-7xl">
        <div className="ocean-park-project-samples-header !mx-auto !max-w-3xl !text-center">
          {eyebrow.trim() ? (
            <p className="ocean-park-project-samples-eyebrow !mb-2 !text-xs !font-bold !uppercase !tracking-widest !text-brand-gold md:!text-sm">
              {eyebrow}
            </p>
          ) : null}
          {title.trim() ? (
            <h2 className="ocean-park-project-samples-title !text-2xl !font-bold !leading-snug !text-brand-navy md:!text-3xl lg:!text-4xl">
              {title}
            </h2>
          ) : null}
          {description.trim() ? (
            <p className="ocean-park-project-samples-desc !mt-3 !text-sm !leading-relaxed !text-brand-navy/75 md:!text-base">
              {description}
            </p>
          ) : null}
        </div>

        {zoneTabs.length > 0 ? (
          <div
            className="ocean-park-zone-tabs !mt-6 !flex !flex-nowrap !items-center !gap-2 !overflow-x-auto !pb-2 md:!justify-center md:!flex-wrap"
            role="tablist"
            aria-label="Lọc theo phân khu và tòa căn hộ"
          >
            {zoneTabs.map((tab) => {
              const isActive = activeZone === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-zone-tab={tab.id}
                  onClick={() => setActiveZone(tab.id)}
                  className={cn(
                    "ocean-park-zone-tab !inline-flex !shrink-0 !cursor-pointer !items-center !gap-1.5 !rounded-full !border !px-4 !py-2 !text-xs !font-semibold !transition-colors md:!text-sm",
                    isActive
                      ? "!border-brand-navy !bg-brand-navy !text-brand-gold !shadow-sm"
                      : "!border-brand-navy/20 !bg-brand-white !text-brand-navy hover:!border-brand-gold hover:!text-brand-gold",
                  )}
                >
                  <Building2 className="!h-3.5 !w-3.5 !shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {unitTypeTabs.length > 0 ? (
          <div
            className="ocean-park-unit-tabs !mt-2 !flex !flex-nowrap !items-center !gap-2 !overflow-x-auto !pb-2 md:!justify-center md:!flex-wrap"
            role="tablist"
            aria-label="Lọc theo loại căn hộ"
          >
            {unitTypeTabs.map((tab) => {
              const isActive = activeUnitType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-unit-tab={tab.id}
                  onClick={() => setActiveUnitType(tab.id)}
                  className={cn(
                    "ocean-park-unit-tab !inline-flex !shrink-0 !cursor-pointer !items-center !gap-1.5 !rounded-full !border !px-3.5 !py-1.5 !text-xs !font-medium !transition-colors",
                    isActive
                      ? "!border-brand-gold !bg-brand-gold !text-brand-white"
                      : "!border-brand-navy/15 !bg-brand-white/80 !text-brand-navy/80 hover:!border-brand-gold",
                  )}
                >
                  <Layers className="!h-3 !w-3 !shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="ocean-park-project-cards !mt-6 !flex !flex-nowrap !gap-4 !overflow-x-auto !pb-4 !snap-x !snap-mandatory md:!grid md:!grid-cols-2 md:!gap-6 md:!overflow-visible lg:!grid-cols-3">
          {displayProjects.map((project, index) => (
            <article
              key={`${project.apartmentCode}-${index}`}
              data-zone-id={project.zoneId}
              data-unit-type-id={project.unitTypeId}
              className="ocean-park-project-card !flex !w-[85%] !shrink-0 !snap-start !flex-col !overflow-hidden !rounded-2xl !border !border-brand-navy/10 !bg-brand-white !shadow-md !transition-shadow hover:!shadow-xl md:!w-auto"
            >
              <div className="ocean-park-project-card-media !relative !aspect-[16/10] !w-full !overflow-hidden !bg-brand-navy/10">
                <Media
                  {...project.image}
                  className="!h-full !w-full !object-cover !transition-transform !duration-500 hover:!scale-105"
                />
                <div className="!absolute !top-3 !left-3 !flex !flex-wrap !gap-1.5">
                  <span className="!rounded-full !bg-brand-navy/90 !px-3 !py-1 !text-xs !font-bold !text-brand-gold">
                    {project.zoneLabel}
                  </span>
                  {project.towerLabel.trim() ? (
                    <span className="!rounded-full !bg-brand-gold !px-2.5 !py-1 !text-xs !font-bold !text-brand-white">
                      {project.towerLabel}
                    </span>
                  ) : null}
                </div>
                <div className="!absolute !right-3 !bottom-3 !rounded-lg !bg-brand-navy/85 !px-2.5 !py-1 !text-xs !font-semibold !text-brand-white">
                  {project.area} • {project.apartmentCode}
                </div>
              </div>

              <div className="ocean-park-project-card-body !flex !flex-1 !flex-col !p-4 md:!p-5">
                <div className="!flex !items-center !justify-between !gap-2 !text-xs !font-semibold !text-brand-gold">
                  <span>{project.unitTypeLabel}</span>
                  <span>{project.style}</span>
                </div>

                <h3 className="ocean-park-project-card-title !mt-1.5 !text-base !font-bold !leading-snug !text-brand-navy md:!text-lg">
                  {project.title}
                </h3>

                <p className="ocean-park-project-card-summary !mt-2 !flex-1 !text-xs !leading-relaxed !text-brand-navy/75 md:!text-sm">
                  {project.summary}
                </p>

                <div className="!mt-4 !flex !items-center !justify-between !border-t !border-brand-navy/10 !pt-3">
                  <div>
                    <span className="!block !text-[11px] !uppercase !text-brand-navy/60">
                      Mức đầu tư tham khảo
                    </span>
                    <strong className="!text-sm !font-bold !text-brand-navy">
                      {project.budget}
                    </strong>
                  </div>

                  <Link
                    {...project.detailLink}
                    className="!inline-flex !items-center !gap-1 !rounded-full !bg-brand-navy !px-3.5 !py-1.5 !text-xs !font-semibold !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white"
                  >
                    <span>Nhận bản vẽ 3D</span>
                    <ArrowRight className="!h-3.5 !w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {ctaBanner.title.trim() ? (
          <div className="ocean-park-project-cta-banner !mt-6 !flex !flex-col !items-center !justify-between !gap-4 !rounded-2xl !bg-brand-navy !p-5 !text-brand-white md:!flex-row md:!p-7">
            <div>
              <h3 className="!text-lg !font-bold !text-brand-gold md:!text-xl">
                {ctaBanner.title}
              </h3>
              <p className="!mt-1 !mb-0 !text-xs !text-brand-white-hover md:!text-sm">
                {ctaBanner.description}
              </p>
            </div>
            {ctaBanner.buttonLabel.trim() && ctaBanner.buttonLink.url.trim() ? (
              <Link
                {...ctaBanner.buttonLink}
                className="!inline-flex !shrink-0 !items-center !justify-center !rounded-full !bg-brand-gold !px-6 !py-2.5 !text-sm !font-bold !uppercase !text-brand-white !no-underline !transition-colors hover:!bg-brand-gold-hover"
              >
                {ctaBanner.buttonLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OceanParkProjectSamples;
```

Create `src/components/ocean-park-project-samples/OceanParkProjectSamplesWrapper.tsx`:

```tsx
import { cn } from "@/lib/utils";
import ClientComponentWrapper from "../ClientComponentWrapper";
import OceanParkProjectSamples, {
  type OceanParkProjectSamplesModel,
} from "./OceanParkProjectSamples";

export type { OceanParkProjectSamplesModel };

const OceanParkProjectSamplesWrapper = (
  model: OceanParkProjectSamplesModel,
) => {
  if (model.featuredProjects.length === 0 && !model.title.trim()) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("ocean-park-project-samples-root", model.className)}
      type="oceanParkProjectSamples"
      hydrateData={model}
    >
      <OceanParkProjectSamples {...model} />
    </ClientComponentWrapper>
  );
};

export default OceanParkProjectSamplesWrapper;
```

Create `src/data/ocean-park-project-samples-wrapper.ts` and `src/data/ocean-park-project-samples.ts` containing rich real & sample projects across **The London Ocean Park 1 (Tòa LD1, Tòa LD2, Tòa LD3)**, **The Beverly Ocean Park 1 (Tòa BE1, Tòa BE2, Tòa BE3, Tòa BE4)**, **The Paris Ocean Park 1**, **LUMIÈRE SpringBay Ocean Park 2**, **Masteri Trinity Square Ocean Park 2**, and **Dự án căn hộ cao tầng Ocean Park 3**.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ocean-park-project-samples/ src/data/ocean-park-project-samples*.ts scripts/ocean-park-components.test.ts
git commit -m "feat(ocean-park): add OceanParkProjectSamples component with mobile scroll-snap and filters"
```

---

### Task 3: `OceanParkPricing` Component & Data

**Files:**
- Create: `src/components/ocean-park-pricing/OceanParkPricing.tsx`
- Create: `src/data/ocean-park-pricing.ts`
- Modify: `scripts/ocean-park-components.test.ts`

**Interfaces:**
- Consumes: `LinkModel` from `src/components/link/Link.tsx`
- Produces: `OceanParkPricing` default export and `OceanParkPricingModel` interface

- [ ] **Step 1: Add failing unit tests for `OceanParkPricing` to `scripts/ocean-park-components.test.ts`**

Append to `scripts/ocean-park-components.test.ts`:

```ts
import OceanParkPricing from "../src/components/ocean-park-pricing/OceanParkPricing";
import { oceanParkPricing } from "../src/data/ocean-park-pricing";

describe("OceanParkPricing", () => {
  test("renders luxury package pricing, unit & room estimates, and 3 commitment columns", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkPricing, oceanParkPricing),
    );

    assert.ok(html.includes("ocean-park-pricing"));
    assert.ok(html.includes("180 – 260 triệu"));
    assert.ok(html.includes("35 – 60 triệu"));
    assert.ok(html.includes("Vicostone"));
    assert.ok(html.includes("An Cường"));
    assert.ok(html.includes("Blum"));
    assert.ok(html.includes("The Beverly"));
    assert.ok(html.includes("The London"));
    assert.ok(html.includes("LUMIÈRE SpringBay"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: FAIL with module not found `../src/components/ocean-park-pricing/OceanParkPricing`

- [ ] **Step 3: Implement `OceanParkPricing.tsx` and `src/data/ocean-park-pricing.ts`**

Create `src/components/ocean-park-pricing/OceanParkPricing.tsx` and `src/data/ocean-park-pricing.ts` with the high-end package banner (`120 triệu/căn` starting, `180 – 260 triệu/căn` Bespoke Luxury package, `35 – 60 triệu/căn` savings for pre-fitted kitchen handovers in *The Beverly, The London, The Paris, LUMIÈRE SpringBay, Masteri Trinity Square*), 5 unit estimates (`Studio / 1PN`, `1PN+1`, `2PN / 2PN+1`, `3PN / Căn góc VIP`, `Duplex / Penthouse / Ghép căn`), 4 room estimates, and 3 horizontal-snap commitment columns (`Gói thi công bao gồm`, `Vật liệu & Phụ kiện cao cấp`, `Quyền lợi đặc quyền khách hàng`).

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ocean-park-pricing/OceanParkPricing.tsx src/data/ocean-park-pricing.ts scripts/ocean-park-components.test.ts
git commit -m "feat(ocean-park): add OceanParkPricing component and high-end estimate matrix"
```

---

### Task 4: `OceanParkAdvantages` Component & Data (3 Local Strengths)

**Files:**
- Create: `src/components/ocean-park-advantages/OceanParkAdvantages.tsx`
- Create: `src/data/ocean-park-advantages.ts`
- Modify: `scripts/ocean-park-components.test.ts`

**Interfaces:**
- Consumes: `MediaModel` from `src/components/media/Media.tsx`, `LinkModel` from `src/components/link/Link.tsx`
- Produces: `OceanParkAdvantages` default export and `OceanParkAdvantagesModel` interface

- [ ] **Step 1: Add failing unit tests for `OceanParkAdvantages` to `scripts/ocean-park-components.test.ts`**

Append to `scripts/ocean-park-components.test.ts`:

```ts
import OceanParkAdvantages from "../src/components/ocean-park-advantages/OceanParkAdvantages";
import { oceanParkAdvantages } from "../src/data/ocean-park-advantages";

describe("OceanParkAdvantages", () => {
  test("highlights IC HOUSE model home inside Ocean Park, nearby office, and nearby factory", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkAdvantages, oceanParkAdvantages),
    );

    assert.ok(html.includes("ocean-park-advantages"));
    assert.ok(html.includes("Sao Biển 23"));
    assert.ok(html.includes("Số 01 Voi Phục"));
    assert.ok(html.includes("Thôn Ngọc Trai, Xã Như Quỳnh"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: FAIL with module not found `../src/components/ocean-park-advantages/OceanParkAdvantages`

- [ ] **Step 3: Implement `OceanParkAdvantages.tsx` and `src/data/ocean-park-advantages.ts`**

Create `src/components/ocean-park-advantages/OceanParkAdvantages.tsx` and `src/data/ocean-park-advantages.ts` showcasing:
1. **Nhà Mẫu Nội Thất Ngay Trong KĐT Vinhomes Ocean Park** (`Sao Biển 23, KĐT Vinhomes Ocean Park, Gia Lâm, Hà Nội`)
2. **Trụ Sở Văn Phòng Ngay Cửa Ngõ Đại Đô Thị** (`Số 01 Voi Phục, Gia Lâm, Hà Nội`)
3. **Nhà Máy Sản Xuất Quy Mô Lớn Sát Vách Ocean Park 1-2-3** (`Thôn Ngọc Trai, Xã Như Quỳnh, Tỉnh Hưng Yên`)
plus the 2 capability pillars (`Xưởng sản xuất trực tiếp 2.000m²` & `Thi công thực tế chuẩn Vinhomes & Masterise Homes`).

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ocean-park-advantages/OceanParkAdvantages.tsx src/data/ocean-park-advantages.ts scripts/ocean-park-components.test.ts
git commit -m "feat(ocean-park): add OceanParkAdvantages highlighting showroom, office, and factory"
```

---

### Task 5: `OceanParkContactForm` & `OceanParkContactFormWrapper`

**Files:**
- Create: `src/components/ocean-park-contact-form/OceanParkContactForm.tsx`
- Create: `src/components/ocean-park-contact-form/OceanParkContactFormWrapper.tsx`
- Create: `src/data/ocean-park-contact-form-wrapper.ts`
- Create: `src/data/ocean-park-contact-form.ts`
- Modify: `scripts/ocean-park-components.test.ts`

**Interfaces:**
- Consumes: `ClientComponentWrapper` from `src/components/ClientComponentWrapper.tsx`
- Produces: `OceanParkContactForm` (`"use client"`, hydration key `oceanParkContactForm`), `OceanParkContactFormWrapper`, `OceanParkContactFormModel`

- [ ] **Step 1: Add failing unit tests for `OceanParkContactForm` to `scripts/ocean-park-components.test.ts`**

Append to `scripts/ocean-park-components.test.ts`:

```ts
import OceanParkContactForm from "../src/components/ocean-park-contact-form/OceanParkContactForm";
import oceanParkContactForm from "../src/data/ocean-park-contact-form";

describe("OceanParkContactForm", () => {
  test("renders inline consultation form with Ocean Park tower selector and 3 IC HOUSE addresses", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkContactForm, oceanParkContactForm),
    );

    assert.ok(html.includes("ocean-park-contact-form"));
    assert.ok(html.includes('id="dang-ky-tu-van"'));
    assert.ok(html.includes("0869 855 885"));
    assert.ok(html.includes("Sao Biển 23"));
    assert.ok(html.includes("The London Ocean Park 1"));
    assert.ok(html.includes("LUMIÈRE SpringBay Ocean Park 2"));
    assert.ok(html.includes("Masteri Trinity Square Ocean Park 2"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: FAIL with module not found `../src/components/ocean-park-contact-form/OceanParkContactForm`

- [ ] **Step 3: Implement `OceanParkContactForm.tsx`, `OceanParkContactFormWrapper.tsx`, and data files**

Create `src/components/ocean-park-contact-form/OceanParkContactForm.tsx` supporting both WordPress Contact Form 7 mounting (`#eai-ocean-park-cf7-source-{formKey}` with `window.wpcf7?.init`) and a built-in interactive consultation form (Name, Phone required, Subdivision/Tower dropdown, Apartment type/area, Notes, and submission confirmation message), plus left-column contact info, 3 addresses, and collapsible reference links on mobile.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ocean-park-contact-form/ src/data/ocean-park-contact-form*.ts scripts/ocean-park-components.test.ts
git commit -m "feat(ocean-park): add OceanParkContactForm with CF7 mount and built-in validation"
```

---

### Task 6: `OceanParkFaq` Component & Complete 27-Keyword Coverage Test

**Files:**
- Create: `src/components/ocean-park-faq/OceanParkFaq.tsx`
- Create: `src/data/ocean-park-faq.ts`
- Modify: `scripts/ocean-park-components.test.ts`

**Interfaces:**
- Consumes: `AccordionExclusiveSync` from `src/components/accordion-exclusive-sync/AccordionExclusiveSync.tsx`, `ClientComponentWrapper` from `src/components/ClientComponentWrapper.tsx`, `LinkModel` from `src/components/link/Link.tsx`
- Produces: `OceanParkFaq` default export and `OceanParkFaqModel` interface

- [ ] **Step 1: Add failing unit tests for `OceanParkFaq` and full 27-keyword coverage to `scripts/ocean-park-components.test.ts`**

Append to `scripts/ocean-park-components.test.ts`:

```ts
import OceanParkFaq from "../src/components/ocean-park-faq/OceanParkFaq";
import { oceanParkFaq } from "../src/data/ocean-park-faq";

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

describe("OceanParkFaq & Full Keyword Coverage", () => {
  test("renders FAQ accordion items with exclusive sync and all 27 Google Ads keywords across the suite", () => {
    const faqHtml = renderToStaticMarkup(createElement(OceanParkFaq, oceanParkFaq));
    assert.ok(faqHtml.includes("ocean-park-faq"));
    assert.ok(faqHtml.includes("ocean-park-faq-item-input"));

    const combinedHtml = [
      renderToStaticMarkup(createElement(OceanParkIntro, oceanParkIntro)),
      renderToStaticMarkup(
        createElement(OceanParkProjectSamples, oceanParkProjectSamples),
      ),
      renderToStaticMarkup(createElement(OceanParkPricing, oceanParkPricing)),
      renderToStaticMarkup(
        createElement(OceanParkAdvantages, oceanParkAdvantages),
      ),
      renderToStaticMarkup(
        createElement(OceanParkContactForm, oceanParkContactForm),
      ),
      faqHtml,
    ].join("\n");

    for (const keyword of REQUIRED_KEYWORDS) {
      assert.ok(
        combinedHtml.includes(keyword),
        `Missing required Google Ads keyword: "${keyword}"`,
      );
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: FAIL with module not found `../src/components/ocean-park-faq/OceanParkFaq`

- [ ] **Step 3: Implement `OceanParkFaq.tsx` and `src/data/ocean-park-faq.ts`**

Create `src/components/ocean-park-faq/OceanParkFaq.tsx` using checkbox accordion inputs synced via `AccordionExclusiveSync` (so opening one question closes the others on mobile while keeping 100% of the answer HTML in the static DOM for Google Ads/SEO) plus the bottom keyword cloud covering all 27 required keywords.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test scripts/ocean-park-components.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ocean-park-faq/OceanParkFaq.tsx src/data/ocean-park-faq.ts scripts/ocean-park-components.test.ts
git commit -m "feat(ocean-park): add OceanParkFaq component with exclusive accordion sync and keyword cloud"
```

---

### Task 7: Preview Page (`pages/ocean-park/page.tsx`), Registry Generation, Build & Playwright E2E Verification

**Files:**
- Create: `pages/ocean-park/page.tsx`
- Create: `tests/ocean-park.spec.ts`
- Modify: `README.md` (document new Ocean Park preview page & components)

**Interfaces:**
- Consumes: `Header`, `HeroSection`, `OceanParkIntro`, `OceanParkProjectSamplesWrapper`, `OceanParkPricing`, `OceanParkAdvantages`, `OceanParkContactFormWrapper`, `OceanParkFaq`, `FloatingContact`, `Footer`
- Produces: `/pages/ocean-park/` preview route and static HTML outputs in `html/`

- [ ] **Step 1: Create `pages/ocean-park/page.tsx` and `tests/ocean-park.spec.ts`**

Create `pages/ocean-park/page.tsx` assembling IC HOUSE's `Header`, the Ocean Park `HeroSection` banner (*"Thi công nội thất căn hộ tại Vinhomes Ocean Park - Gia Lâm - Hà Nội."*), the 6 new Ocean Park Luxury components in order, `FloatingContact`, and `Footer`.

Create `tests/ocean-park.spec.ts` testing:
1. Desktop & Mobile rendering of `/pages/ocean-park/` with Header, preserved Banner, 6 sections, and Footer.
2. Client hydration of `OceanParkProjectSamples` (filtering by `The London` / `LUMIÈRE SpringBay` and unit types).
3. Client hydration and form submission of `OceanParkContactForm`.
4. Exclusive accordion sync on `OceanParkFaq` (opening item 2 automatically closes item 1).

- [ ] **Step 2: Run `bun run generate`, `bun run typecheck`, and `bun run build`**

Run:
```bash
bun run generate
bun run typecheck
bun run build
```
Expected: All registries generated, zero TypeScript errors, static HTML files created in `html/`, browser/server bundles built in `dist/`.

- [ ] **Step 3: Run unit tests and Playwright E2E tests**

Run:
```bash
bun test scripts/ocean-park-components.test.ts
npx playwright test tests/ocean-park.spec.ts
```
Expected: All unit tests and Playwright E2E tests PASS.

- [ ] **Step 4: Commit**

```bash
git add pages/ocean-park/page.tsx tests/ocean-park.spec.ts src/generated/ README.md
git commit -m "feat(ocean-park): add ocean-park preview page, generated registries, and e2e tests"
```

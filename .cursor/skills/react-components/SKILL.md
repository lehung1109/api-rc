---
name: react-components
description: >-
  Creates and edits React components in api-rc following model props, server-first
  rendering, ClientComponentWrapper hydration, Tailwind + semantic classes, SEO
  markup (semantic HTML, heading hierarchy), and auto-generated registries. Use when
  adding, refactoring, or fixing TSX in src/components/, wiring client islands,
  page title bar, project meta bar, layered breadcrumb, or when the user asks about
  component conventions, semantic HTML, heading levels, brand colors, or palette in
  api-rc. Keeps this skill and related docs updated when new project conventions emerge.
---

# React components (api-rc)

## Keep this skill current

Skills are living docs. When you learn or agree on a **new api-rc convention** (with the user or from code), update this file in the **same task** — do not leave skills stale. See [SKILLS-MAINTENANCE.md](../SKILLS-MAINTENANCE.md) for when and how; sync [HEADER.md](../../../src/components/header/HEADER.md) when header rules change.

## Before editing

1. Read sibling files in the same feature folder — match naming, props shape, and styling.
2. For responsive UI (mobile/desktop, overlays, toggles): also read [css-first-responsive-ui](../css-first-responsive-ui/SKILL.md).
3. For header files: read [src/components/header/HEADER.md](../../../src/components/header/HEADER.md).
4. When creating or editing component markup: follow [react-seo-markup.mdc](../../rules/react-seo-markup.mdc) (landmarks, `h1`–`h3`, `Link`/`Media`, `nav` + `aria-label`).
5. When styling with brand/accent colors: follow [ichouse-brand-colors.mdc](../../rules/ichouse-brand-colors.mdc) — **chỉ** token `brand-*` (+ hover); không hex, không `neutral-*`/`gray-*`/`black`.
6. Run `bun run typecheck` after changes. Run `bun run generate` when adding/removing renderable or client components.

## Brand colors (ICHouse)

**Palette strict (6 màu):** Navy / Gold / White + hover — canonical `--e-global-color-*` trong [`src/styles.css`](../../../src/styles.css) `:root`; Tailwind `brand-navy`, `brand-gold`, `brand-white`, `brand-navy-hover`, `brand-gold-hover`, `brand-white-hover`.

| Token | Vai trò |
|-------|---------|
| `brand-navy` | Nền tối, overlay, chữ chính |
| `brand-gold` | Accent, CTA, link, active |
| `brand-white` | Chữ/nền sáng trên navy |
| `brand-*-hover` | Hover/active |
| `text-brand-navy/70` | Chữ phụ (thay xám) |

**Ví dụ:** `bg-brand-navy`, `text-brand-gold`, `hover:bg-brand-gold-hover`, `border-brand-white-hover`.

**Cấm:** hex trong TSX, `neutral-*`, `gray-*`, `bg-black`, palette cam cũ. Chi tiết: [ichouse-brand-colors.mdc](../../rules/ichouse-brand-colors.mdc).

## Architecture

```
Server component (default)
  └─ renders static HTML via server registry

Client island (only when needed)
  └─ *Wrapper: ClientComponentWrapper + Component + ReactSection
       └─ browser hydrates via script[data-rct] (react-loader.tsx)
```

| Layer | Role |
|-------|------|
| **Server component** | No `"use client"`. SSR HTML. Prefer this. |
| **Client component** | `"use client"` first line. State, effects, Swiper, fetch-on-type, etc. |
| **Wrapper** (`CarouselWrapper`, `FeatureCardsCarouselWrapper`) | Server shell: `ClientComponentWrapper` + client child + `ReactSection` — **entry point duy nhất** cho App, API render, Elementor |
| **`ReactSection`** | Embeds props JSON: `<script data-rct="camelKey" type="application/json">` |
| **`components/ui/`** | shadcn primitives — import only; **not** in server/client registries |

**Default to server.** Add `"use client"` only on the smallest subtree that needs it — never on a whole nav/section if checkbox + CSS suffices.

**Client + wrapper:** File `"use client"` **không** mount trực tiếp trong `App.tsx`, `eai_rc_render_html`, hay page fixture — luôn qua `*Wrapper.tsx` server.

## File & folder layout

```
src/components/<feature-kebab>/
  Feature.tsx             # client island — "use client" khi cần
  FeatureWrapper.tsx      # server entry — bắt buộc nếu Feature là client
  SubPart.tsx             # split when orchestration grows (see header/)
src/data/<wrapper-kebab>.ts     # mock/CMS props + version.json (canonical)
src/data/<client-kebab>.ts      # chỉ khi có client: re-export props cho client registry (xem bên dưới)
```

**Data file naming (`version.json`):** `scripts/generate-version-json.ts` duyệt mọi `src/data/*.ts` → map `kebab` → PascalCase → server registry. Mỗi file data = một dòng `components.{Name}` trong `version.json` (WordPress cache theo tên đó).

- Server-only component → `src/data/<component-kebab>.ts` (vd. `design-consultation-cta.ts` ↔ `DesignConsultationCta`).
- Cặp **client + wrapper** → **file data chính đặt theo tên wrapper**: `carousel-wrapper.ts`, `feature-cards-carousel-wrapper.ts` (↔ `CarouselWrapper`, `FeatureCardsCarouselWrapper`). **Không** đặt mock/CMS chính trong file trùng tên client nếu chỉ wrapper được gọi từ bên ngoài.
- **Quy tắc “data chính” (bắt buộc):** khi tạo data mới hoặc sửa data cho feature có wrapper/client, **luôn** cập nhật ở `src/data/<wrapper-kebab>.ts` trước. `src/data/<client-kebab>.ts` chỉ dùng cho hydrate discovery và phải **re-export** từ data chính (không tự tạo dữ liệu riêng).
- **Wrapper không tự “thêm data”:** `*Wrapper.tsx` chỉ là server entry để bọc `ClientComponentWrapper` + render client + `ReactSection`. Wrapper **không được**:
  - tạo “wrapper-only fields” không nằm trong model mà client component export/expect
  - normalize/merge “ngầm” làm thay đổi shape so với data chính, trừ khi đó là logic render thuần (className, early return, compose JSX)

- Client registry (`discover-client-components.ts`) vẫn cần `src/data/<client-kebab>.ts` (vd. `carousel.ts` ↔ `Carousel.tsx`). File này có thể **chỉ re-export** từ wrapper data:

```ts
// src/data/carousel.ts — hydrate discovery
import type { CarouselModel } from "@/components/carousel/Carousel";
import carouselWrapper from "./carousel-wrapper";
export default carouselWrapper satisfies CarouselModel;
```

- One feature per folder (`header/`, `carousel/`, `process-section/`, `footer/`).
- **Do not** add parallel `FooMobile.tsx` / `FooDesktop.tsx` — one tree, responsive Tailwind.
- **Do not** edit `src/generated/*` — run `bun run generate`.

## Một component mỗi file TSX

**Bắt buộc:** mỗi file `*.tsx` trong `src/components/` (trừ `ui/`) chỉ chứa **một** React component (default export). Không đặt component con (`FooCard`, `FooModal`, …) trong cùng file với orchestrator/grid.

| Được phép trong file | Không được (phải tách file `.tsx` riêng) |
|----------------------|------------------------------------------|
| Hàm helper / `renderXxx()` **không** phải component | Component React thứ hai (`const Bar = () => …`) |
| Map icon, guard, `cn()`, type-only | Sub-component JSX tái sử dụng (`FeatureCard`, `FeatureModal`, …) |

**Do:** `FeatureGrid.tsx` + `FeatureGridCard.tsx` (vd. [`customer-testimonials/`](../../../src/components/customer-testimonials/): `CustomerTestimonialsGrid` + `CustomerTestimonialsCard`).

**Avoid:** `CustomerTestimonialsGrid.tsx` vừa export grid vừa khai báo `CustomerTestimonialsCard` trong cùng file — tách `CustomerTestimonialsCard.tsx`.

## Chia nhỏ component (feature lớn)

Khi một section có **nhiều vùng UI** (nhiều cột, hàng, khối lặp lại) hoặc file TSX **sắp vượt ~150–200 dòng**, tách thành **một thư mục feature** với orchestrator mỏng — không nhồn hết markup vào một file.

**Tham chiếu:** [`header/`](../../../src/components/header/) (`Header` compose `HeaderTop`, `HeaderInner`, `HeaderMenu`, …), [`footer/`](../../../src/components/footer/) (khi có: `Footer` → `FooterTop` / `FooterBottom` + leaf).

```
src/components/<feature>/
  Feature.tsx           # orchestrator — default export, entry App / API / Elementor
  FeatureSection.tsx    # vùng layout (vd. FooterTop, FooterBottom)
  FeaturePart.tsx       # leaf / khối tái sử dụng (vd. FooterLinkColumn)
```

| Vai trò | Trách nhiệm |
|---------|-------------|
| **Orchestrator** (`Feature.tsx`) | Shell semantic (`<footer>`, `<section>`), `className`, compose con; **không** markup dài |
| **Section** | Một hàng / vùng grid (`FooterTop`, `FooterBottom`) |
| **Leaf** | Một cột menu, logo strip, embed slot — props tối thiểu |

**Model:** mỗi file con export `PartNameModel`; orchestrator export `FeatureModel` **compose** (`{ top, bottom }` hoặc `{ headerTop, headerMenu, … }`). Data canonical **một file** `src/data/<feature-kebab>.ts` — aggregate toàn bộ, **không** tạo `footer-brand.ts` riêng trừ khi part được mount độc lập từ App/API.

**Mount từ bên ngoài:** chỉ orchestrator (vd. `<Footer />`, `<Header />`). Sub-component **không** gọi trong `App.tsx` / `eai_rc_render_html` trừ khi có widget/data riêng (như `HeaderMenu` có `header-menu.ts`).

**Khi nào một file đủ:** section đơn giản, **một** component duy nhất (một CTA, một carousel qua wrapper). Helper thuần (không phải component) có thể ở cùng file.

**Tránh:** tách theo breakpoint (`FooMobile.tsx`); gom nhiều component vào một file (vi phạm [Một component mỗi file TSX](#một-component-mỗi-file-tsx)).

## Props & types

**Preferred pattern** — single model object, destructure inside:

```tsx
export interface ProcessSectionModel {
  className?: string;
  steps: { id: number; title: string }[];
}

const ProcessSection = (model: ProcessSectionModel) => {
  const { className, steps } = model;
  // ...
};

export default ProcessSection;
```

Rules:

- Export `ComponentNameModel` (or `ComponentNameProps` for thin wrappers) next to the component.
- Reuse nested models via `import type` (`MediaModel`, `LinkModel`, …) — do not duplicate field shapes.
- Use `import type { … }` (verbatimModuleSyntax).
- Optional fields: `className?: string` on models that accept layout overrides.
- Spread child models: `<Media {...backgroundImage} className="…" />`, `<Header {...header} />`.
- Early return for empty data: `if (slides.length === 0) return null;`

## Styling

- **Tailwind CSS v4** utilities. Breakpoint: **`md` = 768px** (`max-md:` mobile, `md:` desktop).
- Merge classes with `cn()` from `@/lib/utils` — especially when merging prop `className`.
- Add **semantic hooks** alongside utilities: `process-section`, `header-menu-link`, `component-*`. Enables custom CSS later without Tailwind-only selectors.
- Icons: **lucide-react** (`Menu`, `ChevronDownIcon`, …).
- shadcn (`Button`, `Input`, …): reuse existing `components/ui/*`; do not add Sheet/Collapsible/Radix toggles for simple show/hide (use checkbox + CSS per css-first skill).
- CMS HTML fields (`introContent`, WYSIWYG text): `dangerouslySetInnerHTML={{ __html: … }}` on a semantic wrapper with a stable class.
- Custom CSS (keyframes, semantic overrides): put in `src/styles.css` (project-wide). Prefer namespaced animation names + a stable utility class, and disable motion for accessibility via `motion-reduce:animate-none`.

**Verbatim snippet (user-provided):**

```css
animation-name: stretch;
animation-duration: 1s;
animation-timing-function: ease-in-out;
animation-direction: reverse;
animation-iteration-count: infinite;
animation-play-state: running;

@keyframes
0% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    /* transform: scale(1); */
}
50% {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
}
100% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
}
```

**Recommended shape in api-rc:** define `@keyframes <component>-stretch` + `.animate-<component>-stretch` in `src/styles.css`, then apply it on the CTA link/button (plus `motion-reduce:animate-none`).

## SEO markup

Widget SSR = HTML cho crawler. Chi tiết: [react-seo-markup.mdc](../../rules/react-seo-markup.mdc).

- **Landmark:** orchestrator dùng `<header>`, `<footer>`, `<section>`, `<nav>`, `<article>` khi khớp vai trò — không bọc cả widget chỉ bằng `div`.
- **Heading:** một `<h1>` trên trang → `PageTitleBar` only; section widget → `<h2>`; card/cột → `<h3>`; không nhảy cấp.
- **Link / ảnh / list:** `Link` + `LinkModel`; `Media` + `alt`; nhóm link → `ul`/`ol` + `li`.
- **Nav:** `<nav aria-label="…">`; icon trang trí `aria-hidden`; nút icon-only `aria-label`.

## Shared building blocks

| Component | Use for |
|-----------|---------|
| `Link` | `<a>` with `url`, `is_external`, `nofollow` |
| `Media` | `<img>` (+ optional `Link` wrap), `display_dimensions`, `srcSet` |
| `ClientComponentWrapper` | Marks SSR→hydrate boundary (HTML comment markers) |
| `ReactSection` | Serializes props for client hydration |

## Client component checklist

When a component needs `"use client"`:

1. Tạo **server** `FeatureWrapper.tsx` (không `"use client"`) — đây là export dùng trong App / API / Elementor.
2. Tạo `src/data/<wrapper-kebab>.ts` — mock/CMS **canonical** (vd. `feature-cards-carousel-wrapper.ts`); export default hoặc camelCase khớp wrapper PascalCase.
3. Tạo `src/data/<client-kebab>.ts` — **bắt buộc** cho client registry; thường re-export từ wrapper data (xem mục File layout).
4. Wrapper composes:

```tsx
const FeatureWrapper = (model: FeatureModel) => (
  <ClientComponentWrapper className={cn("feature-root", model.className)}>
    <Feature {...model} />
    <ReactSection type="featureCamelCase" data={model} />
  </ClientComponentWrapper>
);
```

Wrapper rule: `model` truyền vào `Feature` và `ReactSection` phải là **data chính** (canonical) — không tạo object khác với field “lạ”. Nếu cần reshape/derive, hãy đưa vào **model/type** của client component và cập nhật **data chính** tương ứng.

5. `ReactSection` `type` = camelCase **client** file (`Feature.tsx` → `feature`), khớp `rctKey` trong `client-registry.ts` — **không** dùng tên wrapper.
6. Regenerate: `bun run generate:server-registry`, `scripts/generate-client-registry.ts`, `generate:version-json` (qua `bun run build` / copy).

Discovery (`discover-client-components.ts`): quét `"use client"` (trừ `ui/`), cần `src/data/<client-kebab>.ts` — **không** quét wrapper.

## Server registry

All `.tsx` under `src/components/` (except `ui/`, `ClientComponentWrapper`, `ReactSection`, `client-components`) auto-register via `bun run generate:server-registry`. Default export → key = filename; named exports → key = export name.

## Imports

```tsx
import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
```

Path aliases: `@/*` → `src/*`, `@components/*` → `src/components/*`.

## Composition patterns

- **Orchestrator** (`Header.tsx`, `Footer.tsx`): composes sub-components; owns cross-cutting state (e.g. overlay checkbox). Giữ file **mỏng** — xem [Chia nhỏ component](#chia-nhỏ-component-feature-lớn).
- **Section / leaf trong feature folder** (`HeaderMenu.tsx`, `FooterLinkColumn.tsx`): một trách nhiệm UI; model riêng; import type từ sibling.
- **Leaf shared** (`Media.tsx`, `Link.tsx`): `src/components/<name>/` — dùng chéo feature, không sub-folder trừ khi cần.
- **Render helpers** inside file (`renderMenuDropdownBody`) — private functions, not exported, when logic is file-local và chưa đủ lớn để tách file.
- **Icon maps**: `Record<IconKey, LucideIcon>` + resolver function (see `ProcessSection`, `ProjectMetaBar`).

## Avoid

| Do not | Do instead |
|--------|------------|
| Mount client component trực tiếp (`<Carousel />`, `<FeatureCardsCarousel />` trong App/API) | `<CarouselWrapper />`, `<FeatureCardsCarouselWrapper />` |
| Mock/CMS data chỉ trong `src/data/<client>.ts` khi có wrapper | Data chính trong `src/data/<wrapper-kebab>.ts`; client data re-export nếu cần registry |
| `"use client"` on entire layout | Server shell + minimal client island |
| Duplicate DOM for breakpoints | One node + responsive classes ([css-first skill](../css-first-responsive-ui/SKILL.md)) |
| Nhiều component React trong một file TSX | Một file một component ([Một component mỗi file TSX](#một-component-mỗi-file-tsx)) |
| Một file TSX >~200 dòng với nhiều vùng UI | Tách folder feature + orchestrator + section/leaf ([Chia nhỏ component](#chia-nhỏ-component-feature-lớn)) |
| Mount `FooterBrand` / `HeaderMenu` trực tiếp trong App khi chỉ cần cả footer/header | Chỉ mount orchestrator (`Footer`, `Header`) |
| Inline prop destructuring in signature (inconsistent) | `(model: XxxModel)` unless matching an existing wrapper pattern |
| New Radix/shadcn for simple toggle | Checkbox + `peer` / `group-hover` |
| Edit `src/generated/*` | `bun run generate` |
| New tests/docs unless asked | Focused component change only |
| Secrets or env in component files | Keep in data/server config |

## New component workflow

```
- [ ] Read neighbors in feature folder
- [ ] Choose server vs client (server default)
- [ ] Add ComponentName.tsx + export ComponentNameModel — **một component mỗi file**; leaf (card, modal, …) → file `.tsx` riêng
- [ ] Feature lớn / nhiều vùng UI? → tách orchestrator + section/leaf trong cùng folder (không duplicate mobile/desktop)
- [ ] Client? → Wrapper + `src/data/<wrapper-kebab>.ts` (+ `src/data/<client-kebab>.ts` re-export nếu cần hydrate)
- [ ] Server-only? → `src/data/<component-kebab>.ts`
- [ ] Semantic classes + cn() for className merges
- [ ] Landmark + heading level + Media/Link/nav theo react-seo-markup.mdc
- [ ] Wire vào `src/components/App.tsx` (khi có data demo trong `src/data/`) hoặc parent orchestrator nếu phù hợp
  - Mặc định: section mới mount trong `App.tsx` **ngay sau `HeroSection`** (trừ khi component chỉ dùng qua API/Elementor hoặc thuộc flow khác)
- [ ] bun run generate (if new export or client component)
- [ ] bun run typecheck
- [ ] New convention? → update this skill (and css-first / HEADER.md if relevant)
```

## Quick reference — client + wrapper

| Client | Wrapper (API / App) | Data canonical (version.json) | Client data (registry) |
|--------|---------------------|-------------------------------|-------------------------|
| `Carousel` | `CarouselWrapper` | `carousel-wrapper.ts` | `carousel.ts` (re-export) |
| `FeatureCardsCarousel` | `FeatureCardsCarouselWrapper` | `feature-cards-carousel-wrapper.ts` | `feature-cards-carousel.ts` (re-export) |
| `TableOfContents` | `TableOfContentsWrapper` | `table-of-contents-wrapper.ts` | `table-of-contents.ts` (re-export) |
| `CustomerTestimonialsGrid` | `CustomerTestimonialsWrapper` | `customer-testimonials-wrapper.ts` | `customer-testimonials-grid.ts` (re-export) |
| `VideoHeroBanner` | `VideoHeroBannerWrapper` | `video-hero-banner-wrapper.ts` | `video-hero-banner.ts` (re-export) |

## Quick reference — header stack

Files: `Header`, `HeaderInner`, `HeaderTop`, `HeaderMenu`, `HeaderSearch`, `AutocompleteSearch`.  
Data: `src/data/header.ts` aggregates sub-data; `autocomplete_search` lives on `HeaderModel`.

## Quick reference — footer stack (feature lớn)

Files: `Footer` (orchestrator) → `FooterTop` / `FooterBottom` → `FooterLinkColumn`, `FooterPaymentMethods`, `FooterSocial`, `FooterBrand`, `FooterContact`, `FooterFanpages`.  
Data: `src/data/footer.ts` — `{ top, bottom }` aggregate; chỉ `Footer` mount từ App/API.  
Màu: theo [Brand colors](#brand-colors-ichouse) — `bg-brand-navy`, `text-brand-gold`, `hover:text-brand-gold-hover`, v.v.

## Quick reference — fields of activity (server)

Section lĩnh vực hoạt động: accordion CSS trái + 2 ảnh grayscale phải + CTA. **Server-only** — checkbox độc lập (`defaultOpen` → `defaultChecked`), không Wrapper/client.

| File | Vai trò |
|------|---------|
| `FieldsOfActivity.tsx` | Orchestrator: `<section>` + h2 + grid + CTA + scroll island |
| `FieldsOfActivityAccordionItem.tsx` | Leaf: checkbox + title/icon/chevron + content HTML |
| `FieldsOfActivityImages.tsx` | Leaf: 2 ảnh `flex` + `gap-5`, grayscale → color hover |
| `FieldsOfActivityScrollReveal.tsx` | `"use client"` — IntersectionObserver → `data-in-view` |
| `src/data/fields-of-activity.ts` | Mock / CMS (`FieldsOfActivity` registry) |
| `src/data/fields-of-activity-scroll-reveal.ts` | Client registry (re-export `targetId`) |

**Model:**

```ts
export interface FieldsOfActivityItemModel {
  title: string;
  contentHtml: string;
  iconImage?: MediaModel;   // hiện phía trên title khi mở
  defaultOpen?: boolean;
}

export interface FieldsOfActivityModel {
  className?: string;
  title: string;            // → <h2>
  items: FieldsOfActivityItemModel[];
  images: MediaModel[];     // tối đa 2
  buttonLabel: string;
  buttonLink: LinkModel;
}
```

**UI:** container `max-w-7xl`, không nền; title `text-2xl md:text-3xl`; accordion title/chevron `text-brand-navy` → gold hover/open; icon absolute trái phía trên title khi mở; content `text-base text-brand-navy` + `ul/li` disc; CTA `bg-brand-navy border-brand-navy text-brand-white` — hover `bg-brand-white text-brand-navy`; ảnh phải cùng hàng mọi breakpoint; slide-in 1.25s (trái/phải) qua `FieldsOfActivityScrollReveal`.

**Semantic classes:** `fields-of-activity`, `fields-of-activity-title`, `fields-of-activity-accordion`, `fields-of-activity-item`, `fields-of-activity-item-trigger`, `fields-of-activity-item-title`, `fields-of-activity-item-icon`, `fields-of-activity-item-chevron`, `fields-of-activity-item-content`, `fields-of-activity-images`, `fields-of-activity-image`, `fields-of-activity-button`.

**Mount:** `pages/construction/page.tsx` (sau AboutIntro); preview App tùy chọn.

**WordPress:** widget `EAI-fields-of-activity` — title, repeater items (`content_html`, `icon_image`, `default_open`), `image_1`/`image_2`, CTA, `scroll_reveal_target_id` → `eai_rc_render_html('FieldsOfActivity', …)`.

## Quick reference — construction highlights (server + scroll reveal island)

Section điểm nổi bật: nền `bg-brand-navy`, subtitle + `titleHtml`, accordion CSS trái (icon luôn bên trái title) + 1 ảnh phải. **Server-only** accordion — checkbox độc lập (`defaultOpen` → `defaultChecked`), không Wrapper cho accordion; chỉ island scroll reveal.

| File | Vai trò |
|------|---------|
| `ConstructionHighlights.tsx` | Orchestrator: `<section>` navy + header + grid + scroll island |
| `ConstructionHighlightsAccordionItem.tsx` | Leaf: checkbox + icon trái + title ~40px + content HTML (grid-rows animate) |
| `ConstructionHighlightsScrollReveal.tsx` | `"use client"` — IntersectionObserver → `data-in-view` |
| `src/data/construction-highlights.ts` | Mock / CMS (`ConstructionHighlights` registry) |
| `src/data/construction-highlights-scroll-reveal.ts` | Client registry (re-export `targetId`) |

**Model:**

```ts
export interface ConstructionHighlightsItemModel {
  title: string;
  contentHtml: string;
  iconImage?: MediaModel;   // luôn hiện bên trái title
  defaultOpen?: boolean;
}

export interface ConstructionHighlightsModel {
  className?: string;
  subtitle: string;            // ~14px uppercase text-brand-white/70
  titleHtml: string;           // ~24px → <h2>; highlight via HTML (text-brand-gold)
  items: ConstructionHighlightsItemModel[];
  image: MediaModel;           // 1 ảnh phải
  checkboxIdPrefix?: string;
  scrollReveal?: { targetId?: string }; // default "construction-highlights"
}
```

**UI:** full-bleed `bg-brand-navy`; inner `max-w-7xl`; subtitle `text-[14px]`; title `text-2xl text-brand-white`; accordion title `text-2xl md:text-[40px]`, closed `opacity-50`, open `opacity-100`; content `text-base text-justify text-brand-white`; open/close `grid-rows-[0fr]→[1fr]`; không CTA/chevron. Slide-in 1.25s (header+accordion trái, media phải) qua `ConstructionHighlightsScrollReveal` + CSS trong `styles.css`.

**Semantic classes:** `construction-highlights`, `construction-highlights-inner`, `construction-highlights-header`, `construction-highlights-subtitle`, `construction-highlights-title`, `construction-highlights-body`, `construction-highlights-accordion`, `construction-highlights-item`, `construction-highlights-item-trigger`, `construction-highlights-item-title`, `construction-highlights-item-icon`, `construction-highlights-item-content`, `construction-highlights-media`, `construction-highlights-image`.

**Mount:** `pages/construction/page.tsx` (sau FieldsOfActivity).

**WordPress:** widget `EAI-construction-highlights` — `subtitle`, `title_html` (WYSIWYG), repeater items (`content_html`, `icon_image`, `default_open`), `image`, `scroll_reveal_target_id` → `eai_rc_render_html('ConstructionHighlights', …)`. Helper: `construction-highlights.php`.

## Quick reference — about intro (server + scroll reveal island)

Section intro 2 cột (text trái / ảnh phải), nền `Media` + overlay kiểu ProcessSection. Inner copy+ảnh luôn `max-w-7xl` (nền vẫn full-bleed). Slide-in khi scroll qua client monitor nhỏ (pattern ConstructionHeaderScrollMonitor).

| File | Vai trò |
|------|---------|
| `AboutIntro.tsx` | Server entry: `<section>` + nền/overlay + copy + media + island |
| `AboutIntroScrollReveal.tsx` | `"use client"` — IntersectionObserver → `data-in-view` |
| `src/data/about-intro.ts` | Mock / CMS canonical (`AboutIntro` registry) |
| `src/data/about-intro-scroll-reveal.ts` | Client registry (re-export `targetId` từ about-intro) |

**Model:**

```ts
export interface AboutIntroModel {
  className?: string;
  backgroundMobileImage: MediaModel;  // fallback <img>
  backgroundDesktopImage: MediaModel; // <source media="(min-width: 768px)">
  image: MediaModel;
  subtitle: string;            // gold, uppercase → <h1> (tiêu đề chính trang khi không PageTitleBar)
  descriptionHtml: string;     // WYSIWYG
  buttonLabel: string;
  buttonLink: LinkModel;       // ghost: border + text brand-white
  scrollReveal?: { targetId?: string }; // default "about-intro"
}
```

**UI:** nền `<picture>` (art-direction mobile/desktop, pattern PageBackground); overlay `bg-brand-navy/65` + gradient; description font lớn (`text-lg` → `lg:text-2xl`); CTA ghost trắng — hover `bg-brand-white` + `text-brand-navy`. Semantic: `about-intro`, `about-intro-copy`, `about-intro-media`, `about-intro-subtitle`, `about-intro-description`, `about-intro-button`, `about-intro-background-picture`, `about-intro-background-image`. `.about-intro-inner` luôn `mx-auto w-full max-w-7xl` (không co nền).

**Background guards:** cả hai `url` trim rỗng → không render nền. Chỉ một phía → vẫn render; `source` chỉ khi có `backgroundDesktopImage.url`. Desktop `srcSet` = `backgroundDesktopImage.srcSet` hoặc `url`.

**Animation:** CSS trong `styles.css` — copy từ trái, media từ phải; `[data-in-view=true]`; `prefers-reduced-motion` hiện ngay. Duration slide-in `1.2s`.

**Mount:** `App.tsx` ngay sau `HeroSection`.

**SEO:** `subtitle` → `<h1>` khi AboutIntro là tiêu đề chính trang (không `PageTitleBar` trên cùng view) — giống ngoại lệ Page Hero.

**WordPress:** widget `EAI-about-intro` — MEDIA nền mobile/desktop (+ resolution), ảnh nội dung (+ resolution), subtitle, WYSIWYG `description_html`, CTA URL, `scroll_reveal_target_id` → `eai_rc_render_html('AboutIntro', …)`. Helper fallback: widget cũ chỉ có `background_image` → map sang cả mobile + desktop. `eai_rc_map_media_model` gắn `srcSet`/`sizes` khi có attachment id.

## Quick reference — hero section (server)

Banner hero: nền ảnh + overlay, subtitle, title, HTML tùy chọn, CTA. **Server-only** — không Wrapper/client.

| File | Vai trò |
|------|---------|
| `HeroSection.tsx` | `<section>` + stage + content |
| `src/data/hero-section.ts` | Mock / CMS (`HeroSection` registry) |

**Model (bổ sung layout):**

```ts
export type HeroSectionTitleHeading = "h1" | "h2";
export type HeroSectionButtonVariant = "default" | "yellow";

export interface HeroSectionModel {
  // ...backgroundImage, subtitle, title, htmlText?, buttonLabel, buttonLink
  titleHeading?: HeroSectionTitleHeading; // default "h1"
  contentCentered?: boolean;              // default false — text-center + flex justify
  contentFullWidth?: boolean;             // default false — bỏ max-w-xl, w-full
  buttonVariant?: HeroSectionButtonVariant; // default | yellow — cùng brand-gold / brand-gold-hover
}
```

**Button variant:** `default` và `yellow` — `bg-brand-gold` / `hover:bg-brand-gold-hover`, chữ `text-brand-white`; class `hero-section-button--yellow` giữ hook CSS.

**Layout:** mặc định `.hero-section-content` có `max-w-xl`; `contentFullWidth` → `w-full` + `hero-section-content--full-width` (không `max-w-xl`). Inner vẫn `max-w-7xl` (container trang).

**SEO:** `h1` khi hero là tiêu đề chính trang (không `PageTitleBar`); `h2` khi trang có Page Title Bar — xem `react-seo-markup.mdc` (Page Hero exception).

**Typography:** subtitle / htmlText / button dùng `text-base` — không `text-sm`.

**WordPress:** widget `EAI-hero-section` — `title_heading`, `content_centered`, `content_full_width`, `button_variant` → `titleHeading`, `contentCentered`, `contentFullWidth`, `buttonVariant`.

## Quick reference — page background (server)

Nền toàn trang `fixed` viewport (wallpaper), ảnh mobile/desktop qua `<picture>`. **Server-only** — không Wrapper/client, không overlay.

| File | Vai trò |
|------|---------|
| `PageBackground.tsx` | `fixed inset-0` + `<picture>` |
| `src/data/page-background.ts` | Mock / CMS (`PageBackground` registry) |

**Model:**

```ts
export interface PageBackgroundModel {
  className?: string;
  mobileImage: MediaModel;   // fallback <img>
  desktopImage: MediaModel;  // <source media="(min-width: 768px)">
}
```

**Render guards:** cả hai `url` trim rỗng → `return null`. Chỉ một phía → vẫn render; `source` chỉ khi có `desktopImage.url`.

**UI:** `pointer-events-none`, `aria-hidden`, `-z-10`, `object-cover`. `alt=""` (decorative). Desktop `srcSet` = `desktopImage.srcSet` hoặc `url`.

**Semantic classes:** `page-background`, `page-background-picture`, `page-background-image`.

**Mount:** preview `pages/construction/page.tsx` (đầu trang); không mặc định trong `App.tsx`.

**WordPress:** widget `EAI-page-background` — MEDIA `mobile_image` / `desktop_image` (+ resolution) → `eai_rc_render_html('PageBackground', …)`.

## Quick reference — video hero banner (client + wrapper)

Hero full viewport (`h-dvh`) nền video HLS (`.m3u8`) + poster SSR. **Client + wrapper** — mount qua `VideoHeroBannerWrapper`, không mount `VideoHeroBanner` trực tiếp. Không title/CTA.

| File | Vai trò |
|------|---------|
| `VideoHeroBanner.tsx` | `"use client"` — `<video>` + `hls.js` / Safari native HLS |
| `VideoHeroBannerWrapper.tsx` | Server entry: `<section>` + poster `Media` + overlay + `type="videoHeroBanner"` |
| `src/data/video-hero-banner-wrapper.ts` | Mock / CMS canonical |
| `src/data/video-hero-banner.ts` | Re-export cho client registry |

**Model:**

```ts
export interface VideoHeroBannerModel {
  className?: string;
  url: string;        // .m3u8
  poster: MediaModel;
}
```

**Render guards (wrapper):** `!url.trim()` hoặc `!poster.url.trim()` → `return null`.

**Behavior:** Safari → `video.src`; else `hls.js`. `autoPlay` `muted` `loop` `playsInline`. Video `opacity-0` → `opacity-100` khi `canplay`/`playing`. Poster SSR nằm dưới. Overlay `.video-hero-banner-overlay` trong `styles.css` (gradient top fade).

**Semantic classes:** `video-hero-banner`, `video-hero-banner-poster`, `video-hero-banner-overlay`, `video-hero-banner-video-root`, `video-hero-banner-video`.

## Quick reference — page title bar (server)

Thanh tiêu đề trang: title trái, breadcrumb phải, nền xám nhạt, `border-b`. **Server-only** — không Wrapper/client.

| File | Vai trò |
|------|---------|
| `PageTitleBar.tsx` | Orchestrator: `<section>`, flex title + breadcrumb |
| `PageTitleBarBreadcrumb.tsx` | Leaf: levels, separators, `Link` |
| `src/data/page-title-bar.ts` | Mock / CMS (`PageTitleBar` registry) |

**Model:**

```ts
export interface PageTitleBarBreadcrumbItemModel {
  label: string;
  link: LinkModel; // cùng pattern RelatedPostList / FooterLinkColumn
}

/** Một cấp breadcrumb — nhiều item cùng cấp nối bằng " - " */
export interface PageTitleBarBreadcrumbLevelModel {
  items: PageTitleBarBreadcrumbItemModel[];
}

export interface PageTitleBarModel {
  className?: string;
  title: string;
  breadcrumbLevels: PageTitleBarBreadcrumbLevelModel[];
}
```

**Separator (chỉ text, `aria-hidden`, không link):**

- Giữa **cấp** (`breadcrumbLevels`): ` / `
- Giữa **item trong cùng cấp**: ` - `
- Ví dụ: `Home / Chung cư - Thi công chung cư - Thiết kế chung cư`

**UI:** title `text-brand-gold font-bold uppercase`; breadcrumb `text-brand-navy/70`; bar `border-b border-brand-white-hover`. Layout một cây: `flex-col gap-2` mobile, `md:flex-row md:justify-between md:items-center` desktop. `<h1>` title; `<nav aria-label="Breadcrumb">`.

**WordPress (sau):** `title` + `breadcrumbLevels` build trong PHP (post + taxonomy/ancestors), không query trong api-rc — xem [elementor-widget-context](../../rules/elementor-widget-context.mdc).

## Quick reference — project meta bar (server)

Thanh meta dự án: tối đa **4 cột**, mỗi cột **icon Lucide + title** (trên) và **content** (dưới); nền xám cùng họ với `PageTitleBar`. **Server-only** — không Wrapper/client. Thường mount ngay dưới `PageTitleBar` trên trang chi tiết dự án.

| File | Vai trò |
|------|---------|
| `ProjectMetaBar.tsx` | `<section>` + grid + `<dl>`/`<dt>`/`<dd>` |
| `src/data/project-meta-bar.ts` | Mock / CMS (`ProjectMetaBar` registry) |

**Model:**

```ts
export type ProjectMetaBarIconKey =
  | "user-round"
  | "bed-double"
  | "palette"
  | "ruler"; // mở rộng khi cần; fallback UserRound nếu key lạ

export interface ProjectMetaBarColumnModel {
  title: string;
  content: string;
  icon: ProjectMetaBarIconKey;
}

export interface ProjectMetaBarModel {
  className?: string;
  columns: ProjectMetaBarColumnModel[];
}
```

**Render guards:**

- `columns.slice(0, 4)` — không nhận quá 4 cột hiển thị.
- Bỏ cột mà cả `title` và `content` trống (trim); mảng rỗng sau lọc → `return null`.
- Icon: map Lucide giống `ProcessSection` (`Record<ProjectMetaBarIconKey, LucideIcon>`).

**UI:** bar `bg-brand-white-hover/95` (có thể `border-b border-brand-white-hover` khi nối `PageTitleBar`); icon `text-brand-gold` ~`h-4 w-4`; title `font-bold`; content `text-brand-navy`. Inner `max-w-7xl` + padding giống `PageTitleBar`. Grid một cây: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.

**Semantic classes:** `project-meta-bar`, `project-meta-bar-column`, `project-meta-bar-title`, `project-meta-bar-content`.

**WordPress:** widget `EAI-project-meta-bar` — context post; repeater taxonomy + icon; panel taxonomy theo **`post`** (`eai_project_meta_bar_get_post_type_for_controls()`), render validate theo post type bài. PHP map `title` / `content` (≤4 cột). Không `LinkModel`, không query trong component. Plugin: `eai-project-meta-bar.mdc`; skill `eai-rc-elementor-widget`.

## Quick reference — related post list (server)

Danh sách bài viết liên quan: title CMS HTML (optional) + `<ul>` link. **Server-only** — không Wrapper/client. Mount qua widget `EAI-related-posts` hoặc `RelatedPostList` trực tiếp.

| File | Vai trò |
|------|---------|
| `RelatedPostList.tsx` | Root wrapper + title + `<ul>` link |
| `src/data/related-post-list.ts` | Mock / CMS (`RelatedPostList` registry) |

**Model:**

```ts
export interface RelatedPostListModel {
  title?: string; // CMS HTML — render khi có nội dung
  links: { label: string; link: LinkModel }[];
  className?: string; // merge trên root `.related-post-list`
}
```

**Render guards:**

- `links.length === 0` → `return null`.
- Title: chỉ render khi `title` truthy; wrapper `related-post-list-title` + `dangerouslySetInnerHTML`.
- Link: merge `item.link.className` sau class semantic (cho override từ PHP/WP).

**UI:** list `space-y-1 list-disc mb-5`; item `ml-5`; link `text-brand-gold`.

**Semantic classes** (3rd-party CSS — cùng pattern `footer-link-column-*`):

| Node | Class |
|------|-------|
| Root | `related-post-list` |
| Title (CMS HTML) | `related-post-list-title` |
| `<ul>` | `related-post-list-list` |
| `<li>` | `related-post-list-item` |
| `<a>` | `related-post-list-link` |

**WordPress:** widget `EAI-related-posts` — query taxonomy trong PHP (`eai_related_posts_get_rc_props`), không query trong component. Chi tiết model link: rule `wp-link-list-components.mdc`.

## Quick reference — html content (server)

Khối HTML tùy ý từ CMS / WYSIWYG (Elementor, post content, …). **Server-only** — không Wrapper/client.

| File | Vai trò |
|------|---------|
| `HtmlContent.tsx` | Wrapper semantic + `dangerouslySetInnerHTML` |
| `src/data/html-content.ts` | Mock / CMS (`HtmlContent` registry) |

**Model:**

```ts
export interface HtmlContentModel {
  html: string;
  className?: string;
  as?: "article" | "div" | "section"; // default "article"
}
```

**Render guards:**

- `html.trim() === ""` → `return null`.
- Không sanitize trong React — tin nguồn CMS/Elementor đã lọc phía WP (`wp_kses_post`, …).

**UI:** wrapper `html-content entry-content`; merge `className` qua `cn()`.

**Semantic classes:** `html-content`, `entry-content` (typography theme).

**Heading:** không ép cấp — trách nhiệm editor/CMS (tránh `h1` trong widget section; xem react-seo-markup).

**WordPress (sau):** widget `EAI-html-content` — control WYSIWYG map `html` (+ optional `className`, `as`).

## Quick reference — breadcrumb (server)

Breadcrumb inline: tối đa **3 cấp** (2 link + 1 current), separator `»`. Khác `PageTitleBarBreadcrumb` (mọi mục link, ` / ` + ` - `, bar xám). **Server-only** — không Wrapper/client.

| File | Vai trò |
|------|---------|
| `Breadcrumb.tsx` | `<nav>` + link cấp 1–2 + current span |
| `src/data/breadcrumb.ts` | Mock / CMS (`Breadcrumb` registry) |

**Model:**

```ts
export interface BreadcrumbLinkLevelModel {
  label: string;
  link: LinkModel;
  verified?: boolean; // BadgeCheck xanh inline trước label
}

export interface BreadcrumbModel {
  className?: string;
  linkLevels: BreadcrumbLinkLevelModel[]; // max 2
  currentLabel?: string; // cấp 3 — không link
}
```

**Render guards:**

- Lọc `linkLevels` có `label` + `url` trim; `slice(0, 2)`.
- Tổng mục = `linkLevels` hợp lệ + (`currentLabel?.trim()` ? 1 : 0); **0** → `return null`.
- Separator `»` (`breadcrumb-sep`, `aria-hidden`) giữa mọi mục; không thừa đầu/cuối.

**UI:** nav `text-base`; link `text-[#e04622]` `no-underline hover:underline`; current `text-foreground` + `aria-current="location"`. Verified: `BadgeCheck` `text-green-600` trong link.

**Semantic classes:** `breadcrumb`, `breadcrumb-link`, `breadcrumb-current`, `breadcrumb-sep`, `breadcrumb-verified-icon`.

**WordPress (sau):** PHP build `linkLevels` + `currentLabel` từ post/taxonomy; không query trong component.

## Quick reference — image overlay cards grid (server)

Grid card ảnh phủ vuông 1:1, gradient tối đáy, title trắng trên ảnh; flex 2 cột mobile / 3 cột tablet, `justify-center` cho hàng lẻ. **Server-only** — không Wrapper/client.

| File | Vai trò |
|------|---------|
| `ImageOverlayCardsGrid.tsx` | Orchestrator: `<section>` + `flex flex-wrap justify-center` |
| `ImageOverlayCardsGridCard.tsx` | Leaf: Media absolute + overlay + `<h3>`; link optional |
| `src/data/image-overlay-cards-grid.ts` | Mock / CMS (`ImageOverlayCardsGrid` registry) |

**Model:**

```ts
export interface ImageOverlayCardsGridItemModel {
  image: MediaModel;
  title: string;
  link?: LinkModel; // có url.trim() → Link; không → <article>
}

export interface ImageOverlayCardsGridModel {
  className?: string;
  items: ImageOverlayCardsGridItemModel[];
  gap?: number; // default 24 — width calc card giả định 24px
}
```

**Render guards:** `items.length === 0` → `return null`.

**Layout:** container `style={{ gap }}` (default 24). Card width: `w-[calc((100%-24px)/2)]` mobile, `md:w-[calc((100%-48px)/3)]` tablet+; `shrink-0 grow-0` + `justify-center` căn item lẻ.

**Card UI:** `aspect-square`; `rounded-t-[20px] rounded-b-none`; Media `object-cover` + `group-hover:scale-105`; overlay `bg-gradient-to-t from-black/60 via-black/25 to-transparent`; title `text-[20px] font-bold text-brand-white` absolute bottom center; `cursor-pointer` chỉ khi có link.

**Semantic classes:** `image-overlay-cards-grid`, `image-overlay-cards-grid-card`, `image-overlay-cards-grid-card-media`, `image-overlay-cards-grid-card-image`, `image-overlay-cards-grid-card-overlay`, `image-overlay-cards-grid-card-title`, `image-overlay-cards-grid-card-link`.

**WordPress (sau):** widget repeater `image` + `title` + optional `link`.

## Quick reference — feature cards grid (server)

Grid card giống `FeatureCardsCarouselCard` nhưng đơn giản hơn: luôn `Link`, `description` optional, hover zoom ảnh. **Server-only** — không Wrapper/client.

| File | Vai trò |
|------|---------|
| `FeatureCardsGrid.tsx` | Orchestrator: `<section>` + responsive grid |
| `FeatureCardsGridCard.tsx` | Leaf: ảnh + title + description (khi có) |
| `src/data/feature-cards-grid.ts` | Mock / CMS (`FeatureCardsGrid` registry) |

**Model:**

```ts
export type FeatureCardsGridCardLayout = "stack" | "media-left";

export interface FeatureCardsGridItemModel {
  image: MediaModel;
  title: string;
  description?: string;
  link: LinkModel;
  layout?: FeatureCardsGridCardLayout; // default "stack"
}

export interface FeatureCardsGridModel {
  className?: string;
  items: FeatureCardsGridItemModel[];
  columnsTablet?: number;  // default 2 — md breakpoint
  columnsDesktop?: number; // default 3 — lg breakpoint
  gap?: number;            // default 16 (px)
}
```

**Render guards:**

- `items.length === 0` → `return null`.
- Description: chỉ render khi `description?.trim()` truthy.
- Card luôn bọc `Link` — không fallback `<article>`.

**Responsive columns:** mobile luôn 1 cột; tablet `md:` (`columnsTablet`); desktop `lg:` (`columnsDesktop`). Dùng lookup map full class string (`md:grid-cols-2`, `lg:grid-cols-3`, …) clamp 1–6 — không template dynamic Tailwind.

**Card layout (`layout` per item):**

- **`stack`** (default): media trên, body dưới — mọi breakpoint.
- **`media-left`**: mobile giống `stack`; từ **`md:`** → `flex-row`, media trái ~38%, ảnh `object-contain` + `object-center` (không crop), media wrapper `bg-neutral-100` khi letterbox; body `p-[5px]`, `text-[15px]`, `text-left`, title `font-normal` (không bold).

**UI:** `stack` — body `p-[10px]`, `text-center`, title `text-lg font-bold`; ảnh `object-cover`, `group-hover:scale-105` trong wrapper `overflow-hidden`. Chung: body `bg-brand-white-hover`, title `text-brand-gold`.

**Semantic classes:** `feature-cards-grid`, `feature-cards-grid-card`, `feature-cards-grid-card--media-left`, `feature-cards-grid-card-media`, `feature-cards-grid-card-image`, `feature-cards-grid-card-body`, `feature-cards-grid-card-title`, `feature-cards-grid-card-description`, `feature-cards-grid-card-link`.

**WordPress (sau):** tái dùng `eai_rc_map_feature_card_from_post` cho `items`; widget riêng nếu cần.

## Quick reference — project showcase (server + client filter island)

Lưới dự án + filter taxonomy. Server `ProjectShowcase` bọc client `ProjectShowcaseFilters` qua `ClientComponentWrapper` + `hydrateData`.

| File | Vai trò |
|------|---------|
| `ProjectShowcase.tsx` | `<section>` + truyền `hydrateData` (gồm `filterColumnsDesktop`) |
| `ProjectShowcaseFilters.tsx` | `"use client"` — grid filter + fetch + grid cards |
| `ProjectShowcaseCard.tsx` | Leaf card dự án |
| `src/lib/project-showcase/types.ts` | Model chung |
| `src/data/project-showcase-filters.ts` | Mock hydrate (`ProjectShowcaseFilters` registry) |
| `src/data/project-showcase.ts` | Re-export → `ProjectShowcase` registry |

**Model (layout filter):**

```ts
export type ProjectShowcaseFilterColumnsDesktop = 3 | 4;

export interface ProjectShowcaseFiltersModel {
  // filterEndpoint, taxonomies, filters, filterOptions, projects
  filterColumnsDesktop?: ProjectShowcaseFilterColumnsDesktop; // default 3
}
```

**Lưới filter (Select):** mobile 1 cột; tablet `md:grid-cols-2` (cố định); desktop `lg:grid-cols-3` | `lg:grid-cols-4` từ `filterColumnsDesktop`. Lookup map full class — không template động Tailwind.

**Lưới cards dự án:** tách khỏi filter — `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` (không đổi theo `filterColumnsDesktop`).

**WordPress:** widget `EAI-project-showcase` — control `filter_columns_desktop` (3|4) → `filterColumnsDesktop` trong `get_rc_props()`; helper `eai_project_showcase_filter_columns_desktop()`.

## Quick reference — customer testimonials (client + wrapper)

Grid thumbnail YouTube + modal iframe khi click. **Client + wrapper** — mount qua `CustomerTestimonialsWrapper`, không mount `CustomerTestimonialsGrid` trực tiếp.

| File | Vai trò |
|------|---------|
| `CustomerTestimonialsGrid.tsx` | `"use client"` — grid + modal state |
| `CustomerTestimonialsCard.tsx` | `"use client"` — thumbnail + nút play (một card) |
| `CustomerTestimonialsWrapper.tsx` | Server entry: `<section>` (không header/padding) + `ClientComponentWrapper` + `type="customerTestimonialsGrid"` |
| `src/data/customer-testimonials-wrapper.ts` | Mock / CMS canonical (`CustomerTestimonialsWrapper` registry) |
| `src/data/customer-testimonials-grid.ts` | Re-export cho client registry |

**Model:**

```ts
export interface CustomerTestimonialsItemModel {
  image: MediaModel;
  youtubeVideoId: string;
}

export interface CustomerTestimonialsModel {
  className?: string;
  items: CustomerTestimonialsItemModel[];
}
```

**Render guards:** lọc item thiếu `youtubeVideoId` hoặc `image.url` trim; `validItems.length === 0` → `return null` (wrapper + grid).

**Grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` (cố định). Card: `button type="button"`, `aspect-video`, `Media` cover, nút play đỏ giữa (`#e62117`), `group-hover:shadow-lg` card + `group-hover:scale-110` nút play.

**Modal:** `activeVideoId` state; iframe `https://www.youtube.com/embed/{id}?autoplay=1` chỉ khi mở; backdrop `bg-brand-navy/50` click đóng; nút `X`; `Escape`; `body` scroll lock.

**Wrapper shell:** `<section class="customer-testimonials mx-auto w-full max-w-7xl">` — không `px-4 py-8`, không title/description SSR (tiêu đề section qua widget khác nếu cần).

**Semantic classes:** `customer-testimonials`, `customer-testimonials-grid`, `customer-testimonials-card`, `customer-testimonials-card-media`, `customer-testimonials-card-play`, `customer-testimonials-modal`, `customer-testimonials-modal-backdrop`, `customer-testimonials-modal-dialog`, `customer-testimonials-modal-close`, `customer-testimonials-modal-iframe`.

**WordPress:** widget `EAI-customer-testimonials` — repeater `image` + YouTube id/URL, `class_name` → map `CustomerTestimonialsModel` (không `title`/`description`).

## Quick reference — table of contents (client + wrapper)

Mục lục anchor với toggle danh sách, scroll offset, và sticky compact bên phải khi scroll qua khối TOC. **Client + wrapper** — mount qua `TableOfContentsWrapper`, không mount `TableOfContents` trực tiếp.

| File | Vai trò |
|------|---------|
| `TableOfContents.tsx` | `"use client"` — UI, IntersectionObserver, scroll anchor |
| `TableOfContentsWrapper.tsx` | Server entry: `ClientComponentWrapper` + `type="tableOfContents"` |
| `src/data/table-of-contents-wrapper.ts` | Mock / CMS canonical (`TableOfContentsWrapper` registry) |
| `src/data/table-of-contents.ts` | Re-export cho client registry |

**Model:**

```ts
export interface TableOfContentsItemModel {
  label: string;
  targetId: string; // DOM id, no #
}

export interface TableOfContentsModel {
  className?: string;
  title: string;
  items: TableOfContentsItemModel[];
  scrollOffset?: number; // default 60
}
```

**States:** `listOpen` (chevron), `isPast` (sentinel observer), `stickyExpanded` (click title khi compact), `activeTargetId` (scroll-spy). `showList = !isPast || stickyExpanded`; chevron ẩn khi sticky compact chưa mở.

**Scroll-spy:** `flattenTargetIds()` DFS theo thứ tự DOM; listener `scroll` + `resize` (RAF-throttle). Heading active khi `getBoundingClientRect().top <= scrollOffset` (default **60px** — khớp anchor click). Không mặc định mục đầu: `activeTargetId` là `undefined` cho đến khi ít nhất một heading vượt offset. Truyền `activeTargetId` xuống list; link active nhận `aria-current="location"`.

**Heights:** inline mở → `ol` `max-h-[500px]`; sticky expanded → `max-h-[100dvh]`. Scroll anchor: `scrollOffset ?? 60`; `prefers-reduced-motion` → `behavior: "auto"`.

**CSS counters:** `counter-reset: List` trên root `.table-of-contents-list`; nested `ol` không reset — `counters(List, ".")` trên `li::before` cho số lồng (`1.`, `2.1.`, …). Bỏ `list-decimal`.

**Branch toggle (css-first):** item có `items` → checkbox `table-of-contents-branch-input` (sr-only, `defaultChecked`) + label chevron trái `table-of-contents-branch-toggle`; nested `ol` `peer-checked/branch:block`. Leaf dùng `pl-5` spacer căn lề. Không auto-mở nhánh khi scroll tới heading con.

**State classes (TSX chỉ gắn modifier; màu active trong `styles.css`):**

| Node | Base | Modifier |
|------|------|----------|
| `nav` | `table-of-contents` | `--sticky-compact`, `--sticky-expanded` |
| `li` | `table-of-contents-item` | `--active`, `--has-children`; open/closed qua `:has(.table-of-contents-branch-input:checked)` |
| `a` | `table-of-contents-link` | `--active` |
| chevron label | `table-of-contents-branch-toggle` | — |
| nested `ol` | `table-of-contents-list` | — |

**Semantic classes:** `table-of-contents`, `table-of-contents-header`, `table-of-contents-title`, `table-of-contents-list`, `table-of-contents-item`, `table-of-contents-link`, `table-of-contents-branch-input`, `table-of-contents-branch-toggle`, `table-of-contents-branch-chevron`, `table-of-contents--sticky-compact`, `table-of-contents--sticky-expanded`.

**Model:** giữ nguyên nested `items`; không thêm field mới.

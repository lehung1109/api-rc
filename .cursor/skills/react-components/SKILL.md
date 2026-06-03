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
5. When styling with brand/accent colors: follow [ichouse-brand-colors.mdc](../../rules/ichouse-brand-colors.mdc) — dùng token `brand-navy` / `brand-gold` / `brand-white`, không thêm hex cam legacy.
6. Run `bun run typecheck` after changes. Run `bun run generate` when adding/removing renderable or client components.

## Brand colors (ICHouse)

**Màu nhận diện:** Xanh Navy `#022B63`, Vàng Gold `#D9A441`, Trắng `#FFFFFF` — định nghĩa trong [`src/styles.css`](../../../src/styles.css).

| Token Tailwind | Vai trò |
|----------------|---------|
| `brand-navy` | Nền tối (footer, header bar), khối brand |
| `brand-gold` | Accent: tiêu đề, link hover, CTA, icon, active |
| `brand-white` | Chữ/icon trên Navy; nền sáng khi cần |

**Code mới:** `text-brand-gold`, `bg-brand-navy`, `hover:text-brand-gold/90`, … — chi tiết trong rule `ichouse-brand-colors.mdc`.

**Legacy trong code cũ:** `#f36f21`, `#f47c20`, `#ff7f2a` — không copy sang component mới; khi sửa có scope đổi màu thì chuyển sang `brand-*`.

Màu trung tính (`#f7f7f7`, `#eeeeee`, `#888888`, `neutral-*`) vẫn OK cho layout; không thay accent thương hiệu.

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

## Quick reference — header stack

Files: `Header`, `HeaderInner`, `HeaderTop`, `HeaderMenu`, `HeaderSearch`, `AutocompleteSearch`.  
Data: `src/data/header.ts` aggregates sub-data; `autocomplete_search` lives on `HeaderModel`.

## Quick reference — footer stack (feature lớn)

Files: `Footer` (orchestrator) → `FooterTop` / `FooterBottom` → `FooterLinkColumn`, `FooterPaymentMethods`, `FooterSocial`, `FooterBrand`, `FooterContact`, `FooterFanpages`.  
Data: `src/data/footer.ts` — `{ top, bottom }` aggregate; chỉ `Footer` mount từ App/API.  
Màu: code cũ dùng `bg-black` + accent cam — code mới theo [Brand colors](#brand-colors-ichouse) (`bg-brand-navy`, `text-brand-gold`, …).

## Quick reference — hero section (server)

Banner hero: nền ảnh + overlay, subtitle, title, HTML tùy chọn, CTA. **Server-only** — không Wrapper/client.

| File | Vai trò |
|------|---------|
| `HeroSection.tsx` | `<section>` + stage + content |
| `src/data/hero-section.ts` | Mock / CMS (`HeroSection` registry) |

**Model (bổ sung layout):**

```ts
export type HeroSectionTitleHeading = "h1" | "h2";

export interface HeroSectionModel {
  // ...backgroundImage, subtitle, title, htmlText?, buttonLabel, buttonLink
  titleHeading?: HeroSectionTitleHeading; // default "h1"
  contentCentered?: boolean;              // default false — text-center + flex justify
}
```

**SEO:** `h1` khi hero là tiêu đề chính trang (không `PageTitleBar`); `h2` khi trang có Page Title Bar — xem `react-seo-markup.mdc` (Page Hero exception).

**Typography:** subtitle / htmlText / button dùng `text-base` — không `text-sm`.

**WordPress:** widget `EAI-hero-section` — `title_heading` (select), `content_centered` (switcher) → `titleHeading`, `contentCentered`.

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

**UI:** title `text-[#f36f21] font-bold uppercase` *(legacy — code mới: `text-brand-gold`)*; breadcrumb `text-sm text-[#888888]`; bar `bg-[#f7f7f7] border-b border-[#eeeeee]`. Layout một cây: `flex-col gap-2` mobile, `md:flex-row md:justify-between md:items-center` desktop. `<h1>` title; `<nav aria-label="Breadcrumb">`.

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

**UI:** bar `bg-[#f7f7f7]` (có thể `border-b border-[#eeeeee]` khi nối `PageTitleBar`); icon `text-[#f36f21]` *(legacy — `text-brand-gold`)* ~`h-4 w-4`; title `font-bold`; content `text-sm`. Inner `max-w-7xl` + padding giống `PageTitleBar`. Grid một cây: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.

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

**UI:** list `space-y-1 list-disc mb-5`; item `ml-5`; link mặc định `text-[#f36f21]` *(legacy — `text-brand-gold`)*.

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

**UI:** `stack` — body `p-[10px]`, `text-center`, title `text-lg font-bold`; ảnh `object-cover`, `group-hover:scale-105` trong wrapper `overflow-hidden`. Chung: body `bg-neutral-100`, title `text-[#f36f21]` *(legacy — `text-brand-gold`)*.

**Semantic classes:** `feature-cards-grid`, `feature-cards-grid-card`, `feature-cards-grid-card--media-left`, `feature-cards-grid-card-media`, `feature-cards-grid-card-image`, `feature-cards-grid-card-body`, `feature-cards-grid-card-title`, `feature-cards-grid-card-description`, `feature-cards-grid-card-link`.

**WordPress (sau):** tái dùng `eai_rc_map_feature_card_from_post` cho `items`; widget riêng nếu cần.

## Quick reference — customer testimonials (client + wrapper)

Grid thumbnail YouTube + modal iframe khi click. **Client + wrapper** — mount qua `CustomerTestimonialsWrapper`, không mount `CustomerTestimonialsGrid` trực tiếp.

| File | Vai trò |
|------|---------|
| `CustomerTestimonialsGrid.tsx` | `"use client"` — grid + modal state |
| `CustomerTestimonialsCard.tsx` | `"use client"` — thumbnail + nút play (một card) |
| `CustomerTestimonialsWrapper.tsx` | Server entry: `<section>` + `<h2>`/`<p>` + `ClientComponentWrapper` + `type="customerTestimonialsGrid"` |
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
  title: string;
  description: string;
  items: CustomerTestimonialsItemModel[];
}
```

**Render guards:** lọc item thiếu `youtubeVideoId` hoặc `image.url` trim; `validItems.length === 0` → `return null` (wrapper + grid).

**Grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` (cố định). Card: `button type="button"`, `aspect-video`, `Media` cover, nút play đỏ giữa (`#e62117`), `group-hover:shadow-lg` card + `group-hover:scale-110` nút play.

**Modal:** `activeVideoId` state; iframe `https://www.youtube.com/embed/{id}?autoplay=1` chỉ khi mở; backdrop `bg-black/50` click đóng; nút `X`; `Escape`; `body` scroll lock.

**Header (SSR trong wrapper):** `<h2>` `text-brand-gold`; `<p>` description `text-neutral-600`; container `max-w-7xl px-4 py-8`.

**Semantic classes:** `customer-testimonials`, `customer-testimonials-header`, `customer-testimonials-title`, `customer-testimonials-description`, `customer-testimonials-grid`, `customer-testimonials-card`, `customer-testimonials-card-media`, `customer-testimonials-card-play`, `customer-testimonials-modal`, `customer-testimonials-modal-backdrop`, `customer-testimonials-modal-dialog`, `customer-testimonials-modal-close`, `customer-testimonials-modal-iframe`.

**WordPress (sau):** widget repeater `image` + YouTube id/URL → map `CustomerTestimonialsModel`.

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

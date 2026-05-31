---
name: react-components
description: >-
  Creates and edits React components in api-rc following model props, server-first
  rendering, ClientComponentWrapper hydration, Tailwind + semantic classes, and
  auto-generated registries. Use when adding, refactoring, or fixing TSX in
  src/components/, wiring client islands, page title bar, project meta bar,
  layered breadcrumb, or when the user asks about component conventions in api-rc. Keeps this skill
  and related docs updated when new project conventions emerge.
---

# React components (api-rc)

## Keep this skill current

Skills are living docs. When you learn or agree on a **new api-rc convention** (with the user or from code), update this file in the **same task** — do not leave skills stale. See [SKILLS-MAINTENANCE.md](../SKILLS-MAINTENANCE.md) for when and how; sync [HEADER.md](../../../src/components/header/HEADER.md) when header rules change.

## Before editing

1. Read sibling files in the same feature folder — match naming, props shape, and styling.
2. For responsive UI (mobile/desktop, overlays, toggles): also read [css-first-responsive-ui](../css-first-responsive-ui/SKILL.md).
3. For header files: read [src/components/header/HEADER.md](../../../src/components/header/HEADER.md).
4. Run `bun run typecheck` after changes. Run `bun run generate` when adding/removing renderable or client components.

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

**Khi nào chưa tách file:** section đơn giản (một CTA, một carousel qua wrapper) — giữ một `Feature.tsx`. Ưu tiên **hàm render private trong file** trước khi tách file mới.

**Tránh:** tách theo breakpoint (`FooMobile.tsx`); tách file chỉ để 5–10 dòng JSX không lặp.

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
- [ ] Add ComponentName.tsx + export ComponentNameModel
- [ ] Feature lớn / nhiều vùng UI? → tách orchestrator + section/leaf trong cùng folder (không duplicate mobile/desktop)
- [ ] Client? → Wrapper + `src/data/<wrapper-kebab>.ts` (+ `src/data/<client-kebab>.ts` re-export nếu cần hydrate)
- [ ] Server-only? → `src/data/<component-kebab>.ts`
- [ ] Semantic classes + cn() for className merges
- [ ] Wire into App.tsx or parent orchestrator if needed
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

## Quick reference — header stack

Files: `Header`, `HeaderInner`, `HeaderTop`, `HeaderMenu`, `HeaderSearch`, `AutocompleteSearch`.  
Data: `src/data/header.ts` aggregates sub-data; `autocomplete_search` lives on `HeaderModel`.

## Quick reference — footer stack (feature lớn)

Files: `Footer` (orchestrator) → `FooterTop` / `FooterBottom` → `FooterLinkColumn`, `FooterPaymentMethods`, `FooterSocial`, `FooterBrand`, `FooterContact`, `FooterFanpages`.  
Data: `src/data/footer.ts` — `{ top, bottom }` aggregate; chỉ `Footer` mount từ App/API.

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

**UI:** title `text-[#f36f21] font-bold uppercase`; breadcrumb `text-sm text-[#888888]`; bar `bg-[#f7f7f7] border-b border-[#eeeeee]`. Layout một cây: `flex-col gap-2` mobile, `md:flex-row md:justify-between md:items-center` desktop. `<h1>` title; `<nav aria-label="Breadcrumb">`.

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

**UI:** bar `bg-[#f7f7f7]` (có thể `border-b border-[#eeeeee]` khi nối `PageTitleBar`); icon `text-[#f36f21]` ~`h-4 w-4`; title `font-bold`; content `text-sm`. Inner `max-w-7xl` + padding giống `PageTitleBar`. Grid một cây: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.

**Semantic classes:** `project-meta-bar`, `project-meta-bar-column`, `project-meta-bar-title`, `project-meta-bar-content`.

**WordPress:** widget `EAI-project-meta-bar` — context post; repeater taxonomy + icon; panel taxonomy theo **`post`** (`eai_project_meta_bar_get_post_type_for_controls()`), render validate theo post type bài. PHP map `title` / `content` (≤4 cột). Không `LinkModel`, không query trong component. Plugin: `eai-project-meta-bar.mdc`; skill `eai-rc-elementor-widget`.

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

**States:** `listOpen` (chevron), `isPast` (sentinel observer), `stickyExpanded` (click title khi compact). `showList = !isPast || stickyExpanded`; chevron ẩn khi sticky compact chưa mở.

**Heights:** inline mở → `ol` `max-h-[500px]`; sticky expanded → `max-h-[100dvh]`. Scroll anchor: `scrollOffset ?? 60`; `prefers-reduced-motion` → `behavior: "auto"`.

**Semantic classes:** `table-of-contents`, `table-of-contents-header`, `table-of-contents-title`, `table-of-contents-toggle`, `table-of-contents-list`, `table-of-contents-link`, `table-of-contents--sticky-compact`, `table-of-contents--sticky-expanded`.

**v1 không có:** scroll-spy active item (`aria-current` trên link) — có thể phase 2.

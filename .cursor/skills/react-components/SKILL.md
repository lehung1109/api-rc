---
name: react-components
description: >-
  Creates and edits React components in api-rc following model props, server-first
  rendering, ClientComponentWrapper hydration, Tailwind + semantic classes, and
  auto-generated registries. Use when adding, refactoring, or fixing TSX in
  src/components/, wiring client islands, or when the user asks about component
  conventions in api-rc. Keeps this skill and related docs updated when new
  project conventions emerge.
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
- Client registry (`discover-client-components.ts`) vẫn cần `src/data/<client-kebab>.ts` (vd. `carousel.ts` ↔ `Carousel.tsx`). File này có thể **chỉ re-export** từ wrapper data:

```ts
// src/data/carousel.ts — hydrate discovery
import type { CarouselModel } from "@/components/carousel/Carousel";
import carouselWrapper from "./carousel-wrapper";
export default carouselWrapper satisfies CarouselModel;
```

- One feature per folder (`header/`, `carousel/`, `process-section/`).
- **Do not** add parallel `FooMobile.tsx` / `FooDesktop.tsx` — one tree, responsive Tailwind.
- **Do not** edit `src/generated/*` — run `bun run generate`.

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

- **Orchestrator** (`Header.tsx`): composes sub-components, owns cross-cutting state (e.g. overlay checkbox).
- **Leaf** (`Media.tsx`, `Link.tsx`): focused, no sub-folder unless justified.
- **Render helpers** inside file (`renderMenuDropdownBody`) — private functions, not exported, when logic is file-local.
- **Icon maps**: `Record<IconKey, LucideIcon>` + resolver function (see `ProcessSection`).

## Avoid

| Do not | Do instead |
|--------|------------|
| Mount client component trực tiếp (`<Carousel />`, `<FeatureCardsCarousel />` trong App/API) | `<CarouselWrapper />`, `<FeatureCardsCarouselWrapper />` |
| Mock/CMS data chỉ trong `src/data/<client>.ts` khi có wrapper | Data chính trong `src/data/<wrapper-kebab>.ts`; client data re-export nếu cần registry |
| `"use client"` on entire layout | Server shell + minimal client island |
| Duplicate DOM for breakpoints | One node + responsive classes ([css-first skill](../css-first-responsive-ui/SKILL.md)) |
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

## Quick reference — header stack

Files: `Header`, `HeaderInner`, `HeaderTop`, `HeaderMenu`, `HeaderSearch`, `AutocompleteSearch`.  
Data: `src/data/header.ts` aggregates sub-data; `autocomplete_search` lives on `HeaderModel`.

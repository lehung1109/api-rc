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
| **Wrapper** (`CarouselWrapper`, `HeaderSearch`) | Server shell: `ClientComponentWrapper` + client child + `ReactSection` |
| **`ReactSection`** | Embeds props JSON: `<script data-rct="camelKey" type="application/json">` |
| **`components/ui/`** | shadcn primitives — import only; **not** in server/client registries |

**Default to server.** Add `"use client"` only on the smallest subtree that needs it — never on a whole nav/section if checkbox + CSS suffices.

## File & folder layout

```
src/components/<feature-kebab>/
  ComponentName.tsx       # PascalCase file, default export same name
  SubPart.tsx             # split when orchestration grows (see header/)
src/data/<component-kebab>.ts   # mock/CMS-shaped props (required for client components)
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

1. Create `src/data/<kebab-name>.ts` exporting camelCase data (e.g. `carousel`, `autocompleteSearch`).
2. Prefer a **server Wrapper** that composes:

```tsx
const FeatureWrapper = (model: FeatureModel) => (
  <ClientComponentWrapper className={cn("feature-root", model.className)}>
    <Feature {...model} />
    <ReactSection type="camelCaseKey" data={model} />
  </ClientComponentWrapper>
);
```

3. `ReactSection` `type` must match `rctKey` in `src/generated/client-registry.ts` (camelCase of component name).
4. Regenerate: `bun run generate`.

Discovery rules (`discover-client-components.ts`): scans `"use client"` files under `src/components/` (excludes `ui/`, wrappers), requires matching `src/data/<pascal-to-kebab>.ts`.

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
- [ ] Add src/data/<kebab>.ts if client or for App fixtures
- [ ] Semantic classes + cn() for className merges
- [ ] Wire into App.tsx or parent orchestrator if needed
- [ ] bun run generate (if new export or client component)
- [ ] bun run typecheck
- [ ] New convention? → update this skill (and css-first / HEADER.md if relevant)
```

## Quick reference — header stack

Files: `Header`, `HeaderInner`, `HeaderTop`, `HeaderMenu`, `HeaderSearch`, `AutocompleteSearch`.  
Data: `src/data/header.ts` aggregates sub-data; `autocomplete_search` lives on `HeaderModel`.

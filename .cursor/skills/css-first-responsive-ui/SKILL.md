---
name: css-first-responsive-ui
description: >-
  Builds responsive UI with one shared DOM tree, Tailwind breakpoints, and
  checkbox/peer/group-hover CSS instead of duplicate mobile components or Radix
  toggles. Use when implementing mobile/desktop layouts, nav menus, overlays,
  drawers, accordions, or when the user asks for CSS-first, no duplicate markup,
  checkbox control, or references HEADER conventions in api-rc.
---

# CSS-first responsive UI

## Core principles (apply in order)

1. **One markup tree** — Same HTML for mobile and desktop. Change layout and behavior with `max-md:` / `md:` utilities, not separate components (`FooMobile`, `FooDesktop`).
2. **CSS before JS** — Prefer `<input type="checkbox" class="sr-only peer">` + `<label htmlFor>` + `peer-checked:` / `group-hover:` before `"use client"`, `useState`, Sheet, Collapsible, or Accordion.
3. **No duplicate DOM** — Never render the same content twice (e.g. two dropdown panels, two search bars) and hide one with `hidden md:block`. One node, responsive classes.
4. **Semantic class hooks** — Add stable `component-*` classes alongside Tailwind so others can override later. Use `cn()` from `@/lib/utils`.
5. **Minimal scope** — Extend existing components; do not add parallel mobile-only files unless unavoidable.

## Decision flow

```
Need show/hide or open/close?
├─ Can checkbox + label + peer/group-hover work? → YES (default)
├─ Needs focus trap, scroll lock, or complex a11y? → Consider Radix/shadcn (justify in PR)
└─ Needs live data / fetch on open? → Client island only around that part; keep shell server-rendered
```

## Checkbox patterns

### Full-screen overlay / drawer

```tsx
<header className="relative">
  <input id="panel-open" type="checkbox" className="peer/panel sr-only" />
  <label htmlFor="panel-open" className="md:hidden">Open</label>
  <div className="max-md:fixed max-md:inset-0 max-md:translate-x-full max-md:peer-checked/panel:translate-x-0 md:contents">
  ...
  </div>
</header>
```

- Open/close: `<label htmlFor="panel-open">` (hamburger, X).
- Desktop: `md:contents` or `md:static` so panel participates in normal layout.

### Submenu per row (one dropdown node)

```tsx
<li className="group relative has-[:checked]:[&_.chevron]:rotate-180">
  <input id="item-0" type="checkbox" className="peer/sub sr-only" />
  <div className="flex">
    <a href="..." className="flex-1">Label</a>
    <label htmlFor="item-0" className="md:pointer-events-none">
      <ChevronIcon className="chevron" />
    </label>
  </div>
  <div className="max-md:hidden max-md:peer-checked/sub:block md:absolute md:group-hover:visible ...">
    {/* single dropdown body — render once */}
  </div>
</li>
```

| Target | Mobile | Desktop |
|--------|--------|---------|
| Primary text | `<a href>` navigates | Same + `li.group` hover zone |
| Chevron | `<label>` toggles checkbox | `md:pointer-events-none`; hover opens menu |
| Panel | `peer-checked/sub:block` | `group-hover:visible` |

**HTML:** Do not nest `<label>` inside `<a>`. Do not duplicate `<a>` for the same label.

### Nested menu data (3 levels, 2 levels of UI)

- One checkbox at **top level** only.
- Flatten deep levels in the panel: level N−1 = **title**, level N = **links** (no nested toggles).

## Responsive rules

- Pick one breakpoint (here: **`md` = 768px**) and use consistently.
- Mobile-first toggles: `max-md:…` for overlay/submenu; `md:…` for desktop hover/row layout.
- Split interaction, not markup: e.g. `md:pointer-events-none` on chevron label, not a second chevron element.

## Avoid

| Do not | Do instead |
|--------|------------|
| `HeaderMobile` / `MenuMobile` duplicate trees | Responsive classes on shared components |
| Sheet/Collapsible for simple open/close | Checkbox + `peer` |
| Two `renderBody()` branches in DOM | One body, responsive wrapper classes |
| `"use client"` on whole nav | Server shell + client only for hydrate/search if needed |
| Separate `<a class="md:hidden">` and `<a class="hidden md:flex">` | One `<a>` + one chevron `<label>` |

## api-rc header (reference implementation)

Before editing header files, read [src/components/header/HEADER.md](src/components/header/HEADER.md).

Files: `Header.tsx`, `HeaderInner.tsx`, `HeaderTop.tsx`, `HeaderMenu.tsx`, `HeaderSearch.tsx`. Data: `autocomplete_search` on `HeaderModel` in `src/data/header.ts`.

## Checklist before finishing

- [ ] DevTools: one dropdown / one search node per logical block
- [ ] Mobile: text navigates; chevron toggles (where specified)
- [ ] Desktop: hover/ layout unchanged; chevron non-interactive if using split tap
- [ ] Semantic `*-` classes added for new nodes
- [ ] `bun run typecheck` passes

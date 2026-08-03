# Project Guidelines

## Project Shape

`api-rc` renders React components to static HTML and API HTML, then hydrates interactive client islands in the browser. It is not a conventional React SPA.

Use `README.md` as the human-facing source of truth for setup, commands, component conventions, and API shape. Keep this file concise and update `README.md` first when project behavior or conventions change.

## Architecture

- `src/components/` contains renderable React components. Files under `src/components/ui/` and helper files such as `ClientComponentWrapper.tsx`, `ReactSection.tsx`, and `client-components.tsx` are excluded from render registries.
- `src/data/` contains sample/model data used for static HTML rendering.
- `src/generated/` contains generated registries. Do not edit files in this directory manually; run the relevant generate script instead.
- `html/` and `dist/` are build outputs. Do not hand-edit them unless the user explicitly asks for generated output changes.
- `pages/<slug>/page.tsx` contains Vite preview pages. The root dev preview lists these pages and opens the selected page in an iframe.
- `src/server.ts` owns the Express render API, including `POST /api/render-rc` and `POST /api/projects/filter`.
- `src/react-loader.tsx` owns browser hydration for `script[data-rct]` islands.

## Component Conventions

- Client components need a `"use client"` directive in the first 5 lines when they use hooks, state, effects, or browser events.
- Component files are PascalCase, for example `MyFeature.tsx`; matching data files are kebab-case, for example `src/data/my-feature.ts`.
- Static render data should export camelCase data, for example `myFeature`, or a `default` export.
- The client hydration key is the camelCase component name, for example `myFeature` for `MyFeature`.
- When a server component contains a client island, prefer `ClientComponentWrapper` with `type` and `hydrateData`. The wrapper generates `ReactSection`/`script[data-rct]` and a stable target id.
- Use `ReactSection` directly only for custom hydrate targets that cannot use `ClientComponentWrapper`.

## Build And Test

Prefer Bun for repo scripts:

```bash
bun install
bun run generate
bun run typecheck
bun run build
npx playwright test
```

Useful focused commands:

```bash
bun run build:html
bun run build:browser
bun run build:server
bun run dev
bun run dev:server
```

Playwright starts the Vite preview from `playwright.config.ts` at `http://localhost:5173/`.

## Editing Rules For Agents

- Keep changes scoped to source files and docs unless generated outputs are explicitly requested.
- After adding or renaming renderable components, run `bun run generate` or the specific registry generation script before validation.
- After changing static render behavior, validate with `bun run build:html` or `bun run build`.
- After changing preview pages or browser interactions, validate with `npx playwright test` when feasible.
- If documentation and implementation disagree, inspect the implementation, update `README.md`, then update this file if the agent guidance also changed.
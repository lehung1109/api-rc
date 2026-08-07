# api-rc

`api-rc` là project render React component thành HTML tĩnh/HTML qua API, đồng thời hydrate các component có tương tác trên browser. Repo hiện có ba workflow chính:

- Build HTML tĩnh vào `html/` để nhúng vào CMS/WordPress.
- Build browser bundle `dist/react-loader.js` và `dist/react-loader.css` bằng Vite để hydrate client islands.
- Chạy Express render API tại `/api/render-rc` cho nhu cầu render component theo request.

## Yêu cầu môi trường

- Bun cho các script build/generate.
- Node.js để chạy server đã build và một số CLI trong test.
- Playwright browsers nếu cần chạy e2e: `npx playwright install`.

## Cài đặt

```bash
bun install
```

Nếu clone repo lần đầu và TypeScript báo thiếu file generated, chạy:

```bash
bun run generate
```

## Chạy phát triển

```bash
bun run dev
```

Lệnh này chạy Vite dev preview và Vite browser watch cùng lúc. Preview phục vụ ở `http://localhost:5173/`; browser watch tự sinh client registry trước mỗi lần compile và build browser assets vào `dist/`.

Các preview page nằm trong `pages/<slug>/page.tsx`. Trang root sẽ liệt kê các page tìm thấy và render page đang chọn trong iframe. Ví dụ:

- `pages/home/page.tsx` -> `http://localhost:5173/pages/home/`
- `pages/carousel/page.tsx` -> `http://localhost:5173/pages/carousel/`
- `pages/table-of-contents/page.tsx` -> `http://localhost:5173/pages/table-of-contents/`

Một preview page có thể khai báo nhiều variant bằng `pageVariants`. Variant được chọn bằng query string `variant`; nếu không khai báo hoặc query string không hợp lệ, preview sẽ dùng `default`:

```tsx
export const pageVariants = [
  { id: "default", title: "Default" },
  { id: "apartment", title: "Apartment variant" },
];

export default function HomePage({ variant = "default" }: { variant?: string }) {
  if (variant === "apartment") {
    return <ApartmentHome />;
  }

  return <DefaultHome />;
}
```

Ví dụ URL variant: `http://localhost:5173/pages/home/?variant=apartment`. Convention này chỉ áp dụng cho Vite preview/static page shell, không đổi cách render component vào `html/` hoặc API `/api/render-rc`.

## Build

```bash
bun run build
```

Pipeline build đầy đủ sẽ:

1. Sinh generated registries và metadata (`bun run generate`).
2. Render HTML tĩnh vào `html/` (`bun run build:html`).
3. Bundle browser loader/styles vào `dist/` (`bun run build:browser`).
4. Bundle Express server vào `dist/server.js` (`bun run build:server`).

### Nhúng browser loader

`dist/react-loader.js` là ES module. Khi nhúng vào CMS/WordPress hoặc HTML copy-paste, luôn load file này bằng `type="module"`; nếu nhúng như classic script, browser sẽ báo `Cannot use 'import.meta' outside a module`.

```html
<link rel="stylesheet" href="/path/to/react-loader.css" />
<script type="module" src="/path/to/react-loader.js"></script>
```

Khi deploy browser assets, copy toàn bộ `dist/`, không chỉ `react-loader.js` và `react-loader.css`. Loader có thể lazy-load các chunk component được Vite sinh ra, ví dụ `Carousel.*.js` hoặc `ProductGallery.*.js`, và stylesheet có thể tham chiếu các font `.woff2` được build kèm. React runtime được tách vào chunk chung `react-vendor.*.js` để entry `react-loader.js` và các lazy chunk dùng cùng một React instance, kể cả khi WordPress thêm query version như `react-loader.js?ver=...`. Browser build tắt `modulePreload` của Vite để không preload trước các component chunks; component chunks vẫn được tải lazy khi island tương ứng hydrate.

Với WordPress enqueue script truyền thống, thêm `type="module"` cho đúng handle:

```php
add_filter('script_loader_tag', function ($tag, $handle, $src) {
  if ($handle === 'api-rc-react-loader') {
    return '<script type="module" src="' . esc_url($src) . '"></script>';
  }

  return $tag;
}, 10, 3);
```

## Server render API

Build server:

```bash
bun run build:server
```

Chạy server đã build:

```bash
bun run start
```

Chạy server ở chế độ development/watch:

```bash
bun run dev:server
```

Mặc định server lắng nghe ở `http://localhost:3000`. Có thể đổi port bằng biến môi trường `PORT`; giới hạn JSON body mặc định là `1mb`, có thể đổi bằng `JSON_LIMIT`.

### `POST /api/render-rc`

Render một component có trong server registry.

```json
{
  "component": "Header",
  "props": {}
}
```

Response thành công:

```json
{
  "html": "<header>...</header>",
  "hash": "..."
}
```

### MSW (Vite DEV)

Trong `bun run dev`, client fetch tới `/api/projects/filter` và `/api/project-category-gallery` được **MSW** intercept (`src/mocks/`). Express **không** còn hai route này — chỉ còn `POST /api/render-rc`.

## Scripts thường dùng

| Lệnh | Mô tả |
|------|-------|
| `bun run dev` | Chạy Vite preview (bật MSW mock API trong browser). |
| `bun run generate` | Sinh server registry, client registry, version json và restart txt. |
| `bun run build` | Chạy toàn bộ pipeline generate, HTML, browser bundle và server bundle. |
| `bun run build:html` | Render component ra `html/*.html`. |
| `bun run build:browser` | Bundle `react-loader`, CSS bằng Vite và chạy post-build commands. |
| `bun run build:server` | Bundle `src/server.ts` thành `dist/server.js`. |
| `bun run dev:server` | Chạy render API bằng Bun watch. |
| `bun run start` | Chạy `dist/server.js` bằng Node. |
| `bun run typecheck` | Kiểm tra TypeScript. |
| `npx playwright test` | Chạy Playwright tests. |

## Quy ước component

### Client component

Dùng khi component cần hooks, state, effects hoặc browser events. File phải có directive trong 5 dòng đầu:

```tsx
"use client";

export interface MyFeatureModel {
  title: string;
}

export default function MyFeature(model: MyFeatureModel) {
  return <div>{model.title}</div>;
}
```

Quy ước đi kèm:

- File component: `src/components/<folder>/MyFeature.tsx`.
- File data: `src/data/my-feature.ts`.
- Export data: `myFeature` hoặc `default`.
- Key hydrate (`data-rct`): `myFeature`.
- Output HTML: `html/MyFeature.html`.

Khi đặt client component bên trong server component, bọc island bằng `ClientComponentWrapper`. Wrapper cần `type` đúng với key hydrate và `hydrateData` đúng với props hydrate; wrapper sẽ tự sinh `ReactSection`/`script[data-rct]` với target id ổn định:

```tsx
<ClientComponentWrapper type="myFeature" hydrateData={myFeatureData}>
  <MyFeature {...myFeatureData} />
</ClientComponentWrapper>
```

Chỉ dùng trực tiếp `ReactSection` khi thật sự cần tự quản lý target hydrate; đa số server wrapper nên dùng `ClientComponentWrapper` để tránh lệch `data-rct`, `data-rc-target` và `identifierPrefix`.

Client registry được sinh tự động tại `src/generated/client-registry.ts` và `src/generated/client-server-registry.ts`; không sửa tay các file này.

### Server component

Dùng cho markup không cần hydrate phía browser. Component không có `"use client"`.

```tsx
export interface SectionModel {
  heading: string;
}

export default function Section(model: SectionModel) {
  return <section>{model.heading}</section>;
}
```

Server registry được sinh từ `src/lib/discover-render-components.ts` qua `scripts/generate-server-registry.ts`. Registry quét các file `.tsx` trong `src/components/`, bỏ qua `src/components/ui/` và các helper như `ClientComponentWrapper`, `ReactSection`, `client-components.tsx`.

Khi chạy `build:html`, script đọc `src/data/*.ts`, đổi tên file kebab-case sang PascalCase để tìm component tương ứng trong server registry, rồi lấy export camelCase hoặc `default` làm model. Ví dụ `src/data/project-showcase.ts` sẽ render component `ProjectShowcase` với export `projectShowcase` hoặc `default`.

Nếu cần render HTML tĩnh riêng vào `html/`, thêm component renderable và data file đúng quy ước, sau đó chạy:

```bash
bun run build:html
```

## Cấu trúc chính

```text
pages/                         # Preview pages độc lập cho Vite
html/                          # HTML tĩnh được generate
dist/                          # Browser/server build output
scripts/                       # Generate/build helper scripts
src/components/                # React components
src/data/                      # Demo/model data cho render tĩnh
src/generated/                 # File auto-generated, không sửa tay
src/lib/                       # Discover/render/filter utilities
src/react-loader.tsx           # Browser hydration entry
src/server.ts                  # Express render API
tests/                         # Playwright tests
```

## Kiểm tra

```bash
bun run typecheck
npx playwright test
```

Playwright sẽ tự start Vite preview tại `http://127.0.0.1:5173/` theo `playwright.config.ts` (dùng `127.0.0.1` và context riêng mỗi page preview để tránh lỗi MSW/service worker trên Firefox).

Khi một task implement hoặc bugfix hoàn tất, luôn chạy lại test case hoặc command validation liên quan trước khi coi task là xong. Ví dụ: nếu sửa preview page hoặc tương tác browser, chạy test Playwright tương ứng; nếu sửa build/static render, chạy script build tương ứng.

## Lỗi thường gặp

**Component không xuất hiện trong `html/`**

- Thiếu `"use client"` với client component hoặc directive nằm quá xa đầu file.
- Thiếu data file đúng tên kebab-case.
- Component nằm trong thư mục bị bỏ qua khi discover.
- Chưa chạy `bun run generate` hoặc `bun run build:html` sau khi thêm component.

**Hydrate không chạy**

- `ReactSection type` khác key trong registry.
- Thiếu `ClientComponentWrapper` quanh island.
- Chưa chạy `bun run build:browser` hoặc Vite browser watch chưa rebuild.

**API báo component not found**

- Chưa chạy `bun run generate:server-registry` hoặc `bun run build:server` sau khi thêm component.
- Tên `component` gửi lên API không khớp registry key.

**TypeScript báo lỗi import từ `src/generated/`**

- Chạy `bun run generate` trước khi `bun run typecheck`.

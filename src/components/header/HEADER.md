# Header — quy tắc thiết kế & triển khai

Tài liệu này ghi lại các quyết định đã thống nhất khi làm mobile header. **Đọc file này trước khi sửa** `Header.tsx`, `HeaderInner.tsx`, `HeaderTop.tsx`, `HeaderMenu.tsx`, `HeaderSearch.tsx` hoặc data liên quan.

## Mục tiêu

- Mobile: thanh gọn (logo + hamburger), overlay full màn hình khi mở menu, search + menu dọc bên trong.
- Desktop: giữ layout hiện tại (top cam, inner + info, menu ngang + hover dropdown).
- **Một cây DOM**, tái sử dụng markup desktop; điều khiển bằng **Tailwind + checkbox** (`peer`, `group-hover`), không thêm UI framework cho toggle.

## Điều KHÔNG được làm

| Tránh | Lý do |
| ----- | ----- |
| shadcn **Sheet** / **Collapsible** (hoặc Radix tương đương) cho menu | User chọn checkbox + CSS thuần |
| Component **`HeaderMobile`** (hoặc `HeaderMenuMobile`) chỉ cho mobile | Gây duplicate markup; mobile/desktop dùng chung component |
| Render **hai lần** dropdown body / submenu cho cùng một item | Một `header-menu-dropdown` + một `renderMenuDropdownBody()` mỗi item |
| Hai nhánh markup: `<a class="md:hidden">` vs `<a class="hidden md:flex">` cho cùng nội dung | Một markup, CSS đổi hành vi |
| Duplicate **`AutocompleteSearch`** + `ReactSection` hydrate | Chỉ một instance qua `HeaderSearch` |
| Nút **phone** trong overlay mobile | Chỉ search + close + menu; `HeaderTop` ẩn hẳn trên `< md` |
| `"use client"` trên `HeaderMenu` nếu không bắt buộc | Menu toggle bằng checkbox, có thể giữ server component |

## Breakpoint

- **`md` (768px)**: từ `md` trở lên = desktop; dưới `md` = mobile.
- Dùng tiền tố `max-md:` cho mobile, `md:` cho desktop (nhất quán với `HeaderTop` cũ).

## Cấu trúc file

```
header/
├── Header.tsx          # Orchestration: checkbox overlay, panel, HeaderSearch
├── HeaderTop.tsx       # Desktop only: text + phone (không search)
├── HeaderInner.tsx     # Logo, info_list (desktop), hamburger (mobile)
├── HeaderMenu.tsx      # Nav chung mobile + desktop
├── HeaderSearch.tsx    # AutocompleteSearch + hydrate (một lần)
├── AutocompleteSearch.tsx
└── HEADER.md           # File này
```

**Data:** `autocomplete_search` nằm ở [`src/data/header.ts`](../../data/header.ts) (cấp `HeaderModel`), không còn trong `header-top.ts`.

## Overlay toàn màn hình (mobile)

- Checkbox: `#header-menu-open` trong `<header class="header">`, class `peer/header-menu sr-only`.
- Panel: `.header-menu-panel` — `max-md:fixed max-md:inset-0`, `max-md:translate-x-full`, mở bằng `max-md:peer-checked/header-menu:translate-x-0`.
- Mở: `<label htmlFor="header-menu-open">` ở `HeaderInner` (hamburger).
- Đóng: `<label htmlFor="header-menu-open">` ở toolbar overlay (icon X).
- Desktop: `md:contents` trên panel/toolbar để không phá layout 3 hàng (top / inner / menu).

## Search (một instance)

- Component: `HeaderSearch` bọc `ClientComponentWrapper` + `ReactSection type="autocompleteSearch"`.
- Mobile: nằm trong `.header-overlay-toolbar` đầu panel (nền cam `#f36f21`).
- Desktop: cùng node DOM, đặt `md:absolute md:top-0 md:left-1/2` trong vùng thanh top (căn giữa ~420px).
- **Không** thêm search vào `HeaderTop`.

## HeaderMenu — markup chung

### `<ul>`

- Mobile: `flex-col`
- Desktop: `md:flex-row md:items-stretch md:justify-center`

### Item **không** có `children`

- Một `<a class="header-menu-link">` full width, không checkbox.

### Item **có** `children` — một hàng, hai vùng tap

```html
<li class="header-menu-item group relative has-[:checked]:[&_.header-menu-chevron]:rotate-180">
  <input type="checkbox" id="header-menu-item-{index}" class="peer/sub sr-only" />
  <div class="header-menu-link-row flex">
    <a class="header-menu-link flex-1" href="...">Text</a>
    <label class="header-menu-chevron-trigger" for="header-menu-item-{index}">
      <ChevronDownIcon class="header-menu-chevron" />
    </label>
  </div>
  <div class="header-menu-dropdown">...</div>
</li>
```

| Vùng | Mobile | Desktop |
| ---- | ------ | --------- |
| **Text** (`<a>`) | Điều hướng `href` bình thường | Điều hướng + nằm trong vùng hover `li.group` |
| **Chevron** (`<label>`) | Toggle checkbox → mở/đóng submenu | `md:pointer-events-none md:cursor-default` — chỉ trang trí; dropdown bằng `md:group-hover` |
| **Dropdown** | `max-md:hidden max-md:peer-checked/sub:block` | `md:invisible md:absolute md:group-hover:visible md:group-hover:opacity-100` |

**HTML hợp lệ:** không lồng `<label>` trong `<a>`; không hai `<a>` song song cho cùng item.

### Submenu body — một lần render

- Function `renderMenuDropdownBody(level2, useColumns)` trong `HeaderMenu.tsx`.
- Wrapper responsive: `flex-col gap-6` (mobile) + `md:grid md:grid-flow-col` (desktop) khi `useColumns` (menu 3 tầng).

### Menu 3 tầng trên mobile (chỉ 2 cấp UI)

- **Chỉ** checkbox ở cấp 1 (item gốc).
- Trong panel: **cấp 2 = title** (`.header-menu-section-title`), **cấp 3 = link** (`.header-menu-submenu-link`).
- **Không** checkbox / collapsible lồng cho từng cột cấp 2.

### Menu 2 tầng

- Tap text → `href` cấp 1.
- Tap chevron → list link cấp 2 trong dropdown.

## Class hooks (custom CSS sau này)

Luôn giữ các class semantic khi thêm/sửa markup:

`header`, `header-top`, `header-top-text`, `header-inner`, `header-inner-logo`, `header-inner-info`, `header-bar`, `header-menu-panel`, `header-overlay-toolbar`, `header-overlay-search`, `header-menu-open-trigger`, `header-menu-close`, `header-menu`, `header-menu-list`, `header-menu-item`, `header-menu-link-row`, `header-menu-link`, `header-menu-chevron-trigger`, `header-menu-chevron`, `header-menu-dropdown`, `header-menu-dropdown-inner`, `header-menu-dropdown-arrow`, `header-menu-dropdown-body`, `header-menu-section`, `header-menu-section-title`, `header-menu-submenu-link`.

Dùng `cn()` từ `@/lib/utils` khi merge `className` từ props.

## Styling stack

- **Tailwind CSS** (v4) + utility hiện có (`!bg-`, `!text-`, v.v.).
- Icon: **lucide-react** (`Menu`, `X`, `ChevronDownIcon`).
- shadcn chỉ dùng nơi đã có (ví dụ `Button` trong `HeaderTop`), **không** thêm Sheet/Collapsible cho header.

## Kiểm tra nhanh sau khi sửa

1. `< md`: không thấy top cam / info; hamburger mở overlay; search hoạt động; tap chữ → navigate; tap chevron → submenu; mỗi item có dropdown **một** node trong DevTools.
2. `≥ md`: hover mở dropdown; chevron không toggle checkbox; layout top + inner + menu ngang như trước.
3. `bun run typecheck` pass.

## Ghi chú / edge case (chấp nhận v1)

- Nhiều submenu checkbox có thể mở cùng lúc trên mobile.
- Resize mobile ↔ desktop khi checkbox đang bật: hiếm; có thể bổ sung `md:max-md:peer-checked/sub:hidden` nếu cần.

---
name: construction-header
overview: Tạo `ConstructionHeader.tsx` đáp ứng layout mobile/desktop trong ảnh (logo + search/hamburger, modal search/menu full-viewport, dropdown animation, sticky theo scroll), dùng chung markup và tận dụng `AutocompleteSearch` sẵn có. Sau đó cập nhật home page để Playwright screenshot đối chiếu với ảnh.
todos:
  - id: design-props-model
    content: Định nghĩa prop/model cho `ConstructionHeader` (logo/menu/social/search/modal animations/sticky threshold) đảm bảo toàn bộ text là props.
    status: pending
  - id: build-menu-component
    content: "Implement `ConstructionHeaderMenu.tsx` dùng chung markup desktop+mobile; dropdown: mobile slide-in-from-left, desktop fade nhẹ, item cuối 'liên hệ' border+hover, active/open bold."
    status: pending
  - id: build-modals
    content: Implement `ConstructionHeaderSearchModal.tsx` (overlay transparent, center AutocompleteSearch, close top-right, fade+slide toggle) và `ConstructionHeaderMenuModal.tsx` (overlay full screen, nền dùng `picture` responsive + overlay layer, logo/social/underline, close top-right, fade+slide toggle).
    status: pending
  - id: scroll-monitor-island
    content: "Tạo `ConstructionHeaderScrollMonitor.tsx` client island: theo dõi scrollY và set data attribute cho header khi qua `stickyAfterPx`."
    status: pending
  - id: add-data-and-wire-home
    content: Tạo `src/data/construction-header.ts` và `src/data/construction-header-scroll-monitor.ts`; cập nhật `src/components/App.tsx` để render `ConstructionHeader` thay cho `Header` trên home.
    status: pending
  - id: playwright-compare
    content: Thêm `tests/construction-header.spec.ts` + baseline screenshot (lấy từ ảnh người dùng) và chạy Playwright để đối chiếu mobile/desktop + mở/đóng modal.
    status: pending
isProject: false
---

## Mục tiêu
- Thêm component mới `ConstructionHeader.tsx` theo đúng mô tả (mobile/desktop, modal full-viewport, dropdown, sticky background theo scroll, animation fade/slide tùy prop).
- Tránh duplicate markup cho “menu” (dùng chung một cây DOM như pattern checkbox overlay hiện có trong `src/components/header/Header.tsx`).
- Text và href lấy từ props/data; animation slide-in/fade-in bật/tắt qua prop.
- Sau khi triển khai: chạy Playwright và đối chiếu screenshot với ảnh người dùng cung cấp.

## Các file dự kiến tạo/đổi
- Tạo mới (server component, không “use client”):
  - [`src/components/construction-header/ConstructionHeader.tsx`](src/components/construction-header/ConstructionHeader.tsx)
  - [`src/components/construction-header/ConstructionHeaderMenu.tsx`](src/components/construction-header/ConstructionHeaderMenu.tsx)
  - [`src/components/construction-header/ConstructionHeaderSearchModal.tsx`](src/components/construction-header/ConstructionHeaderSearchModal.tsx)
  - [`src/components/construction-header/ConstructionHeaderMenuModal.tsx`](src/components/construction-header/ConstructionHeaderMenuModal.tsx)
- Tạo mới (client island chỉ để theo dõi scroll nền header):
  - [`src/components/construction-header/ConstructionHeaderScrollMonitor.tsx`](src/components/construction-header/ConstructionHeaderScrollMonitor.tsx)
- Tạo mới data:
  - [`src/data/construction-header.ts`](src/data/construction-header.ts) (model nội dung logo/menu/social/search)
  - [`src/data/construction-header-scroll-monitor.ts`](src/data/construction-header-scroll-monitor.ts) (threshold + target id)
- Đổi để sử dụng trong preview:
  - [`src/components/App.tsx`](src/components/App.tsx) thay `Header` bằng `ConstructionHeader`

## Thiết kế/luồng hoạt động
```mermaid
flowchart TD
  A[ConstructionHeader (server)] --> B[Checkbox: menu open]
  A --> C[Checkbox: search open]
  A --> D[ConstructionHeaderMenu (shared markup)]
  A --> E[ConstructionHeaderSearchModal]
  A --> F[ConstructionHeaderMenuModal]
  A --> G[Client island ScrollMonitor]
  G --> H[Set data attribute: header scrolled]
  H --> I[CSS tailwind classes đổi nền/shadow]
```

### 1) Pattern “one DOM tree” cho menu mobile/desktop
- Lặp theo cách `src/components/header/Header.tsx` đang làm: dùng checkbox + panel `max-md:fixed` và `md:contents` để cùng một `HeaderMenu` hoạt động cho cả mobile và desktop.
  - Tham chiếu pattern:
    - [`src/components/header/Header.tsx`](src/components/header/Header.tsx): `input id="header-menu-open"` + `header-menu-panel max-md:fixed ... md:contents`.
- `ConstructionHeaderMenu.tsx` sẽ:
  - Mobile: dropdown submenu theo checkbox từng item (ẩn/hiện) + animation slide-in từ trái.
  - Desktop: hover dropdown fade nhẹ (absolute + opacity transition).
  - Active item và item đang mở dropdown: bold.
  - Item cuối (Liên hệ): border + hover state.
  - Thêm một “item search” trong desktop menu (label mở modal search).

### 2) Modal Search full-viewport (mobile)
- `ConstructionHeaderSearchModal.tsx`:
  - Overlay `fixed inset-0` full viewport.
  - Nền `transparent` để nhìn xuyên các block phía dưới.
  - Layout:
    - Close button trên phải.
    - AutocompleteSearch input ở giữa.
    - Dùng `AutocompleteSearch` thông qua pattern hydrate có sẵn: tái sử dụng `src/components/header/HeaderSearch.tsx` để đảm bảo island hydration đúng.
  - Animation:
    - Khi checkbox search open: `fade in` + `slide in` (config qua prop `enableFadeIn`/`enableSlideIn`).

### 3) Modal Menu full-viewport (mobile)
- `ConstructionHeaderMenuModal.tsx`:
  - Overlay `fixed inset-0` full viewport.
  - Nền dùng `picture` (prop) để responsive theo breakpoint, kèm overlay layer để tạo độ tương phản.
  - Close button trên phải.
  - Layout theo ảnh:
    - Logo (duplicate item) + link home.
    - Social icons row (icon + link) từ props/data.
    - 1 underline.
    - Menu dropdown (dùng cùng `ConstructionHeaderMenu.tsx` để đảm bảo “one menu”).
  - Animation open/close:
    - fade + slide (config qua prop).
  - Dropdown animation slide-in từ trái (trong `ConstructionHeaderMenu.tsx`).

### 4) Sticky theo scroll threshold
- Vì architecture dùng “client islands”, không đặt `useEffect` trong component server.
- Tạo `ConstructionHeaderScrollMonitor.tsx` (client island):
  - Lắng nghe `scroll`.
  - Khi `window.scrollY >= stickyAfterPx` thì set `document.getElementById(targetId)?.dataset.scrolled = "true"`, ngược lại unset.
- `ConstructionHeader.tsx` sẽ dùng tailwind class dựa trên `[data-scrolled="true"]` thông qua selector/data-variant (hoặc fallback: set class theo inline style nếu cần). Mục tiêu là chỉ đổi nền/shadow của header khi đã scroll.

### 5) Tất cả text phải là props
- Model `construction-header.ts` sẽ bao gồm:
  - `placeholder` cho search.
  - `menu.items[]` gồm label/href/children/active.
  - social links gồm `icon` (url + alt) và `href`.
  - aria-label/tooltip/close text (dạng string prop nếu cần).
- Trong code không hardcode label hiển thị (chỉ dùng icons và class).

## Kế hoạch triển khai
1. Tạo skeleton các component mới trong `src/components/construction-header/`.
2. Xây dựng `ConstructionHeaderMenu.tsx` dựa trên `src/components/header/HeaderMenu.tsx`, nhưng đổi các class để:
   - desktop: dropdown fade nhẹ, align right + flex-wrap.
   - mobile: dropdown slide-in-from-left + bold active/open.
   - item cuối `Liên hệ`: border + hover.
   - thêm “item search” trong desktop.
3. Tạo `ConstructionHeaderSearchModal.tsx`:
   - overlay transparent.
   - center input (dùng `HeaderSearch` + custom class).
   - close button.
   - animation fade/slide bật/tắt.
4. Tạo `ConstructionHeaderMenuModal.tsx`:
   - overlay full screen + nền `picture` responsive.
   - logo duplicate + socials + underline + menu.
   - close button + animation fade/slide bật/tắt.
5. Tạo `ConstructionHeaderScrollMonitor.tsx` + data file threshold.
6. Tạo `src/data/construction-header.ts` với toàn bộ text/href/images theo ảnh; dùng `public/images/concrete-bg-official-updated.jpg` làm ảnh nền mặc định cho `picture` trong menu modal (truyền qua props, có thể bổ sung source cho từng breakpoint).
7. Cập nhật [`src/components/App.tsx`](src/components/App.tsx) để home page render `ConstructionHeader` thay vì `Header`.
8. Playwright đối chiếu:
   - Tạo test mới `tests/construction-header.spec.ts`.
   - Test các viewport:
     - Mobile (<md): mở search modal, đóng modal (assert close button & input placeholder visible).
     - Mobile (<md): mở menu modal, assert background + logo/social + dropdown behavior.
     - Desktop (>=md): assert menu dropdown visible trên hover và “Liên hệ” có border.
   - Dùng screenshot so sánh thủ công hoặc snapshot với baseline đặt trong `tests/fixtures/` từ ảnh người dùng cung cấp.

## Tiêu chí chấp nhận (Acceptance Criteria)
- Mobile:
  - Header right có search + hamburger.
  - Search modal full viewport, transparent background, input ở giữa, close button top-right, animation fade+slide khi mở/đóng.
  - Hamburger modal full viewport, nền `picture` responsive, close top-right, layout đúng logo-social-underline-menu.
  - Dropdown submenu slide in từ trái; item đang mở + active item bold.
  - Sticky background hoạt động sau `stickyAfterPx`.
- Desktop:
  - Menu hiển thị ngay trên header (ẩn overlay checkbox).
  - Hover dropdown fade nhẹ.
  - Item cuối (Liên hệ) có border và hover state.
  - Item search gần Liên hệ mở cùng search modal.
  - Flex-wrap cho phép xuống dòng nhưng căn phải.
- Code:
  - Không hardcode text hiển thị; toàn bộ label/placeholder/social alt/menu label là prop.
  - Mỗi file `.tsx` chỉ export/contain 1 component.

## Ghi chú kỹ thuật quan trọng
- Không sửa logic hydrate của `AutocompleteSearch`: dùng `HeaderSearch`/`ClientComponentWrapper` để đảm bảo island hydration.
- Đảm bảo z-index cho modal overlay (> các block khác) để không bị style khác override.
- Tuân thủ `react-components` skill:
  - Server-first; chỉ dùng client island cho phần thật sự cần state/effect (ở đây là scroll monitor).
  - Một file `.tsx` chỉ chứa một component.
  - Breakpoint chuẩn `md` (768px), responsive theo một cây DOM.
- Phạm vi shadcn UI:
  - Dùng primitive sẵn có (`Input` thông qua `AutocompleteSearch`, `Button` nếu cần focus/hover chuẩn).
  - Không dùng `Sheet`/`Dialog`/`DropdownMenu`/`Collapsible` cho modal/menu toggle; dùng CSS-first + checkbox/label theo kế hoạch.

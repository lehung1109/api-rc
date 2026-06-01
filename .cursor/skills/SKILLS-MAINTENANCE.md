# Duy trì agent skills (api-rc)

Skills trong `.cursor/skills/` là **nguồn sự thật** cho quy ước dự án. Chúng phải **luôn phản ánh code và quyết định thực tế** — không để lỗi thời sau khi agent hoặc team học pattern mới.

## Khi nào phải cập nhật skill

Trong **cùng phiên** (hoặc trước khi kết thúc task), cập nhật skill nếu bạn:

| Tình huống | Hành động |
|------------|-----------|
| Thống nhất pattern mới với user (ví dụ: props shape, breakpoint, cách hydrate) | Ghi vào skill liên quan |
| Phát hiện skill **sai** so với code hiện tại | Sửa skill **trước hoặc cùng lúc** với code |
| Thêm quy tắc trong `HEADER.md` / feature doc mà skill chưa có | Đồng bộ vào skill + doc (một hướng dẫn chính, tránh hai bản mâu thuẫn) |
| User nói rõ "luôn làm X" / "không được Y" | Thêm vào skill tương ứng (dùng đúng wording user nếu họ đưa câu chữ cụ thể) |
| Refactor lớn đổi kiến trúc (registry, wrapper, folder layout) | Cập nhật `react-components` và file doc liên quan |

**Không** chờ user nhắc "cập nhật skill" — coi đó là phần bắt buộc của task hoàn chỉnh.

## Skill nào sửa

| Nội dung | File |
|----------|------|
| React, props, server/client, registry, data | [react-components/SKILL.md](react-components/SKILL.md) |
| Markup SEO component (landmark, heading, Media/Link) | [react-seo-markup.mdc](../rules/react-seo-markup.mdc) + đồng bộ `react-components` |
| Responsive, checkbox, một DOM, overlay/menu | [css-first-responsive-ui/SKILL.md](css-first-responsive-ui/SKILL.md) |
| Header chi tiết | [src/components/header/HEADER.md](../../src/components/header/HEADER.md) — giữ đồng bộ với hai skill trên |
| Quy tắc chung / index | File này |

Skill mới: tạo thư mục `skill-name/SKILL.md`, thêm một dòng vào bảng trên.

## Cách viết cập nhật

- **Ngắn, có thể hành động** — bullet, bảng Avoid/Do, snippet tối thiểu.
- **Không** lặp lại kiến thức chung của React/Tailwind agent đã biết.
- **Không** ghi thông tin nhạy cảm (secrets, URL nội bộ).
- Nếu skill > ~150 dòng: tách `reference.md` trong cùng thư mục; `SKILL.md` chỉ giữ phần bắt buộc.
- Mô tả YAML (`description:`) phải vẫn khớp nội dung (trigger terms).

## Checklist cuối task (khi đụng component / UI)

```
- [ ] Code + typecheck pass
- [ ] Quy ước mới đã ghi vào skill hoặc HEADER.md (nếu có)
- [ ] Skill cũ không còn mâu thuẫn với thay đổi vừa làm
- [ ] User biết skill nào đã cập nhật (một câu trong reply)
```

## Ví dụ

- Thêm component client mới → cập nhật `react-components` (wrapper bắt buộc, data `*-wrapper.ts`, `eai-rc-elementor-widget` nếu có widget WP).
- Đổi breakpoint chính từ `md` sang `lg` → cập nhật `css-first-responsive-ui` + `HEADER.md` + mọi skill ghi `md`.
- User: "menu 3 cấp mobile chỉ 2 UI level" → đã có trong header doc; nếu áp dụng feature khác, copy pattern vào `css-first-responsive-ui`.
- Feature UI lớn (footer, header) → tách orchestrator + section/leaf trong cùng folder; một file data aggregate — xem `react-components` mục *Chia nhỏ component*.
- Breadcrumb phân cấp (`/` giữa cấp, `-` trong cấp) → `react-components` *Page title bar* + rule `wp-link-list-components.mdc`.
- Thanh meta 4 cột (icon Lucide + title/content, `bg-[#f7f7f7]`) → `react-components` *Project meta bar* + `elementor-widget-context.mdc` (settings/ACF, không LinkModel).
- User: luôn markup chuẩn SEO khi tạo component → rule `react-seo-markup.mdc` + mục *SEO markup* trong `react-components`.

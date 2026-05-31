# Capture session learnings

Đóng băng kiến thức bền vững từ **cuộc chat hiện tại** thành rule, skill hoặc reference trong repo này — để agent tham chiếu lại sau.

## Ràng buộc bắt buộc

- **Cấm** dùng Write/StrReplace tạo hoặc sửa file cho đến khi user duyệt bảng đề xuất (Bước 4).
- **Cấm** ghi vào `~/.cursor/skills-cursor/` (reserved by Cursor).
- **Không** ghi secrets, credentials, URL nội bộ nhạy cảm.
- User đưa câu chữ cụ thể → giữ **verbatim**, không paraphrase.
- Ưu tiên **cập nhật** rule/skill đã có thay vì tạo file trùng topic.

Trước Bước 5, đọc built-in skills `create-rule` và `create-skill` (nếu có trong môi trường).

---

## Bước 1 — Extract

Rà soát toàn bộ conversation và liệt kê mọi learning có thể tái sử dụng:

- Quyết định đã thống nhất với user
- Convention / pattern mới (props, naming, folder, API)
- Anti-pattern / pitfall đã phát hiện
- Workflow / checklist nhiều bước
- Câu chữ user yêu cầu giữ nguyên (verbatim quotes)

Bỏ qua: chi tiết one-off không lặp lại, debug tạm thời, thông tin đã có sẵn trong code rõ ràng.

---

## Bước 2 — Scan project

Đọc artifact hiện có trước khi phân loại:

- `.cursor/rules/*.mdc`
- `.cursor/skills/**/SKILL.md`
- `.cursor/skills/SKILLS-MAINTENANCE.md` (repo này — index bảo trì skill)

Ghi nhận file nào **trùng topic** để ưu tiên update thay vì create.

---

## Bước 3 — Classify

Mỗi learning chọn **một** loại chính:

| Tín hiệu trong chat | Artifact | Ghi chú |
|---------------------|----------|---------|
| "Luôn / không được" + áp mọi session | Rule `alwaysApply: true` | Giữ dưới ~50 dòng |
| Quy ước theo loại file (`*.tsx`, component React) | Rule + `globs` | Ví dụ: `globs: src/components/**/*.tsx` |
| Workflow dài, domain knowledge, checklist | Skill mới hoặc bổ sung skill | Thư mục `.cursor/skills/{name}/SKILL.md` |
| React / props / server-client / registry | Update skill | `react-components/SKILL.md` |
| Responsive / checkbox / một DOM / overlay | Update skill | `css-first-responsive-ui/SKILL.md` |
| WordPress props / LinkModel / breadcrumb | Update rule hoặc skill | `elementor-widget-context.mdc`, `wp-link-list-components.mdc` |
| Chi tiết kỹ thuật > ~30 dòng trong skill | `reference.md` | Cùng thư mục skill; link 1 cấp từ SKILL.md |
| Trùng topic rule/skill đã có | **Edit** | Merge, không duplicate |

Với mỗi item ghi: loại, đường dẫn đích, create vs update, lý do ngắn.

---

## Bước 4 — Propose (bắt buộc — dừng ở đây cho đến khi duyệt)

Trình bảng markdown:

| # | Learning | Artifact | Target file | Action | Trigger / scope |
|---|----------|----------|-------------|--------|-----------------|
| 1 | … | Rule / Skill / Reference / Update | path | Create / Update | globs hoặc mô tả skill |

Sau bảng, dùng **AskQuestion** (hoặc hỏi rõ ràng nếu không có tool):

1. Chọn item nào cần ghi (có thể bỏ bớt)
2. Xác nhận tên file (vd. `my-pattern.mdc`, `my-workflow/SKILL.md`)
3. Với rule: xác nhận `globs` và `alwaysApply`
4. Với skill mới: xác nhận `name` và `description` (third person, có trigger terms)

**Không** implement cho đến khi user trả lời.

---

## Bước 5 — Implement (chỉ sau khi duyệt)

### Rules (`.cursor/rules/*.mdc`)

```markdown
---
description: Brief description
globs: src/components/**/*.tsx
alwaysApply: false
---

# Title
Content...
```

- Một concern per rule; dưới ~50 dòng khi có thể
- Ví dụ có concrete Avoid/Do hoặc snippet ngắn

### Skills (`.cursor/skills/{name}/SKILL.md`)

```markdown
---
name: skill-name
description: Third-person WHAT + WHEN trigger terms
disable-model-invocation: true
---

# Title
Instructions...
```

- `disable-model-invocation: true` mặc định (chỉ load khi gọi tên)
- SKILL.md dưới ~500 dòng; tách `reference.md` nếu dài
- Path trong body dùng `/`, không `\`

### Reference

- Chỉ khi skill đã quá dài
- Link trực tiếp từ SKILL.md, không lồng sâu

---

## Bước 6 — Maintain

Repo **api-rc**: nếu tạo skill mới, thêm một dòng vào bảng "Skill nào sửa" trong `.cursor/skills/SKILLS-MAINTENANCE.md`.

Nếu cập nhật quy ước lớn (registry, wrapper, breakpoint), kiểm tra skill/doc liên quan không còn mâu thuẫn.

---

## Bước 7 — Summary

Reply ngắn gọn:

- File đã tạo / sửa (đường dẫn đầy đủ)
- Khi nào artifact được áp dụng (alwaysApply, globs, hoặc cách gọi skill)
- Item nào user đã bỏ qua (nếu có)

---

## Project conventions (api-rc)

- Rule React/WordPress props: `globs: src/components/**/*.tsx` — theo `elementor-widget-context.mdc`
- Link list / breadcrumb: `wp-link-list-components.mdc`
- Component patterns: cập nhật `react-components/SKILL.md` trước khi tạo rule trùng
- Responsive UI: `css-first-responsive-ui/SKILL.md`
- Header chi tiết: đồng bộ với `src/components/header/HEADER.md` khi đụng header
- Index skill: `.cursor/skills/SKILLS-MAINTENANCE.md` — bắt buộc cập nhật khi thêm skill mới

# Thiết Kế Bộ Component Nội Thất Cao Cấp Vinhomes Ocean Park (IC HOUSE)

- **Ngày**: 2026-10-20
- **Trang đích mục tiêu**: `https://noithat.ichouse.vn/?page_id=6865` (Preview tại `pages/ocean-park/page.tsx`)
- **Trang tham khảo bố cục**: `https://www.apolloluma.com/p/noi-that-vinhomes-ocean-park.html`
- **Phân khúc định vị**: Trung – Cao cấp & Bespoke Luxury (Vinhomes Ocean Park 1, 2, 3)

---

## 1. Mục Tiêu & Phạm Vi

1. **Giữ bản sắc thương hiệu IC HOUSE**:
   - Giữ nguyên khung [`Header`](../../../src/components/header/Header.tsx), Banner đầu trang ([`HeroSection`](../../../src/components/hero-section/HeroSection.tsx)), [`FloatingContact`](../../../src/components/floating-contact/FloatingContact.tsx) và [`Footer`](../../../src/components/footer/Footer.tsx).
   - Sử dụng hệ màu thương hiệu IC HOUSE (`brand-navy`, `brand-gold`, `brand-white`, `brand-white-hover`) thay vì sao chép giao diện của trang tham khảo.
2. **Định vị phân khúc cao cấp (High-End / Bespoke Luxury)**:
   - Khác với trang tham khảo đang nhắm tới gói giá rẻ (52 triệu/căn), bộ component của IC HOUSE định vị ở phân khúc **Trung – Cao cấp & Luxury** (thiết kế 3D cá nhân hóa 250.000đ – 350.000đ/m², miễn phí 100% khi ký HĐ thi công; hoàn thiện trọn gói cao cấp từ 120 triệu/căn, gói Bespoke Luxury phổ biến 180 – 260 triệu/căn; vật liệu chuẩn An Cường, Plywood phủ Veneer, cánh kính khung nhôm Anode, sơn Inchem, đá thạch anh Vicostone, phụ kiện Blum/Hafele).
3. **Tối ưu điểm chất lượng Google Ads & Mật độ từ khóa (SSR-First)**:
   - Toàn bộ văn bản, bảng giá, thông tin tòa/phân khu và câu trả lời Q&A đều được render tĩnh ra HTML (`html/*.html`) để Google Ads Bot đọc được 100% nội dung ngay từ lần tải đầu tiên.
   - Phủ tự nhiên và đầy đủ **27+ từ khóa mục tiêu**:
     - `Ocean Park 1`, `Chung cư Ocean Park 1`
     - `The Paris`, `The Paris Ocean Park 1`
     - `The London`, `The London Ocean Park 1`, `Căn hộ The London`, `Tòa LD1`, `Tòa LD2`, `Tòa LD3`
     - `The Beverly`, `The Beverly Ocean Park 1`, `Căn hộ The Beverly`, `Tòa BE1`, `Tòa BE2`, `Tòa BE3`, `Tòa BE4`
     - `Ocean Park 2`
     - `LUMIÈRE SpringBay`, `LUMIÈRE SpringBay Ocean Park 2`, `Căn hộ LUMIÈRE SpringBay`
     - `Masteri Trinity Square`, `Masteri Trinity Square Ocean Park 2`, `Dự án Masteri Trinity Square`
     - `Ocean Park 3`, `Căn hộ cao tầng Ocean Park 3`, `Dự án căn hộ Ocean Park 3`
4. **Tối ưu trải nghiệm Mobile (Chống cuộn dài)**:
   - Sử dụng **Horizontal Scroll Snap (`overflow-x-auto snap-x snap-mandatory`)**, lưới 2 cột gọn và **Tab lọc / Accordion đồng bộ** trên màn hình di động để khách hàng lướt qua toàn bộ thông tin quan trọng mà không phải cuộn dọc quá nhiều.
5. **Làm nổi bật 3 lợi thế địa lý độc quyền của IC HOUSE**:
   - **Nhà mẫu nội thất trong khu đô thị**: *Sao Biển 23, KĐT Vinhomes Ocean Park, Gia Lâm, Hà Nội*.
   - **Trụ sở văn phòng gần đại đô thị**: *Số 01 Voi Phục, Gia Lâm, Hà Nội*.
   - **Nhà máy sản xuất trực tiếp gần Ocean Park**: *Thôn Ngọc Trai, Xã Như Quỳnh, Tỉnh Hưng Yên*.

---

## 2. Kiến Trúc Bộ 6 Section Component & Trang Preview

Mỗi component được thiết kế độc lập để có thể nhúng riêng lẻ vào từng Elementor Widget trên WordPress (`html/<kebab-name>.html`) hoặc render qua API `POST /api/render-rc`, đồng thời được ghép hoàn chỉnh trên trang preview `pages/ocean-park/page.tsx`.

### 2.1. `OceanParkIntro` (Server Component)
- **Files**:
  - `src/components/ocean-park-intro/OceanParkIntro.tsx`
  - `src/data/ocean-park-intro.ts`
- **Vị trí**: Ngay dưới Banner `HeroSection` đầu trang.
- **Model (`OceanParkIntroModel`)**:
  - `className?: string`
  - `eyebrow: string` (VD: *"IC HOUSE — ĐƠN VỊ THIẾT KẾ & THI CÔNG NỘI THẤT CAO CẤP TẠI VINHOMES OCEAN PARK"*)
  - `title: string` (H2 chứa từ khóa chính)
  - `leadHtml: string` (Đoạn giới thiệu nhắc tới *Ocean Park 1, Ocean Park 2, Ocean Park 3, The Paris, The London, The Beverly, LUMIÈRE SpringBay, Masteri Trinity Square*)
  - `highlights: Array<{ label: string; value: string; note?: string }>` (4 thẻ thông số chính sách: Đơn giá thiết kế, Chi phí thi công trọn gói cao cấp, Miễn phí 100% thiết kế, Bảo hành 2 năm & Bảo trì 5 năm)
  - `subdivisionBadges: string[]` (Các tag phân khu/tòa bàn giao nổi bật)
  - `steps: Array<{ number: string; title: string; description: string }>` (3 bước: 01 Khảo sát thực tế tại tòa -> 02 Thiết kế 3D cá nhân hóa -> 03 Sản xuất & Thi công chuẩn cam kết)
  - `primaryCta: { label: string; link: LinkModel }` (Gọi tư vấn `0869 855 885`)
  - `secondaryCta: { label: string; link: LinkModel }` (Nhận báo giá / Xem mẫu thiết kế)
- **Hành vi Mobile**: 4 highlight hiển thị lưới `grid-cols-2`, 3 bước quy trình nằm trên thanh trượt ngang `snap-x` gọn trên 1 hàng.

### 2.2. `OceanParkProjectSamples` (Server Wrapper + Client Island)
- **Files**:
  - `src/components/ocean-park-project-samples/OceanParkProjectSamplesWrapper.tsx` (Server Component bọc `ClientComponentWrapper` với `type="oceanParkProjectSamples"`)
  - `src/components/ocean-park-project-samples/OceanParkProjectSamples.tsx` (`"use client"` Component xử lý lọc theo Phân khu/Tòa và Loại căn hộ)
  - `src/data/ocean-park-project-samples-wrapper.ts` & `src/data/ocean-park-project-samples.ts`
- **Model (`OceanParkProjectSamplesModel`)**:
  - `className?: string`
  - `eyebrow: string`
  - `title: string`
  - `description: string`
  - `zoneTabs: Array<{ id: string; label: string }>` (`all`, `the-london`, `the-beverly`, `the-paris`, `lumiere-springbay`, `masteri-trinity-square`, `ocean-park-3`)
  - `unitTypeTabs: Array<{ id: string; label: string }>` (`all`, `studio`, `1pn1`, `2pn`, `2pn1`, `3pn`, `duplex`)
  - `featuredProjects: Array<{ title: string; zoneId: string; zoneLabel: string; towerLabel: string; unitTypeId: string; unitTypeLabel: string; area: string; apartmentCode: string; style: string; budget: string; summary: string; image: MediaModel; detailLink: LinkModel; isRealProject?: boolean }>`
  - `ctaBanner: { title: string; description: string; buttonLabel: string; buttonLink: LinkModel }`
- **Hành vi SSR & Mobile**:
  - Khi render tĩnh (SSR), toàn bộ danh sách dự án tiêu biểu & mẫu căn hộ điển hình được xuất ra HTML để Google Ads Bot đọc được mọi mã căn, tòa (*Tòa LD1, LD2, LD3, Tòa BE1, BE2, BE3, BE4...*).
  - Trên Mobile, danh sách thẻ hiển thị dạng **Horizontal Snap Track (`flex overflow-x-auto snap-x snap-mandatory gap-4`)** chỉ cao bằng 1 thẻ; người dùng lọc nhanh bằng thanh chip ngang và vuốt sang trái/phải để xem các mẫu căn hộ. Trên Desktop hiển thị lưới `md:grid-cols-2 lg:grid-cols-3`.

### 2.3. `OceanParkPricing` (Server Component)
- **Files**:
  - `src/components/ocean-park-pricing/OceanParkPricing.tsx`
  - `src/data/ocean-park-pricing.ts`
- **Model (`OceanParkPricingModel`)**:
  - `className?: string`
  - `eyebrow: string`
  - `title: string`
  - `description: string`
  - `featuredPackage: { badge: string; title: string; price: string; unit: string; note: string; handoverSavingNote: string }`
  - `primaryCta: { label: string; link: LinkModel }`
  - `secondaryCta: { label: string; link: LinkModel }`
  - `unitEstimatesTitle: string`
  - `unitEstimatesSubtitle: string`
  - `unitEstimates: Array<{ unitType: string; areaRange: string; priceRange: string; highlight?: boolean; targetZones?: string }>`
  - `roomEstimates: Array<{ roomName: string; englishName: string; priceRange: string }>`
  - `commitments: Array<{ title: string; items: Array<{ label: string; detail: string }> }>` (3 cột: Gói thi công bao gồm, Vật liệu & Phụ kiện cao cấp cam kết, Quyền lợi đặc quyền khách hàng IC HOUSE)
  - `bottomPrompt: { title: string; description: string; buttonLabel: string; buttonLink: LinkModel }`
- **Hành vi Mobile**:
  - Bảng dự toán theo loại căn & theo phòng hiển thị dạng lưới 2 cột gọn (`grid-cols-2`) hoặc thanh trượt ngang.
  - 3 khối Cam kết hiển thị dạng thẻ vuốt ngang (`flex overflow-x-auto snap-x md:grid md:grid-cols-3`).

### 2.4. `OceanParkAdvantages` (Server Component)
- **Files**:
  - `src/components/ocean-park-advantages/OceanParkAdvantages.tsx`
  - `src/data/ocean-park-advantages.ts`
- **Model (`OceanParkAdvantagesModel`)**:
  - `className?: string`
  - `eyebrow: string`
  - `title: string`
  - `description: string`
  - `localStrengths: Array<{ badge: string; title: string; address: string; distanceNote: string; description: string; highlightPoints: string[]; image: MediaModel }>`
    1. **Nhà mẫu nội thất thực tế trong Ocean Park**: *Sao Biển 23, KĐT Vinhomes Ocean Park, Gia Lâm, Hà Nội*.
    2. **Trụ sở Văn phòng kế cận khu đô thị**: *Số 01 Voi Phục, Gia Lâm, Hà Nội*.
    3. **Nhà máy sản xuất trực tiếp gần Ocean Park**: *Thôn Ngọc Trai, Xã Như Quỳnh, Tỉnh Hưng Yên*.
  - `capabilityPillars: Array<{ title: string; description: string; checkpoints: string[]; image: MediaModel }>` (Xưởng sản xuất trực tiếp 2000m² & Thi công thực tế chuẩn quy trình Vinhomes/Masterise).
  - `proofBanner: { title: string; description: string; buttonLabel: string; buttonLink: LinkModel }`
- **Hành vi Mobile**: 3 thẻ lợi thế địa lý và 2 trụ cột năng lực dùng thanh trượt ngang `snap-x` trên mobile, lưới 3 cột / 2 cột trên desktop.

### 2.5. `OceanParkContactForm` (Server Wrapper + Client Island)
- **Files**:
  - `src/components/ocean-park-contact-form/OceanParkContactFormWrapper.tsx` (Server Wrapper với `type="oceanParkContactForm"`)
  - `src/components/ocean-park-contact-form/OceanParkContactForm.tsx` (`"use client"` Component)
  - `src/data/ocean-park-contact-form-wrapper.ts` & `src/data/ocean-park-contact-form.ts`
- **Model (`OceanParkContactFormModel`)**:
  - `className?: string`
  - `sectionId?: string` (Mặc định: `"dang-ky-tu-van"`)
  - `formKey: string` (Để liên kết với vùng chứa Contact Form 7 `#eai-ocean-park-cf7-source-{formKey}` trên WordPress nếu có)
  - `eyebrow: string`
  - `title: string`
  - `description: string`
  - `hotline: string` (`0869 855 885`)
  - `zaloPhone: string` (`0978 305 740`)
  - `email: string`
  - `website: string`
  - `locations: Array<{ label: string; address: string }>` (Văn phòng Voi Phục, Nhà mẫu Sao Biển 23, Nhà máy Như Quỳnh)
  - `referenceLinks: Array<{ label: string; url: string }>` (Danh sách công trình & bài viết tham khảo theo tòa/phân khu)
  - `formTitle: string`
  - `formSubtitle: string`
  - `zoneOptions: string[]` (Danh sách phân khu/tòa trong dropdown chọn nhanh)
  - `submitLabel: string`
  - `successMessage: string`
- **Hành vi Form**:
  - Nếu trang WordPress cung cấp phần tử `#eai-ocean-park-cf7-source-{formKey}` chứa `form.wpcf7-form`, component tự động di chuyển form vào khung và gọi `window.wpcf7.init(form)`.
  - Nếu không có CF7 ngoài, hiển thị Built-in Form cao cấp (Họ tên, Số điện thoại bắt buộc, Chọn Phân khu/Tòa, Loại căn/Diện tích, Yêu cầu tư vấn), kiểm tra hợp lệ phía client và hiển thị trạng thái gửi thành công.

### 2.6. `OceanParkFaq` (Server Component + `AccordionExclusiveSync` Island)
- **Files**:
  - `src/components/ocean-park-faq/OceanParkFaq.tsx`
  - `src/data/ocean-park-faq.ts`
- **Vị trí**: Ở phần cuối cùng của luồng nội dung trang (trước Footer).
- **Model (`OceanParkFaqModel`)**:
  - `className?: string`
  - `sectionId?: string` (Mặc định: `"ocean-park-faq"`)
  - `eyebrow: string`
  - `title: string`
  - `description: string`
  - `items: Array<{ question: string; answerHtml: string; defaultOpen?: boolean }>` (8 câu hỏi - trả lời chi tiết chứa đầy đủ từ khóa các phân khu, tòa căn hộ, báo giá, vật liệu và 3 địa chỉ Nhà mẫu / Văn phòng / Nhà xưởng)
  - `keywordGroupTitle: string`
  - `keywordPills: Array<{ label: string; url: string }>` (Bao phủ trọn bộ 27+ từ khóa Google Ads mục tiêu)
- **Cơ chế Accordion trên Mobile**:
  - Mỗi mục FAQ dùng `<details>` hoặc checkbox accordion đi kèm [`AccordionExclusiveSync`](../../../src/components/accordion-exclusive-sync/AccordionExclusiveSync.tsx) để đảm bảo tại một thời điểm chỉ mở 1 câu trả lời, giữ chiều cao trang trên mobile cực kỳ gọn gàng mà vẫn giữ 100% nội dung HTML cho công cụ tìm kiếm.

---

## 3. Danh Sách Từ Khóa Google Ads Bắt Buộc Phủ Đủ Trong Dữ Liệu

Toàn bộ 27 cụm từ khóa sau được phân bổ tự nhiên vào `OceanParkIntro`, `OceanParkProjectSamples`, `OceanParkPricing`, `OceanParkAdvantages`, `OceanParkContactForm` và `OceanParkFaq`:

1. `Ocean Park 1`
2. `The Paris`
3. `The Paris Ocean Park 1`
4. `The London`
5. `The London Ocean Park 1`
6. `Tòa LD1`
7. `Tòa LD2`
8. `Tòa LD3`
9. `The Beverly`
10. `The Beverly Ocean Park 1`
11. `Tòa BE1`
12. `Tòa BE2`
13. `Tòa BE3`
14. `Tòa BE4`
15. `Ocean Park 2`
16. `LUMIÈRE SpringBay`
17. `LUMIÈRE SpringBay Ocean Park 2`
18. `Masteri Trinity Square`
19. `Masteri Trinity Square Ocean Park 2`
20. `Ocean Park 3`
21. `Căn hộ cao tầng Ocean Park 3`
22. `Dự án căn hộ Ocean Park 3`
23. `Chung cư Ocean Park 1`
24. `Căn hộ The Beverly`
25. `Căn hộ The London`
26. `Dự án Masteri Trinity Square`
27. `Căn hộ LUMIÈRE SpringBay`

---

## 4. Xử Lý Lỗi & Kiểm Thử (Error Handling & Testing)

1. **An toàn dữ liệu (Defensive Rendering)**:
   - Tất cả các component kiểm tra mảng rỗng / chuỗi rỗng (`trim()`) trước khi render; nếu thiếu dữ liệu tùy chọn thì ẩn gọn phần tử con mà không làm vỡ bố cục.
2. **Kiểm thử tự động (Validation & E2E)**:
   - Chạy `bun run generate` để đăng ký các component vào `src/generated/`.
   - Chạy `bun run typecheck` và `bun run build` để đảm bảo cả static HTML (`html/`), browser bundle (`dist/`) và server bundle đều build thành công không lỗi.
   - Viết Playwright E2E test (`tests/ocean-park.spec.ts`) kiểm tra:
     - Trang preview `/pages/ocean-park/` hiển thị đầy đủ Header, Banner `HeroSection`, 6 section mới và Footer.
     - Toàn bộ 27 từ khóa mục tiêu và 3 địa chỉ thế mạnh (Sao Biển 23, Số 01 Voi Phục, Ngọc Trai Như Quỳnh) đều xuất hiện trong DOM.
     - Tương tác lọc dự án (`OceanParkProjectSamples`), điền & gửi form (`OceanParkContactForm`), đóng/mở Q&A (`OceanParkFaq`) hoạt động mượt cả trên Desktop và Mobile viewport.

# Ocean Park Project Cards, Phone Number & Mobile Form Scroll — Design Spec

**Date:** 2026-10-27  
**Scope:** Small change across `F:\projects\api-rc` and `C:\Users\hung0\Local Sites\noi-that-ichouse\app\public\wp-content\plugins\elementor-addon-ichouse`  
**Target Live URL:** `https://noithat.ichouse.vn/thiet-ke-thi-cong-noi-that-vinhomes-ocean-park-tron-goi-cao-cap`

---

## 1. Intent & Why

Tăng tỷ lệ chuyển đổi (lead generation) và khắc phục lỗi trải nghiệm trên trang đích Vinhomes Ocean Park của IC HOUSE thông qua 3 thay đổi:
1. Tạo hiệu ứng khan hiếm / kích thích đăng ký bằng các thẻ dự án mẫu (`ocean-park-project-card`) ở trạng thái làm mờ (locked/gated), có thể bật/tắt linh hoạt cho từng thẻ ngay trong Elementor.
2. Đồng bộ số điện thoại hotline từ `0869 855 885` sang `0978 305 740` trên toàn bộ hệ thống.
3. Sửa lỗi trên thiết bị di động khi khách bấm vào nút `.ocean-park-intro-secondary-cta` (và các nút trỏ tới `#dang-ky-tu-van`) nhưng không nhìn thấy khung nhập form.

---

## 2. Goals, Non-Goals & Anti-Goals

- **Goals:**
  - Giữ nguyên cấu trúc dữ liệu của `ocean-park-project-card` như các thẻ hiện tại, bổ sung trường trạng thái khóa/làm mờ (`isLocked` / `is_locked`) có thể bật/tắt cho từng thẻ trong Elementor Repeater.
  - Thêm 2 thẻ `ocean-park-project-card` mới ở trạng thái làm mờ vào dữ liệu mẫu và danh sách mặc định của widget (tổng 9 thẻ, vừa khít lưới 3x3 trên desktop).
  - Hiển thị thẻ bị khóa theo **Mẫu A**: làm mờ toàn bộ nội dung thẻ bên dưới kèm lớp phủ (overlay) hộp thông báo khóa nổi bật ở chính giữa dẫn tới `#dang-ky-tu-van`.
  - Đổi toàn bộ SĐT `0869 855 885` (`tel:0869855885`) sang `0978 305 740` (`tel:0978305740`) trong cả 2 repo và tự động chuẩn hóa số cũ sang số mới ở tầng PHP helper.
  - Trên mobile, đưa khung nhập form (`.ocean-park-contact-form-card`) lên trước khối thông tin liên hệ (`.ocean-park-contact-info`) và đảm bảo bấm `.ocean-park-intro-secondary-cta` (hoặc bất kỳ link `#dang-ky-tu-van` nào) luôn cuộn thẳng tới khung nhập form.
- **Non-Goals:**
  - Không thay đổi cấu trúc trường của form liên hệ hay luồng gửi Contact Form 7.
  - Không tạo thêm post type hay trang quản trị ngoài Elementor.
- **Anti-Goals:**
  - Không làm mất khả năng lọc theo phân khu (`zoneId`) và loại căn (`unitTypeId`) của các thẻ bị làm mờ.
  - Không để trang đã lưu sẵn trong database WordPress tiếp tục hiển thị số điện thoại cũ `0869 855 885`.

---

## 3. Constraints

- Mọi thay đổi ở React component trong `api-rc` phải tương thích cả khi render HTML tĩnh/SSR qua `/api/render-rc` lẫn khi hydrate client island (`OceanParkProjectSamplesWrapper`, `OceanParkContactFormWrapper`).
- Các class định danh hiện có (`.ocean-park-project-card`, `.ocean-park-intro-secondary-cta`, `#dang-ky-tu-van`, `.ocean-park-contact-form-card`) phải được giữ nguyên để không phá vỡ CSS và E2E tests.
- Cần cập nhật đồng bộ cả `api-rc` (component, data, tests, build bundles) và plugin `elementor-addon-ichouse` (widgets, helpers, PHPUnit tests, compiled assets nếu có).

---

## 4. Approaches Considered

### Phương án 1 (Đã chọn): Kết hợp CSS Responsive + Xử lý đồng bộ tại Component & PHP Helper
- **Cách làm:**
  - Thêm `isLocked?: boolean` vào `OceanParkProjectCardModel` và control `SWITCHER` (`is_locked`) vào repeater `manual_entries` của `EAI_Ocean_Park_Project_Samples_Widget`.
  - Render thẻ có `isLocked: true` với lớp nội dung bị blur toàn bộ (`blur-[3.5px] opacity-60 select-none pointer-events-none`) và lớp phủ (overlay) ở chính giữa thẻ chứa icon khóa + thông điệp mời đăng ký + nút CTA dẫn tới `#dang-ky-tu-van`.
  - Đặt `!order-first lg:!order-none` trên `.ocean-park-contact-form-card` để ở mobile khung nhập form nằm ngay đầu `#dang-ky-tu-van`, đồng thời thêm sự kiện xử lý click cho các liên kết `a[href="#dang-ky-tu-van"]` để luôn cuộn mượt tới khung form trên mobile kể cả khi URL đã có sẵn `#dang-ky-tu-van`.
  - Cập nhật tất cả chuỗi `0869 855 885` / `0869855885` sang `0978 305 740` / `0978305740` trên cả 2 repo, đồng thời chuẩn hóa tự động số cũ sang số mới trong PHP helper khi build props cho các widget.
- **Đánh đổi & Lý do chọn:** Thêm một lượng nhỏ logic ở client và helper PHP nhưng giải quyết triệt để cả trường hợp dữ liệu cũ đã lưu trong DB WordPress và trường hợp bấm lại nút CTA nhiều lần trên mobile.

### Phương án 2: Chỉ sửa CSS tĩnh & giá trị mặc định (Default)
- **Cách làm:** Chỉ đổi thứ tự cột bằng CSS và chỉ sửa `default` của các control trong Elementor.
- **Đánh đổi:** Không tự động cập nhật số điện thoại trên các trang đã lưu trong database Elementor và không xử lý được việc bấm lại anchor link khi URL đã mang sẵn `#dang-ky-tu-van`. Đã loại bỏ.

---

## 5. Design Decisions (As Agreed)

1. **Giao diện thẻ làm mờ (`ocean-park-project-card` khi `isLocked = true`):**
   - Dùng chung hoàn toàn các trường dữ liệu như thẻ thường (`title`, `zoneId`, `zoneLabel`, `towerLabel`, `unitTypeId`, `unitTypeLabel`, `area`, `apartmentCode`, `style`, `budget`, `summary`, `image`, `detailLink`).
   - Toàn bộ phần media và body của thẻ vẫn render bên dưới nhưng được làm mờ (`!blur-[3.5px] !opacity-60 !select-none !pointer-events-none`).
   - Chính giữa thẻ có lớp phủ liên kết (`<a>` trỏ tới `project.detailLink.url || "#dang-ky-tu-van"`) chứa hộp thông báo khóa màu xanh navy viền vàng gold: biểu tượng khóa (`Lock`), nhãn *"Hồ sơ mẫu độc quyền"*, mô tả ngắn *"Đăng ký để mở khóa trọn bộ mặt bằng 2D, phối cảnh 3D & dự toán chi tiết"*, và nút *"Đăng ký nhận thông tin"*.
2. **Bật/tắt từng thẻ trong Elementor:**
   - Trong repeater `manual_entries` của `EAI_Ocean_Park_Project_Samples_Widget`, mỗi item có thêm control `is_locked` (`Controls_Manager::SWITCHER`, mặc định `''`, nhãn *"Làm mờ / Yêu cầu đăng ký"*).
   - Thêm 2 thẻ mẫu mới ở cuối danh sách (thẻ số 8 và số 9) với `isLocked: true` / `'is_locked' => 'yes'`.
3. **Sửa lỗi cuộn tới form trên mobile:**
   - Trong `OceanParkContactForm.tsx`, thêm `!order-first lg:!order-none` vào `.ocean-park-contact-form-card` để trên mobile khung nhập form hiển thị ngay đầu section `#dang-ky-tu-van` (trên desktop giữ nguyên cột trái là thông tin, cột phải là form).
   - Bổ sung xử lý click cho các liên kết nội trang trỏ tới `#${resolvedSectionId}` (như `.ocean-park-intro-secondary-cta` và thẻ dự án khóa) để cuộn mượt trực tiếp tới `.ocean-park-contact-form-card` trên mobile (hoặc section trên desktop) ngay cả khi hash trên thanh địa chỉ đã trùng.
4. **Đổi SĐT `0869 855 885` → `0978 305 740`:**
   - Thay thế toàn bộ `0869 855 885` → `0978 305 740` và `0869855885` → `0978305740` trong tất cả file data/test của `api-rc` và tất cả widget/helper/test của `elementor-addon-ichouse`.
   - Trong PHP helper, tự động thay thế số cũ `0869 855 885` / `0869855885` thành `0978 305 740` / `0978305740` khi map dữ liệu sang React props.

---

## 6. What's Left to the Builder

- Chi tiết nội dung mẫu của 2 thẻ dự án khóa mới (Đề xuất: 1 căn góc 3PN The London Tòa LD2 và 1 căn 3PN VIP LUMIÈRE SpringBay Ocean Park 2 để phủ đều các tab lọc).
- Bổ sung unit test (PHPUnit) và E2E test (Playwright) kiểm tra: trạng thái thẻ làm mờ, SĐT mới `0978 305 740`, và hành vi click `.ocean-park-intro-secondary-cta` trên viewport mobile cuộn đưa `.ocean-park-contact-form-card` vào khung nhìn.

import type { ContactPopupModel } from "@/components/contact-popup/ContactPopupWrapper";

const contactPopupWrapper: ContactPopupModel = {
  popupKey: "tu-van",
  contentHtml: [
    "<p><strong>Demo liên hệ</strong></p>",
    "<p>Nội dung popup preview (Vite). Trên WordPress, form Contact Form 7 gắn qua #eai-contact-popup-cf7-source-{popupKey}.</p>",
    "<p>Đoạn dưới đây cố ý dài để test scroll trên mobile — cuộn tới cuối form demo.</p>",
    "<p><label>Họ và tên<br/><input type=\"text\" name=\"demo-name\" placeholder=\"Nguyễn Văn A\" style=\"width:100%;padding:0.5rem;margin-top:0.25rem\" /></label></p>",
    "<p><label>Số điện thoại<br/><input type=\"tel\" name=\"demo-phone\" placeholder=\"0900 000 000\" style=\"width:100%;padding:0.5rem;margin-top:0.25rem\" /></label></p>",
    "<p><label>Email<br/><input type=\"email\" name=\"demo-email\" placeholder=\"ban@email.com\" style=\"width:100%;padding:0.5rem;margin-top:0.25rem\" /></label></p>",
    "<p><label>Địa chỉ công trình<br/><input type=\"text\" name=\"demo-address\" placeholder=\"Quận / thành phố\" style=\"width:100%;padding:0.5rem;margin-top:0.25rem\" /></label></p>",
    "<p><label>Loại công trình<br/><input type=\"text\" name=\"demo-type\" placeholder=\"Nhà phố / căn hộ / văn phòng\" style=\"width:100%;padding:0.5rem;margin-top:0.25rem\" /></label></p>",
    "<p><label>Diện tích dự kiến (m²)<br/><input type=\"text\" name=\"demo-area\" placeholder=\"120\" style=\"width:100%;padding:0.5rem;margin-top:0.25rem\" /></label></p>",
    "<p><label>Ngân sách dự kiến<br/><input type=\"text\" name=\"demo-budget\" placeholder=\"Ví dụ: 800 triệu – 1,2 tỷ\" style=\"width:100%;padding:0.5rem;margin-top:0.25rem\" /></label></p>",
    "<p><label>Thời gian mong muốn<br/><input type=\"text\" name=\"demo-timeline\" placeholder=\"Trong 3–6 tháng\" style=\"width:100%;padding:0.5rem;margin-top:0.25rem\" /></label></p>",
    "<p><label>Mô tả dự án<br/><textarea name=\"demo-message\" rows=\"8\" placeholder=\"Mô tả nhu cầu thiết kế / thi công…\" style=\"width:100%;padding:0.5rem;margin-top:0.25rem\"></textarea></label></p>",
    "<p>ICHouse hỗ trợ tư vấn phong cách, vật liệu và tiến độ thi công. Điền đủ thông tin giúp đội ngũ phản hồi nhanh hơn.</p>",
    "<p>Sau khi gửi yêu cầu, chuyên viên sẽ liên hệ trong giờ hành chính để trao đổi chi tiết và hẹn khảo sát nếu cần.</p>",
    "<p><em>Hết nội dung demo — nếu bạn đọc được dòng này trên mobile, scroll đang hoạt động.</em></p>",
    "<p><button type=\"button\" disabled style=\"padding:0.75rem 1.25rem\">Gửi yêu cầu (demo)</button></p>",
  ].join(""),
};

export default contactPopupWrapper;

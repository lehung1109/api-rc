import type { CollaborationIntroModel } from "@/components/collaboration-intro/CollaborationIntro";

const collaborationIntro: CollaborationIntroModel = {
  backgroundImage: {
    url: "https://placehold.co/1920x1080/png?text=Collaboration+Background",
    alt: "",
    display_dimensions: { width: 1920, height: 1080 },
  },
  subtitle: "GIỚI THIỆU & ĐỊNH HƯỚNG HỢP TÁC",
  titleHtml:
    'ICHOUSE là <span class="text-brand-gold">Tổng thầu Thiết kế và Thi công</span> chuyên nghiệp, cung cấp dịch vụ thiết kế và thi công trọn gói cho các công trình nhà ở, khách sạn, resort, văn phòng, nhà hàng, quán cà phê, spa, thương mại trên toàn quốc.',
  image: {
    url: "https://placehold.co/640x480/png?text=Team+Review",
    alt: "Đội ngũ ICHOUSE khảo sát vật liệu thi công",
    display_dimensions: { width: 640, height: 480 },
  },
  bottomTitle:
    "Chúng tôi tìm kiếm những đối tác có năng lực, trách nhiệm và tinh thần hợp tác trong các lĩnh vực:",
  items: [
    {
      image: {
        url: "https://placehold.co/80x80/png?text=Design",
        alt: "",
        display_dimensions: { width: 80, height: 80 },
      },
      title: "Thiết kế kiến trúc",
    },
    {
      image: {
        url: "https://placehold.co/80x80/png?text=Build",
        alt: "",
        display_dimensions: { width: 80, height: 80 },
      },
      title: "Thi công chuyên môn sâu",
    },
    {
      image: {
        url: "https://placehold.co/80x80/png?text=Supply",
        alt: "",
        display_dimensions: { width: 80, height: 80 },
      },
      title: "Cung ứng vật tư, thiết bị",
    },
    {
      image: {
        url: "https://placehold.co/80x80/png?text=Tech",
        alt: "",
        display_dimensions: { width: 80, height: 80 },
      },
      title: "Cung cấp giải pháp công nghệ, kỹ thuật",
    },
    {
      image: {
        url: "https://placehold.co/80x80/png?text=Media",
        alt: "",
        display_dimensions: { width: 80, height: 80 },
      },
      title: "Truyền thông, marketing và sản xuất nội dung",
    },
  ],
  note: "Trước khi gửi hồ sơ, vui lòng tham khảo các tiêu chí và quy trình hợp tác dưới đây để đảm bảo sự phù hợp, hiệu quả trong quá trình làm việc.",
  buttonLabel: "TRỞ THÀNH ĐỐI TÁC ICHOUSE!",
  popupTarget: "tu-van",
};

export default collaborationIntro;
export { collaborationIntro };

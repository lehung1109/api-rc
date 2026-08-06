import type { DirectorProfileModel } from "@/components/director-profile/DirectorProfile";

const directorProfile: DirectorProfileModel = {
  backgroundMobileImage: {
    url: "https://placehold.co/768x1024/152243/ffffff?text=Director+BG+Mobile",
    alt: "Nền hồ sơ giám đốc mobile",
    display_dimensions: {
      width: 768,
      height: 1024,
    },
  },
  backgroundDesktopImage: {
    url: "https://placehold.co/1920x1080/152243/ffffff?text=Director+BG+Desktop",
    alt: "Nền hồ sơ giám đốc desktop",
    display_dimensions: {
      width: 1920,
      height: 1080,
    },
    srcSet:
      "https://placehold.co/1280x800/152243/ffffff?text=Director+BG+Tablet 1280w, " +
      "https://placehold.co/1920x1080/152243/ffffff?text=Director+BG+Desktop 1920w",
    sizes: "100vw",
  },
  subtitle: "GIÁM ĐỐC - TS. NGUYỄN ĐĂNG HẠNH",
  descriptionHtml:
    '<p>Artéco ra đời với mong muốn thay đổi cách thức <span class="text-brand-gold">xây dựng</span> và quy chuẩn về một công trình chất lượng của người Việt. Với sứ mệnh kiến tạo những không gian sống bền vững, chúng tôi mang đến giải pháp thiết kế và thi công đồng bộ, chuẩn mực Châu Âu.</p>',
  items: [
    {
      title: "Giảng viên",
      description:
        "ngành Kỹ thuật xây dựng tại trường ĐH Xây dựng Caen (Pháp) từ năm 2008 đến năm 2014",
    },
    {
      title: "Hơn 15 năm",
      description:
        "kinh nghiệm quản lý và điều hành các dự án xây dựng dân dụng cao cấp tại Việt Nam",
    },
    {
      title: "Tốt nghiệp Tiến sỹ",
      description:
        "ngành Kỹ thuật xây dựng tại Đại học Caen (Pháp), chuyên sâu kết cấu và vật liệu",
    },
    {
      title: "Chủ tịch HĐQT",
      description:
        "công ty Artéco — định hướng chiến lược phát triển và chuẩn hóa quy trình thi công",
    },
    {
      title: "Tác giả",
      description:
        "nhiều công trình nghiên cứu và bài báo khoa học về kỹ thuật xây dựng bền vững",
    },
  ],
  scrollReveal: {
    targetId: "director-profile",
  },
};

export default directorProfile;
export { directorProfile };

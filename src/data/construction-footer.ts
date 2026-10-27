import type { ConstructionFooterModel } from "@/components/construction-footer/ConstructionFooter";
import type { LinkModel } from "@/components/link/Link";

const link = (url: string, is_external = false): LinkModel => ({
  url,
  is_external,
  nofollow: false,
});

const iconDimensions = { width: 20, height: 20 };

const constructionFooter: ConstructionFooterModel = {
  logo: {
    url: "https://placehold.co/220x80/png?text=ICHOUSE",
    alt: "ICHOUSE",
    display_dimensions: { width: 220, height: 80 },
    link: link("/"),
  },
  menuItems: [
    { label: "Trang chủ", link: link("/") },
    { label: "Về chúng tôi", link: link("/ve-chung-toi") },
    { label: "Lĩnh vực", link: link("/linh-vuc") },
    { label: "Dự án", link: link("/du-an") },
    { label: "Tin tức", link: link("/tin-tuc") },
    { label: "Hợp tác", link: link("/hop-tac") },
    { label: "Tuyển dụng", link: link("/tuyen-dung") },
    { label: "Liên hệ", link: link("/lien-he") },
  ],
  companyName: "Công ty cổ phần Tư vấn Kiến trúc, Kỹ thuật và Xây dựng ICHOUSE",
  socialLinks: [
    {
      ariaLabel: "Facebook",
      icon: {
        url: "https://placehold.co/20x20/png?text=f",
        alt: "Facebook",
        display_dimensions: iconDimensions,
      },
      link: link("https://facebook.com", true),
    },
    {
      ariaLabel: "TikTok",
      icon: {
        url: "https://placehold.co/20x20/png?text=tt",
        alt: "TikTok",
        display_dimensions: iconDimensions,
      },
      link: link("https://tiktok.com", true),
    },
    {
      ariaLabel: "YouTube",
      icon: {
        url: "https://placehold.co/20x20/png?text=yt",
        alt: "YouTube",
        display_dimensions: iconDimensions,
      },
      link: link("https://youtube.com", true),
    },
    {
      ariaLabel: "Instagram",
      icon: {
        url: "https://placehold.co/20x20/png?text=ig",
        alt: "Instagram",
        display_dimensions: iconDimensions,
      },
      link: link("https://instagram.com", true),
    },
  ],
  phone: {
    text: "0978 305 740",
    link: link("tel:0978305740"),
  },
  addresses: [
    "Trụ sở Văn phòng: Số 01 Voi Phục, Gia Lâm, Hà Nội",
    "Nhà mẫu nội thất: Sao Biển 23, KĐT Vinhomes Ocean Park, Gia Lâm, Hà Nội",
    "Nhà máy sản xuất: Thôn Ngọc Trai, Xã Như Quỳnh, Tỉnh Hưng Yên",
  ],
  email: {
    text: "noithatichouse@gmail.com",
    link: link("mailto:noithatichouse@gmail.com"),
  },
  copyright: "Copyright © 2026 ICHOUSE Vietnam. All rights reserved.",
  badge: {
    url: "https://placehold.co/120x32/png?text=DMCA",
    alt: "DMCA Protected",
    display_dimensions: { width: 120, height: 32 },
  },
};

export default constructionFooter;

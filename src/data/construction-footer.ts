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
    text: "0899 984 988",
    link: link("tel:0899984988"),
  },
  addresses: [
    "Số 07 ngõ 71, phố Hoàng Văn Thái, phường Phương Liệt, Hà Nội",
    "Số 506/15/24, đường 3/2, phường Diễn Hồng, TP. Hồ Chí Minh",
  ],
  email: {
    text: "contact@ICHOUSE.vn",
    link: link("mailto:contact@ICHOUSE.vn"),
  },
  copyright: "Copyright © 2026 ICHOUSE Vietnam. All rights reserved.",
  badge: {
    url: "https://placehold.co/120x32/png?text=DMCA",
    alt: "DMCA Protected",
    display_dimensions: { width: 120, height: 32 },
  },
};

export default constructionFooter;

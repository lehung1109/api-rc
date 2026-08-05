import type { ConstructionHeaderModel } from "@/components/construction-header/ConstructionHeader";
import type { LinkModel } from "@/components/link/Link";
import { autocompleteSearch } from "./autocomplete-search";
import constructionHeaderScrollMonitor from "./construction-header-scroll-monitor";

const link = (url: string, is_external = false): LinkModel => ({
  url,
  is_external,
  nofollow: false,
});

const iconDimensions = { width: 24, height: 24 };

const constructionHeader: ConstructionHeaderModel = {
  headerTop: {
    hotlineText: "Hotline: 0000 000 000",
  },
  logo: {
    url: "https://noithat.ichouse.vn/wp-content/uploads/2024/02/logo.jpg",
    alt: "ICHouse",
    display_dimensions: {
      width: 150,
      height: 150,
    },
    link: {
      url: "/",
      is_external: false,
      nofollow: false,
    },
  },
  menu: {
    navAriaLabel: "Điều hướng chính",
    openSubmenuLabelPrefix: "Mở menu",
    items: [
      { label: "Trang chủ", href: "/", active: true },
      { label: "Giới thiệu", href: "/gioi-thieu" },
      {
        label: "Dịch vụ",
        href: "/dich-vu",
        children: [
          { label: "Thiết kế kiến trúc", href: "/dich-vu/thiet-ke-kien-truc" },
          { label: "Thi công xây dựng", href: "/dich-vu/thi-cong-xay-dung" },
          { label: "Nội thất", href: "/dich-vu/noi-that" },
        ],
      },
      {
        label: "Dự án",
        href: "/du-an",
        children: [
          { label: "Nhà phố", href: "/du-an/nha-pho" },
          { label: "Biệt thự", href: "/du-an/biet-thu" },
          { label: "Chung cư", href: "/du-an/chung-cu" },
        ],
      },
      { label: "Tin tức", href: "/tin-tuc" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
  },
  socialLinks: [
    {
      icon: {
        url: "https://placehold.co/24x24/png?text=FB",
        alt: "Facebook",
        display_dimensions: iconDimensions,
      },
      link: link("https://facebook.com", true),
    },
    {
      icon: {
        url: "https://placehold.co/24x24/png?text=YT",
        alt: "YouTube",
        display_dimensions: iconDimensions,
      },
      link: link("https://youtube.com", true),
    },
    {
      icon: {
        url: "https://placehold.co/24x24/png?text=ZL",
        alt: "Zalo",
        display_dimensions: iconDimensions,
      },
      link: link("https://zalo.me", true),
    },
  ],
  background: {
    img: {
      url: "https://placehold.co/768x1024/152243/ffffff?text=Header+BG+Mobile",
      alt: "Nền header construction",
      width: 768,
      height: 1024,
    },
    sources: [
      {
        media: "(min-width: 768px)",
        srcSet: "/images/concrete-bg-official-updated.jpg",
      },
    ],
  },
  autocomplete_search: autocompleteSearch,
  scrollMonitor: constructionHeaderScrollMonitor,
  openMenuLabel: "Mở menu",
  closeMenuLabel: "Đóng menu",
  openSearchLabel: "Mở tìm kiếm",
  closeSearchLabel: "Đóng tìm kiếm",
  searchMenuItemLabel: "Tìm kiếm",
  menuModalAnimation: {
    enableFadeIn: true,
    enableSlideIn: true,
  },
  searchModalAnimation: {
    enableFadeIn: true,
    enableSlideIn: true,
  },
};

export default constructionHeader;
export { constructionHeader };

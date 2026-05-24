import type { HeaderModel } from "@components/header/Header";
import { autocompleteSearch } from "./autocomplete-search";

const header: HeaderModel = {
  headerTop: {
    text: "Chào mừng bạn đến với ABC",
    phone: "0000000000",
    link_phone: {
      url: "https://zalo.me/0000000000",
      nofollow: true,
      is_external: true,
    },
    autocomplete_search: autocompleteSearch,
  },
  headerInner: {
    logo: {
      url: "//noithat.ichouse.vn/wp-content/uploads/2024/02/ct-el-logo-dark.png",
      alt: "Logo",
      display_dimensions: {
        width: 100,
        height: 100,
      },
      link: {
        url: "https://www.google.com",
        nofollow: true,
        is_external: true,
      },
    },
    info_list: [
      {
        icon: {
          url: "//noithat.ichouse.vn/wp-content/uploads/2024/02/ct-el-logo-dark.png",
          alt: "Icon",
          display_dimensions: {
            width: 100,
            height: 100,
          },
        },
        text: "<p><strong>Giờ làm việc</strong></p><p>T2 - T7 8:00 - 17:30</p>",
      },
      {
        icon: {
          url: "//noithat.ichouse.vn/wp-content/uploads/2024/02/ct-el-logo-dark.png",
          alt: "Icon",
          display_dimensions: {
            width: 100,
            height: 100,
          },
        },
        text: "<p><strong>Giờ làm việc</strong></p><p>T2 - T7 8:00 - 17:30</p>",
      },
      {
        icon: {
          url: "//noithat.ichouse.vn/wp-content/uploads/2024/02/ct-el-logo-dark.png",
          alt: "Icon",
          display_dimensions: {
            width: 100,
            height: 100,
          },
        },
        text: "<p><strong>Giờ làm việc</strong></p><p>T2 - T7 8:00 - 17:30</p>",
      },
    ],
  },
  headerMenu: {
    items: [
      { label: "Trang chủ", href: "/", active: true },
      { label: "Nhà máy sản xuất", href: "/nha-may-san-xuat" },
      {
        label: "Thiết kế nội thất",
        href: "/thiet-ke-noi-that",
        children: [
          { label: "Thiết kế nội thất chung cư", href: "/tk/chung-cu" },
          { label: "Thiết kế nội thất biệt thự", href: "/tk/biet-thu" },
          { label: "Thiết kế nội thất nhà phố", href: "/tk/nha-pho" },
        ],
      },
      {
        label: "Thi công nội thất",
        href: "/thi-cong-noi-that",
        children: [
          { label: "Thi công nội thất chung cư", href: "/tc/chung-cu" },
          { label: "Thi công nội thất biệt thự", href: "/tc/biet-thu" },
        ],
      },
      {
        label: "Tin Tức",
        href: "/tin-tuc",
        active: false,
        children: [
          {
            label: "Thiết kế nội thất",
            children: [
              { label: "Thiết kế nội thất biệt thự", href: "/tt/biet-thu" },
              { label: "Thiết kế nội thất chung cư", href: "/tt/chung-cu" },
              { label: "Thiết kế nội thất nhà phố", href: "/tt/nha-pho" },
              { label: "Thiết kế nội thất văn phòng", href: "/tt/van-phong" },
            ],
          },
          {
            label: "Thi công nội thất",
            children: [
              { label: "Thi công nội thất chung cư", href: "/tt/tc-chung-cu" },
              { label: "Thi công nội thất biệt thự", href: "/tt/tc-biet-thu" },
            ],
          },
          {
            label: "Kiến thức nội thất",
            children: [
              { label: "Phong cách nội thất", href: "/tt/phong-cach" },
              { label: "Tủ bếp", href: "/tt/tu-bep" },
              { label: "Tủ quần áo", href: "/tt/tu-quan-ao" },
              { label: "Giường ngủ", href: "/tt/giuong-ngu" },
            ],
          },
        ],
      },
      { label: "Báo giá", href: "/bao-gia" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
  },
};

export { header };

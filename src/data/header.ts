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
};

export { header };

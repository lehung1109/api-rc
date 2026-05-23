import type { HeaderModel } from "@components/header/Header";

const header: HeaderModel = {
  headerTop: {
    text: "Chào mừng bạn đến với ABC",
    phone: "0000000000",
    link_phone: {
      url: "https://zalo.me/0000000000",
      nofollow: true,
      is_external: true,
    },
    autocomplete_search: {
      placeholder: "Gõ tìm kiếm...",
      api_url: "http://noi-that-ichouse.local/wp-json/wp/v2/search",
    },
  },
};

export { header };

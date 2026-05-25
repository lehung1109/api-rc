import type { HeaderTopModel } from "@/components/header/HeaderTop";
import { autocompleteSearch } from "./autocomplete-search";

const headerTop: HeaderTopModel = {
  text: "Chào mừng bạn đến với ABC",
  phone: "0000000000",
  link_phone: {
    url: "https://zalo.me/0000000000",
    nofollow: true,
    is_external: true,
  },
  autocomplete_search: autocompleteSearch,
};

export { headerTop };

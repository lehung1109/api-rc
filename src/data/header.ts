import type { HeaderModel } from "@components/header/Header";
import { autocompleteSearch } from "./autocomplete-search";
import { headerInner } from "./header-inner";
import { headerTop } from "./header-top";
import { headerMenu } from "./header-menu";

const header: HeaderModel = {
  headerTop: headerTop,
  headerInner: headerInner,
  headerMenu: headerMenu,
  autocomplete_search: autocompleteSearch,
};

export { header };

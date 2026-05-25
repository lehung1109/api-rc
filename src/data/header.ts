import type { HeaderModel } from "@components/header/Header";
import { headerInner } from "./header-inner";
import { headerTop } from "./header-top";
import { headerMenu } from "./header-menu";

const header: HeaderModel = {
  headerTop: headerTop,
  headerInner: headerInner,
  headerMenu: headerMenu,
};

export { header };

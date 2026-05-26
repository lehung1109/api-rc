import { X } from "lucide-react";

import type { HeaderInnerModel } from "./HeaderInner";
import HeaderInner from "./HeaderInner";
import type { HeaderMenuModel } from "./HeaderMenu";
import HeaderMenu from "./HeaderMenu";
import HeaderSearch from "./HeaderSearch";
import type { HeaderTopModel } from "./HeaderTop";
import HeaderTop from "./HeaderTop";
import type { AutocompleteSearchModel } from "./AutocompleteSearch";

export interface HeaderModel {
  headerTop: HeaderTopModel;
  headerInner: HeaderInnerModel;
  headerMenu: HeaderMenuModel;
  autocomplete_search: AutocompleteSearchModel;
}

const Header = (model: HeaderModel) => {
  const { headerTop, headerInner, headerMenu, autocomplete_search } = model;

  return (
    <header className="header sticky top-0 z-50 left-0 right-0 bg-white shadow-md md:contents md:static">
      <input
        id="header-menu-open"
        type="checkbox"
        className="peer/header-menu sr-only"
      />

      <div className="header-top-wrapper hidden md:block">
        <HeaderTop {...headerTop} />
      </div>

      <div className="header-bar container py-4">
        <HeaderInner {...headerInner} />
      </div>

      <div className="header-menu-panel max-md:fixed max-md:inset-0 max-md:z-50 max-md:flex max-md:translate-x-full max-md:flex-col max-md:overflow-y-auto max-md:bg-white max-md:transition-transform max-md:duration-300 max-md:peer-checked/header-menu:translate-x-0 md:contents">
        <div className="header-overlay-toolbar flex max-md:items-center max-md:gap-2 max-md:p-4 md:contents">
          <HeaderSearch
            autocomplete_search={autocomplete_search}
            className="max-md:flex-1 md:pointer-events-auto md:absolute md:top-0 md:left-1/2 md:z-20 md:h-[52px] md:w-full md:max-w-[420px] md:-translate-x-1/2 md:items-center md:px-4"
          />

          <label
            htmlFor="header-menu-open"
            className="header-menu-close flex shrink-0 cursor-pointer items-center justify-center p-5 md:hidden"
            aria-label="Đóng menu"
          >
            <X className="h-8 w-8" />
          </label>
        </div>

        <HeaderMenu {...headerMenu} />
      </div>
    </header>
  );
};

export default Header;

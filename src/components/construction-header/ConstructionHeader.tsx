import { Menu, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import ClientComponentWrapper from "../ClientComponentWrapper";
import type { AutocompleteSearchModel } from "../header/AutocompleteSearch";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
import type { ConstructionHeaderMenuModel } from "./ConstructionHeaderMenu";
import type {
  ConstructionHeaderMenuModalModel,
  ConstructionHeaderPictureModel,
  ConstructionHeaderSocialLinkModel,
} from "./ConstructionHeaderMenuModal";
import ConstructionHeaderMenuModal from "./ConstructionHeaderMenuModal";
import type { ConstructionHeaderModalAnimationModel } from "./ConstructionHeaderSearchModal";
import ConstructionHeaderSearchModal from "./ConstructionHeaderSearchModal";
import type { ConstructionHeaderScrollMonitorModel } from "./ConstructionHeaderScrollMonitor";
import ConstructionHeaderScrollMonitor from "./ConstructionHeaderScrollMonitor";
import type { ConstructionHeaderTopModel } from "./ConstructionHeaderTop";
import ConstructionHeaderTop from "./ConstructionHeaderTop";

export const CONSTRUCTION_HEADER_MENU_CHECKBOX_ID =
  "construction-header-menu-open";
export const CONSTRUCTION_HEADER_SEARCH_CHECKBOX_ID =
  "construction-header-search-open";
export const CONSTRUCTION_HEADER_ROOT_ID = "construction-header";

export interface ConstructionHeaderModel {
  className?: string;
  headerTop: ConstructionHeaderTopModel;
  logo: MediaModel;
  menu: Omit<ConstructionHeaderMenuModel, "searchItem">;
  socialLinks: ConstructionHeaderSocialLinkModel[];
  background: ConstructionHeaderPictureModel;
  autocomplete_search: AutocompleteSearchModel;
  scrollMonitor: ConstructionHeaderScrollMonitorModel;
  openMenuLabel: string;
  closeMenuLabel: string;
  openSearchLabel: string;
  closeSearchLabel: string;
  searchMenuItemLabel: string;
  menuModalAnimation?: ConstructionHeaderModalAnimationModel;
  searchModalAnimation?: ConstructionHeaderModalAnimationModel;
  /** When true, scrolled background is visible from the initial state. */
  alwaysShowBackground?: boolean;
}

const ConstructionHeader = (model: ConstructionHeaderModel) => {
  const {
    className,
    headerTop,
    logo,
    menu,
    socialLinks,
    background,
    autocomplete_search,
    scrollMonitor,
    openMenuLabel,
    closeMenuLabel,
    openSearchLabel,
    closeSearchLabel,
    searchMenuItemLabel,
    menuModalAnimation,
    searchModalAnimation,
    alwaysShowBackground = false,
  } = model;

  const headerId = scrollMonitor.targetId || CONSTRUCTION_HEADER_ROOT_ID;

  const menuModalModel: ConstructionHeaderMenuModalModel = {
    logo,
    socialLinks,
    background,
    closeLabel: closeMenuLabel,
    checkboxId: CONSTRUCTION_HEADER_MENU_CHECKBOX_ID,
    ...(menuModalAnimation ? { animation: menuModalAnimation } : {}),
    menu: {
      ...menu,
      searchItem: {
        label: searchMenuItemLabel,
        checkboxId: CONSTRUCTION_HEADER_SEARCH_CHECKBOX_ID,
      },
    },
  };

  const enableMenuFadeIn = menuModalAnimation?.enableFadeIn !== false;
  const enableMenuSlideIn = menuModalAnimation?.enableSlideIn !== false;

  return (
    <header
      id={headerId}
      {...(alwaysShowBackground ? { "data-solid": "true" } : {})}
      className={cn(
        "construction-header group/construction-header !z-50 !left-0 !right-0 !top-0",
        "!fixed md:!absolute md:data-[scrolled=true]:!fixed",
        "!bg-transparent",
        className,
      )}
    >
      <input
        id={CONSTRUCTION_HEADER_MENU_CHECKBOX_ID}
        type="checkbox"
        className="peer/menu !sr-only"
      />
      <input
        id={CONSTRUCTION_HEADER_SEARCH_CHECKBOX_ID}
        type="checkbox"
        className="peer/search !sr-only"
      />

      <div
        className={cn(
          "construction-header-scrolled-background !pointer-events-none !absolute !inset-0 !-z-10 !overflow-hidden !bg-brand-white-hover",
          "!opacity-0 !transition-opacity !duration-300",
          "group-data-[scrolled=true]/construction-header:!opacity-100",
          alwaysShowBackground && "!opacity-100",
        )}
        aria-hidden
      >
        <picture className="!absolute !inset-0 !block !h-full !w-full">
          {(background.sources ?? []).map((source) => (
            <source
              key={`${source.media}-${source.srcSet}`}
              media={source.media}
              srcSet={source.srcSet}
            />
          ))}
          <img
            src={background.img.url}
            alt={background.img.alt}
            width={background.img.width}
            height={background.img.height}
            className="!h-full !w-full !object-cover"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <ConstructionHeaderTop {...headerTop} />

      <div
        className={cn(
          "construction-header-bar !relative !z-20 !flex !items-center !justify-between !gap-4 !border-b !border-brand-white !px-[30px] !py-4 md:!pointer-events-none",
          "group-data-[scrolled=true]/construction-header:!border-brand-navy",
          "group-data-[solid=true]/construction-header:!border-brand-navy",
          // Forward peer/menu to nested modal (modal is no longer a sibling of the checkbox)
          "max-md:peer-checked/menu:[&_.construction-header-menu-modal]:!visible",
          "max-md:peer-checked/menu:[&_.construction-header-menu-modal]:!pointer-events-auto",
          enableMenuFadeIn &&
            "max-md:peer-checked/menu:[&_.construction-header-menu-modal]:!opacity-100",
          enableMenuSlideIn &&
            "max-md:peer-checked/menu:[&_.construction-header-menu-modal-close]:!translate-y-0 max-md:peer-checked/menu:[&_.construction-header-menu-modal-body]:!translate-y-0",
        )}
      >
        <div className="construction-header-logo !max-w-[120px] !leading-0 md:!pointer-events-auto">
          <Media {...logo} className="!h-auto !w-full" />
        </div>

        <div className="construction-header-actions !flex !items-center !gap-1 md:!hidden">
          <label
            htmlFor={CONSTRUCTION_HEADER_SEARCH_CHECKBOX_ID}
            className={cn(
              "construction-header-search-open !flex !cursor-pointer !items-center !justify-center !p-3 !text-brand-white !transition-colors !duration-150",
              "group-data-[scrolled=true]/construction-header:!text-brand-navy",
              "group-data-[solid=true]/construction-header:!text-brand-navy",
            )}
            aria-label={openSearchLabel}
          >
            <Search className="!h-6 !w-6" />
          </label>
          <label
            htmlFor={CONSTRUCTION_HEADER_MENU_CHECKBOX_ID}
            className={cn(
              "construction-header-menu-open !flex !cursor-pointer !items-center !justify-center !p-3 !text-brand-white !transition-colors !duration-150",
              "group-data-[scrolled=true]/construction-header:!text-brand-navy",
              "group-data-[solid=true]/construction-header:!text-brand-navy",
            )}
            aria-label={openMenuLabel}
          >
            <Menu className="!h-7 !w-7" />
          </label>
        </div>

        <ConstructionHeaderMenuModal {...menuModalModel} />
      </div>

      <ConstructionHeaderSearchModal
        autocomplete_search={autocomplete_search}
        closeLabel={closeSearchLabel}
        checkboxId={CONSTRUCTION_HEADER_SEARCH_CHECKBOX_ID}
        {...(searchModalAnimation
          ? { animation: searchModalAnimation }
          : {})}
      />

      <ClientComponentWrapper
        type="constructionHeaderScrollMonitor"
        hydrateData={scrollMonitor}
        className="construction-header-scroll-monitor !hidden"
      >
        <ConstructionHeaderScrollMonitor {...scrollMonitor} />
      </ClientComponentWrapper>
    </header>
  );
};

export default ConstructionHeader;

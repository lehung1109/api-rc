import { ChevronDownIcon, Search } from "lucide-react";

import { cn } from "@/lib/utils";

export type ConstructionHeaderMenuItemModel = {
  label: string;
  href?: string;
  children?: ConstructionHeaderMenuItemModel[];
  active?: boolean;
};

export interface ConstructionHeaderMenuSearchItemModel {
  label: string;
  checkboxId: string;
}

export interface ConstructionHeaderMenuModel {
  items: ConstructionHeaderMenuItemModel[];
  navAriaLabel: string;
  openSubmenuLabelPrefix: string;
  searchItem?: ConstructionHeaderMenuSearchItemModel;
  className?: string;
  checkboxIdPrefix?: string;
}

function normalizeHref(href?: string) {
  return href || "#";
}

function hasLevel3(children?: ConstructionHeaderMenuItemModel[]) {
  return !!children?.some((item) => item.children && item.children.length > 0);
}

const linkBaseClass = cn(
  "construction-header-menu-link flex items-center text-base transition-colors duration-150",
  "text-brand-white md:text-brand-white",
);

function getLinkClass(active?: boolean, isContact?: boolean) {
  return cn(
    linkBaseClass,
    active ? "font-bold" : "font-medium",
    active
      ? "text-brand-gold md:text-brand-gold"
      : "hover:text-brand-gold md:hover:text-brand-gold",
    isContact &&
      cn(
        "border border-brand-white px-4 py-2",
        "md:border-brand-white",
        "md:hover:bg-brand-gold md:hover:border-brand-gold md:hover:text-brand-white",
      ),
  );
}

function renderMenuDropdownBody(
  level2: ConstructionHeaderMenuItemModel[],
  useColumns: boolean,
) {
  if (useColumns) {
    return (
      <div
        className={cn(
          "construction-header-menu-dropdown-body",
          "flex flex-col gap-6 px-6 py-4",
          "md:grid md:auto-cols-fr md:grid-flow-col md:gap-5 md:px-5 md:py-4 md:w-max",
        )}
      >
        {level2.map((col) => (
          <div
            key={col.label}
            className="construction-header-menu-section min-w-0 md:min-w-[200px]"
          >
            {col.href ? (
              <a
                href={normalizeHref(col.href)}
                className="construction-header-menu-section-title mb-2 block text-[15px] font-bold uppercase text-brand-white hover:text-brand-gold md:mb-3 md:text-brand-navy md:hover:text-brand-gold"
              >
                {col.label}
              </a>
            ) : (
              <p className="construction-header-menu-section-title mb-2 text-[15px] font-bold uppercase text-brand-white md:mb-3 md:text-brand-navy">
                {col.label}
              </p>
            )}

            <ul className="mb-0 px-2 md:px-0">
              {(col.children ?? []).map((child) => (
                <li key={child.label}>
                  <a
                    href={normalizeHref(child.href)}
                    className="construction-header-menu-submenu-link block py-2 text-base leading-[1.35] text-brand-white/80 transition-colors duration-150 hover:text-brand-gold md:text-brand-navy/70 md:hover:text-brand-gold"
                  >
                    {child.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="construction-header-menu-dropdown-body min-w-0 px-6 py-4 md:min-w-[220px] md:px-4">
      <ul className="mb-0">
        {level2.map((sub) => (
          <li key={sub.label}>
            <a
              href={normalizeHref(sub.href)}
              className="construction-header-menu-submenu-link block py-2 text-base leading-[1.35] text-brand-white transition-all duration-150 hover:pl-2 hover:font-bold hover:text-brand-gold md:text-brand-navy md:hover:text-brand-gold"
            >
              {sub.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ConstructionHeaderMenu = (model: ConstructionHeaderMenuModel) => {
  const {
    items,
    navAriaLabel,
    openSubmenuLabelPrefix,
    searchItem,
    className = "",
    checkboxIdPrefix = "construction-header-menu-item",
  } = model;

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={navAriaLabel}
      className={cn("construction-header-menu relative", className)}
    >
      <ul
        className={cn(
          "construction-header-menu-list mb-0 flex flex-col",
          "md:flex-row md:flex-wrap md:items-center md:justify-end md:gap-1",
        )}
      >
        {items.map((item, index) => {
          const level2 = item.children ?? [];
          const hasDropdown = level2.length > 0;
          const useColumns = hasLevel3(level2);
          const itemCheckboxId = `${checkboxIdPrefix}-${index}`;
          const isContact = index === items.length - 1;
          const isOpenBold =
            "has-[:checked]:font-bold has-[:checked]:[&_.construction-header-menu-link]:font-bold";

          if (!hasDropdown) {
            return (
              <li
                key={item.label}
                className={cn(
                  "construction-header-menu-item relative",
                  item.active && "font-bold",
                )}
              >
                <a
                  href={normalizeHref(item.href)}
                  className={cn(
                    getLinkClass(item.active, isContact),
                    "h-12 px-4",
                    item.active && "font-bold",
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                </a>
              </li>
            );
          }

          return (
            <li
              key={item.label}
              className={cn(
                "construction-header-menu-item group relative",
                "has-[:checked]:[&_.construction-header-menu-chevron]:rotate-180",
                isOpenBold,
                item.active && "font-bold",
              )}
            >
              <input
                type="checkbox"
                id={itemCheckboxId}
                className="peer/sub sr-only"
              />

              <div className="construction-header-menu-link-row flex h-12 items-stretch peer-checked/sub:[&_.construction-header-menu-link]:font-bold peer-checked/sub:[&_.construction-header-menu-link]:text-brand-gold">
                <a
                  href={normalizeHref(item.href)}
                  className={cn(
                    getLinkClass(item.active, false),
                    "flex-1 px-4",
                    item.active && "font-bold",
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                </a>

                <label
                  htmlFor={itemCheckboxId}
                  className={cn(
                    "construction-header-menu-chevron-trigger flex shrink-0 cursor-pointer items-center px-4 text-brand-white",
                    "md:pointer-events-none md:cursor-default md:px-1 md:text-brand-white",
                  )}
                  aria-label={`${openSubmenuLabelPrefix} ${item.label}`}
                >
                  <ChevronDownIcon className="construction-header-menu-chevron h-5 w-5 transition-transform duration-200" />
                </label>
              </div>

              <div
                className={cn(
                  "construction-header-menu-dropdown",
                  "max-md:max-h-0 max-md:overflow-hidden max-md:opacity-0 max-md:-translate-x-4",
                  "max-md:transition-all max-md:duration-300 max-md:ease-out",
                  "max-md:peer-checked/sub:max-h-[800px] max-md:peer-checked/sub:opacity-100 max-md:peer-checked/sub:translate-x-0",
                  "md:invisible md:absolute md:right-0 md:top-full md:z-50 md:min-w-[220px] md:opacity-0 md:transition-opacity md:duration-200",
                  "md:group-hover:visible md:group-hover:opacity-100",
                )}
              >
                <div
                  className={cn(
                    "construction-header-menu-dropdown-inner relative",
                    "max-md:border-0 max-md:bg-transparent max-md:shadow-none",
                    "md:border md:border-brand-navy/15 md:bg-brand-white md:shadow-md md:shadow-brand-navy/10",
                    useColumns ? "md:flex md:justify-end" : "",
                  )}
                >
                  {renderMenuDropdownBody(level2, useColumns)}
                </div>
              </div>
            </li>
          );
        })}

        {searchItem ? (
          <li className="construction-header-menu-item construction-header-menu-item--search relative hidden md:block">
            <label
              htmlFor={searchItem.checkboxId}
              className={cn(
                linkBaseClass,
                "h-12 cursor-pointer gap-2 px-4 font-medium hover:text-brand-gold",
              )}
            >
              <Search className="h-4 w-4" aria-hidden />
              <span>{searchItem.label}</span>
            </label>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default ConstructionHeaderMenu;

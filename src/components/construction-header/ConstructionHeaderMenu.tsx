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

const linkBaseClass =
  "construction-header-menu-link flex items-center text-xl transition-[color,background-color,font-weight] duration-150";

const mobileHoverBgClass = "max-md:hover:bg-[rgb(0_0_0/10%)]";
const mobileOpenBgClass = "max-md:has-[:checked]:bg-[rgb(0_0_0/5%)]";
const submenuLinkClass = cn(
  "construction-header-menu-submenu-link block py-2 text-base font-normal leading-[1.35]",
  "text-brand-navy/80 transition-[color,font-weight] duration-150",
  "hover:font-bold hover:text-brand-navy",
  "md:text-brand-navy/70 md:hover:font-bold md:hover:text-brand-gold",
);

function getLinkClass(
  active?: boolean,
  isContact?: boolean,
  options?: { hoverBg?: boolean },
) {
  const hoverBg = options?.hoverBg !== false;

  return cn(
    linkBaseClass,
    active
      ? "font-bold text-brand-navy md:text-brand-gold"
      : "font-medium text-brand-navy/80 md:text-brand-white",
    "max-md:hover:font-bold max-md:hover:text-brand-navy",
    hoverBg && mobileHoverBgClass,
    !active && "md:hover:text-brand-gold",
    isContact &&
      cn(
        "md:border md:border-brand-white md:px-4 md:py-2",
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
                className="construction-header-menu-section-title mb-2 block text-[15px] font-normal uppercase text-brand-navy hover:text-brand-navy md:mb-3 md:text-brand-navy md:hover:text-brand-gold"
              >
                {col.label}
              </a>
            ) : (
              <p className="construction-header-menu-section-title mb-2 text-[15px] font-normal uppercase text-brand-navy md:mb-3 md:text-brand-navy">
                {col.label}
              </p>
            )}

            <ul className="mb-0 px-2 md:px-0">
              {(col.children ?? []).map((child) => (
                <li key={child.label}>
                  <a
                    href={normalizeHref(child.href)}
                    className={submenuLinkClass}
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
              className={cn(submenuLinkClass, "md:text-brand-navy")}
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
                    "h-12 w-full px-6 md:px-4",
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
                mobileOpenBgClass,
                item.active && "font-bold",
              )}
            >
              <input
                type="checkbox"
                id={itemCheckboxId}
                className="peer/sub sr-only"
              />

              <div
                className={cn(
                  "construction-header-menu-link-row group/row flex h-12 items-stretch",
                  mobileHoverBgClass,
                  "max-md:peer-checked/sub:bg-[rgb(0_0_0/5%)]",
                  "peer-checked/sub:[&_.construction-header-menu-link]:text-brand-navy",
                  "peer-checked/sub:[&_.construction-header-menu-chevron-trigger]:text-brand-navy",
                  "md:peer-checked/sub:[&_.construction-header-menu-link]:text-brand-gold",
                )}
              >
                <a
                  href={normalizeHref(item.href)}
                  className={cn(
                    getLinkClass(item.active, false, { hoverBg: false }),
                    "flex-1 px-6 md:px-4",
                    "max-md:group-hover/row:font-bold max-md:group-hover/row:text-brand-navy",
                    item.active && "font-bold",
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                </a>

                <label
                  htmlFor={itemCheckboxId}
                  className={cn(
                    "construction-header-menu-chevron-trigger flex shrink-0 cursor-pointer items-center pr-6 pl-8 text-brand-navy/80 transition-colors duration-150",
                    "max-md:group-hover/row:text-brand-navy",
                    "md:pointer-events-none md:cursor-default md:px-1 md:text-brand-white",
                    item.active && "text-brand-navy",
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
                  "max-md:transition-none",
                  "max-md:peer-checked/sub:max-h-[800px] max-md:peer-checked/sub:opacity-100 max-md:peer-checked/sub:translate-x-0",
                  "max-md:peer-checked/sub:bg-[rgb(0_0_0/5%)]",
                  "max-md:peer-checked/sub:transition-all max-md:peer-checked/sub:duration-300 max-md:peer-checked/sub:ease-out",
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
                "h-12 cursor-pointer gap-2 px-6 font-medium text-brand-navy/80 hover:text-brand-navy md:px-4 md:text-brand-white md:hover:text-brand-gold",
                mobileHoverBgClass,
                "max-md:hover:font-bold",
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

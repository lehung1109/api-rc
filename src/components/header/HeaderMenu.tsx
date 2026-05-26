import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type HeaderMenuItemModel = {
  label: string;
  href?: string;
  children?: HeaderMenuItemModel[];
  active?: boolean;
};

export interface HeaderMenuModel {
  items: HeaderMenuItemModel[];
  className?: string;
}

function normalizeHref(href?: string) {
  return href || "#";
}

function hasLevel3(children?: HeaderMenuItemModel[]) {
  return !!children?.some((item) => item.children && item.children.length > 0);
}

const linkBaseClass =
  "header-menu-link flex items-center text-[17px] font-medium transition-colors duration-150 text-white";

function getLinkClass(active?: boolean) {
  return cn(
    linkBaseClass,
    active ? "!bg-[#f47c20]" : "!bg-[#1f1f1f] hover:!bg-[#f47c20]",
  );
}

function renderMenuDropdownBody(
  level2: HeaderMenuItemModel[],
  useColumns: boolean,
) {
  if (useColumns) {
    return (
      <div
        className={cn(
          "header-menu-dropdown-body",
          "flex flex-col gap-6 px-4 py-4",
          "md:grid md:auto-cols-fr md:grid-flow-col md:gap-5 md:px-7 md:py-6 md:w-max",
        )}
      >
        {level2.map((col) => (
          <div key={col.label} className="header-menu-section min-w-0 md:min-w-[270px]">
            {col.href ? (
              <a
                href={normalizeHref(col.href)}
                className="header-menu-section-title block text-[15px] font-bold uppercase !text-[#111] hover:!text-[#d82a28] md:mb-3 md:hover:pl-2 md:transition-all"
              >
                {col.label}
              </a>
            ) : (
              <p className="header-menu-section-title mb-2 text-[15px] font-bold uppercase !text-[#111] md:mb-3">
                {col.label}
              </p>
            )}

            <ul className="!mb-0">
              {(col.children ?? []).map((child) => (
                <li
                  key={child.label}
                  className="border-t !border-[#e1e1e1] first:border-t-0 md:first:border-t"
                >
                  <a
                    href={normalizeHref(child.href)}
                    className="header-menu-submenu-link block py-3 text-[16px] leading-[1.35] !text-[#777] transition-colors duration-150 hover:!text-[#111] md:text-[18px]"
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
    <div className="header-menu-dropdown-body min-w-0 px-4 py-4 md:min-w-[320px] md:px-6">
      <ul className="!mb-0">
        {level2.map((sub) => (
          <li
            key={sub.label}
            className="border-t !border-[#e1e1e1] first:border-t-0"
          >
            <a
              href={normalizeHref(sub.href)}
              className="header-menu-submenu-link block py-3 text-[16px] leading-[1.35] !text-[#333] transition-all duration-150 hover:!text-[#d82a28] hover:pl-2 hover:font-bold md:text-[18px]"
            >
              {sub.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const HeaderMenu = ({ items, className = "" }: HeaderMenuModel) => {
  return (
    <nav
      aria-label="Main navigation"
      className={cn("header-menu relative", className)}
    >
      <ul className="header-menu-list flex min-h-[54px] flex-col !mb-0 bg-[#1f1f1f] md:flex-row md:items-stretch md:justify-center">
        {items.map((item, index) => {
          const level2 = item.children ?? [];
          const hasDropdown = level2.length > 0;
          const useColumns = hasLevel3(level2);
          const itemCheckboxId = `header-menu-item-${index}`;

          if (!hasDropdown) {
            return (
              <li key={item.label} className="header-menu-item relative">
                <a
                  href={normalizeHref(item.href)}
                  className={cn(getLinkClass(item.active), "h-[54px] px-6")}
                >
                  <span>{item.label}</span>
                </a>
              </li>
            );
          }

          return (
            <li
              key={item.label}
              className="header-menu-item group relative has-[:checked]:[&_.header-menu-chevron]:rotate-180"
            >
              <input
                type="checkbox"
                id={itemCheckboxId}
                className="peer/sub sr-only"
              />

              <div className="header-menu-link-row flex h-[54px] items-stretch">
                <a
                  href={normalizeHref(item.href)}
                  className={cn(
                    getLinkClass(item.active),
                    "flex-1 px-6",
                  )}
                >
                  <span>{item.label}</span>
                </a>

                <label
                  htmlFor={itemCheckboxId}
                  className="header-menu-chevron-trigger flex shrink-0 cursor-pointer items-center px-3 md:pointer-events-none md:cursor-default"
                  aria-label={`Mở menu ${item.label}`}
                >
                  <ChevronDownIcon className="header-menu-chevron h-3.5 w-3.5 opacity-80 transition-transform" />
                </label>
              </div>

              <div
                className={cn(
                  "header-menu-dropdown",
                  "max-md:hidden max-md:w-full max-md:peer-checked/sub:block",
                  "md:invisible md:absolute md:left-1/2 md:top-full md:z-50 md:-translate-x-1/2 md:opacity-0 md:transition-all md:duration-150",
                  "md:group-hover:visible md:group-hover:!opacity-100",
                )}
              >
                <div className="header-menu-dropdown-inner relative !border !border-[#d9d9d9] !bg-[#f6f6f6] shadow-[0_2px_10px_rgba(0,0,0,0.18)] max-md:border-0 max-md:shadow-none">
                  <div
                    className="header-menu-dropdown-arrow absolute left-1/2 top-0 hidden h-0 w-0 -translate-x-1/2 -translate-y-full border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent !border-b-[#f6f6f6] md:block"
                    aria-hidden
                  />

                  {renderMenuDropdownBody(level2, useColumns)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default HeaderMenu;

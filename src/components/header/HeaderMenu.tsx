import { ChevronDownIcon } from "lucide-react";

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

const HeaderMenu = ({ items, className = "" }: HeaderMenuModel) => {
  return (
    <nav aria-label="Main navigation" className={`relative ${className}`}>
      <ul className="flex min-h-[54px] items-stretch justify-center bg-[#1f1f1f]">
        {items.map((item) => {
          const level2 = item.children ?? [];
          const hasDropdown = level2.length > 0;
          const useColumns = hasLevel3(level2);

          return (
            <li key={item.label} className="group relative">
              <a
                href={normalizeHref(item.href)}
                className={[
                  "flex h-[54px] items-center px-6 text-[17px] font-medium transition-colors duration-150 text-white",
                  item.active
                    ? "!bg-[#f47c20]"
                    : "!bg-[#1f1f1f] hover:!bg-[#f47c20]",
                ].join(" ")}
              >
                <span>{item.label}</span>

                {hasDropdown && (
                  <ChevronDownIcon className="ml-1.5 h-3.5 w-3.5 opacity-80" />
                )}
              </a>

              {hasDropdown && (
                <div className="invisible absolute left-1/2 -translate-x-1/2 top-full z-50 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="relative !bg-[#f6f6f6] shadow-[0_2px_10px_rgba(0,0,0,0.18)] border !border-[#d9d9d9]">
                    <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 -translate-y-full border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent !border-b-[#f6f6f6]" />

                    {useColumns ? (
                      <div className="grid auto-cols-fr grid-flow-col gap-5 px-7 py-6 w-max">
                        {level2.map((col) => (
                          <div key={col.label} className="min-w-[270px]">
                            <a
                              href={normalizeHref(col.href)}
                              className="block mb-3 text-[15px] font-bold uppercase !text-[#111] hover:!text-[#d82a28] hover:pl-2 hover:font-bold transition-all"
                            >
                              {col.label}
                            </a>

                            <ul>
                              {(col.children ?? []).map((child) => (
                                <li
                                  key={child.label}
                                  className="border-t !border-[#e1e1e1] first:border-t"
                                >
                                  <a
                                    href={normalizeHref(child.href)}
                                    className="block py-3 text-[18px] leading-[1.35] !text-[#777] transition-colors duration-150 hover:!text-[#111]"
                                  >
                                    {child.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="min-w-[320px] px-6 py-4">
                        <ul>
                          {level2.map((sub) => (
                            <li
                              key={sub.label}
                              className="border-t !border-[#e1e1e1] first:border-t-0"
                            >
                              <a
                                href={normalizeHref(sub.href)}
                                className="block py-3 text-[18px] leading-[1.35] !text-[#333] transition-all duration-150 hover:!text-[#d82a28] hover:pl-2 hover:font-bold"
                              >
                                {sub.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default HeaderMenu;

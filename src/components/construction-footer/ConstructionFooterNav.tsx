import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface ConstructionFooterMenuItemModel {
  label: string;
  link: LinkModel;
}

export interface ConstructionFooterNavModel {
  className?: string;
  menuItems: ConstructionFooterMenuItemModel[];
  ariaLabel?: string;
}

const ConstructionFooterNav = (model: ConstructionFooterNavModel) => {
  const { className, menuItems, ariaLabel = "Menu chân trang" } = model;

  const items = menuItems.filter(
    (item) => item.label.trim().length > 0 && item.link.url.trim().length > 0,
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn("construction-footer-nav w-full", className)}
      aria-label={ariaLabel}
    >
      <ul className="construction-footer-nav-list flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {items.map((item) => (
          <li key={`${item.label}-${item.link.url}`}>
            <Link
              {...item.link}
              className={cn(
                "construction-footer-nav-link text-base text-brand-navy",
                item.link.className,
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ConstructionFooterNav;

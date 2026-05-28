import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export const footerColumnTitleClass = "font-bold uppercase text-[#f36f21]";

export interface FooterLinkColumnModel {
  title: string;
  links: { label: string; link: LinkModel }[];
  className?: string;
}

const FooterLinkColumn = (model: FooterLinkColumnModel) => {
  const { title, links, className } = model;

  if (links.length === 0) {
    return null;
  }

  return (
    <div className={cn("footer-link-column min-w-0", className)}>
      <h3 className={cn("footer-link-column-title", footerColumnTitleClass)}>
        {title}
      </h3>
      <ul className="footer-link-column-list mt-3 space-y-1">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              {...item.link}
              className={cn(
                "footer-menu-link block py-1 text-white/90 transition-colors hover:text-[#f47c20]",
                item.link.className,
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkColumn;

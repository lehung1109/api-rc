import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import { footerColumnTitleClass } from "./FooterLinkColumn";

export interface FooterSocialLinkModel {
  icon: {
    url: string;
    alt: string;
    display_dimensions: { width: number; height: number };
  };
  link: LinkModel;
}

export interface FooterSocialModel {
  title?: string;
  links: FooterSocialLinkModel[];
  className?: string;
}

const FooterSocial = (model: FooterSocialModel) => {
  const { title = "KẾT NỐI VỚI CHÚNG TÔI", links, className } = model;

  if (links.length === 0) {
    return null;
  }

  return (
    <div className={cn("footer-social min-w-0", className)}>
      <h3
        className={cn(
          "footer-social-title md:text-base",
          footerColumnTitleClass,
        )}
      >
        {title}
      </h3>
      <div className="footer-social-links mt-3 flex flex-wrap gap-2">
        {links.map((item) => (
          <Link
            key={item.link.url}
            {...item.link}
            className={cn(
              "footer-social-link inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/10 transition-colors hover:bg-[#f36f21]/30",
              item.link.className,
            )}
          >
            <img
              src={item.icon.url}
              alt={item.icon.alt}
              width={item.icon.display_dimensions.width}
              height={item.icon.display_dimensions.height}
              className="h-10 w-10 object-contain md:w-5 md:h-5"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterSocial;

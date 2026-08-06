import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface ConstructionFooterSocialItemModel {
  icon: MediaModel;
  link: LinkModel;
  ariaLabel: string;
}

export interface ConstructionFooterSocialModel {
  className?: string;
  socialLinks: ConstructionFooterSocialItemModel[];
}

const ConstructionFooterSocial = (model: ConstructionFooterSocialModel) => {
  const { className, socialLinks } = model;

  const links = socialLinks.filter(
    (item) =>
      item.icon.url.trim().length > 0 &&
      item.link.url.trim().length > 0 &&
      item.ariaLabel.trim().length > 0,
  );

  if (links.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "construction-footer-social flex flex-wrap items-center justify-center gap-3",
        className,
      )}
    >
      {links.map((item) => (
        <Link
          key={`${item.ariaLabel}-${item.link.url}`}
          {...item.link}
          className={cn(
            "construction-footer-social-link inline-flex items-center justify-center text-brand-navy transition-colors hover:text-brand-gold",
            item.link.className,
          )}
        >
          <span className="sr-only">{item.ariaLabel}</span>
          <Media
            {...item.icon}
            alt=""
            className={cn(
              "construction-footer-social-icon h-10 w-10 rounded-full object-contain",
              item.icon.className,
            )}
          />
        </Link>
      ))}
    </div>
  );
};

export default ConstructionFooterSocial;

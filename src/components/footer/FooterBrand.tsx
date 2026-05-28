import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface FooterBrandModel {
  logo: MediaModel;
  descriptionHtml: string;
  badges: MediaModel[];
  hotlineLabel?: string;
  hotlineText: string;
  hotline: LinkModel;
  className?: string;
}

const FooterBrand = (model: FooterBrandModel) => {
  const {
    logo,
    descriptionHtml,
    badges,
    hotlineLabel,
    hotlineText,
    hotline,
    className,
  } = model;

  return (
    <div className={cn("footer-brand min-w-0", className)}>
      <div className="footer-brand-logo max-w-[220px]">
        <Media {...logo} className={cn("h-auto w-full", logo.className)} />
      </div>

      {descriptionHtml ? (
        <div
          className="footer-brand-description mt-4 leading-relaxed text-white/90 [&>p]:!mbe-0"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      ) : null}

      {badges.length > 0 ? (
        <div className="footer-brand-badges mt-4 flex flex-wrap items-center gap-3">
          {badges.map((badge) => (
            <Media
              key={badge.alt}
              {...badge}
              className={cn("h-auto max-h-12 w-auto", badge.className)}
            />
          ))}
        </div>
      ) : null}

      <div className="footer-brand-hotline mt-6">
        {hotlineLabel ? (
          <p className="mb-1 uppercase tracking-wide text-white/70">
            {hotlineLabel}
          </p>
        ) : null}
        <Link
          {...hotline}
          className={cn(
            "text-3xl font-bold text-[#f36f21] transition-colors hover:text-[#f47c20] md:text-4xl",
            hotline.className,
          )}
        >
          {hotlineText}
        </Link>
      </div>
    </div>
  );
};

export default FooterBrand;

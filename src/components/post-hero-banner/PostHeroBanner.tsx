import { cn } from "@/lib/utils";

import Link, { type LinkModel } from "../link/Link";
import Media, { type MediaModel } from "../media/Media";

export type PostHeroBannerTitleHeading = "h1" | "h2";

export interface PostHeroBannerBreadcrumbItemModel {
  label: string;
  link: LinkModel;
}

export interface PostHeroBannerModel {
  className?: string;
  backgroundImage: MediaModel;
  breadcrumbItems: PostHeroBannerBreadcrumbItemModel[];
  title: string;
  titleHeading?: PostHeroBannerTitleHeading;
}

const PostHeroBanner = (model: PostHeroBannerModel) => {
  const {
    className,
    backgroundImage,
    breadcrumbItems,
    title,
    titleHeading = "h1",
  } = model;
  const titleText = title.trim();
  const validBreadcrumbItems = breadcrumbItems
    .filter((item) => item.label.trim() && item.link.url.trim())
    .slice(0, 2);
  const TitleTag = titleHeading === "h2" ? "h2" : "h1";

  if (
    !backgroundImage.url.trim() ||
    !titleText ||
    validBreadcrumbItems.length !== 2
  ) {
    return null;
  }

  return (
    <section
      className={cn(
        "post-hero-banner !relative !h-[80vh] !w-full !overflow-hidden !text-brand-white",
        className,
      )}
    >
      <Media
        {...backgroundImage}
        className={cn(
          "post-hero-banner-background !absolute !inset-0 !h-full !w-full !object-cover",
          backgroundImage.className,
        )}
      />
      <div
        className="post-hero-banner-overlay !pointer-events-none !absolute !inset-0 !bg-brand-navy/55"
        aria-hidden
      />
      <div className="post-hero-banner-inner !relative !z-10 !mx-auto !flex !h-full !w-full !max-w-7xl !items-end !justify-center !px-6 !pb-20 md:!px-10">
        <div className="post-hero-banner-content !w-full !text-center">
          <nav
            className="post-hero-banner-breadcrumb !mb-4 !text-base !font-normal !uppercase !text-brand-gold"
            aria-label="Breadcrumb"
          >
            {validBreadcrumbItems.map((item, index) => (
              <span
                className="post-hero-banner-breadcrumb-item"
                key={`${item.link.url}-${item.label}-${index}`}
              >
                {index > 0 ? (
                  <span
                    className="post-hero-banner-breadcrumb-separator !px-2"
                    aria-hidden
                  >
                    /
                  </span>
                ) : null}
                <Link
                  {...item.link}
                  className={cn(
                    "post-hero-banner-breadcrumb-link !text-brand-gold !no-underline hover:!text-brand-gold-hover hover:!underline",
                    item.link.className,
                  )}
                >
                  {item.label.trim()}
                </Link>
              </span>
            ))}
          </nav>
          <TitleTag className="post-hero-banner-title !mx-auto !mb-0 !max-w-5xl !text-2xl !font-bold !uppercase !leading-tight !text-brand-white md:!text-4xl lg:!text-5xl">
            {titleText}
          </TitleTag>
        </div>
      </div>
    </section>
  );
};

export default PostHeroBanner;

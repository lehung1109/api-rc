import { cn } from "@/lib/utils";

import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface OutstandingAdvantagesItemModel {
  backgroundMobileImage: MediaModel;
  backgroundDesktopImage: MediaModel;
  image: MediaModel;
  subtitle: string;
  title: string;
  description: string;
  className?: string;
}

const OutstandingAdvantagesItem = (model: OutstandingAdvantagesItemModel) => {
  const {
    backgroundMobileImage,
    backgroundDesktopImage,
    image,
    subtitle,
    title,
    description,
    className,
  } = model;

  const subtitleText = subtitle.trim();
  const titleText = title.trim();
  const descriptionText = description.trim();
  const topImageUrl = image.url.trim();
  const mobileBgUrl = backgroundMobileImage.url.trim();
  const desktopBgUrl = backgroundDesktopImage.url.trim();
  const hasBackground = Boolean(mobileBgUrl || desktopBgUrl);
  const backgroundFallback = mobileBgUrl
    ? backgroundMobileImage
    : backgroundDesktopImage;
  const backgroundFallbackUrl = backgroundFallback.url.trim();
  const desktopBgSrcSet =
    backgroundDesktopImage.srcSet?.trim() || desktopBgUrl;

  if (!titleText || !hasBackground) {
    return null;
  }

  return (
    <li
      className={cn(
        "outstanding-advantages-item-wrap max-md:!w-[85%] max-md:!shrink-0 max-md:!snap-start md:!min-w-0",
        className,
      )}
    >
      <article
        className={cn(
          "outstanding-advantages-item group/item !relative !aspect-[384/480] !w-full !overflow-hidden",
        )}
      >
        {hasBackground ? (
          <picture
            className={cn(
              "outstanding-advantages-item-background-picture",
              "!absolute !inset-0 !z-0 !block !h-full !w-full",
            )}
          >
            {desktopBgUrl ? (
              <source media="(min-width: 768px)" srcSet={desktopBgSrcSet} />
            ) : null}
            <img
              src={backgroundFallbackUrl}
              alt={backgroundFallback.alt}
              width={backgroundFallback.display_dimensions.width}
              height={backgroundFallback.display_dimensions.height}
              className={cn(
                "outstanding-advantages-item-background-image",
                "!h-full !w-full !max-w-none !object-cover",
                backgroundFallback.className,
              )}
              loading="lazy"
              decoding="async"
              {...(backgroundFallback.srcSet
                ? { srcSet: backgroundFallback.srcSet }
                : {})}
              {...(backgroundFallback.sizes
                ? { sizes: backgroundFallback.sizes }
                : {})}
            />
          </picture>
        ) : null}

        <span
          className={cn(
            "outstanding-advantages-item-overlay pointer-events-none !absolute !inset-0 !z-[1]",
            "!bg-brand-navy/65 transition-opacity duration-500 ease-out",
            "!opacity-100 md:!opacity-0 md:group-hover/item:!opacity-100",
            "motion-reduce:!opacity-100 motion-reduce:transition-none",
          )}
          aria-hidden="true"
        />

        <div
          className={cn(
            "outstanding-advantages-item-top !absolute !inset-x-0 !top-0 !z-[2] !flex !h-auto !w-full !flex-col !items-center",
            "!px-4 !pt-0 !text-center md:!px-6",
            "!translate-y-0 transition-[translate] duration-500 ease-out",
            "md:!-translate-y-[calc(137px-20px)] md:group-hover/item:!translate-y-0",
            "motion-reduce:!translate-y-0 motion-reduce:transition-none",
          )}
        >
          {topImageUrl ? (
            <div
              className={cn(
                "outstanding-advantages-item-media !relative !mb-4 !w-[229px] !max-w-full !shrink-0 !overflow-hidden",
                "!aspect-[229/137]",
              )}
            >
              <Media
                {...image}
                className={cn(
                  "outstanding-advantages-item-image !absolute !inset-0 !h-full !w-full !object-cover",
                  image.className,
                )}
              />
            </div>
          ) : null}

          {subtitleText ? (
            <p
              className={cn(
                "outstanding-advantages-item-subtitle !mb-0 !text-base !font-medium !uppercase !tracking-[0.12em]",
                "!text-brand-white/70",
              )}
            >
              {subtitleText}
            </p>
          ) : null}

          <h3
            className={cn(
              "outstanding-advantages-item-title !mb-0 !text-xl !leading-snug !font-bold !text-brand-white",
              "md:!text-2xl",
              subtitleText && "!mt-2",
            )}
          >
            {titleText}
          </h3>
        </div>

        {descriptionText ? (
          <div
            className={cn(
              "outstanding-advantages-item-bottom !absolute !inset-x-0 !z-[2]",
              "!bottom-10 !px-4 !text-center md:!bottom-12 md:!px-6",
              "transition-[opacity,translate] duration-500 ease-out",
              "!translate-y-0 !opacity-100",
              "md:!translate-y-full md:!opacity-0",
              "md:group-hover/item:!translate-y-0 md:group-hover/item:!opacity-100",
              "motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none",
            )}
          >
            <p
              className={cn(
                "outstanding-advantages-item-description !mb-0 !text-base !leading-relaxed !text-brand-white",
              )}
            >
              {descriptionText}
            </p>
          </div>
        ) : null}
      </article>
    </li>
  );
};

export default OutstandingAdvantagesItem;

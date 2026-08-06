import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import type { MediaModel } from "../media/Media";
import DirectorProfileItem, {
  type DirectorProfileItemModel,
} from "./DirectorProfileItem";
import DirectorProfileScrollReveal, {
  type DirectorProfileScrollRevealModel,
} from "./DirectorProfileScrollReveal";

export type { DirectorProfileItemModel };

export interface DirectorProfileModel {
  className?: string;
  backgroundMobileImage: MediaModel;
  backgroundDesktopImage: MediaModel;
  subtitle: string;
  descriptionHtml: string;
  items: DirectorProfileItemModel[];
  scrollReveal?: DirectorProfileScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "director-profile";

const DirectorProfile = (model: DirectorProfileModel) => {
  const {
    className,
    backgroundMobileImage,
    backgroundDesktopImage,
    subtitle,
    descriptionHtml,
    items,
    scrollReveal,
  } = model;

  const subtitleText = subtitle.trim();
  const description = descriptionHtml.trim();
  const validItems = items.filter(
    (item) =>
      item.title.trim().length > 0 || item.description.trim().length > 0,
  );
  const mobileBgUrl = backgroundMobileImage.url.trim();
  const desktopBgUrl = backgroundDesktopImage.url.trim();
  const hasBackground = Boolean(mobileBgUrl || desktopBgUrl);
  const backgroundFallback = mobileBgUrl
    ? backgroundMobileImage
    : backgroundDesktopImage;
  const backgroundFallbackUrl = backgroundFallback.url.trim();
  const desktopBgSrcSet =
    backgroundDesktopImage.srcSet?.trim() || desktopBgUrl;
  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: DirectorProfileScrollRevealModel = {
    targetId,
  };

  if (
    !hasBackground &&
    !subtitleText &&
    !description &&
    validItems.length === 0
  ) {
    return null;
  }

  const slideInBase = cn(
    "opacity-0 -translate-x-10 transition-[opacity,translate] duration-[1.2s] ease-out",
    "group-data-[in-view=true]/profile:opacity-100 group-data-[in-view=true]/profile:translate-x-0",
    "motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none",
  );

  return (
    <section
      id={targetId}
      className={cn(
        "director-profile group/profile relative w-full overflow-hidden text-brand-white",
        "px-6 py-20 md:px-10",
        className,
      )}
    >
      {hasBackground ? (
        <picture className="director-profile-background-picture absolute inset-0 z-0 block h-full w-full">
          {desktopBgUrl ? (
            <source media="(min-width: 768px)" srcSet={desktopBgSrcSet} />
          ) : null}
          <img
            src={backgroundFallbackUrl}
            alt={backgroundFallback.alt}
            width={backgroundFallback.display_dimensions.width}
            height={backgroundFallback.display_dimensions.height}
            className={cn(
              "director-profile-background-image h-full w-full max-w-none object-cover object-right",
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

      <div
        className="director-profile-overlay pointer-events-none absolute inset-0 z-1 bg-brand-navy/40 bg-gradient-to-r from-brand-navy/90 via-brand-navy/55 to-transparent"
        aria-hidden="true"
      />

      <div className="director-profile-inner relative z-10 mx-auto w-full max-w-7xl lg:mx-0 lg:w-2/3">
        {subtitleText ? (
          <h2
            className={cn(
              "director-profile-subtitle mb-0 text-base font-medium uppercase tracking-[0.12em] text-brand-white",
              slideInBase,
            )}
          >
            {subtitleText}
          </h2>
        ) : null}

        {description ? (
          <div
            className={cn(
              "director-profile-description mt-4 text-xl leading-relaxed text-brand-white md:mt-5 md:text-2xl md:leading-9 lg:text-3xl lg:leading-10",
              slideInBase,
            )}
            style={{ transitionDelay: subtitleText ? "100ms" : undefined }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : null}

        {validItems.length > 0 ? (
          <div
            className={cn(
              "director-profile-items mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 md:grid-cols-3",
            )}
          >
            {validItems.map((item, index) => {
              const headerOffset =
                (subtitleText ? 1 : 0) + (description ? 1 : 0);
              const delayMs = (headerOffset + index) * 100;

              return (
                <DirectorProfileItem
                  key={`${item.title.trim()}-${index}`}
                  title={item.title}
                  description={item.description}
                  className={slideInBase}
                  style={{ transitionDelay: `${delayMs}ms` }}
                />
              );
            })}
          </div>
        ) : null}
      </div>

      <ClientComponentWrapper
        type="directorProfileScrollReveal"
        hydrateData={scrollRevealModel}
        className="director-profile-scroll-reveal hidden"
      >
        <DirectorProfileScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default DirectorProfile;

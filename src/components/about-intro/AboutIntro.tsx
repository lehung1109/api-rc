import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
import AboutIntroScrollReveal, {
  type AboutIntroScrollRevealModel,
} from "./AboutIntroScrollReveal";

export interface AboutIntroModel {
  className?: string;
  backgroundMobileImage: MediaModel;
  backgroundDesktopImage: MediaModel;
  image: MediaModel;
  subtitle: string;
  descriptionHtml: string;
  buttonLabel: string;
  buttonLink: LinkModel;
  scrollReveal?: AboutIntroScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "about-intro";

const AboutIntro = (model: AboutIntroModel) => {
  const {
    className,
    backgroundMobileImage,
    backgroundDesktopImage,
    image,
    subtitle,
    descriptionHtml,
    buttonLabel,
    buttonLink,
    scrollReveal,
  } = model;

  const subtitleText = subtitle.trim();
  const description = descriptionHtml.trim();
  const hasButton =
    buttonLabel.trim().length > 0 && buttonLink.url.trim().length > 0;
  const hasImage = image.url.trim().length > 0;
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
  const scrollRevealModel: AboutIntroScrollRevealModel = {
    targetId,
  };

  if (!hasBackground && !subtitleText && !description && !hasImage && !hasButton) {
    return null;
  }

  return (
    <section
      id={targetId}
      className={cn(
        "about-intro relative w-full overflow-hidden text-brand-white",
        "px-6 py-12 md:px-10 md:py-16",
        className,
      )}
    >
      {hasBackground ? (
        <picture className="about-intro-background-picture absolute inset-0 z-0 block h-full w-full">
          {desktopBgUrl ? (
            <source media="(min-width: 768px)" srcSet={desktopBgSrcSet} />
          ) : null}
          <img
            src={backgroundFallbackUrl}
            alt={backgroundFallback.alt}
            width={backgroundFallback.display_dimensions.width}
            height={backgroundFallback.display_dimensions.height}
            className={cn(
              "about-intro-background-image h-full w-full max-w-none object-cover object-left-bottom",
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

      <div className="about-intro-inner relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="about-intro-copy">
          {subtitleText ? (
            <h1 className="about-intro-subtitle text-base font-medium uppercase tracking-[0.12em] text-brand-gold md:text-lg">
              {subtitleText}
            </h1>
          ) : null}

          {description ? (
            <div
              className="about-intro-description mt-4 text-lg leading-relaxed text-brand-white md:mt-5 md:text-xl md:leading-8 lg:text-2xl lg:leading-9"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}

          {hasButton ? (
            <Link
              {...buttonLink}
              className={cn(
                "about-intro-button mt-8 inline-flex items-center justify-center",
                "border border-brand-white bg-transparent px-8 py-3",
                "text-base font-medium uppercase tracking-wide text-brand-white",
                "transition-colors hover:border-brand-white hover:bg-brand-white hover:text-brand-navy",
                "md:mt-10",
                buttonLink.className,
              )}
            >
              {buttonLabel}
            </Link>
          ) : null}
        </div>

        {hasImage ? (
          <div className="about-intro-media">
            <Media
              {...image}
              className={cn(
                "about-intro-image h-auto w-full object-cover",
                image.className,
              )}
            />
          </div>
        ) : null}
      </div>

      <ClientComponentWrapper
        type="aboutIntroScrollReveal"
        hydrateData={scrollRevealModel}
        className="about-intro-scroll-reveal hidden"
      >
        <AboutIntroScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default AboutIntro;

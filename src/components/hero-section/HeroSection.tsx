import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export type HeroSectionTitleHeading = "h1" | "h2";

export type HeroSectionButtonVariant = "default" | "yellow";

const HERO_SECTION_BUTTON_VARIANT_CLASSES: Record<HeroSectionButtonVariant, string> = {
  default: "bg-brand-gold text-brand-white hover:bg-brand-gold-hover",
  yellow: "hero-section-button--yellow bg-brand-gold text-brand-white hover:bg-brand-gold-hover",
};

export interface HeroSectionModel {
  className?: string;
  backgroundImage: MediaModel;
  subtitle: string;
  title: string;
  htmlText?: string;
  buttonLabel: string;
  buttonLink: LinkModel;
  titleHeading?: HeroSectionTitleHeading;
  contentCentered?: boolean;
  contentFullWidth?: boolean;
  buttonVariant?: HeroSectionButtonVariant;
}

const HeroSection = (model: HeroSectionModel) => {
  const {
    className,
    backgroundImage,
    subtitle,
    title,
    htmlText,
    buttonLabel,
    buttonLink,
    titleHeading = "h1",
    contentCentered = false,
    contentFullWidth = false,
    buttonVariant = "default",
  } = model;

  const subtitleText = subtitle.trim();
  const titleText = title.trim();
  const htmlTextContent = htmlText?.trim();
  const hasButton = buttonLabel.trim().length > 0 && buttonLink.url.trim().length > 0;
  const TitleTag = titleHeading === "h2" ? "h2" : "h1";

  if (!backgroundImage.url.trim() && !subtitleText && !titleText && !htmlTextContent) {
    return null;
  }

  return (
    <section className={cn("hero-section relative w-full text-brand-white", className)}>
      <div className="hero-section-stage relative overflow-hidden">
        <Media
          {...backgroundImage}
          className={cn(
            "hero-section-bg absolute inset-0 h-full w-full object-cover",
            backgroundImage.className,
          )}
        />
        <div className="hero-section-overlay absolute inset-0 bg-brand-navy/65" />

        <div
          className={cn(
            "hero-section-inner relative z-10 mx-auto flex min-h-[280px] max-w-7xl items-center px-5 py-12 md:min-h-[400px] md:px-8 md:py-16 lg:py-20",
            contentCentered && "justify-center",
          )}
        >
          <div
            className={cn(
              "hero-section-content",
              !contentFullWidth && "max-w-2xl lg:max-w-3xl",
              contentFullWidth && "hero-section-content--full-width w-full",
              contentCentered && "mx-auto text-center",
            )}
          >
            {subtitleText ? (
              <p className="hero-section-subtitle text-base font-semibold tracking-wide text-brand-gold md:text-lg">
                {subtitleText}
              </p>
            ) : null}

            {titleText ? (
              <TitleTag className="hero-section-title mt-2.5 text-2xl font-bold leading-tight text-brand-white md:text-4xl lg:text-5xl">
                {titleText}
              </TitleTag>
            ) : null}

            {htmlTextContent ? (
              <div
                className="hero-section-text mt-4 text-base leading-relaxed text-brand-white-hover md:text-lg [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:leading-relaxed [&_strong]:text-brand-gold"
                dangerouslySetInnerHTML={{ __html: htmlTextContent }}
              />
            ) : null}

            {hasButton ? (
              <div
                className={cn(
                  "hero-section-button-wrapper mt-6 md:mt-8",
                  contentCentered && "flex justify-center",
                )}
              >
                <Link
                  {...buttonLink}
                  className={cn(
                    "hero-section-button animate-hero-section-stretch motion-reduce:animate-none inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-bold uppercase shadow-lg no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-white/70 md:px-8 md:py-3.5 md:text-lg",
                    HERO_SECTION_BUTTON_VARIANT_CLASSES[buttonVariant],
                    buttonLink.className,
                  )}
                >
                  {buttonLabel}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

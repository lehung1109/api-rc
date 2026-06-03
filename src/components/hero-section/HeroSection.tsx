import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export type HeroSectionTitleHeading = "h1" | "h2";

export type HeroSectionButtonVariant = "default" | "yellow";

const HERO_SECTION_BUTTON_VARIANT_CLASSES: Record<HeroSectionButtonVariant, string> = {
  default: "bg-[#f36f21] text-white hover:bg-[#ff7f2a]",
  yellow: "hero-section-button--yellow bg-[#fcce0a] text-white hover:bg-[#e8bc09]",
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
    <section className={cn("hero-section relative w-full text-white", className)}>
      <div className="hero-section-stage relative overflow-hidden">
        <Media
          {...backgroundImage}
          className={cn(
            "hero-section-bg absolute inset-0 h-full w-full object-cover",
            backgroundImage.className,
          )}
        />
        <div className="hero-section-overlay absolute inset-0 bg-black/60" />

        <div
          className={cn(
            "hero-section-inner relative z-10 mx-auto flex min-h-[240px] max-w-7xl items-center px-4 py-10 md:min-h-[360px] md:px-6 md:py-14 lg:py-16",
            contentCentered && "justify-center",
          )}
        >
          <div
            className={cn(
              "hero-section-content",
              !contentFullWidth && "max-w-xl",
              contentFullWidth && "hero-section-content--full-width w-full",
              contentCentered && "mx-auto text-center",
            )}
          >
            {subtitleText ? (
              <p className="hero-section-subtitle text-base text-[#f7f7f7]">
                {subtitleText}
              </p>
            ) : null}

            {titleText ? (
              <TitleTag className="hero-section-title mt-2 text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {titleText}
              </TitleTag>
            ) : null}

            {htmlTextContent ? (
              <div
                className="hero-section-text mt-3 text-base leading-relaxed text-[#f7f7f7]"
                dangerouslySetInnerHTML={{ __html: htmlTextContent }}
              />
            ) : null}

            {hasButton ? (
              <div
                className={cn(
                  "hero-section-button-wrapper mt-5 md:mt-7",
                  contentCentered && "flex justify-center",
                )}
              >
                <Link
                  {...buttonLink}
                  className={cn(
                    "hero-section-button animate-hero-section-stretch motion-reduce:animate-none inline-flex items-center justify-center rounded-full px-6 py-2 text-base font-semibold uppercase shadow no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:px-7 md:py-2.5",
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

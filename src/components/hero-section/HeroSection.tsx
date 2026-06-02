import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface HeroSectionModel {
  className?: string;
  backgroundImage: MediaModel;
  subtitle: string;
  title: string;
  htmlText?: string;
  buttonLabel: string;
  buttonLink: LinkModel;
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
  } = model;

  const subtitleText = subtitle.trim();
  const titleText = title.trim();
  const htmlTextContent = htmlText?.trim();
  const hasButton = buttonLabel.trim().length > 0 && buttonLink.url.trim().length > 0;

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

        <div className="hero-section-inner relative z-10 mx-auto flex min-h-[240px] max-w-7xl items-center px-4 py-10 md:min-h-[360px] md:px-6 md:py-14 lg:py-16">
          <div className="hero-section-content max-w-xl">
            {subtitleText ? (
              <p className="hero-section-subtitle text-sm text-[#f7f7f7] md:text-base">
                {subtitleText}
              </p>
            ) : null}

            {titleText ? (
              <h1 className="hero-section-title mt-2 text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {titleText}
              </h1>
            ) : null}

            {htmlTextContent ? (
              <div
                className="hero-section-text mt-3 text-sm leading-relaxed text-[#f7f7f7] md:text-base"
                dangerouslySetInnerHTML={{ __html: htmlTextContent }}
              />
            ) : null}

            {hasButton ? (
              <div className="hero-section-button-wrapper mt-5 md:mt-7">
                <Link
                  {...buttonLink}
                  className={cn(
                    "hero-section-button animate-hero-section-stretch motion-reduce:animate-none inline-flex items-center justify-center rounded-full bg-[#f36f21] px-6 py-2 text-sm font-semibold uppercase text-white shadow no-underline transition-colors hover:bg-[#ff7f2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:px-7 md:py-2.5 md:text-base",
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

import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
import DirectorIntroScrollReveal, {
  type DirectorIntroScrollRevealModel,
} from "./DirectorIntroScrollReveal";

export interface DirectorIntroModel {
  className?: string;
  image: MediaModel;
  subtitle: string;
  descriptionHtml: string;
  buttonLabel: string;
  buttonLink: LinkModel;
  scrollReveal?: DirectorIntroScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "director-intro";

const DirectorIntro = (model: DirectorIntroModel) => {
  const {
    className,
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
  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: DirectorIntroScrollRevealModel = {
    targetId,
  };

  if (!subtitleText && !description && !hasImage && !hasButton) {
    return null;
  }

  const slideInBase = cn(
    "opacity-0 transition-[opacity,translate] duration-[1.2s] ease-out",
    "group-data-[in-view=true]/director:opacity-100 group-data-[in-view=true]/director:translate-x-0",
    "motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none",
  );

  return (
    <section
      id={targetId}
      className={cn(
        "director-intro group/director w-full overflow-hidden",
        "px-6 py-20 md:px-10",
        className,
      )}
    >
      <div className="director-intro-inner mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {hasImage ? (
          <div
            className={cn(
              "director-intro-media -translate-x-10",
              slideInBase,
            )}
          >
            <Media
              {...image}
              className={cn(
                "director-intro-image h-auto w-full object-cover",
                image.className,
              )}
            />
          </div>
        ) : null}

        <div
          className={cn("director-intro-copy translate-x-10", slideInBase)}
        >
          {subtitleText ? (
            <h2 className="director-intro-subtitle text-base font-medium uppercase tracking-[0.12em] text-brand-gold">
              {subtitleText}
            </h2>
          ) : null}

          {description ? (
            <div
              className="director-intro-description mt-4 text-[24px] leading-relaxed text-brand-navy"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}

          {hasButton ? (
            <Link
              {...buttonLink}
              className={cn(
                "director-intro-button mt-8 inline-flex items-center justify-center",
                "border border-brand-navy bg-brand-navy px-8 py-3",
                "text-lg font-bold uppercase tracking-wide text-brand-white no-underline",
                "transition-colors",
                "hover:border-brand-navy hover:bg-brand-white hover:text-brand-navy",
                "md:mt-10 md:px-10 md:py-3.5 md:text-xl",
                buttonLink.className,
              )}
            >
              {buttonLabel}
            </Link>
          ) : null}
        </div>
      </div>

      <ClientComponentWrapper
        type="directorIntroScrollReveal"
        hydrateData={scrollRevealModel}
        className="director-intro-scroll-reveal hidden"
      >
        <DirectorIntroScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default DirectorIntro;

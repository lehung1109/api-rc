import { Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface DesignConsultationCtaModel {
  backgroundImage: MediaModel;
  className?: string;
  cta: LinkModel;
  ctaLabel: string;
  heading: string;
  subheading: string;
}

const DesignConsultationCta = (model: DesignConsultationCtaModel) => {
  const {
    backgroundImage,
    className,
    cta,
    ctaLabel,
    heading,
    subheading,
  } = model;

  return (
    <section
      className={cn(
        "design-consultation-cta relative w-full overflow-hidden text-brand-white",
        className,
      )}
    >
      <div className="relative flex min-h-[140px] w-full flex-col md:min-h-[168px] md:flex-row">
        <div className="relative flex flex-1 items-center gap-4 px-5 py-8 sm:gap-5 sm:px-8 md:gap-6 md:px-10 md:py-10 md:pr-[38%]">
          {backgroundImage ? (
            <Media
              className="design-consultation-cta-background absolute inset-0 z-0 h-full w-full max-w-none object-cover"
              {...backgroundImage}
            />
          ) : null}

          <div
            className="pointer-events-none absolute inset-0 z-1 bg-brand-navy/60"
            aria-hidden="true"
          />

          <div
            className="design-consultation-cta-icon relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-navy/45 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]"
            aria-hidden="true"
          >
            <Lightbulb
              className="h-7 w-7 text-brand-gold sm:h-8 sm:w-8"
              strokeWidth={2}
            />
          </div>

          <div className="design-consultation-cta-copy relative z-10 min-w-0 flex-1">
            <h2 className="text-base font-bold uppercase leading-snug tracking-wide sm:text-lg md:text-xl">
              {heading}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-brand-white/95 sm:mt-1.5 sm:text-[0.95rem] md:text-base">
              {subheading}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "design-consultation-cta-action relative z-10 flex items-center justify-center",
            "bg-brand-gold px-6 py-6",
            "md:absolute md:inset-y-0 md:right-0 md:w-[36%] md:px-10 md:py-0",
            "md:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]",
          )}
        >
          <Link
            {...cta}
            className={cn(
              "design-consultation-cta-button inline-flex items-center justify-center",
              "rounded-full border-2 border-brand-white bg-brand-white/15 px-8 py-2.5",
              "text-sm font-bold uppercase tracking-wide text-brand-white",
              "transition-colors hover:bg-brand-white/25",
              "sm:px-10 sm:py-3 sm:text-base",
            )}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DesignConsultationCta;

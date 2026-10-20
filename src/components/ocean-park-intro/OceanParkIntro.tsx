import { PhoneCall, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface OceanParkIntroHighlightModel {
  label: string;
  value: string;
  note?: string;
}

export interface OceanParkIntroStepModel {
  number: string;
  title: string;
  description: string;
}

export interface OceanParkIntroCtaModel {
  label: string;
  link: LinkModel;
}

export interface OceanParkIntroModel {
  className?: string;
  eyebrow: string;
  title: string;
  leadHtml: string;
  highlights: OceanParkIntroHighlightModel[];
  subdivisionBadges: string[];
  steps: OceanParkIntroStepModel[];
  primaryCta: OceanParkIntroCtaModel;
  secondaryCta: OceanParkIntroCtaModel;
}

const OceanParkIntro = (model: OceanParkIntroModel) => {
  const {
    className,
    eyebrow,
    title,
    leadHtml,
    highlights,
    subdivisionBadges,
    steps,
    primaryCta,
    secondaryCta,
  } = model;

  const eyebrowText = eyebrow.trim();
  const titleText = title.trim();
  const leadContent = leadHtml.trim();
  const validHighlights = highlights.filter(
    (item) => item.label.trim().length > 0 && item.value.trim().length > 0,
  );
  const validBadges = subdivisionBadges
    .map((badge) => badge.trim())
    .filter((badge) => badge.length > 0);
  const validSteps = steps.filter(
    (step) => step.title.trim().length > 0 && step.description.trim().length > 0,
  );
  const hasPrimaryCta =
    primaryCta.label.trim().length > 0 && primaryCta.link.url.trim().length > 0;
  const hasSecondaryCta =
    secondaryCta.label.trim().length > 0 &&
    secondaryCta.link.url.trim().length > 0;

  if (
    !eyebrowText &&
    !titleText &&
    !leadContent &&
    validHighlights.length === 0 &&
    validBadges.length === 0 &&
    validSteps.length === 0 &&
    !hasPrimaryCta &&
    !hasSecondaryCta
  ) {
    return null;
  }

  return (
    <section
      className={cn(
        "ocean-park-intro !w-full !bg-brand-white !px-4 !py-10 !text-brand-navy md:!px-6 md:!py-14",
        className,
      )}
    >
      <div className="ocean-park-intro-inner !mx-auto !w-full !max-w-7xl !overflow-hidden !rounded-2xl !border !border-brand-gold/40 !bg-brand-white !shadow-lg !shadow-brand-navy/10">
        <div className="ocean-park-intro-top !grid !grid-cols-1 !gap-6 !bg-brand-navy !p-5 !text-brand-white md:!p-8 lg:!grid-cols-12 lg:!gap-8 lg:!p-10">
          <div className="ocean-park-intro-copy lg:!col-span-7">
            {eyebrowText ? (
              <p className="ocean-park-intro-eyebrow !mb-2 !inline-flex !items-center !gap-2 !rounded-full !border !border-brand-gold/50 !bg-brand-gold/15 !px-3.5 !py-1 !text-xs !font-semibold !uppercase !tracking-wider !text-brand-gold md:!text-sm">
                <Sparkles className="!h-3.5 !w-3.5 !shrink-0" aria-hidden="true" />
                <span>{eyebrowText}</span>
              </p>
            ) : null}

            {titleText ? (
              <h2 className="ocean-park-intro-title !mt-1 !text-2xl !font-bold !leading-snug !text-brand-white md:!text-3xl lg:!text-4xl">
                {titleText}
              </h2>
            ) : null}

            {leadContent ? (
              <div
                className="ocean-park-intro-lead !mt-3 !space-y-2.5 !text-sm !leading-relaxed !text-brand-white-hover md:!text-base [&_strong]:!font-semibold [&_strong]:!text-brand-gold"
                dangerouslySetInnerHTML={{ __html: leadContent }}
              />
            ) : null}

            {validBadges.length > 0 ? (
              <div className="ocean-park-intro-badges !mt-4 !flex !flex-nowrap !gap-2 !overflow-x-auto !pb-1 md:!flex-wrap md:!overflow-visible">
                {validBadges.map((badge, index) => (
                  <span
                    key={`${badge}-${index}`}
                    className="ocean-park-intro-badge !shrink-0 !rounded-full !border !border-brand-white/20 !bg-brand-white/10 !px-3 !py-1 !text-xs !font-medium !text-brand-white-hover"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : null}

            {hasPrimaryCta || hasSecondaryCta ? (
              <div className="ocean-park-intro-actions !mt-5 !flex !flex-wrap !items-center !gap-3 md:!mt-6">
                {hasPrimaryCta ? (
                  <Link
                    {...primaryCta.link}
                    className={cn(
                      "ocean-park-intro-primary-cta !inline-flex !items-center !justify-center !gap-2 !rounded-full !bg-brand-gold !px-6 !py-2.5 !text-sm !font-bold !uppercase !tracking-wide !text-brand-white !no-underline !shadow-md !transition-colors hover:!bg-brand-gold-hover md:!px-7 md:!py-3 md:!text-base",
                      primaryCta.link.className,
                    )}
                  >
                    <PhoneCall className="!h-4 !w-4 !shrink-0" aria-hidden="true" />
                    <span>{primaryCta.label}</span>
                  </Link>
                ) : null}

                {hasSecondaryCta ? (
                  <Link
                    {...secondaryCta.link}
                    className={cn(
                      "ocean-park-intro-secondary-cta !inline-flex !items-center !justify-center !rounded-full !border !border-brand-gold !bg-transparent !px-6 !py-2.5 !text-sm !font-semibold !uppercase !tracking-wide !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white md:!px-7 md:!py-3 md:!text-base",
                      secondaryCta.link.className,
                    )}
                  >
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          {validHighlights.length > 0 ? (
            <div className="ocean-park-intro-highlights !grid !grid-cols-2 !gap-3 !self-center lg:!col-span-5">
              {validHighlights.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="ocean-park-intro-highlight-card !flex !flex-col !justify-between !rounded-xl !border !border-brand-gold/35 !bg-brand-white/10 !p-3.5 !backdrop-blur-sm md:!p-4"
                >
                  <span className="ocean-park-intro-highlight-label !text-xs !font-medium !uppercase !tracking-wide !text-brand-white-hover">
                    {item.label}
                  </span>
                  <strong className="ocean-park-intro-highlight-value !mt-1.5 !text-lg !font-bold !leading-tight !text-brand-gold md:!text-xl">
                    {item.value}
                  </strong>
                  {item.note?.trim() ? (
                    <span className="ocean-park-intro-highlight-note !mt-1 !text-xs !text-brand-white-hover/85">
                      {item.note}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {validSteps.length > 0 ? (
          <div className="ocean-park-intro-steps !flex !flex-nowrap !gap-3 !overflow-x-auto !bg-brand-white-hover/50 !p-4 !snap-x !snap-mandatory md:!grid md:!grid-cols-3 md:!gap-5 md:!overflow-visible md:!p-6">
            {validSteps.map((step, index) => (
              <article
                key={`${step.number}-${step.title}-${index}`}
                className="ocean-park-intro-step !w-[82%] !shrink-0 !snap-start !rounded-xl !border !border-brand-navy/10 !bg-brand-white !p-4 !shadow-sm md:!w-auto"
              >
                <div className="!flex !items-center !gap-3">
                  <span className="ocean-park-intro-step-number !inline-flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-full !bg-brand-navy !text-sm !font-bold !text-brand-gold">
                    {step.number.trim() || `0${index + 1}`}
                  </span>
                  <h3 className="ocean-park-intro-step-title !text-base !font-bold !text-brand-navy md:!text-lg">
                    {step.title}
                  </h3>
                </div>
                <p className="ocean-park-intro-step-desc !mt-2 !mb-0 !text-sm !leading-relaxed !text-brand-navy/80">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OceanParkIntro;

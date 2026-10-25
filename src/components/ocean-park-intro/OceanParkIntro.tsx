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

  const eyebrowText = (eyebrow ?? "").trim();
  const titleText = (title ?? "").trim();
  const leadContent = (leadHtml ?? "").trim();
  const validHighlights = (highlights ?? []).filter(
    (item) =>
      Boolean(item) &&
      (item.label ?? "").trim().length > 0 &&
      (item.value ?? "").trim().length > 0,
  );
  const validBadges = (subdivisionBadges ?? [])
    .map((badge) => (typeof badge === "string" ? badge.trim() : ""))
    .filter((badge) => badge.length > 0);
  const validSteps = (steps ?? []).filter(
    (step) =>
      Boolean(step) &&
      (step.title ?? "").trim().length > 0 &&
      (step.description ?? "").trim().length > 0,
  );
  const primaryLabel = (primaryCta?.label ?? "").trim();
  const primaryUrl = (primaryCta?.link?.url ?? "").trim();
  const hasPrimaryCta = primaryLabel.length > 0 && primaryUrl.length > 0;
  const secondaryLabel = (secondaryCta?.label ?? "").trim();
  const secondaryUrl = (secondaryCta?.link?.url ?? "").trim();
  const hasSecondaryCta = secondaryLabel.length > 0 && secondaryUrl.length > 0;

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
        "ocean-park-intro !w-full !bg-brand-white !text-brand-navy",
        className,
      )}
    >
      <div className="ocean-park-intro-inner !mx-auto !w-full !max-w-7xl !overflow-hidden !rounded-3xl !border !border-brand-gold/45 !bg-brand-white !shadow-xl !shadow-brand-navy/10">
        <div className="ocean-park-intro-top !grid !grid-cols-1 !gap-8 !bg-brand-navy !p-6 !text-brand-white md:!p-10 lg:!grid-cols-12 lg:!gap-10 lg:!p-12">
          <div className="ocean-park-intro-copy lg:!col-span-7">
            {eyebrowText ? (
              <p className="ocean-park-intro-eyebrow !mb-3 !inline-flex !items-center !gap-2 !rounded-full !border !border-brand-gold/50 !bg-brand-gold/15 !px-4 !py-1.5 !text-sm !font-bold !uppercase !tracking-wider !text-brand-gold md:!text-sm">
                <Sparkles className="!h-4 !w-4 !shrink-0" aria-hidden="true" />
                <span>{eyebrowText}</span>
              </p>
            ) : null}

            {titleText ? (
              <h2 className="ocean-park-intro-title !mt-1 !mb-0 !text-2xl !font-bold !leading-tight !text-brand-white md:!text-3xl lg:!text-4xl">
                {titleText}
              </h2>
            ) : null}

            {leadContent ? (
              <div
                className="ocean-park-intro-lead !mt-4 !space-y-3.5 !text-sm !leading-relaxed !text-brand-white-hover md:!text-lg [&_p]:!mb-3.5 [&_p:last-child]:!mb-0 [&_p]:!text-sm md:[&_p]:!text-lg [&_p]:!leading-relaxed [&_p]:!text-brand-white-hover [&_strong]:!font-semibold [&_strong]:!text-brand-gold"
                dangerouslySetInnerHTML={{ __html: leadContent }}
              />
            ) : null}

            {validBadges.length > 0 ? (
              <div className="ocean-park-intro-badges !mt-5 !flex !flex-nowrap !gap-2.5 !overflow-x-auto !pb-1.5 md:!flex-wrap md:!overflow-visible">
                {validBadges.map((badge, index) => (
                  <span
                    key={`${badge}-${index}`}
                    className="ocean-park-intro-badge !shrink-0 !rounded-full !border !border-brand-gold/35 !bg-brand-white/10 !px-3.5 !py-1.5 !text-sm !font-medium !text-brand-white-hover"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : null}

            {hasPrimaryCta || hasSecondaryCta ? (
              <div className="ocean-park-intro-actions !mt-6 !flex !flex-wrap !items-center !gap-4 md:!mt-8">
                {hasPrimaryCta && primaryCta ? (
                  <Link
                    {...primaryCta.link}
                    className={cn(
                      "ocean-park-intro-primary-cta !inline-flex !items-center !justify-center !gap-2.5 !rounded-full !bg-brand-gold !px-7 !py-3.5 !text-sm !font-bold !uppercase !tracking-wide !text-brand-white !no-underline !shadow-lg !transition-colors hover:!bg-brand-gold-hover md:!px-8 md:!py-4 md:!text-lg",
                      primaryCta.link?.className,
                    )}
                  >
                    <PhoneCall className="!h-5 !w-5 !shrink-0" aria-hidden="true" />
                    <span>{primaryLabel}</span>
                  </Link>
                ) : null}

                {hasSecondaryCta && secondaryCta ? (
                  <Link
                    {...secondaryCta.link}
                    className={cn(
                      "ocean-park-intro-secondary-cta !inline-flex !items-center !justify-center !rounded-full !border-2 !border-brand-gold !bg-transparent !px-7 !py-3.5 !text-sm !font-bold !uppercase !tracking-wide !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white md:!px-8 md:!py-4 md:!text-lg",
                      secondaryCta.link?.className,
                    )}
                  >
                    {secondaryLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          {validHighlights.length > 0 ? (
            <div className="ocean-park-intro-highlights !grid !grid-cols-2 !gap-4 !self-center lg:!col-span-5">
              {validHighlights.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="ocean-park-intro-highlight-card !flex !flex-col !justify-between !rounded-2xl !border !border-brand-gold/45 !bg-brand-white/10 !p-2.5 !backdrop-blur-sm md:!p-6"
                >
                  <span className="ocean-park-intro-highlight-label !text-[13px] !font-semibold !uppercase !tracking-wide !text-brand-white-hover">
                    {item.label}
                  </span>
                  <strong className="ocean-park-intro-highlight-value !mt-2 !text-[15px] !font-extrabold !leading-snug !text-brand-gold md:!text-2xl">
                    {item.value}
                  </strong>
                  {item.note?.trim() ? (
                    <span className="ocean-park-intro-highlight-note !mt-2 !text-[13px] !leading-relaxed !text-brand-white-hover/90 md:!text-[15px]">
                      {item.note}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {validSteps.length > 0 ? (
          <div className="ocean-park-intro-steps !flex !flex-nowrap !gap-4 !overflow-x-auto !bg-brand-white-hover/50 !p-2.5 !snap-x !snap-mandatory md:!grid md:!grid-cols-3 md:!gap-6 md:!overflow-visible md:!p-8 lg:!p-10">
            {validSteps.map((step, index) => (
              <article
                key={`${step.number ?? index}-${step.title}-${index}`}
                className="ocean-park-intro-step !w-[85%] !shrink-0 !snap-start !rounded-2xl !border !border-brand-navy/15 !bg-brand-white !p-2.5 !shadow-md md:!w-auto md:!p-6"
              >
                <div className="!flex !items-center !gap-3.5">
                  <span className="ocean-park-intro-step-number !inline-flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-full !bg-brand-navy !text-sm !font-bold !text-brand-gold">
                    {(step.number ?? "").trim() || `0${index + 1}`}
                  </span>
                  <h3 className="ocean-park-intro-step-title !mb-0 !text-lg !font-bold !leading-snug !text-brand-navy md:!text-xl">
                    {step.title}
                  </h3>
                </div>
                <p className="ocean-park-intro-step-desc !mt-3 !mb-0 !text-sm !leading-relaxed !text-brand-navy/85">
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

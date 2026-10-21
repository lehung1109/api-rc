import { CheckCircle2, Factory, MapPin, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface OceanParkLocalStrengthModel {
  badge: string;
  title: string;
  address: string;
  distanceNote: string;
  description: string;
  highlightPoints: string[];
  image: MediaModel;
}

export interface OceanParkCapabilityPillarModel {
  title: string;
  description: string;
  checkpoints: string[];
  image: MediaModel;
}

export interface OceanParkProofBannerModel {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: LinkModel;
}

export interface OceanParkAdvantagesModel {
  className?: string;
  eyebrow: string;
  title: string;
  description: string;
  localStrengths: OceanParkLocalStrengthModel[];
  capabilityPillars: OceanParkCapabilityPillarModel[];
  proofBanner: OceanParkProofBannerModel;
}

const OceanParkAdvantages = (model: OceanParkAdvantagesModel) => {
  const {
    className,
    eyebrow,
    title,
    description,
    localStrengths,
    capabilityPillars,
    proofBanner,
  } = model;

  const eyebrowText = (eyebrow ?? "").trim();
  const titleText = (title ?? "").trim();
  const descText = (description ?? "").trim();

  const validStrengths = (localStrengths ?? []).filter(
    (item) =>
      Boolean(item) &&
      (item.title ?? "").trim().length > 0 &&
      (item.address ?? "").trim().length > 0,
  );
  const validPillars = (capabilityPillars ?? []).filter(
    (item) => Boolean(item) && (item.title ?? "").trim().length > 0,
  );
  const proofTitle = (proofBanner?.title ?? "").trim();
  const proofDesc = (proofBanner?.description ?? "").trim();
  const proofBtnLabel = (proofBanner?.buttonLabel ?? "").trim();
  const proofBtnUrl = (proofBanner?.buttonLink?.url ?? "").trim();

  if (
    !eyebrowText &&
    !titleText &&
    validStrengths.length === 0 &&
    validPillars.length === 0 &&
    !proofTitle
  ) {
    return null;
  }

  return (
    <section
      id="the-manh-ic-house-ocean-park"
      className={cn(
        "ocean-park-advantages !w-full !bg-brand-navy !px-4 !py-10 !text-brand-white md:!px-6 md:!py-16",
        className,
      )}
    >
      <div className="ocean-park-advantages-inner !mx-auto !w-full !max-w-7xl">
        <div className="ocean-park-advantages-header !mx-auto !max-w-3xl !text-center">
          {eyebrowText ? (
            <p className="ocean-park-advantages-eyebrow !mb-2 !inline-flex !items-center !gap-1.5 !rounded-full !border !border-brand-gold/45 !bg-brand-gold/15 !px-3.5 !py-1 !text-xs !font-bold !uppercase !tracking-widest !text-brand-gold md:!text-sm">
              <ShieldCheck
                className="!h-3.5 !w-3.5 !shrink-0"
                aria-hidden="true"
              />
              <span>{eyebrowText}</span>
            </p>
          ) : null}
          {titleText ? (
            <h2 className="ocean-park-advantages-title !mt-1 !mb-0 !text-2xl !font-bold !leading-snug !text-brand-white md:!text-3xl lg:!text-4xl">
              {titleText}
            </h2>
          ) : null}
          {descText ? (
            <p className="ocean-park-advantages-desc !mt-3 !mb-0 !text-sm !leading-relaxed !text-brand-white-hover/85 md:!text-base">
              {descText}
            </p>
          ) : null}
        </div>

        {validStrengths.length > 0 ? (
          <div className="ocean-park-local-strengths !mt-8 !flex !flex-nowrap !gap-4 !overflow-x-auto !pb-4 !snap-x !snap-mandatory md:!mt-10 md:!grid md:!grid-cols-3 md:!gap-6 md:!overflow-visible">
            {validStrengths.map((item, index) => {
              const validPoints = (item.highlightPoints ?? []).filter(
                (point) => typeof point === "string" && point.trim().length > 0,
              );
              return (
                <article
                  key={`${item.title}-${index}`}
                  className="ocean-park-local-strength-card !flex !w-[86%] !shrink-0 !snap-start !flex-col !overflow-hidden !rounded-2xl !border !border-brand-gold/40 !bg-brand-white !text-brand-navy !shadow-xl md:!w-auto"
                >
                  {item.image?.url?.trim() ? (
                    <div className="!relative !aspect-[16/9] !w-full !overflow-hidden !bg-brand-navy/10">
                      <Media
                        {...item.image}
                        className="!h-full !w-full !object-cover !transition-transform !duration-500 hover:!scale-105"
                      />
                      {(item.badge ?? "").trim() ? (
                        <span className="!absolute !top-3 !left-3 !rounded-full !bg-brand-navy/90 !px-3 !py-1 !text-xs !font-bold !text-brand-gold">
                          {item.badge}
                        </span>
                      ) : null}
                      {(item.distanceNote ?? "").trim() ? (
                        <span className="!absolute !right-3 !bottom-3 !rounded-lg !bg-brand-gold !px-2.5 !py-1 !text-xs !font-bold !text-brand-white">
                          {item.distanceNote}
                        </span>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="!flex !flex-1 !flex-col !p-5 md:!p-6">
                    <h3 className="!mb-0 !text-lg !font-bold !leading-snug !text-brand-navy md:!text-xl">
                      {item.title}
                    </h3>

                    <div className="!mt-2.5 !flex !items-start !gap-2 !rounded-xl !border !border-brand-gold/35 !bg-brand-gold/10 !p-3">
                      <MapPin
                        className="!mt-0.5 !h-4 !w-4 !shrink-0 !text-brand-gold"
                        aria-hidden="true"
                      />
                      <strong className="!text-xs !font-bold !leading-snug !text-brand-navy md:!text-sm">
                        {item.address}
                      </strong>
                    </div>

                    {(item.description ?? "").trim() ? (
                      <p className="!mt-3 !mb-0 !text-xs !leading-relaxed !text-brand-navy/80 md:!text-sm">
                        {item.description}
                      </p>
                    ) : null}

                    {validPoints.length > 0 ? (
                      <ul className="!mt-3 !mb-0 !list-none !space-y-2 !border-t !border-brand-navy/10 !pt-3 !p-0">
                        {validPoints.map((point, pointIdx) => (
                          <li
                            key={`${point}-${pointIdx}`}
                            className="!flex !items-start !gap-2 !text-xs !text-brand-navy/85 md:!text-sm"
                          >
                            <CheckCircle2
                              className="!mt-0.5 !h-3.5 !w-3.5 !shrink-0 !text-brand-gold"
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        {validPillars.length > 0 ? (
          <div className="ocean-park-capability-pillars !mt-6 !flex !flex-nowrap !gap-4 !overflow-x-auto !pb-3 !snap-x !snap-mandatory md:!mt-8 md:!grid md:!grid-cols-2 md:!gap-6 md:!overflow-visible">
            {validPillars.map((pillar, index) => {
              const validCheckpoints = (pillar.checkpoints ?? []).filter(
                (cp) => typeof cp === "string" && cp.trim().length > 0,
              );
              return (
                <article
                  key={`${pillar.title}-${index}`}
                  className="ocean-park-capability-pillar !flex !w-[86%] !shrink-0 !snap-start !flex-col !justify-between !overflow-hidden !rounded-2xl !border !border-brand-white/15 !bg-brand-white/10 !p-5 !backdrop-blur-sm md:!w-auto md:!p-6"
                >
                  <div>
                    <div className="!flex !items-center !gap-2.5">
                      <span className="!inline-flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-full !bg-brand-gold !text-brand-white">
                        <Factory className="!h-4 !w-4" aria-hidden="true" />
                      </span>
                      <h3 className="!mb-0 !text-lg !font-bold !text-brand-gold md:!text-xl">
                        {pillar.title}
                      </h3>
                    </div>

                    {(pillar.description ?? "").trim() ? (
                      <p className="!mt-3 !mb-0 !text-xs !leading-relaxed !text-brand-white-hover md:!text-sm">
                        {pillar.description}
                      </p>
                    ) : null}

                    {validCheckpoints.length > 0 ? (
                      <ul className="!mt-3.5 !mb-0 !list-none !space-y-2 !p-0">
                        {validCheckpoints.map((cp, cpIdx) => (
                          <li
                            key={`${cp}-${cpIdx}`}
                            className="!flex !items-start !gap-2 !text-xs !text-brand-white-hover md:!text-sm"
                          >
                            <CheckCircle2
                              className="!mt-0.5 !h-4 !w-4 !shrink-0 !text-brand-gold"
                              aria-hidden="true"
                            />
                            <span>{cp}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  {pillar.image?.url?.trim() ? (
                    <div className="!mt-4 !aspect-[16/7] !w-full !overflow-hidden !rounded-xl">
                      <Media
                        {...pillar.image}
                        className="!h-full !w-full !object-cover"
                      />
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : null}

        {proofTitle ? (
          <div className="ocean-park-advantages-proof-banner !mt-8 !flex !flex-col !items-center !justify-between !gap-4 !rounded-2xl !border !border-brand-gold !bg-brand-gold/15 !p-5 md:!flex-row md:!p-7">
            <div>
              <h3 className="!mb-0 !text-lg !font-bold !text-brand-gold md:!text-xl">
                {proofTitle}
              </h3>
              <p className="!mt-1 !mb-0 !text-xs !text-brand-white-hover md:!text-sm">
                {proofDesc}
              </p>
            </div>
            {proofBtnLabel && proofBtnUrl && proofBanner?.buttonLink ? (
              <Link
                {...proofBanner.buttonLink}
                className="!inline-flex !shrink-0 !items-center !justify-center !rounded-full !bg-brand-gold !px-6 !py-2.5 !text-xs !font-bold !uppercase !text-brand-white !no-underline !transition-colors hover:!bg-brand-gold-hover md:!text-sm"
              >
                {proofBtnLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OceanParkAdvantages;

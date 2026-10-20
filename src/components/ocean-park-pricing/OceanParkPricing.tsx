import { CheckCircle2, Crown, PhoneCall, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface OceanParkPricingFeaturedPackageModel {
  badge: string;
  title: string;
  price: string;
  unit: string;
  note: string;
  handoverSavingNote: string;
}

export interface OceanParkPricingCtaModel {
  label: string;
  link: LinkModel;
}

export interface OceanParkPricingUnitEstimateModel {
  unitType: string;
  areaRange: string;
  priceRange: string;
  highlight?: boolean;
  targetZones?: string;
}

export interface OceanParkPricingRoomEstimateModel {
  roomName: string;
  englishName: string;
  priceRange: string;
}

export interface OceanParkPricingCommitmentItemModel {
  label: string;
  detail: string;
}

export interface OceanParkPricingCommitmentModel {
  title: string;
  items: OceanParkPricingCommitmentItemModel[];
}

export interface OceanParkPricingBottomPromptModel {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: LinkModel;
}

export interface OceanParkPricingModel {
  className?: string;
  eyebrow: string;
  title: string;
  description: string;
  featuredPackage: OceanParkPricingFeaturedPackageModel;
  primaryCta: OceanParkPricingCtaModel;
  secondaryCta: OceanParkPricingCtaModel;
  unitEstimatesTitle: string;
  unitEstimatesSubtitle: string;
  unitEstimates: OceanParkPricingUnitEstimateModel[];
  roomEstimates: OceanParkPricingRoomEstimateModel[];
  commitments: OceanParkPricingCommitmentModel[];
  bottomPrompt: OceanParkPricingBottomPromptModel;
}

const OceanParkPricing = (model: OceanParkPricingModel) => {
  const {
    className,
    eyebrow,
    title,
    description,
    featuredPackage,
    primaryCta,
    secondaryCta,
    unitEstimatesTitle,
    unitEstimatesSubtitle,
    unitEstimates,
    roomEstimates,
    commitments,
    bottomPrompt,
  } = model;

  const eyebrowText = eyebrow.trim();
  const titleText = title.trim();
  const descText = description.trim();
  const hasFeaturedPackage =
    featuredPackage.title.trim().length > 0 ||
    featuredPackage.price.trim().length > 0;
  const hasPrimaryCta =
    primaryCta.label.trim().length > 0 && primaryCta.link.url.trim().length > 0;
  const hasSecondaryCta =
    secondaryCta.label.trim().length > 0 &&
    secondaryCta.link.url.trim().length > 0;

  const validUnitEstimates = unitEstimates.filter(
    (item) =>
      item.unitType.trim().length > 0 && item.priceRange.trim().length > 0,
  );
  const validRoomEstimates = roomEstimates.filter(
    (item) =>
      item.roomName.trim().length > 0 && item.priceRange.trim().length > 0,
  );
  const validCommitments = commitments
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.label.trim().length > 0 || item.detail.trim().length > 0,
      ),
    }))
    .filter(
      (group) => group.title.trim().length > 0 && group.items.length > 0,
    );

  if (
    !eyebrowText &&
    !titleText &&
    !hasFeaturedPackage &&
    validUnitEstimates.length === 0 &&
    validRoomEstimates.length === 0 &&
    validCommitments.length === 0
  ) {
    return null;
  }

  return (
    <section
      id="bang-gia-noi-that-ocean-park"
      className={cn(
        "ocean-park-pricing !w-full !bg-brand-white !px-4 !py-10 !text-brand-navy md:!px-6 md:!py-16",
        className,
      )}
    >
      <div className="ocean-park-pricing-inner !mx-auto !w-full !max-w-7xl">
        <div className="ocean-park-pricing-header !mx-auto !max-w-3xl !text-center">
          {eyebrowText ? (
            <p className="ocean-park-pricing-eyebrow !mb-2 !inline-flex !items-center !gap-1.5 !text-xs !font-bold !uppercase !tracking-widest !text-brand-gold md:!text-sm">
              <Crown className="!h-4 !w-4 !shrink-0" aria-hidden="true" />
              <span>{eyebrowText}</span>
            </p>
          ) : null}
          {titleText ? (
            <h2 className="ocean-park-pricing-title !text-2xl !font-bold !leading-snug !text-brand-navy md:!text-3xl lg:!text-4xl">
              {titleText}
            </h2>
          ) : null}
          {descText ? (
            <p className="ocean-park-pricing-desc !mt-3 !text-sm !leading-relaxed !text-brand-navy/75 md:!text-base">
              {descText}
            </p>
          ) : null}
        </div>

        {hasFeaturedPackage ? (
          <div className="ocean-park-pricing-featured !mt-8 !overflow-hidden !rounded-2xl !border !border-brand-gold/50 !bg-brand-navy !p-5 !text-brand-white !shadow-xl md:!p-8">
            <div className="!grid !grid-cols-1 !gap-6 lg:!grid-cols-12 lg:!items-center">
              <div className="lg:!col-span-7">
                {featuredPackage.badge.trim() ? (
                  <span className="ocean-park-pricing-featured-badge !inline-flex !items-center !gap-1.5 !rounded-full !bg-brand-gold/20 !px-3.5 !py-1 !text-xs !font-bold !uppercase !tracking-wider !text-brand-gold">
                    <Sparkles className="!h-3.5 !w-3.5" aria-hidden="true" />
                    <span>{featuredPackage.badge}</span>
                  </span>
                ) : null}

                <h3 className="ocean-park-pricing-featured-title !mt-2.5 !text-xl !font-bold !leading-snug !text-brand-white md:!text-2xl">
                  {featuredPackage.title}
                </h3>

                <div className="ocean-park-pricing-featured-price-row !mt-3 !flex !flex-wrap !items-baseline !gap-2">
                  <strong className="!text-3xl !font-extrabold !text-brand-gold md:!text-4xl">
                    {featuredPackage.price}
                  </strong>
                  {featuredPackage.unit.trim() ? (
                    <span className="!text-sm !font-medium !text-brand-white-hover md:!text-base">
                      {featuredPackage.unit}
                    </span>
                  ) : null}
                </div>

                {featuredPackage.note.trim() ? (
                  <p className="ocean-park-pricing-featured-note !mt-2.5 !text-xs !leading-relaxed !text-brand-white-hover md:!text-sm">
                    {featuredPackage.note}
                  </p>
                ) : null}
              </div>

              <div className="!flex !flex-col !justify-between !gap-4 !rounded-xl !border !border-brand-gold/35 !bg-brand-white/10 !p-4 lg:!col-span-5 md:!p-5">
                {featuredPackage.handoverSavingNote.trim() ? (
                  <p className="ocean-park-pricing-saving-note !mb-0 !text-xs !leading-relaxed !text-brand-white-hover md:!text-sm">
                    {featuredPackage.handoverSavingNote}
                  </p>
                ) : null}

                {hasPrimaryCta || hasSecondaryCta ? (
                  <div className="!flex !flex-wrap !items-center !gap-3">
                    {hasPrimaryCta ? (
                      <Link
                        {...primaryCta.link}
                        className="!inline-flex !flex-1 !items-center !justify-center !gap-2 !rounded-full !bg-brand-gold !px-5 !py-2.5 !text-xs !font-bold !uppercase !text-brand-white !no-underline !transition-colors hover:!bg-brand-gold-hover md:!text-sm"
                      >
                        <PhoneCall
                          className="!h-3.5 !w-3.5 !shrink-0"
                          aria-hidden="true"
                        />
                        <span>{primaryCta.label}</span>
                      </Link>
                    ) : null}

                    {hasSecondaryCta ? (
                      <Link
                        {...secondaryCta.link}
                        className="!inline-flex !flex-1 !items-center !justify-center !rounded-full !border !border-brand-gold !px-5 !py-2.5 !text-xs !font-bold !uppercase !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white md:!text-sm"
                      >
                        {secondaryCta.label}
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {validUnitEstimates.length > 0 ? (
          <div className="ocean-park-pricing-units !mt-8 md:!mt-10">
            <div className="!mb-4 !flex !flex-col !justify-between !gap-1 md:!flex-row md:!items-end">
              {unitEstimatesTitle.trim() ? (
                <h3 className="!text-lg !font-bold !text-brand-navy md:!text-2xl">
                  {unitEstimatesTitle}
                </h3>
              ) : null}
              {unitEstimatesSubtitle.trim() ? (
                <p className="!mb-0 !text-xs !text-brand-navy/70 md:!text-sm">
                  {unitEstimatesSubtitle}
                </p>
              ) : null}
            </div>

            <div className="ocean-park-pricing-unit-grid !grid !grid-cols-2 !gap-3 md:!grid-cols-3 lg:!grid-cols-5 md:!gap-4">
              {validUnitEstimates.map((unit, index) => (
                <article
                  key={`${unit.unitType}-${index}`}
                  className={cn(
                    "ocean-park-pricing-unit-card !flex !flex-col !justify-between !rounded-xl !border !p-4 !transition-shadow",
                    unit.highlight
                      ? "!border-2 !border-brand-gold !bg-brand-navy !text-brand-white !shadow-md"
                      : "!border-brand-navy/15 !bg-brand-white-hover/35 !text-brand-navy hover:!shadow-sm",
                  )}
                >
                  <div>
                    <div className="!flex !items-center !justify-between !gap-1">
                      <span
                        className={cn(
                          "!text-xs !font-bold !uppercase",
                          unit.highlight
                            ? "!text-brand-gold"
                            : "!text-brand-navy/75",
                        )}
                      >
                        {unit.unitType}
                      </span>
                      {unit.highlight ? (
                        <span className="!rounded-full !bg-brand-gold !px-2 !py-0.5 !text-[10px] !font-bold !text-brand-white">
                          Phổ biến
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "!mt-1 !mb-0 !text-xs",
                        unit.highlight
                          ? "!text-brand-white-hover/85"
                          : "!text-brand-navy/65",
                      )}
                    >
                      Diện tích: {unit.areaRange}
                    </p>
                  </div>

                  <div className="!mt-3 !border-t !border-current/10 !pt-2.5">
                    <strong
                      className={cn(
                        "!block !text-base !font-extrabold md:!text-lg",
                        unit.highlight
                          ? "!text-brand-gold"
                          : "!text-brand-navy",
                      )}
                    >
                      {unit.priceRange}
                    </strong>
                    {unit.targetZones?.trim() ? (
                      <span
                        className={cn(
                          "!mt-1 !block !text-[11px] !leading-snug",
                          unit.highlight
                            ? "!text-brand-white-hover/85"
                            : "!text-brand-navy/70",
                        )}
                      >
                        {unit.targetZones}
                      </span>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {validRoomEstimates.length > 0 ? (
          <div className="ocean-park-pricing-rooms !mt-6 !grid !grid-cols-2 !gap-3 md:!grid-cols-4 md:!gap-4">
            {validRoomEstimates.map((room, index) => (
              <div
                key={`${room.roomName}-${index}`}
                className="ocean-park-pricing-room-card !rounded-xl !border !border-brand-navy/10 !bg-brand-white !p-3.5 !shadow-xs md:!p-4"
              >
                <span className="!block !text-[11px] !font-semibold !uppercase !tracking-wider !text-brand-gold">
                  {room.englishName}
                </span>
                <h4 className="!mt-0.5 !text-sm !font-bold !text-brand-navy md:!text-base">
                  {room.roomName}
                </h4>
                <strong className="!mt-2 !block !text-sm !font-extrabold !text-brand-navy md:!text-base">
                  {room.priceRange}
                </strong>
              </div>
            ))}
          </div>
        ) : null}

        {validCommitments.length > 0 ? (
          <div className="ocean-park-pricing-commitments !mt-8 !flex !flex-nowrap !gap-4 !overflow-x-auto !pb-3 !snap-x !snap-mandatory md:!mt-10 md:!grid md:!grid-cols-3 md:!gap-6 md:!overflow-visible">
            {validCommitments.map((group, groupIndex) => (
              <article
                key={`${group.title}-${groupIndex}`}
                className="ocean-park-pricing-commitment-col !w-[85%] !shrink-0 !snap-start !rounded-2xl !border !border-brand-navy/12 !bg-brand-white !p-5 !shadow-sm md:!w-auto md:!p-6"
              >
                <h3 className="!border-b !border-brand-gold/30 !pb-3 !text-base !font-bold !text-brand-navy md:!text-lg">
                  {group.title}
                </h3>
                <ul className="!mt-4 !mb-0 !list-none !space-y-3 !p-0">
                  {group.items.map((item, itemIndex) => (
                    <li
                      key={`${item.label}-${itemIndex}`}
                      className="!flex !items-start !gap-2.5 !text-xs !leading-relaxed md:!text-sm"
                    >
                      <CheckCircle2
                        className="!mt-0.5 !h-4 !w-4 !shrink-0 !text-brand-gold"
                        aria-hidden="true"
                      />
                      <div>
                        <strong className="!font-bold !text-brand-navy">
                          {item.label}:{" "}
                        </strong>
                        <span className="!text-brand-navy/80">
                          {item.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : null}

        {bottomPrompt.title.trim() ? (
          <div className="ocean-park-pricing-bottom-prompt !mt-8 !flex !flex-col !items-center !justify-between !gap-4 !rounded-2xl !border !border-brand-gold/40 !bg-brand-white-hover/50 !p-5 md:!flex-row md:!p-6">
            <div>
              <h3 className="!text-base !font-bold !text-brand-navy md:!text-lg">
                {bottomPrompt.title}
              </h3>
              <p className="!mt-1 !mb-0 !text-xs !text-brand-navy/75 md:!text-sm">
                {bottomPrompt.description}
              </p>
            </div>
            {bottomPrompt.buttonLabel.trim() &&
            bottomPrompt.buttonLink.url.trim() ? (
              <Link
                {...bottomPrompt.buttonLink}
                className="!inline-flex !shrink-0 !items-center !justify-center !rounded-full !bg-brand-navy !px-6 !py-2.5 !text-xs !font-bold !uppercase !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white md:!text-sm"
              >
                {bottomPrompt.buttonLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OceanParkPricing;

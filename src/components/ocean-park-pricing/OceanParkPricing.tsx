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

  const eyebrowText = (eyebrow ?? "").trim();
  const titleText = (title ?? "").trim();
  const descText = (description ?? "").trim();
  const featuredBadge = (featuredPackage?.badge ?? "").trim();
  const featuredTitle = (featuredPackage?.title ?? "").trim();
  const featuredPrice = (featuredPackage?.price ?? "").trim();
  const featuredUnit = (featuredPackage?.unit ?? "").trim();
  const featuredNote = (featuredPackage?.note ?? "").trim();
  const featuredSavingNote = (featuredPackage?.handoverSavingNote ?? "").trim();
  const hasFeaturedPackage =
    featuredTitle.length > 0 || featuredPrice.length > 0;
  const primaryLabel = (primaryCta?.label ?? "").trim();
  const primaryUrl = (primaryCta?.link?.url ?? "").trim();
  const hasPrimaryCta = primaryLabel.length > 0 && primaryUrl.length > 0;
  const secondaryLabel = (secondaryCta?.label ?? "").trim();
  const secondaryUrl = (secondaryCta?.link?.url ?? "").trim();
  const hasSecondaryCta = secondaryLabel.length > 0 && secondaryUrl.length > 0;

  const unitEstimatesTitleText = (unitEstimatesTitle ?? "").trim();
  const unitEstimatesSubtitleText = (unitEstimatesSubtitle ?? "").trim();

  const validUnitEstimates = (unitEstimates ?? []).filter(
    (item) =>
      Boolean(item) &&
      (item.unitType ?? "").trim().length > 0 &&
      (item.priceRange ?? "").trim().length > 0,
  );
  const validRoomEstimates = (roomEstimates ?? []).filter(
    (item) =>
      Boolean(item) &&
      (item.roomName ?? "").trim().length > 0 &&
      (item.priceRange ?? "").trim().length > 0,
  );
  const validCommitments = (commitments ?? [])
    .filter(Boolean)
    .map((group) => ({
      ...group,
      items: (group.items ?? []).filter(
        (item) =>
          Boolean(item) &&
          ((item.label ?? "").trim().length > 0 ||
            (item.detail ?? "").trim().length > 0),
      ),
    }))
    .filter(
      (group) =>
        (group.title ?? "").trim().length > 0 && group.items.length > 0,
    );

  const bottomPromptTitle = (bottomPrompt?.title ?? "").trim();
  const bottomPromptDesc = (bottomPrompt?.description ?? "").trim();
  const bottomPromptBtnLabel = (bottomPrompt?.buttonLabel ?? "").trim();
  const bottomPromptBtnUrl = (bottomPrompt?.buttonLink?.url ?? "").trim();

  if (
    !eyebrowText &&
    !titleText &&
    !hasFeaturedPackage &&
    validUnitEstimates.length === 0 &&
    validRoomEstimates.length === 0 &&
    validCommitments.length === 0 &&
    !bottomPromptTitle
  ) {
    return null;
  }

  return (
    <section
      id="bang-gia-noi-that-ocean-park"
      className={cn(
        "ocean-park-pricing !w-full !bg-brand-white !px-4 !py-12 !text-brand-navy md:!px-6 md:!py-16 lg:!py-20",
        className,
      )}
    >
      <div className="ocean-park-pricing-inner !mx-auto !w-full !max-w-7xl">
        <div className="ocean-park-pricing-header !mx-auto !max-w-4xl !text-center">
          {eyebrowText ? (
            <p className="ocean-park-pricing-eyebrow !mb-2.5 !inline-flex !items-center !gap-2 !text-sm !font-bold !uppercase !tracking-widest !text-brand-gold md:!text-base">
              <Crown className="!h-4 !w-4 !shrink-0" aria-hidden="true" />
              <span>{eyebrowText}</span>
            </p>
          ) : null}
          {titleText ? (
            <h2 className="ocean-park-pricing-title !mb-0 !text-2xl !font-bold !leading-tight !text-brand-navy md:!text-3xl lg:!text-4xl">
              {titleText}
            </h2>
          ) : null}
          {descText ? (
            <p className="ocean-park-pricing-desc !mt-4 !mb-0 !text-base !leading-relaxed !text-brand-navy/80 md:!text-lg">
              {descText}
            </p>
          ) : null}
        </div>

        {hasFeaturedPackage ? (
          <div className="ocean-park-pricing-featured !mt-8 !overflow-hidden !rounded-3xl !border !border-brand-gold/50 !bg-brand-navy !p-6 !text-brand-white !shadow-xl md:!mt-10 md:!p-8 lg:!p-10">
            <div className="!grid !grid-cols-1 !gap-7 lg:!grid-cols-12 lg:!items-center">
              <div className="lg:!col-span-7">
                {featuredBadge ? (
                  <span className="ocean-park-pricing-featured-badge !inline-flex !items-center !gap-2 !rounded-full !bg-brand-gold/20 !px-4 !py-1.5 !text-sm !font-bold !uppercase !tracking-wider !text-brand-gold">
                    <Sparkles className="!h-4 !w-4" aria-hidden="true" />
                    <span>{featuredBadge}</span>
                  </span>
                ) : null}

                <h3 className="ocean-park-pricing-featured-title !mt-3 !mb-0 !text-xl !font-bold !leading-snug !text-brand-white md:!text-2xl lg:!text-[26px]">
                  {featuredTitle}
                </h3>

                <div className="ocean-park-pricing-featured-price-row !mt-3.5 !flex !flex-wrap !items-baseline !gap-2.5">
                  <strong className="!text-3xl !font-extrabold !text-brand-gold md:!text-4xl lg:!text-[42px]">
                    {featuredPrice}
                  </strong>
                  {featuredUnit ? (
                    <span className="!text-base !font-medium !text-brand-white-hover md:!text-lg">
                      {featuredUnit}
                    </span>
                  ) : null}
                </div>

                {featuredNote ? (
                  <p className="ocean-park-pricing-featured-note !mt-3 !mb-0 !text-base !leading-relaxed !text-brand-white-hover">
                    {featuredNote}
                  </p>
                ) : null}
              </div>

              <div className="!flex !flex-col !justify-between !gap-5 !rounded-2xl !border !border-brand-gold/40 !bg-brand-white/10 !p-5 lg:!col-span-5 md:!p-6">
                {featuredSavingNote ? (
                  <p className="ocean-park-pricing-saving-note !mb-0 !text-base !leading-relaxed !text-brand-white-hover">
                    {featuredSavingNote}
                  </p>
                ) : null}

                {hasPrimaryCta || hasSecondaryCta ? (
                  <div className="!flex !flex-wrap !items-center !gap-3.5">
                    {hasPrimaryCta && primaryCta ? (
                      <Link
                        {...primaryCta.link}
                        className="!inline-flex !flex-1 !items-center !justify-center !gap-2 !rounded-full !bg-brand-gold !px-6 !py-3.5 !text-sm !font-bold !uppercase !text-brand-white !no-underline !transition-colors hover:!bg-brand-gold-hover md:!text-base"
                      >
                        <PhoneCall
                          className="!h-4 !w-4 !shrink-0"
                          aria-hidden="true"
                        />
                        <span>{primaryLabel}</span>
                      </Link>
                    ) : null}

                    {hasSecondaryCta && secondaryCta ? (
                      <Link
                        {...secondaryCta.link}
                        className="!inline-flex !flex-1 !items-center !justify-center !rounded-full !border-2 !border-brand-gold !px-6 !py-3.5 !text-sm !font-bold !uppercase !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white md:!text-base"
                      >
                        {secondaryLabel}
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {validUnitEstimates.length > 0 ? (
          <div className="ocean-park-pricing-units !mt-10 md:!mt-12">
            <div className="!mb-5 !flex !flex-col !justify-between !gap-2 md:!flex-row md:!items-end">
              {unitEstimatesTitleText ? (
                <h3 className="!mb-0 !text-xl !font-bold !text-brand-navy md:!text-2xl">
                  {unitEstimatesTitleText}
                </h3>
              ) : null}
              {unitEstimatesSubtitleText ? (
                <p className="!mb-0 !text-sm !text-brand-navy/75 md:!text-base">
                  {unitEstimatesSubtitleText}
                </p>
              ) : null}
            </div>

            <div className="ocean-park-pricing-unit-grid !grid !grid-cols-1 sm:!grid-cols-2 !gap-4 md:!grid-cols-3 lg:!grid-cols-5 md:!gap-5">
              {validUnitEstimates.map((unit, index) => (
                <article
                  key={`${unit.unitType}-${index}`}
                  className={cn(
                    "ocean-park-pricing-unit-card !flex !flex-col !justify-between !rounded-2xl !border !p-5 !transition-shadow",
                    unit.highlight
                      ? "!border-2 !border-brand-gold !bg-brand-navy !text-brand-white !shadow-lg"
                      : "!border-brand-navy/15 !bg-brand-white-hover/40 !text-brand-navy hover:!shadow-md",
                  )}
                >
                  <div>
                    <div className="!flex !items-center !justify-between !gap-1.5">
                      <span
                        className={cn(
                          "!text-sm !font-bold !uppercase md:!text-base",
                          unit.highlight
                            ? "!text-brand-gold"
                            : "!text-brand-navy/85",
                        )}
                      >
                        {unit.unitType}
                      </span>
                      {unit.highlight ? (
                        <span className="!rounded-full !bg-brand-gold !px-2.5 !py-0.5 !text-xs !font-bold !text-brand-white">
                          Phổ biến
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "!mt-1.5 !mb-0 !text-sm",
                        unit.highlight
                          ? "!text-brand-white-hover/90"
                          : "!text-brand-navy/75",
                      )}
                    >
                      Diện tích: {unit.areaRange}
                    </p>
                  </div>

                  <div className="!mt-4 !border-t !border-current/15 !pt-3">
                    <strong
                      className={cn(
                        "!block !text-lg !font-extrabold md:!text-xl",
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
                          "!mt-1.5 !block !text-sm !leading-snug",
                          unit.highlight
                            ? "!text-brand-white-hover/90"
                            : "!text-brand-navy/75",
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
          <div className="ocean-park-pricing-rooms !mt-6 !grid !grid-cols-1 sm:!grid-cols-2 !gap-4 md:!grid-cols-4 md:!gap-5">
            {validRoomEstimates.map((room, index) => (
              <div
                key={`${room.roomName}-${index}`}
                className="ocean-park-pricing-room-card !rounded-2xl !border !border-brand-navy/15 !bg-brand-white !p-5 !shadow-sm"
              >
                <span className="!block !text-xs !font-semibold !uppercase !tracking-wider !text-brand-gold md:!text-sm">
                  {room.englishName}
                </span>
                <h4 className="!mt-1 !mb-0 !text-base !font-bold !text-brand-navy md:!text-lg">
                  {room.roomName}
                </h4>
                <strong className="!mt-2.5 !block !text-base !font-extrabold !text-brand-navy md:!text-lg">
                  {room.priceRange}
                </strong>
              </div>
            ))}
          </div>
        ) : null}

        {validCommitments.length > 0 ? (
          <div className="ocean-park-pricing-commitments !mt-10 !flex !flex-nowrap !gap-5 !overflow-x-auto !pb-3 !snap-x !snap-mandatory md:!mt-12 md:!grid md:!grid-cols-3 md:!gap-7 md:!overflow-visible">
            {validCommitments.map((group, groupIndex) => (
              <article
                key={`${group.title}-${groupIndex}`}
                className="ocean-park-pricing-commitment-col !w-[86%] !shrink-0 !snap-start !rounded-2xl !border !border-brand-navy/15 !bg-brand-white !p-6 !shadow-md md:!w-auto md:!p-7"
              >
                <h3 className="!mb-0 !border-b !border-brand-gold/35 !pb-3.5 !text-lg !font-bold !text-brand-navy md:!text-xl">
                  {group.title}
                </h3>
                <ul className="!mt-4 !mb-0 !list-none !space-y-3.5 !p-0">
                  {group.items.map((item, itemIndex) => (
                    <li
                      key={`${item.label ?? itemIndex}-${itemIndex}`}
                      className="!flex !items-start !gap-3 !text-base !leading-relaxed"
                    >
                      <CheckCircle2
                        className="!mt-1 !h-5 !w-5 !shrink-0 !text-brand-gold"
                        aria-hidden="true"
                      />
                      <div>
                        {(item.label ?? "").trim() ? (
                          <strong className="!font-bold !text-brand-navy">
                            {item.label}:{" "}
                          </strong>
                        ) : null}
                        <span className="!text-brand-navy/85">
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

        {bottomPromptTitle ? (
          <div className="ocean-park-pricing-bottom-prompt !mt-10 !flex !flex-col !items-center !justify-between !gap-5 !rounded-2xl !border !border-brand-gold/45 !bg-brand-white-hover/50 !p-6 md:!flex-row md:!p-8">
            <div>
              <h3 className="!mb-0 !text-lg !font-bold !text-brand-navy md:!text-xl">
                {bottomPromptTitle}
              </h3>
              <p className="!mt-1.5 !mb-0 !text-base !leading-relaxed !text-brand-navy/80">
                {bottomPromptDesc}
              </p>
            </div>
            {bottomPromptBtnLabel &&
            bottomPromptBtnUrl &&
            bottomPrompt?.buttonLink ? (
              <Link
                {...bottomPrompt.buttonLink}
                className="!inline-flex !shrink-0 !items-center !justify-center !rounded-full !bg-brand-navy !px-7 !py-3.5 !text-sm !font-bold !uppercase !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white md:!text-base"
              >
                {bottomPromptBtnLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OceanParkPricing;

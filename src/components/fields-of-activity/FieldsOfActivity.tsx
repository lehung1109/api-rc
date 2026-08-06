import { cn } from "@/lib/utils";
import AccordionExclusiveSync, {
  type AccordionExclusiveSyncModel,
} from "../accordion-exclusive-sync/AccordionExclusiveSync";
import ClientComponentWrapper from "../ClientComponentWrapper";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import FieldsOfActivityAccordionItem, {
  type FieldsOfActivityItemModel,
} from "./FieldsOfActivityAccordionItem";
import FieldsOfActivityImages from "./FieldsOfActivityImages";
import FieldsOfActivityScrollReveal, {
  type FieldsOfActivityScrollRevealModel,
} from "./FieldsOfActivityScrollReveal";

export type { FieldsOfActivityItemModel };

export interface FieldsOfActivityModel {
  className?: string;
  title: string;
  items: FieldsOfActivityItemModel[];
  images: MediaModel[];
  buttonLabel: string;
  buttonLink: LinkModel;
  checkboxIdPrefix?: string;
  scrollReveal?: FieldsOfActivityScrollRevealModel;
}

const DEFAULT_CHECKBOX_ID_PREFIX = "fields-of-activity-item";
const DEFAULT_SCROLL_REVEAL_TARGET_ID = "fields-of-activity";

const FieldsOfActivity = (model: FieldsOfActivityModel) => {
  const {
    className,
    title,
    items,
    images,
    buttonLabel,
    buttonLink,
    checkboxIdPrefix = DEFAULT_CHECKBOX_ID_PREFIX,
    scrollReveal,
  } = model;

  const titleText = title.trim();
  const validItems = items.filter((item) => item.title.trim().length > 0);
  const hasAnyIcon = validItems.some((item) =>
    Boolean(item.iconImage?.url.trim()),
  );
  const validImages = images.filter((image) => image.url.trim().length > 0);
  const hasButton =
    buttonLabel.trim().length > 0 && buttonLink.url.trim().length > 0;
  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: FieldsOfActivityScrollRevealModel = {
    targetId,
  };
  const firstOpenIndex = validItems.findIndex((item) => item.defaultOpen);
  const exclusiveSyncModel: AccordionExclusiveSyncModel = {
    rootSelector: ".fields-of-activity-accordion",
    inputSelector: ".fields-of-activity-item-input",
    sectionId: targetId,
  };

  if (
    !titleText &&
    validItems.length === 0 &&
    validImages.length === 0 &&
    !hasButton
  ) {
    return null;
  }

  return (
    <section
      id={targetId}
      className={cn(
        "fields-of-activity mx-auto w-full max-w-7xl overflow-hidden px-4 py-16 text-brand-navy",
        className,
      )}
    >
      {titleText ? (
        <h2 className="fields-of-activity-title text-md font-bold leading-tight">
          {titleText}
        </h2>
      ) : null}

      <div
        className={cn(
          "fields-of-activity-body mt-7 grid grid-cols-1 gap-8",
          "md:grid-cols-2 md:gap-12",
        )}
      >
        {validItems.length > 0 ? (
          <div
            className={cn(
              "fields-of-activity-accordion",
              hasAnyIcon && "md:pl-12",
            )}
          >
            {validItems.map((item, index) => (
              <FieldsOfActivityAccordionItem
                key={`${item.title}-${index}`}
                {...item}
                defaultOpen={index === firstOpenIndex}
                checkboxId={`${checkboxIdPrefix}-${index}`}
              />
            ))}
          </div>
        ) : null}

        {validImages.length > 0 ? (
          <FieldsOfActivityImages images={validImages} />
        ) : null}
      </div>

      {hasButton ? (
        <div className="fields-of-activity-cta mt-8 flex justify-center md:mt-10">
          <Link
            {...buttonLink}
            className={cn(
              "fields-of-activity-button inline-flex items-center justify-center",
              "border border-brand-navy bg-brand-navy px-8 py-3",
              "text-lg font-bold uppercase tracking-wide text-brand-white no-underline",
              "transition-colors",
              "hover:border-brand-navy hover:bg-brand-white hover:text-brand-navy",
              "md:px-10 md:py-3.5 md:text-xl",
              buttonLink.className,
            )}
          >
            {buttonLabel}
          </Link>
        </div>
      ) : null}

      {validItems.length > 0 ? (
        <ClientComponentWrapper
          type="accordionExclusiveSync"
          hydrateData={exclusiveSyncModel}
          className="fields-of-activity-accordion-exclusive-sync hidden"
        >
          <AccordionExclusiveSync {...exclusiveSyncModel} />
        </ClientComponentWrapper>
      ) : null}

      <ClientComponentWrapper
        type="fieldsOfActivityScrollReveal"
        hydrateData={scrollRevealModel}
        className="fields-of-activity-scroll-reveal hidden"
      >
        <FieldsOfActivityScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default FieldsOfActivity;

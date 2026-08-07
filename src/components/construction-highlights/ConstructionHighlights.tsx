import { cn } from "@/lib/utils";
import AccordionExclusiveSync, {
  type AccordionExclusiveSyncModel,
} from "../accordion-exclusive-sync/AccordionExclusiveSync";
import ClientComponentWrapper from "../ClientComponentWrapper";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
import ConstructionHighlightsAccordionItem, {
  type ConstructionHighlightsItemModel,
} from "./ConstructionHighlightsAccordionItem";
import ConstructionHighlightsScrollReveal, {
  type ConstructionHighlightsScrollRevealModel,
} from "./ConstructionHighlightsScrollReveal";

export type { ConstructionHighlightsItemModel };

export interface ConstructionHighlightsModel {
  className?: string;
  subtitle: string;
  titleHtml: string;
  items: ConstructionHighlightsItemModel[];
  image: MediaModel;
  checkboxIdPrefix?: string;
  scrollReveal?: ConstructionHighlightsScrollRevealModel;
}

const DEFAULT_CHECKBOX_ID_PREFIX = "construction-highlights-item";
const DEFAULT_SCROLL_REVEAL_TARGET_ID = "construction-highlights";

const ConstructionHighlights = (model: ConstructionHighlightsModel) => {
  const {
    className,
    subtitle,
    titleHtml,
    items,
    image,
    checkboxIdPrefix = DEFAULT_CHECKBOX_ID_PREFIX,
    scrollReveal,
  } = model;

  const subtitleText = subtitle.trim();
  const title = titleHtml.trim();
  const validItems = items.filter((item) => item.title.trim().length > 0);
  const hasImage = image.url.trim().length > 0;
  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: ConstructionHighlightsScrollRevealModel = {
    targetId,
  };
  const firstOpenIndex = validItems.findIndex((item) => item.defaultOpen);
  const exclusiveSyncModel: AccordionExclusiveSyncModel = {
    rootSelector: ".construction-highlights-accordion",
    inputSelector: ".construction-highlights-item-input",
    sectionId: targetId,
  };

  if (!subtitleText && !title && validItems.length === 0 && !hasImage) {
    return null;
  }

  return (
    <section
      id={targetId}
      className={cn(
        "construction-highlights !w-full !overflow-hidden !bg-brand-navy !text-brand-white",
        className,
      )}
    >
      <div className="construction-highlights-inner !mx-auto !w-full !max-w-7xl !px-4 !py-12 md:!px-6 md:!py-16">
        {subtitleText || title ? (
          <header className="construction-highlights-header">
            {subtitleText ? (
              <p
                className={cn(
                  "construction-highlights-subtitle !mb-3 !text-[14px] !font-medium !uppercase !tracking-wide",
                  "!text-brand-white/70",
                )}
              >
                {subtitleText}
              </p>
            ) : null}
            {title ? (
              <h2
                className={cn(
                  "construction-highlights-title !text-2xl !leading-snug !text-brand-white",
                  "[&_a]:!text-brand-gold [&_strong]:!font-bold",
                  "[&_.text-brand-gold]:!text-brand-gold",
                )}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            ) : null}
          </header>
        ) : null}

        <div
          className={cn(
            "construction-highlights-body !mt-10 !grid !grid-cols-1 !gap-8",
            "md:!mt-14 md:!grid-cols-2 md:!gap-12 md:!items-start",
          )}
        >
          {validItems.length > 0 ? (
            <div className="construction-highlights-accordion">
              {validItems.map((item, index) => (
                <ConstructionHighlightsAccordionItem
                  key={`${item.title}-${index}`}
                  {...item}
                  defaultOpen={index === firstOpenIndex}
                  checkboxId={`${checkboxIdPrefix}-${index}`}
                />
              ))}
            </div>
          ) : null}

          {hasImage ? (
            <div className="construction-highlights-media !relative !aspect-4/3 !w-full !overflow-hidden md:!aspect-auto md:!min-h-[420px]">
              <Media
                {...image}
                className={cn(
                  "construction-highlights-image !h-full !w-full !object-cover",
                  "md:!absolute md:!inset-0",
                  image.className,
                )}
              />
            </div>
          ) : null}
        </div>
      </div>

      {validItems.length > 0 ? (
        <ClientComponentWrapper
          type="accordionExclusiveSync"
          hydrateData={exclusiveSyncModel}
          className="construction-highlights-accordion-exclusive-sync !hidden"
        >
          <AccordionExclusiveSync {...exclusiveSyncModel} />
        </ClientComponentWrapper>
      ) : null}

      <ClientComponentWrapper
        type="constructionHighlightsScrollReveal"
        hydrateData={scrollRevealModel}
        className="construction-highlights-scroll-reveal !hidden"
      >
        <ConstructionHighlightsScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default ConstructionHighlights;

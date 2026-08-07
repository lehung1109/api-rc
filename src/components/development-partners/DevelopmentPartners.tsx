import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import DevelopmentPartnersItem, {
  type DevelopmentPartnersItemModel,
} from "./DevelopmentPartnersItem";
import DevelopmentPartnersScrollReveal, {
  type DevelopmentPartnersScrollRevealModel,
} from "./DevelopmentPartnersScrollReveal";

export type { DevelopmentPartnersItemModel };

export interface DevelopmentPartnersModel {
  className?: string;
  title: string;
  items: DevelopmentPartnersItemModel[];
  scrollReveal?: DevelopmentPartnersScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "development-partners";

const DevelopmentPartners = (model: DevelopmentPartnersModel) => {
  const { className, title, items, scrollReveal } = model;

  const titleText = title.trim();
  const validItems = items.filter((item) => item.image.url.trim().length > 0);

  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: DevelopmentPartnersScrollRevealModel = {
    targetId,
  };

  if (validItems.length === 0 && !titleText) {
    return null;
  }

  const slideInBase = cn(
    "!opacity-0 !translate-y-10 !transition-[opacity,translate] !duration-[1.2s] !ease-out",
    "group-data-[in-view=true]/partners:!opacity-100 group-data-[in-view=true]/partners:!translate-y-0",
    "motion-reduce:!opacity-100 motion-reduce:!translate-y-0 motion-reduce:!transition-none",
  );

  const itemKey = (item: DevelopmentPartnersItemModel, index: number) =>
    `${item.image.url}-${item.image.alt}-${index}`;

  return (
    <section
      id={targetId}
      className={cn(
        "development-partners group/partners !w-full !overflow-hidden",
        "!px-6 !py-20 md:!px-10",
        className,
      )}
    >
      <div className="development-partners-inner !mx-auto !w-full !max-w-7xl">
        {titleText ? (
          <h2
            className={cn(
              "development-partners-title !mb-0 !text-base !font-normal !uppercase !leading-tight",
              "!text-brand-gold",
              slideInBase,
            )}
          >
            {titleText}
          </h2>
        ) : null}

        {validItems.length > 0 ? (
          <ul
            className={cn(
              "development-partners-grid !m-0 !grid !list-none !grid-cols-2 !gap-3 !p-0",
              "md:!grid-cols-4 md:!gap-4",
              titleText && "!mt-8 md:!mt-10",
              slideInBase,
            )}
          >
            {validItems.map((item, index) => (
              <DevelopmentPartnersItem key={itemKey(item, index)} {...item} />
            ))}
          </ul>
        ) : null}
      </div>

      <ClientComponentWrapper
        type="developmentPartnersScrollReveal"
        hydrateData={scrollRevealModel}
        className="development-partners-scroll-reveal !hidden"
      >
        <DevelopmentPartnersScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default DevelopmentPartners;

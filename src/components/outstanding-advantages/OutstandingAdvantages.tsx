import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import OutstandingAdvantagesItem, {
  type OutstandingAdvantagesItemModel,
} from "./OutstandingAdvantagesItem";
import OutstandingAdvantagesScrollReveal, {
  type OutstandingAdvantagesScrollRevealModel,
} from "./OutstandingAdvantagesScrollReveal";

export type { OutstandingAdvantagesItemModel };
export type { OutstandingAdvantagesScrollRevealModel };

export interface OutstandingAdvantagesModel {
  className?: string;
  items: OutstandingAdvantagesItemModel[];
  scrollReveal?: OutstandingAdvantagesScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "outstanding-advantages";

const hasBackground = (item: OutstandingAdvantagesItemModel) =>
  item.backgroundMobileImage.url.trim().length > 0 ||
  item.backgroundDesktopImage.url.trim().length > 0;

const OutstandingAdvantages = (model: OutstandingAdvantagesModel) => {
  const { className, items, scrollReveal } = model;

  const validItems = items.filter(
    (item) => item.title.trim().length > 0 && hasBackground(item),
  );

  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: OutstandingAdvantagesScrollRevealModel = {
    targetId,
  };

  if (validItems.length === 0) {
    return null;
  }

  const slideInBase = cn(
    "opacity-0 !transition-opacity !duration-[1.2s] !ease-out",
    "group-data-[in-view=true]/advantages:!opacity-100",
    "motion-reduce:!opacity-100 motion-reduce:!transition-none",
  );

  const itemKey = (item: OutstandingAdvantagesItemModel, index: number) =>
    `${item.title}-${item.backgroundMobileImage.url || item.backgroundDesktopImage.url}-${index}`;

  return (
    <section
      id={targetId}
      className={cn(
        "outstanding-advantages group/advantages !w-full !overflow-x-auto !py-20 md:!overflow-hidden",
        className,
      )}
    >
      <ul
        className={cn(
          "outstanding-advantages-inner !m-0 !flex !w-full !list-none !flex-nowrap !gap-0 !overflow-x-auto !p-0",
          "!snap-x !snap-mandatory",
          "md:!grid md:!grid-cols-3 md:!overflow-x-visible md:!snap-none",
          slideInBase,
        )}
      >
        {validItems.map((item, index) => (
          <OutstandingAdvantagesItem
            key={itemKey(item, index)}
            backgroundMobileImage={item.backgroundMobileImage}
            backgroundDesktopImage={item.backgroundDesktopImage}
            image={item.image}
            subtitle={item.subtitle}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>

      <ClientComponentWrapper
        type="outstandingAdvantagesScrollReveal"
        hydrateData={scrollRevealModel}
        className="outstanding-advantages-scroll-reveal !hidden"
      >
        <OutstandingAdvantagesScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default OutstandingAdvantages;

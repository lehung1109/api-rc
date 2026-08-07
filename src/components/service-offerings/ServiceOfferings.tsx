import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import ServiceOfferingsItem, {
  type ServiceOfferingsItemModel,
} from "./ServiceOfferingsItem";
import ServiceOfferingsScrollReveal, {
  type ServiceOfferingsScrollRevealModel,
} from "./ServiceOfferingsScrollReveal";

export type { ServiceOfferingsItemModel };
export type { ServiceOfferingsScrollRevealModel };

export interface ServiceOfferingsModel {
  className?: string;
  items: ServiceOfferingsItemModel[];
  scrollReveal?: ServiceOfferingsScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "service-offerings";

const ServiceOfferings = (model: ServiceOfferingsModel) => {
  const { className, items, scrollReveal } = model;

  const validItems = items.filter(
    (item) => item.title.trim().length > 0 && item.image.url.trim().length > 0,
  );

  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: ServiceOfferingsScrollRevealModel = {
    targetId,
  };

  if (validItems.length === 0) {
    return null;
  }

  const slideInBase = cn(
    "!opacity-0 transition-[opacity,translate] duration-[1.2s] ease-out",
    "group-data-[in-view=true]/offerings:!opacity-100 group-data-[in-view=true]/offerings:!translate-x-0",
    "motion-reduce:!opacity-100 motion-reduce:!translate-x-0 motion-reduce:transition-none",
  );

  const itemKey = (item: ServiceOfferingsItemModel, index: number) =>
    `${item.title}-${item.image.url}-${index}`;

  return (
    <section
      id={targetId}
      className={cn(
        "service-offerings group/offerings !w-full !overflow-hidden",
        "!px-6 !py-20 md:!px-10",
        className,
      )}
    >
      <div
        className={cn(
          "service-offerings-inner !mx-auto !grid !w-full !max-w-7xl !grid-cols-1 !gap-12",
          "md:!grid-cols-2 md:!gap-16 lg:!gap-20",
        )}
      >
        {validItems.map((item, index) => {
          const fromLeft = index % 2 === 0;

          return (
            <ServiceOfferingsItem
              key={itemKey(item, index)}
              title={item.title}
              descriptionHtml={item.descriptionHtml}
              image={item.image}
              className={cn(
                fromLeft ? "!-translate-x-10" : "!translate-x-10",
                slideInBase,
              )}
            />
          );
        })}
      </div>

      <ClientComponentWrapper
        type="serviceOfferingsScrollReveal"
        hydrateData={scrollRevealModel}
        className="service-offerings-scroll-reveal !hidden"
      >
        <ServiceOfferingsScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default ServiceOfferings;

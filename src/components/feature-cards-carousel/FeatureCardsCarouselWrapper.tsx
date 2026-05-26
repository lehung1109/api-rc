import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import ReactSection from "../ReactSection";
import FeatureCardsCarousel, {
  type FeatureCardsCarouselItemModel,
  type FeatureCardsCarouselModel,
} from "./FeatureCardsCarousel";

export type { FeatureCardsCarouselItemModel, FeatureCardsCarouselModel };

const FeatureCardsCarouselWrapper = (model: FeatureCardsCarouselModel) => {
  const { className, ...carouselModel } = model;

  if (carouselModel.items.length === 0) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("feature-cards-carousel-root", className)}
    >
      <FeatureCardsCarousel {...carouselModel} />
      <ReactSection type="featureCardsCarousel" data={model} />
    </ClientComponentWrapper>
  );
};

export default FeatureCardsCarouselWrapper;

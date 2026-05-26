import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface FeatureCardsCarouselItemModel {
  image: MediaModel;
  title: string;
  description: string;
}

const FeatureCardsCarouselCard = (item: FeatureCardsCarouselItemModel) => {
  const { image, title, description } = item;

  return (
    <article className="feature-cards-carousel-card flex h-full flex-col overflow-hidden">
      <Media
        {...image}
        className={cn(
          "feature-cards-carousel-card-image block h-auto w-full",
          image.className,
        )}
      />

      <div className="feature-cards-carousel-card-body flex flex-1 flex-col bg-neutral-100 px-4 py-5 text-center">
        <h3 className="feature-cards-carousel-card-title flex items-center justify-center gap-1.5 text-base font-bold text-[#f36f21]">
          <span>{title}</span>
          <span
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center bg-green-600 text-white"
            aria-hidden="true"
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        </h3>

        <p className="feature-cards-carousel-card-description mt-2 text-sm leading-relaxed text-[#c47a3a] line-clamp-3">
          {description}
        </p>
      </div>
    </article>
  );
};

export default FeatureCardsCarouselCard;

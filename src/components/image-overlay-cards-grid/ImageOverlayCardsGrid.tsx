import { cn } from "@/lib/utils";

import ImageOverlayCardsGridCard, {
  type ImageOverlayCardsGridItemModel,
} from "./ImageOverlayCardsGridCard";

export type { ImageOverlayCardsGridItemModel };

export interface ImageOverlayCardsGridModel {
  className?: string;
  items: ImageOverlayCardsGridItemModel[];
  gap?: number;
}

const ImageOverlayCardsGrid = (model: ImageOverlayCardsGridModel) => {
  const { className, items, gap = 24 } = model;

  if (items.length === 0) {
    return null;
  }

  const itemKey = (item: ImageOverlayCardsGridItemModel, index: number) =>
    `${item.image.url}-${item.title}-${index}`;

  return (
    <section
      className={cn(
        "image-overlay-cards-grid flex w-full flex-wrap justify-center",
        className,
      )}
      style={{ gap }}
    >
      {items.map((item, index) => (
        <ImageOverlayCardsGridCard key={itemKey(item, index)} {...item} />
      ))}
    </section>
  );
};

export default ImageOverlayCardsGrid;

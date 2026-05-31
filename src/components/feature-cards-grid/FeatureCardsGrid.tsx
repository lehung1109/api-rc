import { cn } from "@/lib/utils";

import FeatureCardsGridCard, {
  type FeatureCardsGridItemModel,
} from "./FeatureCardsGridCard";

export type { FeatureCardsGridItemModel };

const TABLET_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

const DESKTOP_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

const clampColumns = (value: number | undefined, fallback: number): number => {
  const n = value ?? fallback;
  if (n < 1) return 1;
  if (n > 6) return 6;
  return n;
};

export interface FeatureCardsGridModel {
  className?: string;
  items: FeatureCardsGridItemModel[];
  columnsTablet?: number;
  columnsDesktop?: number;
  gap?: number;
}

const FeatureCardsGrid = (model: FeatureCardsGridModel) => {
  const {
    className,
    items,
    columnsTablet = 2,
    columnsDesktop = 3,
    gap = 16,
  } = model;

  if (items.length === 0) {
    return null;
  }

  const tabletCols = clampColumns(columnsTablet, 2);
  const desktopCols = clampColumns(columnsDesktop, 3);

  const itemKey = (item: FeatureCardsGridItemModel, index: number) =>
    `${item.image.url}-${item.title}-${index}`;

  return (
    <section
      className={cn(
        "feature-cards-grid grid w-full grid-cols-1",
        TABLET_COLS[tabletCols],
        DESKTOP_COLS[desktopCols],
        className,
      )}
      style={{ gap }}
    >
      {items.map((item, index) => (
        <FeatureCardsGridCard key={itemKey(item, index)} {...item} />
      ))}
    </section>
  );
};

export default FeatureCardsGrid;

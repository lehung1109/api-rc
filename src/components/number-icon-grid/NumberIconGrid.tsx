import { cn } from "@/lib/utils";

import NumberIconGridCard, {
  type NumberIconGridItemModel,
} from "./NumberIconGridCard";

export type { NumberIconGridItemModel };

export interface NumberIconGridModel {
  className?: string;
  items: NumberIconGridItemModel[];
}

const NumberIconGrid = (model: NumberIconGridModel) => {
  const { className, items } = model;

  if (items.length === 0) {
    return null;
  }

  const itemKey = (item: NumberIconGridItemModel, index: number) =>
    `${item.number}-${item.title}-${index}`;

  return (
    <section className={cn("number-icon-grid w-full", className)}>
      <div
        className={cn(
          "number-icon-grid-inner grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6",
        )}
      >
        {items.map((item, index) => (
          <NumberIconGridCard key={itemKey(item, index)} {...item} />
        ))}
      </div>
    </section>
  );
};

export default NumberIconGrid;

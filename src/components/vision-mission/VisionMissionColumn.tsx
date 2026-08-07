import { cn } from "@/lib/utils";

export interface VisionMissionItemModel {
  title: string;
  description: string;
}

export interface VisionMissionColumnModel {
  title: string;
  items: VisionMissionItemModel[];
  className?: string;
}

const VisionMissionColumn = (model: VisionMissionColumnModel) => {
  const { title, items, className } = model;
  const titleText = title.trim();

  const validItems = items.filter(
    (item) => item.title.trim().length > 0 || item.description.trim().length > 0,
  );

  if (!titleText && validItems.length === 0) {
    return null;
  }

  return (
    <div className={cn("vision-mission-column", className)}>
      {titleText ? (
        <h2 className="vision-mission-column-title !mb-0 !text-base !font-medium !uppercase !tracking-[0.12em] !text-brand-navy/70">
          {titleText}
        </h2>
      ) : null}

      {validItems.length > 0 ? (
        <ul
          className={cn(
            "vision-mission-items !m-0 !list-none !space-y-10 !p-0",
            titleText && "!mt-6 md:!mt-8",
          )}
        >
          {validItems.map((item, index) => {
            const itemTitle = item.title.trim();
            const itemDescription = item.description.trim();

            return (
              <li
                key={`${itemTitle}-${index}`}
                className="vision-mission-item"
              >
                {itemTitle ? (
                  <h3 className="vision-mission-item-title !mb-0 !text-lg !font-bold !leading-snug !text-brand-navy md:!text-xl">
                    {itemTitle}
                  </h3>
                ) : null}
                {itemDescription ? (
                  <p
                    className={cn(
                      "vision-mission-item-description !mb-0 !text-base !leading-relaxed !text-brand-navy",
                      itemTitle && "!mt-3",
                    )}
                  >
                    {itemDescription}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default VisionMissionColumn;

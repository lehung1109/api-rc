import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import VisionMissionColumn, {
  type VisionMissionColumnModel,
} from "./VisionMissionColumn";
import VisionMissionScrollReveal, {
  type VisionMissionScrollRevealModel,
} from "./VisionMissionScrollReveal";

export type { VisionMissionColumnModel };
export type { VisionMissionItemModel } from "./VisionMissionColumn";

export interface VisionMissionModel {
  className?: string;
  columns: VisionMissionColumnModel[];
  scrollReveal?: VisionMissionScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "vision-mission";

const VisionMission = (model: VisionMissionModel) => {
  const { className, columns, scrollReveal } = model;

  const validColumns = columns
    .map((column) => {
      const title = column.title.trim();
      const items = column.items.filter(
        (item) =>
          item.title.trim().length > 0 || item.description.trim().length > 0,
      );
      return { title, items };
    })
    .filter((column) => column.title.length > 0 || column.items.length > 0);

  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: VisionMissionScrollRevealModel = {
    targetId,
  };

  if (validColumns.length === 0) {
    return null;
  }

  const slideInBase = cn(
    "opacity-0 transition-[opacity,translate] duration-[1.2s] ease-out",
    "group-data-[in-view=true]/vision:opacity-100 group-data-[in-view=true]/vision:translate-x-0",
    "motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none",
  );

  return (
    <section
      id={targetId}
      className={cn(
        "vision-mission group/vision w-full overflow-hidden",
        "px-6 py-20 md:px-10",
        className,
      )}
    >
      <div className="vision-mission-inner mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {validColumns.map((column, index) => {
          const fromLeft = index % 2 === 0;

          return (
            <VisionMissionColumn
              key={`${column.title}-${index}`}
              title={column.title}
              items={column.items}
              className={cn(
                fromLeft ? "-translate-x-10" : "translate-x-10",
                slideInBase,
              )}
            />
          );
        })}
      </div>

      <ClientComponentWrapper
        type="visionMissionScrollReveal"
        hydrateData={scrollRevealModel}
        className="vision-mission-scroll-reveal hidden"
      >
        <VisionMissionScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default VisionMission;

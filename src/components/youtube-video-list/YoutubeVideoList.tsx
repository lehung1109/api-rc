import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import YoutubeVideoListItem, {
  type YoutubeVideoListItemModel,
} from "./YoutubeVideoListItem";
import YoutubeVideoListScrollReveal, {
  type YoutubeVideoListScrollRevealModel,
} from "./YoutubeVideoListScrollReveal";

export type { YoutubeVideoListItemModel };
export type { YoutubeVideoListScrollRevealModel };

export interface YoutubeVideoListModel {
  className?: string;
  items: YoutubeVideoListItemModel[];
  scrollReveal?: YoutubeVideoListScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "youtube-video-list";

const YoutubeVideoList = (model: YoutubeVideoListModel) => {
  const { className, items, scrollReveal } = model;

  const validItems = items.filter(
    (item) => item.youtubeVideoId.trim().length > 0,
  );

  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: YoutubeVideoListScrollRevealModel = {
    targetId,
  };

  if (validItems.length === 0) {
    return null;
  }

  const slideInBase = cn(
    "opacity-0 !translate-y-10 !transition-[opacity,translate] !duration-[1.2s] !ease-out",
    "group-data-[in-view=true]/videos:!opacity-100 group-data-[in-view=true]/videos:!translate-y-0",
    "motion-reduce:!opacity-100 motion-reduce:!translate-y-0 motion-reduce:!transition-none",
  );

  const itemKey = (item: YoutubeVideoListItemModel, index: number) =>
    `${item.youtubeVideoId.trim()}-${index}`;

  return (
    <section
      id={targetId}
      className={cn(
        "youtube-video-list group/videos !w-full !overflow-hidden !bg-brand-white",
        "!px-6 !py-20 md:!px-10",
        className,
      )}
    >
      <div className="youtube-video-list-inner !mx-auto !w-full !max-w-7xl">
        <ul
          className={cn(
            "youtube-video-list-grid !m-0 !grid !list-none !grid-cols-1 !gap-4 !p-0",
            "md:!grid-cols-3",
            slideInBase,
          )}
        >
          {validItems.map((item, index) => (
            <YoutubeVideoListItem
              key={itemKey(item, index)}
              youtubeVideoId={item.youtubeVideoId}
              {...(item.title !== undefined ? { title: item.title } : {})}
            />
          ))}
        </ul>
      </div>

      <ClientComponentWrapper
        type="youtubeVideoListScrollReveal"
        hydrateData={scrollRevealModel}
        className="youtube-video-list-scroll-reveal !hidden"
      >
        <YoutubeVideoListScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default YoutubeVideoList;

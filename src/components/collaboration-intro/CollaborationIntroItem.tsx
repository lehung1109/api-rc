import { cn } from "@/lib/utils";

import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface CollaborationIntroItemModel {
  image: MediaModel;
  title: string;
}

const ITEM_WIDTH_CLASSES =
  "!w-full !shrink-0 !grow-0 md:!w-[calc((100%-32px)/3)]";

const CollaborationIntroItem = (model: CollaborationIntroItemModel) => {
  const { image, title } = model;

  const titleText = title.trim();
  const imageUrl = image.url.trim();

  if (!imageUrl || !titleText) {
    return null;
  }

  return (
    <li
      className={cn(
        "collaboration-intro-item !flex !list-none !flex-col !items-center !justify-center",
        "!border !border-solid !border-brand-white !p-6 md:!p-8",
        ITEM_WIDTH_CLASSES,
      )}
    >
      <Media
        {...image}
        className={cn(
          "collaboration-intro-item-image !mb-4 !h-auto !max-h-16 !w-auto !max-w-full !object-contain md:!max-h-20",
          image.className,
        )}
      />
      <h3 className="collaboration-intro-item-title !m-0 !text-center !text-base !font-normal !text-brand-white">
        {titleText}
      </h3>
    </li>
  );
};

export default CollaborationIntroItem;

import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface DevelopmentPartnersItemModel {
  image: MediaModel;
  className?: string;
}

const DevelopmentPartnersItem = (model: DevelopmentPartnersItemModel) => {
  const { image, className } = model;

  if (!image.url.trim()) {
    return null;
  }

  return (
    <li
      className={cn(
        "development-partners-item !flex !aspect-square !items-center !justify-center",
        "!rounded-md !border !border-solid !border-brand-navy/15 !p-4 md:!p-6",
        "!list-none",
        className,
      )}
    >
      <Media
        {...image}
        className={cn(
          "development-partners-item-image !h-auto !max-h-full !w-auto !max-w-full object-contain",
          "!grayscale transition-[filter] duration-300 hover:!grayscale-0",
          image.className,
        )}
      />
    </li>
  );
};

export default DevelopmentPartnersItem;

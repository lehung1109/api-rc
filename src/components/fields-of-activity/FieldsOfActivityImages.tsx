import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface FieldsOfActivityImagesModel {
  className?: string;
  images: MediaModel[];
}

const FieldsOfActivityImages = (model: FieldsOfActivityImagesModel) => {
  const { className, images } = model;

  const validImages = images
    .filter((image) => image.url.trim().length > 0)
    .slice(0, 2);

  if (validImages.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "fields-of-activity-images flex flex-row gap-5",
        "translate-x-10 opacity-0 transition-[opacity,transform] duration-[1250ms] ease-out",
        "group-data-[in-view=true]/foa:translate-x-0 group-data-[in-view=true]/foa:opacity-100",
        "motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        className,
      )}
    >
      {validImages.map((image, index) => (
        <div
          key={`${image.url}-${index}`}
          className="fields-of-activity-image-wrap relative min-w-0 flex-1 aspect-3/4 overflow-hidden"
        >
          <Media
            {...image}
            className={cn(
              "fields-of-activity-image absolute inset-0 h-full w-full object-cover",
              "grayscale transition-[filter] duration-300 hover:grayscale-0",
              image.className,
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default FieldsOfActivityImages;

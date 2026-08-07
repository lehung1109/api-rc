import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface ServiceOfferingsItemModel {
  title: string;
  descriptionHtml: string;
  image: MediaModel;
  className?: string;
}

const ServiceOfferingsItem = (model: ServiceOfferingsItemModel) => {
  const { title, descriptionHtml, image, className } = model;

  const titleText = title.trim();
  const description = descriptionHtml.trim();
  const imageUrl = image.url.trim();

  if (!titleText || !imageUrl) {
    return null;
  }

  return (
    <article
      className={cn(
        "service-offerings-item group/item !flex !flex-col !gap-6",
        className,
      )}
    >
      <h3
        className={cn(
          "service-offerings-item-title !mb-0 !leading-snug !font-bold",
          "!text-lg !text-brand-navy md:!text-xl lg:!text-[2rem]",
        )}
      >
        {titleText}
      </h3>

      {description ? (
        <div
          className={cn(
            "service-offerings-item-description !text-base !leading-relaxed !text-brand-navy/70",
            "[&_ul]:!mb-0 [&_ul]:!list-disc [&_ul]:!space-y-2 [&_ul]:!pl-5",
            "[&_ol]:!mb-0 [&_ol]:!list-decimal [&_ol]:!pl-5",
            "[&_li]:!list-disc [&_p]:!mb-2 [&_p]:last:!mb-0",
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : null}

      <div
        className={cn(
          "service-offerings-item-media !relative !mt-auto !w-full !overflow-hidden",
          "!aspect-[450/480]",
        )}
      >
        <Media
          {...image}
          className={cn(
            "service-offerings-item-image !absolute !inset-0 !h-full !w-full !object-cover",
            "!grayscale !transition-[filter] !duration-300",
            "hover:!grayscale-0 group-hover/item:!grayscale-0",
            image.className,
          )}
        />
      </div>
    </article>
  );
};

export default ServiceOfferingsItem;

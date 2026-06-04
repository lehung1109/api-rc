import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface ImageOverlayCardsGridItemModel {
  image: MediaModel;
  title: string;
  link?: LinkModel;
}

const CARD_WIDTH_CLASSES =
  "w-[calc((100%-24px)/2)] shrink-0 grow-0 md:w-[calc((100%-48px)/3)]";

const ImageOverlayCardsGridCard = (item: ImageOverlayCardsGridItemModel) => {
  const { image, title, link } = item;
  const hasLink = Boolean(link?.url.trim());

  const cardContent = (
    <>
      <div className="image-overlay-cards-grid-card-media absolute inset-0 overflow-hidden">
        <Media
          {...image}
          className={cn(
            "image-overlay-cards-grid-card-image absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-105",
            image.className,
          )}
        />
      </div>

      <span
        className="image-overlay-cards-grid-card-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-brand-navy/25 to-transparent"
        aria-hidden="true"
      />

      <h3 className="image-overlay-cards-grid-card-title absolute inset-x-0 bottom-0 z-10 px-4 pb-4 text-center text-[20px] font-bold text-brand-white">
        {title}
      </h3>
    </>
  );

  const rootClassName = cn(
    "image-overlay-cards-grid-card group relative aspect-square overflow-hidden rounded-t-[20px] rounded-b-none",
    CARD_WIDTH_CLASSES,
    hasLink && "image-overlay-cards-grid-card-link cursor-pointer",
  );

  if (hasLink && link) {
    return (
      <Link
        {...link}
        className={cn(rootClassName, "block no-underline", link.className)}
      >
        {cardContent}
      </Link>
    );
  }

  return <article className={rootClassName}>{cardContent}</article>;
};

export default ImageOverlayCardsGridCard;

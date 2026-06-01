import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export type FeatureCardsGridCardLayout = "stack" | "media-left";

export interface FeatureCardsGridItemModel {
  image: MediaModel;
  title: string;
  description?: string;
  link: LinkModel;
  layout?: FeatureCardsGridCardLayout;
}

const FeatureCardsGridCard = (item: FeatureCardsGridItemModel) => {
  const { image, title, description, link, layout = "stack" } = item;
  const descriptionText = description?.trim();
  const isMediaLeft = layout === "media-left";

  return (
    <Link
      {...link}
      className={cn(
        "feature-cards-grid-card feature-cards-grid-card-link group flex h-full overflow-hidden no-underline",
        isMediaLeft
          ? "feature-cards-grid-card--media-left flex-col md:flex-row"
          : "flex-col",
        link.className,
      )}
    >
      <div
        className={cn(
          "feature-cards-grid-card-media aspect-[255/144] overflow-hidden",
          isMediaLeft &&
            "md:aspect-auto md:w-[38%] md:shrink-0 md:self-stretch",
        )}
      >
        <Media
          {...image}
          className={cn(
            "feature-cards-grid-card-image block h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-105",
            isMediaLeft && "md:min-h-full",
            image.className,
          )}
        />
      </div>

      <div
        className={cn(
          "feature-cards-grid-card-body flex flex-1 flex-col bg-neutral-100 p-[10px] text-center",
          isMediaLeft && "md:justify-center md:text-left",
        )}
      >
        <h3 className="feature-cards-grid-card-title text-lg font-bold text-[#f36f21] mb-0">
          {title}
        </h3>

        {descriptionText ? (
          <p className="feature-cards-grid-card-description mt-2 line-clamp-3 leading-relaxed">
            {descriptionText}
          </p>
        ) : null}
      </div>
    </Link>
  );
};

export default FeatureCardsGridCard;

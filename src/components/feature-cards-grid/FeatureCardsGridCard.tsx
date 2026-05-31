import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface FeatureCardsGridItemModel {
  image: MediaModel;
  title: string;
  description?: string;
  link: LinkModel;
}

const FeatureCardsGridCard = (item: FeatureCardsGridItemModel) => {
  const { image, title, description, link } = item;
  const descriptionText = description?.trim();

  return (
    <Link
      {...link}
      className={cn(
        "feature-cards-grid-card feature-cards-grid-card-link group flex h-full flex-col overflow-hidden no-underline",
        link.className,
      )}
    >
      <div className="feature-cards-grid-card-media aspect-[255/144] overflow-hidden">
        <Media
          {...image}
          className={cn(
            "feature-cards-grid-card-image block h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-105",
            image.className,
          )}
        />
      </div>

      <div className="feature-cards-grid-card-body flex flex-1 flex-col bg-neutral-100 p-[10px] text-center">
        <h3 className="feature-cards-grid-card-title text-xl font-bold text-[#f36f21]">
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

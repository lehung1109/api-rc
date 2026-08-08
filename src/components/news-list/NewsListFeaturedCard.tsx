import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NewsListItemModel } from "@/lib/news-list/types";

import Link from "../link/Link";
import Media from "../media/Media";

export interface NewsListFeaturedCardModel extends NewsListItemModel {
  className?: string;
}

const NewsListFeaturedCard = (model: NewsListFeaturedCardModel) => {
  const { image, backgroundImage, time, title, description, link, className } =
    model;
  const timeText = time.trim();
  const titleText = title.trim();
  const descriptionText = description.trim();
  const backgroundUrl = backgroundImage?.url.trim();

  return (
    <li className={cn("news-list-featured-card-wrap !min-w-0", className)}>
      <article className="news-list-featured-card !h-full">
        <Link
          {...link}
          className={cn(
            "news-list-featured-card-link !group !grid !h-full !overflow-hidden !text-brand-navy !no-underline",
            "!grid-cols-1 md:!grid-cols-2",
            link.className,
          )}
        >
          <div className="news-list-featured-card-media !aspect-[543/304] !overflow-hidden md:!aspect-auto">
            <Media
              {...image}
              className={cn(
                "news-list-featured-card-image !h-full !w-full !max-w-none !object-cover !transition-transform !duration-300 group-hover:!scale-105",
                image.className,
              )}
            />
          </div>
          <div
            className="news-list-featured-card-body !relative !flex !min-w-0 !flex-col !justify-center !overflow-hidden !bg-brand-white !p-6 md:!p-10"
            style={
              backgroundUrl
                ? {
                    backgroundImage: `linear-gradient(var(--e-global-color-tertiary-hover), var(--e-global-color-tertiary-hover)), url(${backgroundUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }
                : undefined
            }
          >
            {timeText ? (
              <p className="news-list-featured-card-time !mb-4 !flex !items-center !gap-1.5 !text-base !leading-none !text-brand-navy">
                <Clock
                  className="news-list-featured-card-time-icon !h-4 !w-4 !shrink-0"
                  aria-hidden="true"
                />
                <time>{timeText}</time>
              </p>
            ) : null}
            {titleText ? (
              <h3 className="news-list-featured-card-title !m-0 !border-b !border-brand-navy/20 !pb-4 !text-base !font-bold !leading-snug !text-brand-navy group-hover:!text-brand-navy-hover">
                {titleText}
              </h3>
            ) : null}
            {descriptionText ? (
              <p className="news-list-featured-card-description !mb-0 !mt-4 !text-base !leading-relaxed !text-brand-navy">
                {descriptionText}
              </p>
            ) : null}
          </div>
        </Link>
      </article>
    </li>
  );
};

export default NewsListFeaturedCard;

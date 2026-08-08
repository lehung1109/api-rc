import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NewsListItemModel } from "@/lib/news-list/types";

import Link from "../link/Link";
import Media from "../media/Media";

export interface NewsListCardModel extends NewsListItemModel {
  className?: string;
}

const NewsListCard = (model: NewsListCardModel) => {
  const { image, time, title, link, className } = model;
  const timeText = time.trim();
  const titleText = title.trim();

  return (
    <li className={cn("news-list-card-wrap !min-w-0", className)}>
      <article className="news-list-card !h-full">
        <Link
          {...link}
          className={cn(
            "news-list-card-link !group !flex !h-full !flex-col !text-brand-navy !no-underline",
            link.className,
          )}
        >
          <div className="news-list-card-media !aspect-[258/144] !overflow-hidden">
            <Media
              {...image}
              className={cn(
                "news-list-card-image !h-full !w-full !max-w-none !object-cover !transition-transform !duration-300 group-hover:!scale-105",
                image.className,
              )}
            />
          </div>
          <div className="news-list-card-body !pt-3">
            {timeText ? (
              <p className="news-list-card-time !mb-2 !flex !items-center !gap-1.5 !text-base !leading-none !text-brand-navy">
                <Clock
                  className="news-list-card-time-icon !h-4 !w-4 !shrink-0"
                  aria-hidden="true"
                />
                <time>{timeText}</time>
              </p>
            ) : null}
            {titleText ? (
              <h3 className="news-list-card-title !m-0 !text-base !font-bold !leading-snug !text-brand-navy group-hover:!text-brand-navy-hover">
                {titleText}
              </h3>
            ) : null}
          </div>
        </Link>
      </article>
    </li>
  );
};

export default NewsListCard;

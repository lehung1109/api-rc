import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";

import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface NewsEventsItemModel {
  image: MediaModel;
  time: string;
  title: string;
  link: LinkModel;
}

export interface NewsEventsCardModel extends NewsEventsItemModel {
  className?: string;
  featured?: boolean;
}

const NewsEventsCard = (model: NewsEventsCardModel) => {
  const { image, time, title, link, className, featured = false } = model;
  const timeText = time.trim();
  const titleText = title.trim();

  return (
    <li
      className={cn(
        "news-events-item-wrap min-w-0",
        featured && "news-events-item-wrap--featured",
        className,
      )}
    >
      <Link
        {...link}
        className={cn(
          "news-events-item group flex h-full flex-col no-underline",
          featured && "news-events-item--featured",
          link.className,
        )}
      >
        <div className="news-events-item-media aspect-video overflow-hidden">
          <Media
            {...image}
            className={cn(
              "news-events-item-image h-full w-full max-w-none object-cover transition-transform duration-300 ease-out group-hover:scale-105",
              image.className,
            )}
          />
        </div>

        {timeText ? (
          <p
            className={cn(
              "news-events-item-time mt-3 mb-0 flex items-center gap-1.5",
              "text-sm text-brand-white",
            )}
          >
            <Clock
              className="news-events-item-time-icon h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>{timeText}</span>
          </p>
        ) : null}

        {titleText ? (
          <h3
            className={cn(
              "news-events-item-title mt-2 text-base font-semibold leading-snug text-brand-white",
              !timeText && "mt-3",
            )}
          >
            {titleText}
          </h3>
        ) : null}
      </Link>
    </li>
  );
};

export default NewsEventsCard;

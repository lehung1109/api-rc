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

  let titleMarginClass = "!mt-2";
  if (!timeText) {
    titleMarginClass = featured ? "!mt-3" : "!mt-0 md:!mt-3";
  }

  return (
    <li
      className={cn(
        "news-events-item-wrap !min-w-0",
        featured && "news-events-item-wrap--featured",
        className,
      )}
    >
      <Link
        {...link}
        className={cn(
          "news-events-item group !flex !h-full !no-underline",
          featured
            ? "news-events-item--featured !flex-col"
            : "!flex-row !gap-3 md:!flex-col md:!gap-0",
          link.className,
        )}
      >
        <div
          className={cn(
            "news-events-item-media !overflow-hidden",
            featured
              ? "!aspect-video"
              : "!aspect-180/105 !w-45 !shrink-0 !self-start md:!aspect-video md:!w-full md:!self-auto",
          )}
        >
          <Media
            {...image}
            className={cn(
              "news-events-item-image !h-full !w-full !max-w-none !object-cover !transition-transform !duration-300 !ease-out group-hover:!scale-105",
              image.className,
            )}
          />
        </div>

        <div
          className={cn(
            "news-events-item-body !min-w-0",
            !featured && "!flex-1",
          )}
        >
          {timeText ? (
            <p
              className={cn(
                "news-events-item-time !mb-0 !flex !items-center !gap-1.5",
                "!text-sm !text-brand-white",
                featured ? "!mt-3" : "!mt-0 md:!mt-3",
              )}
            >
              <Clock
                className="news-events-item-time-icon !h-3.5 !w-3.5 !shrink-0"
                aria-hidden="true"
              />
              <span>{timeText}</span>
            </p>
          ) : null}

          {titleText ? (
            <h3
              className={cn(
                "news-events-item-title !text-base !font-semibold !leading-snug !text-brand-white",
                titleMarginClass,
              )}
            >
              {titleText}
            </h3>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default NewsEventsCard;

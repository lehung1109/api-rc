import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import NewsEventsCard, {
  type NewsEventsItemModel,
} from "./NewsEventsCard";
import NewsEventsScrollReveal, {
  type NewsEventsScrollRevealModel,
} from "./NewsEventsScrollReveal";

export type { NewsEventsItemModel };

export interface NewsEventsModel {
  className?: string;
  title: string;
  items: NewsEventsItemModel[];
  buttonLabel: string;
  buttonLink: LinkModel;
  scrollReveal?: NewsEventsScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "news-events";

const NewsEvents = (model: NewsEventsModel) => {
  const {
    className,
    title,
    items,
    buttonLabel,
    buttonLink,
    scrollReveal,
  } = model;

  const titleText = title.trim();
  const hasButton =
    buttonLabel.trim().length > 0 && buttonLink.url.trim().length > 0;

  const validItems = items
    .filter(
      (item) =>
        item.image.url.trim().length > 0 && item.link.url.trim().length > 0,
    )
    .slice(0, 5);

  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: NewsEventsScrollRevealModel = {
    targetId,
  };

  if (validItems.length === 0 && !titleText && !hasButton) {
    return null;
  }

  const featured = validItems[0];
  const sideItems = validItems.slice(1);

  const itemKey = (item: NewsEventsItemModel, index: number) =>
    `${item.image.url}-${item.title}-${index}`;

  const slideInBase = cn(
    "opacity-0 transition-[opacity,translate] duration-[1.2s] ease-out",
    "group-data-[in-view=true]/news:opacity-100 group-data-[in-view=true]/news:translate-x-0 group-data-[in-view=true]/news:translate-y-0",
    "motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:transition-none",
  );

  return (
    <section
      id={targetId}
      className={cn(
        "news-events group/news w-full overflow-hidden bg-brand-navy",
        "px-6 py-20 md:px-10",
        className,
      )}
    >
      <div className="news-events-inner mx-auto w-full max-w-7xl">
        {titleText ? (
          <h2
            className={cn(
              "news-events-title mb-0 translate-y-10 text-base font-medium uppercase tracking-[0.12em] text-brand-white",
              slideInBase,
            )}
          >
            {titleText}
          </h2>
        ) : null}

        {validItems.length > 0 ? (
          <div
            className={cn(
              "news-events-grid grid grid-cols-1 gap-6",
              (titleText || hasButton) && "mt-8 md:mt-10",
              "md:grid-cols-2 md:gap-6",
            )}
          >
            {featured ? (
              <ul
                className={cn(
                  "news-events-featured list-none p-0",
                  "-translate-x-10",
                  slideInBase,
                )}
              >
                <NewsEventsCard {...featured} featured />
              </ul>
            ) : null}

            {sideItems.length > 0 ? (
              <ul
                className={cn(
                  "news-events-side grid list-none grid-cols-1 gap-6 p-0",
                  "translate-x-10",
                  slideInBase,
                  "md:grid-cols-2",
                )}
              >
                {sideItems.map((item, index) => (
                  <NewsEventsCard
                    key={itemKey(item, index + 1)}
                    {...item}
                  />
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {hasButton ? (
          <div
            className={cn(
              "news-events-cta flex translate-y-10 justify-center",
              slideInBase,
              validItems.length > 0 ? "mt-10 md:mt-12" : "mt-8",
            )}
          >
            <Link
              {...buttonLink}
              className={cn(
                "news-events-button inline-flex cursor-pointer items-center justify-center",
                "border border-brand-white bg-transparent px-8 py-3",
                "text-base font-bold uppercase tracking-wide text-brand-white no-underline",
                "transition-colors",
                "hover:bg-brand-white hover:text-brand-navy",
                "md:px-10 md:py-3.5",
                buttonLink.className,
              )}
            >
              {buttonLabel}
            </Link>
          </div>
        ) : null}
      </div>

      <ClientComponentWrapper
        type="newsEventsScrollReveal"
        hydrateData={scrollRevealModel}
        className="news-events-scroll-reveal hidden"
      >
        <NewsEventsScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default NewsEvents;

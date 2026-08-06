import { cn } from "@/lib/utils";

import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import FeaturedProjectsCard, {
  type FeaturedProjectsItemModel,
} from "./FeaturedProjectsCard";

export type { FeaturedProjectsItemModel };

export interface FeaturedProjectsModel {
  className?: string;
  subtitle: string;
  title: string;
  items: FeaturedProjectsItemModel[];
  buttonLabel: string;
  buttonLink: LinkModel;
}

const FeaturedProjects = (model: FeaturedProjectsModel) => {
  const { className, subtitle, title, items, buttonLabel, buttonLink } = model;

  const subtitleText = subtitle.trim();
  const titleText = title.trim();
  const hasButton =
    buttonLabel.trim().length > 0 && buttonLink.url.trim().length > 0;

  const validItems = items.filter(
    (item) => item.image.url.trim().length > 0 && item.link.url.trim().length > 0,
  );

  if (
    validItems.length === 0 &&
    !subtitleText &&
    !titleText &&
    !hasButton
  ) {
    return null;
  }

  const itemKey = (item: FeaturedProjectsItemModel, index: number) =>
    `${item.image.url}-${item.title}-${index}`;

  return (
    <section
      className={cn("featured-projects w-full px-[30px] py-20", className)}
    >
      {subtitleText || titleText ? (
        <header className="featured-projects-header mx-auto max-w-7xl text-center">
          {subtitleText ? (
            <p className="featured-projects-subtitle mb-0 text-md font-medium uppercase tracking-[0.12em] text-brand-gold">
              {subtitleText}
            </p>
          ) : null}
          {titleText ? (
            <h2
              className={cn(
                "featured-projects-title text-2xl leading-snug text-brand-navy",
                subtitleText && "mt-3",
              )}
            >
              {titleText}
            </h2>
          ) : null}
        </header>
      ) : null}

      {validItems.length > 0 ? (
        <ul
          className={cn(
            "featured-projects-grid grid w-full list-none grid-cols-1 gap-4 p-0",
            "md:grid-cols-3",
            (subtitleText || titleText) && "mt-10 md:mt-12",
          )}
        >
          {validItems.map((item, index) => (
            <FeaturedProjectsCard key={itemKey(item, index)} {...item} />
          ))}
        </ul>
      ) : null}

      {hasButton ? (
        <div
          className={cn(
            "featured-projects-cta flex justify-center",
            validItems.length > 0 ? "mt-10 md:mt-12" : "mt-8",
          )}
        >
          <Link
            {...buttonLink}
            className={cn(
              "featured-projects-button inline-flex items-center justify-center",
              "border border-brand-navy bg-brand-navy px-8 py-3",
              "text-lg font-bold uppercase tracking-wide text-brand-white no-underline",
              "transition-colors",
              "hover:border-brand-navy hover:bg-brand-white hover:text-brand-navy",
              "md:px-10 md:py-3.5 md:text-xl",
              buttonLink.className,
            )}
          >
            {buttonLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export default FeaturedProjects;

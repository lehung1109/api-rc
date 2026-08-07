import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import FeaturedProjectsCard, {
  type FeaturedProjectsItemModel,
} from "./FeaturedProjectsCard";
import FeaturedProjectsScrollReveal, {
  type FeaturedProjectsScrollRevealModel,
} from "./FeaturedProjectsScrollReveal";

export type { FeaturedProjectsItemModel };

export interface FeaturedProjectsModel {
  className?: string;
  subtitle: string;
  title: string;
  items: FeaturedProjectsItemModel[];
  buttonLabel: string;
  buttonLink: LinkModel;
  scrollReveal?: FeaturedProjectsScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "featured-projects";

const FeaturedProjects = (model: FeaturedProjectsModel) => {
  const {
    className,
    subtitle,
    title,
    items,
    buttonLabel,
    buttonLink,
    scrollReveal,
  } = model;

  const subtitleText = subtitle.trim();
  const titleText = title.trim();
  const hasButton =
    buttonLabel.trim().length > 0 && buttonLink.url.trim().length > 0;

  const validItems = items.filter(
    (item) =>
      item.image.url.trim().length > 0 && item.link.url.trim().length > 0,
  );

  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: FeaturedProjectsScrollRevealModel = {
    targetId,
  };

  if (validItems.length === 0 && !subtitleText && !titleText && !hasButton) {
    return null;
  }

  const itemKey = (item: FeaturedProjectsItemModel, index: number) =>
    `${item.image.url}-${item.title}-${index}`;

  const slideInBase = cn(
    "opacity-0 !transition-[opacity,translate] !duration-[1.2s] !ease-out",
    "group-data-[in-view=true]/featured:!opacity-100 group-data-[in-view=true]/featured:!translate-x-0 group-data-[in-view=true]/featured:!translate-y-0",
    "motion-reduce:!opacity-100 motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 motion-reduce:!transition-none",
  );

  return (
    <section
      id={targetId}
      className={cn(
        "featured-projects group/featured !w-full !overflow-hidden !px-[30px] !py-20",
        className,
      )}
    >
      {subtitleText || titleText ? (
        <header className="featured-projects-header !mx-auto !max-w-7xl !text-center">
          {subtitleText ? (
            <p
              className={cn(
                "featured-projects-subtitle !mb-0 !translate-y-10 !text-base !font-normal !uppercase !leading-tight !text-brand-gold",
                slideInBase,
              )}
            >
              {subtitleText}
            </p>
          ) : null}
          {titleText ? (
            <h2
              className={cn(
                "featured-projects-title !translate-y-10 !text-2xl !leading-snug !text-brand-navy",
                slideInBase,
                subtitleText && "!mt-3",
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
            "featured-projects-grid !flex !w-full !list-none !flex-nowrap !gap-4 !overflow-x-auto !p-0",
            "!snap-x !snap-mandatory",
            "!-translate-x-10",
            slideInBase,
            "md:!grid md:!grid-cols-3 md:!overflow-x-visible md:!snap-none",
            (subtitleText || titleText) && "!mt-10 md:!mt-12",
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
            "featured-projects-cta !flex !justify-center",
            validItems.length > 0 ? "!mt-10 md:!mt-12" : "!mt-8",
          )}
        >
          <Link
            {...buttonLink}
            className={cn(
              "featured-projects-button !inline-flex !items-center !justify-center",
              "!border !border-brand-navy !bg-brand-navy !px-8 !py-3",
              "!text-lg !font-bold !uppercase !tracking-wide !text-brand-white !no-underline",
              "!transition-colors",
              "hover:!border-brand-navy hover:!bg-brand-white hover:!text-brand-navy",
              "md:!px-10 md:!py-3.5 md:!text-xl",
              buttonLink.className,
            )}
          >
            {buttonLabel}
          </Link>
        </div>
      ) : null}

      <ClientComponentWrapper
        type="featuredProjectsScrollReveal"
        hydrateData={scrollRevealModel}
        className="featured-projects-scroll-reveal !hidden"
      >
        <FeaturedProjectsScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default FeaturedProjects;

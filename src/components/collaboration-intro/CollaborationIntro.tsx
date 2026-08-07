import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
import CollaborationIntroItem, {
  type CollaborationIntroItemModel,
} from "./CollaborationIntroItem";
import CollaborationIntroScrollReveal, {
  type CollaborationIntroScrollRevealModel,
} from "./CollaborationIntroScrollReveal";

export type { CollaborationIntroItemModel };

export interface CollaborationIntroModel {
  className?: string;
  backgroundImage?: MediaModel;
  subtitle: string;
  titleHtml: string;
  image: MediaModel;
  bottomTitle: string;
  items: CollaborationIntroItemModel[];
  note: string;
  buttonLabel: string;
  buttonLink: LinkModel;
  scrollReveal?: CollaborationIntroScrollRevealModel;
}

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "collaboration-intro";

const CollaborationIntro = (model: CollaborationIntroModel) => {
  const {
    className,
    backgroundImage,
    subtitle,
    titleHtml,
    image,
    bottomTitle,
    items,
    note,
    buttonLabel,
    buttonLink,
    scrollReveal,
  } = model;

  const subtitleText = subtitle.trim();
  const titleContent = titleHtml.trim();
  const bottomTitleText = bottomTitle.trim();
  const noteText = note.trim();
  const hasTopImage = image.url.trim().length > 0;
  const backgroundUrl = backgroundImage?.url.trim() ?? "";
  const hasBackground = backgroundUrl.length > 0;
  const hasButton =
    buttonLabel.trim().length > 0 && buttonLink.url.trim().length > 0;

  const validItems = items.filter(
    (item) => item.image.url.trim().length > 0 && item.title.trim().length > 0,
  );

  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const scrollRevealModel: CollaborationIntroScrollRevealModel = {
    targetId,
  };

  if (
    !hasBackground &&
    !subtitleText &&
    !titleContent &&
    !hasTopImage &&
    !bottomTitleText &&
    validItems.length === 0 &&
    !noteText &&
    !hasButton
  ) {
    return null;
  }

  const slideInBase = cn(
    "!opacity-0 !translate-y-10 !transition-[opacity,translate] !duration-[1.2s] !ease-out",
    "group-data-[in-view=true]/collab:!opacity-100 group-data-[in-view=true]/collab:!translate-y-0",
    "motion-reduce:!opacity-100 motion-reduce:!translate-y-0 motion-reduce:!transition-none",
  );

  const itemKey = (item: CollaborationIntroItemModel, index: number) =>
    `${item.image.url}-${item.title}-${index}`;

  return (
    <section
      id={targetId}
      className={cn(
        "collaboration-intro group/collab !relative !w-full !overflow-hidden !text-brand-white",
        "!px-6 !py-20 md:!px-10",
        !hasBackground && "!bg-brand-navy",
        className,
      )}
    >
      {hasBackground && backgroundImage ? (
        <>
          <Media
            {...backgroundImage}
            className={cn(
              "collaboration-intro-background !absolute !inset-0 !z-0 !h-full !w-full !object-cover",
              backgroundImage.className,
            )}
          />
          <div
            className="collaboration-intro-overlay !absolute !inset-0 !z-[1] !bg-brand-navy/65"
            aria-hidden="true"
          />
        </>
      ) : null}

      <div
        className={cn(
          "collaboration-intro-inner !relative !z-[2] !mx-auto !w-full !max-w-7xl",
          slideInBase,
        )}
      >
        {subtitleText || titleContent || hasTopImage ? (
          <div
            className={cn(
              "collaboration-intro-top !grid !grid-cols-1 !items-center !gap-8",
              "md:!grid-cols-2 md:!gap-12",
              "!border-b !border-brand-white/20 !pb-10 md:!pb-12",
            )}
          >
            {subtitleText || titleContent ? (
              <div className="collaboration-intro-copy">
                {subtitleText ? (
                  <h2 className="collaboration-intro-subtitle !m-0 !text-base !font-medium !uppercase !tracking-[0.12em] !text-brand-white/70">
                    {subtitleText}
                  </h2>
                ) : null}

                {titleContent ? (
                  <div
                    className={cn(
                      "collaboration-intro-title !text-2xl !font-bold !leading-snug !text-brand-white md:!text-3xl lg:!text-4xl",
                      subtitleText && "!mt-4 md:!mt-6",
                    )}
                    dangerouslySetInnerHTML={{ __html: titleContent }}
                  />
                ) : null}
              </div>
            ) : null}

            {hasTopImage ? (
              <div className="collaboration-intro-media">
                <Media
                  {...image}
                  className={cn(
                    "collaboration-intro-image !h-auto !w-full !rounded-tr-[40px] !object-cover md:!rounded-tr-[60px]",
                    image.className,
                  )}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {bottomTitleText ||
        validItems.length > 0 ||
        noteText ||
        hasButton ? (
          <div
            className={cn(
              "collaboration-intro-bottom",
              (subtitleText || titleContent || hasTopImage) &&
                "!mt-10 md:!mt-12",
            )}
          >
            {bottomTitleText ? (
              <h2 className="collaboration-intro-bottom-title !m-0 !text-2xl !font-bold !leading-snug !text-brand-white md:!text-3xl">
                {bottomTitleText}
              </h2>
            ) : null}

            {validItems.length > 0 ? (
              <ul
                className={cn(
                  "collaboration-intro-items !m-0 !flex !list-none !flex-wrap !justify-center !gap-4 !p-0",
                  bottomTitleText && "!mt-8 md:!mt-10",
                )}
              >
                {validItems.map((item, index) => (
                  <CollaborationIntroItem
                    key={itemKey(item, index)}
                    {...item}
                  />
                ))}
              </ul>
            ) : null}

            {noteText ? (
              <p
                className={cn(
                  "collaboration-intro-note !m-0 !text-center !text-base !leading-relaxed !text-brand-white/70",
                  (bottomTitleText || validItems.length > 0) &&
                    "!mt-8 md:!mt-10",
                )}
              >
                {noteText}
              </p>
            ) : null}

            {hasButton ? (
              <div
                className={cn(
                  "collaboration-intro-cta !flex !justify-center",
                  (bottomTitleText || validItems.length > 0 || noteText) &&
                    "!mt-8 md:!mt-10",
                )}
              >
                <Link
                  {...buttonLink}
                  className={cn(
                    "collaboration-intro-button !inline-flex !cursor-pointer !items-center !justify-center",
                    "!border !border-brand-white !bg-transparent !px-8 !py-3",
                    "!text-base !font-bold !uppercase !tracking-wide !text-brand-white !no-underline",
                    "!transition-colors",
                    "hover:!bg-brand-white hover:!text-brand-navy",
                    "md:!px-10 md:!py-3.5",
                    buttonLink.className,
                  )}
                >
                  {buttonLabel}
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <ClientComponentWrapper
        type="collaborationIntroScrollReveal"
        hydrateData={scrollRevealModel}
        className="collaboration-intro-scroll-reveal !hidden"
      >
        <CollaborationIntroScrollReveal {...scrollRevealModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default CollaborationIntro;

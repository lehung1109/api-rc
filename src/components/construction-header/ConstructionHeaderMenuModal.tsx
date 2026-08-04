import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
import type { ConstructionHeaderMenuModel } from "./ConstructionHeaderMenu";
import ConstructionHeaderMenu from "./ConstructionHeaderMenu";
import type { ConstructionHeaderModalAnimationModel } from "./ConstructionHeaderSearchModal";

export interface ConstructionHeaderPictureSourceModel {
  media: string;
  srcSet: string;
}

export interface ConstructionHeaderPictureModel {
  img: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  sources?: ConstructionHeaderPictureSourceModel[];
}

export interface ConstructionHeaderSocialLinkModel {
  icon: MediaModel;
  link: LinkModel;
}

export interface ConstructionHeaderMenuModalModel {
  logo: MediaModel;
  socialLinks: ConstructionHeaderSocialLinkModel[];
  background: ConstructionHeaderPictureModel;
  menu: ConstructionHeaderMenuModel;
  closeLabel: string;
  checkboxId: string;
  animation?: ConstructionHeaderModalAnimationModel;
  className?: string;
}

const ConstructionHeaderMenuModal = (
  model: ConstructionHeaderMenuModalModel,
) => {
  const {
    logo,
    socialLinks,
    background,
    menu,
    closeLabel,
    checkboxId,
    animation,
    className,
  } = model;

  const enableFadeIn = animation?.enableFadeIn !== false;
  const enableSlideIn = animation?.enableSlideIn !== false;

  return (
    <div
      className={cn(
        "construction-header-menu-modal",
        // Mobile: full-viewport overlay
        "max-md:fixed max-md:inset-0 max-md:z-[60] max-md:overflow-y-auto",
        "max-md:invisible max-md:pointer-events-none",
        "max-md:peer-checked/menu:visible max-md:peer-checked/menu:pointer-events-auto",
        "max-md:transition-opacity max-md:duration-500 max-md:ease-out",
        enableFadeIn &&
          "max-md:opacity-0 max-md:peer-checked/menu:opacity-100",
        !enableFadeIn && "max-md:opacity-100",
        enableSlideIn &&
          "max-md:peer-checked/menu:[&_.construction-header-menu-modal-close]:translate-y-0 max-md:peer-checked/menu:[&_.construction-header-menu-modal-body]:translate-y-0",
        // Desktop: in-flow / absolute right of header bar
        "md:absolute md:inset-y-0 md:right-0 md:z-30 md:flex md:items-center md:px-4",
        "md:visible md:pointer-events-auto md:opacity-100",
        className,
      )}
    >
      <label
        htmlFor={checkboxId}
        className={cn(
          "construction-header-menu-modal-close absolute top-4 right-4 z-10 flex cursor-pointer items-center justify-center p-3 text-brand-navy md:hidden",
          "transition-transform duration-500 ease-out",
          enableSlideIn && "translate-y-10",
          !enableSlideIn && "translate-y-0",
        )}
        aria-label={closeLabel}
      >
        <X className="h-8 w-8" />
      </label>

      <div
        className={cn(
          "construction-header-menu-modal-body relative min-h-full md:min-h-0",
          "max-md:transition-transform max-md:duration-500 max-md:ease-out",
          enableSlideIn && "max-md:-translate-y-10",
          !enableSlideIn && "max-md:translate-y-0",
          "md:translate-y-0",
        )}
      >
        <div
          className="construction-header-menu-modal-background pointer-events-none absolute inset-0 -z-10 md:hidden"
          aria-hidden
        >
          <picture className="absolute inset-0 block h-full w-full">
            {(background.sources ?? []).map((source) => (
              <source
                key={`${source.media}-${source.srcSet}`}
                media={source.media}
                srcSet={source.srcSet}
              />
            ))}
            <img
              src={background.img.url}
              alt={background.img.alt}
              width={background.img.width}
              height={background.img.height}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        <div className="construction-header-menu-modal-inner relative flex min-h-full flex-col px-0 py-6 md:min-h-0 md:py-0">
          <div className="construction-header-menu-modal-logo mb-6 max-w-[150px] px-6 leading-0 md:hidden">
            <Media {...logo} className="h-auto w-full" />
          </div>

          {socialLinks.length > 0 ? (
            <ul className="construction-header-menu-modal-social mb-4 flex list-none flex-wrap items-center gap-3 px-6 py-0 md:hidden">
              {socialLinks.map((item) => (
                <li key={`${item.link.url}-${item.icon.alt}`}>
                  <Link
                    {...item.link}
                    className={cn(
                      "construction-header-menu-modal-social-link inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-brand-white/10 transition-colors hover:bg-brand-gold/30",
                      item.link.className,
                    )}
                  >
                    <img
                      src={item.icon.url}
                      alt={item.icon.alt}
                      width={item.icon.display_dimensions.width}
                      height={item.icon.display_dimensions.height}
                      className="h-5 w-5 object-contain"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          <div
            className="construction-header-menu-modal-underline mx-6 mb-6 h-px bg-brand-navy md:hidden"
            aria-hidden
          />

          <ConstructionHeaderMenu {...menu} />
        </div>
      </div>
    </div>
  );
};

export default ConstructionHeaderMenuModal;

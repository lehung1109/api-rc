import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";

export interface PageBackgroundModel {
  className?: string;
  mobileImage: MediaModel;
  desktopImage: MediaModel;
}

const PageBackground = (model: PageBackgroundModel) => {
  const { className, mobileImage, desktopImage } = model;

  const mobileUrl = mobileImage.url.trim();
  const desktopUrl = desktopImage.url.trim();

  if (!mobileUrl && !desktopUrl) {
    return null;
  }

  const fallback = mobileUrl ? mobileImage : desktopImage;
  const fallbackUrl = fallback.url.trim();
  const hasDesktopSource = Boolean(desktopUrl);
  const desktopSrcSet = desktopImage.srcSet?.trim() || desktopUrl;

  return (
    <div
      className={cn(
        "page-background !pointer-events-none !fixed !inset-0 !-z-10 !overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <picture className="page-background-picture !absolute !inset-0 !block !h-full !w-full">
        {hasDesktopSource ? (
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
        ) : null}
        <img
          src={fallbackUrl}
          alt=""
          width={fallback.display_dimensions.width}
          height={fallback.display_dimensions.height}
          className="page-background-image !h-full !w-full !object-cover"
          loading="lazy"
          decoding="async"
          {...(fallback.srcSet ? { srcSet: fallback.srcSet } : {})}
          {...(fallback.sizes ? { sizes: fallback.sizes } : {})}
        />
      </picture>
    </div>
  );
};

export default PageBackground;

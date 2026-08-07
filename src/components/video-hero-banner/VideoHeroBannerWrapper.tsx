import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import Media from "../media/Media";
import VideoHeroBanner, {
  type VideoHeroBannerModel,
} from "./VideoHeroBanner";

export type { VideoHeroBannerModel };

const VideoHeroBannerWrapper = (model: VideoHeroBannerModel) => {
  const {
    className,
    url,
    poster,
    title,
    description,
    mobileAspectRatio = false,
  } = model;
  const titleText = title?.trim() ?? "";
  const descriptionText = description?.trim() ?? "";
  const hasTitle = titleText.length > 0;
  const hasDescription = descriptionText.length > 0;
  const hasContent = hasTitle || hasDescription;
  const hasVideo = Boolean(url?.trim());

  if (!poster.url.trim()) {
    return null;
  }

  return (
    <section
      className={cn(
        "video-hero-banner !relative !w-full !overflow-hidden",
        mobileAspectRatio
          ? "!aspect-[561/774] !h-auto md:!aspect-auto md:!h-dvh"
          : "!h-dvh",
        hasContent && "video-hero-banner--has-title",
        className,
      )}
    >
      <Media
        {...poster}
        className={cn(
          "video-hero-banner-poster !absolute !inset-0 !h-full !w-full !object-cover",
          poster.className,
        )}
      />
      <div className="video-hero-banner-overlay !pointer-events-none !absolute !inset-0 !z-1" />
      {hasVideo ? (
        <ClientComponentWrapper
          className="video-hero-banner-video-root !absolute !inset-0"
          type="videoHeroBanner"
          hydrateData={model}
        >
          <VideoHeroBanner {...model} />
        </ClientComponentWrapper>
      ) : null}
      {hasContent ? (
        <div className="video-hero-banner-content !pointer-events-none !absolute !inset-x-0 !bottom-20 !z-10">
          <div className="video-hero-banner-content-inner !mx-auto !flex !w-full !max-w-7xl !flex-col !gap-4 !px-6 md:!px-10">
            {hasTitle ? (
              <h1 className="video-hero-banner-title !text-2xl !font-bold !text-brand-white md:!text-4xl lg:!text-5xl">
                {titleText}
              </h1>
            ) : null}
            {hasDescription ? (
              <p className="video-hero-banner-description !text-base !text-brand-white/70">
                {descriptionText}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default VideoHeroBannerWrapper;

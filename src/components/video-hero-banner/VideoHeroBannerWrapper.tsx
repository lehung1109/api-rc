import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import Media from "../media/Media";
import VideoHeroBanner, {
  type VideoHeroBannerModel,
} from "./VideoHeroBanner";

export type { VideoHeroBannerModel };

const VideoHeroBannerWrapper = (model: VideoHeroBannerModel) => {
  const { className, url, poster, title } = model;
  const titleText = title?.trim() ?? "";
  const hasTitle = titleText.length > 0;

  if (!url.trim() || !poster.url.trim()) {
    return null;
  }

  return (
    <section
      className={cn(
        "video-hero-banner relative h-dvh w-full overflow-hidden",
        hasTitle && "video-hero-banner--has-title",
        className,
      )}
    >
      <Media
        {...poster}
        className={cn(
          "video-hero-banner-poster absolute inset-0 h-full w-full object-cover",
          poster.className,
        )}
      />
      <div className="video-hero-banner-overlay pointer-events-none absolute inset-0 z-1" />
      <ClientComponentWrapper
        className="video-hero-banner-video-root absolute inset-0"
        type="videoHeroBanner"
        hydrateData={model}
      >
        <VideoHeroBanner {...model} />
      </ClientComponentWrapper>
      {hasTitle ? (
        <div className="video-hero-banner-content pointer-events-none absolute inset-x-0 bottom-10 z-10 md:bottom-20">
          <div className="video-hero-banner-content-inner mx-auto w-full max-w-7xl px-6 md:px-10">
            <h1 className="video-hero-banner-title text-2xl font-bold text-brand-white md:text-4xl lg:text-5xl">
              {titleText}
            </h1>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default VideoHeroBannerWrapper;

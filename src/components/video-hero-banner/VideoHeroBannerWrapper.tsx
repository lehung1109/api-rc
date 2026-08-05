import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import Media from "../media/Media";
import VideoHeroBanner, {
  type VideoHeroBannerModel,
} from "./VideoHeroBanner";

export type { VideoHeroBannerModel };

const VideoHeroBannerWrapper = (model: VideoHeroBannerModel) => {
  const { className, url, poster } = model;

  if (!url.trim() || !poster.url.trim()) {
    return null;
  }

  return (
    <section
      className={cn(
        "video-hero-banner relative h-dvh w-full overflow-hidden",
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
    </section>
  );
};

export default VideoHeroBannerWrapper;

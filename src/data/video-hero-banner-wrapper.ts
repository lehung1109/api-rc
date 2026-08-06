import type { VideoHeroBannerModel } from "@/components/video-hero-banner/VideoHeroBannerWrapper";

const videoHeroBannerWrapper: VideoHeroBannerModel = {
  url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  poster: {
    url: "https://placehold.co/1920x1080/1a1a2e/fff?text=Video+Hero",
    alt: "Video hero poster",
    display_dimensions: { width: 1920, height: 1080 },
  },
  title: "ICHouse Interior",
};

export default videoHeroBannerWrapper;

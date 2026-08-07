import type { YoutubeVideoListScrollRevealModel } from "@/components/youtube-video-list/YoutubeVideoListScrollReveal";
import youtubeVideoList from "./youtube-video-list";

const youtubeVideoListScrollReveal: YoutubeVideoListScrollRevealModel = {
  targetId: youtubeVideoList.scrollReveal?.targetId ?? "youtube-video-list",
};

export default youtubeVideoListScrollReveal;
export { youtubeVideoListScrollReveal };

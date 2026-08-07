import { cn } from "@/lib/utils";

export interface YoutubeVideoListItemModel {
  youtubeVideoId: string;
  title?: string;
  className?: string;
}

const YoutubeVideoListItem = (model: YoutubeVideoListItemModel) => {
  const { youtubeVideoId, title, className } = model;
  const videoId = youtubeVideoId.trim();

  if (!videoId) {
    return null;
  }

  const iframeTitle = title?.trim() || "YouTube video";

  return (
    <li
      className={cn(
        "youtube-video-list-item !relative !aspect-video !w-full !list-none !overflow-hidden",
        className,
      )}
    >
      <iframe
        className="youtube-video-list-iframe !absolute !inset-0 !h-full !w-full !border-0"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={iframeTitle}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </li>
  );
};

export default YoutubeVideoListItem;

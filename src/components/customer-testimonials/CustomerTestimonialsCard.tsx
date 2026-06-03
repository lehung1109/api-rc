"use client";

import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface CustomerTestimonialsItemModel {
  image: MediaModel;
  youtubeVideoId: string;
}

export interface CustomerTestimonialsCardModel {
  item: CustomerTestimonialsItemModel;
  onOpen: (videoId: string) => void;
}

const CustomerTestimonialsCard = (model: CustomerTestimonialsCardModel) => {
  const { item, onOpen } = model;
  const { image, youtubeVideoId } = item;
  const videoId = youtubeVideoId.trim();
  const ariaLabel = image.alt.trim() || "Phát video";

  return (
    <button
      type="button"
      className={cn(
        "customer-testimonials-card group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg transition-shadow duration-200 hover:shadow-lg",
      )}
      onClick={() => onOpen(videoId)}
      aria-label={ariaLabel}
    >
      <Media
        {...image}
        className={cn(
          "customer-testimonials-card-media absolute inset-0 h-full w-full object-cover",
          image.className,
        )}
      />

      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
        aria-hidden="true"
      />

      <span
        className={cn(
          "customer-testimonials-card-play absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e62117] shadow-md transition-transform duration-200 group-hover:scale-110 group-hover:shadow-lg",
        )}
        aria-hidden="true"
      >
        <Play className="h-6 w-6 fill-white text-white" strokeWidth={0} />
      </span>
    </button>
  );
};

export default CustomerTestimonialsCard;

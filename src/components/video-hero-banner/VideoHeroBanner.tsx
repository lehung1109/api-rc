"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";

export interface VideoHeroBannerModel {
  className?: string;
  /** Progressive media URL (MP4 / WebM) */
  url: string;
  poster: MediaModel;
}

const VideoHeroBanner = (model: VideoHeroBannerModel) => {
  const { className, url } = model;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  const streamUrl = url.trim();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    setIsReady(false);

    const markReady = () => setIsReady(true);
    video.addEventListener("canplay", markReady);
    video.addEventListener("playing", markReady);

    video.src = streamUrl;
    void video.play().catch(() => {
      /* autoplay may be blocked; muted + playsInline usually ok */
    });

    return () => {
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
      video.removeAttribute("src");
      video.load();
    };
  }, [streamUrl]);

  if (!streamUrl) return null;

  return (
    <video
      ref={videoRef}
      className={cn(
        "video-hero-banner-video h-full w-full object-cover transition-opacity duration-300",
        isReady ? "opacity-100" : "opacity-0",
        className,
      )}
      autoPlay
      muted
      loop
      playsInline
    />
  );
};

export default VideoHeroBanner;

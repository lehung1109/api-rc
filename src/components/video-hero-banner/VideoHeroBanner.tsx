"use client";

import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";

export interface VideoHeroBannerModel {
  className?: string;
  /** HLS playlist URL (.m3u8) */
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

    let hls: Hls | null = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      void video.play().catch(() => {
        /* autoplay may be blocked; muted + playsInline usually ok */
      });
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        void video.play().catch(() => {});
      });
    }

    return () => {
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
      if (hls) {
        hls.destroy();
        hls = null;
      }
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

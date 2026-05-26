"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Swiper from "swiper";
import type { Swiper as SwiperType } from "swiper";

import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
import {
  PartnerLogosNavNext,
  PartnerLogosNavPrev,
  usePartnerLogosNavState,
} from "./PartnerLogosNav";

export interface PartnerLogosModel {
  logos: MediaModel[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  className?: string;
}

const MAX_SLIDES_PER_VIEW = 7;

const PartnerLogos = (model: PartnerLogosModel) => {
  const {
    logos,
    slidesPerView = 5,
    spaceBetween,
    loop = true,
    className,
  } = model;

  const containerRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const { canPrev, canNext } = usePartnerLogosNavState(swiper);

  const enableLoop = loop !== false && logos.length > MAX_SLIDES_PER_VIEW;
  const mobileGap = spaceBetween ?? 24;
  const desktopGap = spaceBetween ?? 32;
  const desktopSlidesPerView = Math.min(slidesPerView, logos.length);
  const maxSlidesPerView = Math.min(MAX_SLIDES_PER_VIEW, logos.length);

  const logosKey = useMemo(
    () => logos.map((logo) => `${logo.url}:${logo.alt}`).join("|"),
    [logos],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || logos.length === 0) {
      return;
    }

    const instance = new Swiper(el, {
      slidesPerView: Math.min(2, logos.length),
      spaceBetween: mobileGap,
      loop: enableLoop,
      watchOverflow: true,
      breakpoints: {
        640: {
          slidesPerView: Math.min(3, logos.length),
          spaceBetween: mobileGap,
        },
        768: {
          slidesPerView: desktopSlidesPerView,
          spaceBetween: desktopGap,
        },
        1024: {
          slidesPerView: maxSlidesPerView,
          spaceBetween: desktopGap,
        },
      },
    });

    setSwiper(instance);

    return () => {
      instance.destroy(true, true);
      setSwiper(null);
    };
  }, [
    logosKey,
    enableLoop,
    mobileGap,
    desktopGap,
    desktopSlidesPerView,
    maxSlidesPerView,
    logos.length,
  ]);

  if (logos.length === 0) {
    return null;
  }

  const logoKey = (logo: MediaModel, index: number) =>
    `${logo.url}-${logo.alt}-${index}`;

  const renderLogo = (logo: MediaModel) => (
    <Media
      {...logo}
      className={cn(
        "partner-logos-item block h-10 w-auto max-w-full object-contain md:h-12",
        logo.className,
      )}
    />
  );

  return (
    <section
      className={cn(
        "partner-logos w-full bg-neutral-100 py-4 md:py-5",
        className,
      )}
    >
      <div
        className={cn(
          "partner-logos-inner mx-auto flex max-w-7xl items-center gap-1 px-3 md:gap-2 md:px-6",
        )}
      >
        <PartnerLogosNavPrev swiper={swiper} canPrev={canPrev} />

        <div
          ref={containerRef}
          className="partner-logos-swiper swiper min-w-0 flex-1 overflow-hidden"
        >
          <div className="swiper-wrapper items-center">
            {logos.map((logo, index) => (
              <div
                key={logoKey(logo, index)}
                className="swiper-slide !flex !h-auto items-center justify-center"
              >
                <div className="flex w-full items-center justify-center">
                  {renderLogo(logo)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <PartnerLogosNavNext swiper={swiper} canNext={canNext} />
      </div>
    </section>
  );
};

export default PartnerLogos;

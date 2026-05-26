"use client";

import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

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

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const { canPrev, canNext } = usePartnerLogosNavState(swiper);

  if (logos.length === 0) {
    return null;
  }

  const enableLoop = loop !== false && logos.length > MAX_SLIDES_PER_VIEW;
  const mobileGap = spaceBetween ?? 24;
  const desktopGap = spaceBetween ?? 32;

  const logoKey = (logo: MediaModel, index: number) =>
    `${logo.url}-${logo.alt}-${index}`;

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

        <Swiper
          onSwiper={setSwiper}
          slidesPerView={2}
          spaceBetween={mobileGap}
          loop={enableLoop}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: mobileGap,
            },
            768: {
              slidesPerView: slidesPerView,
              spaceBetween: desktopGap,
            },
            1024: {
              slidesPerView: MAX_SLIDES_PER_VIEW,
              spaceBetween: desktopGap,
            },
          }}
          className="partner-logos-swiper min-w-0 flex-1"
          wrapperClass="partner-logos-swiper-wrapper items-center"
        >
          {logos.map((logo, index) => (
            <SwiperSlide
              key={logoKey(logo, index)}
              className="!flex !h-auto items-center justify-center"
            >
              <Media
                {...logo}
                className={cn(
                  "partner-logos-item block h-10 w-auto max-w-full object-contain md:h-12",
                  logo.className,
                )}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <PartnerLogosNavNext swiper={swiper} canNext={canNext} />
      </div>
    </section>
  );
};

export default PartnerLogos;

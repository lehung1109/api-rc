"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import { cn } from "@/lib/utils";

const navButtonClass = cn(
  "partner-logos-nav-button",
  "grid h-10 w-10 shrink-0 cursor-pointer place-items-center p-0",
  "text-neutral-600 transition-colors duration-200",
  "hover:text-neutral-900",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600",
  "disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-neutral-600",
);

export const usePartnerLogosNavState = (swiper: SwiperType | null) => {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!swiper) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }

    const update = () => {
      setCanPrev(swiper.allowSlidePrev);
      setCanNext(swiper.allowSlideNext);
    };

    update();
    swiper.on("slideChange", update);
    swiper.on("reachBeginning", update);
    swiper.on("reachEnd", update);
    swiper.on("resize", update);

    return () => {
      swiper.off("slideChange", update);
      swiper.off("reachBeginning", update);
      swiper.off("reachEnd", update);
      swiper.off("resize", update);
    };
  }, [swiper]);

  return { canPrev, canNext };
};

export interface PartnerLogosNavButtonModel {
  swiper: SwiperType | null;
  canSlide: boolean;
  direction: "prev" | "next";
}

const PartnerLogosNavButton = ({
  swiper,
  canSlide,
  direction,
}: PartnerLogosNavButtonModel) => {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={() => (isPrev ? swiper?.slidePrev() : swiper?.slideNext())}
      disabled={!canSlide}
      className={cn(
        navButtonClass,
        isPrev ? "partner-logos-nav-prev" : "partner-logos-nav-next",
      )}
      aria-label={isPrev ? "Previous logos" : "Next logos"}
    >
      <Icon className="h-7 w-7" strokeWidth={2.5} aria-hidden />
    </button>
  );
};

export const PartnerLogosNavPrev = ({
  swiper,
  canPrev,
}: {
  swiper: SwiperType | null;
  canPrev: boolean;
}) => (
  <PartnerLogosNavButton
    swiper={swiper}
    canSlide={canPrev}
    direction="prev"
  />
);

export const PartnerLogosNavNext = ({
  swiper,
  canNext,
}: {
  swiper: SwiperType | null;
  canNext: boolean;
}) => (
  <PartnerLogosNavButton
    swiper={swiper}
    canSlide={canNext}
    direction="next"
  />
);

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import { cn } from "@/lib/utils";

const navButtonClass = cn(
  "key-personnel-nav-button",
  "!absolute !top-1/2 !z-10 !hidden !h-14 !w-14 !cursor-pointer !place-items-center md:!grid",
  "opacity-0 !transition-[opacity,color] !duration-300 !border-0",
  "group-hover:enabled:!opacity-100 group-hover:disabled:!opacity-30",
  "focus-visible:!opacity-100",
  "!text-brand-white",
  "hover:!text-brand-white-hover",
  "focus-visible:!outline focus-visible:!outline-2 focus-visible:!outline-offset-2 focus-visible:!outline-brand-white",
  "disabled:!pointer-events-none disabled:!cursor-not-allowed",
);

export const useKeyPersonnelNavState = (swiper: SwiperType | null) => {
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

export interface KeyPersonnelNavButtonModel {
  swiper: SwiperType | null;
  canSlide: boolean;
  direction: "prev" | "next";
}

const KeyPersonnelNavButton = ({
  swiper,
  canSlide,
  direction,
}: KeyPersonnelNavButtonModel) => {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={() => (isPrev ? swiper?.slidePrev() : swiper?.slideNext())}
      disabled={!canSlide}
      className={cn(
        navButtonClass,
        isPrev
          ? "key-personnel-nav-prev !left-0 !-translate-x-full !-translate-y-1/2"
          : "key-personnel-nav-next !right-0 !translate-x-full !-translate-y-1/2",
      )}
      aria-label={isPrev ? "Previous slide" : "Next slide"}
    >
      <Icon className="!h-14 !w-14" strokeWidth={1.5} aria-hidden />
    </button>
  );
};

export const KeyPersonnelNavPrev = ({
  swiper,
  canPrev,
}: {
  swiper: SwiperType | null;
  canPrev: boolean;
}) => (
  <KeyPersonnelNavButton swiper={swiper} canSlide={canPrev} direction="prev" />
);

export const KeyPersonnelNavNext = ({
  swiper,
  canNext,
}: {
  swiper: SwiperType | null;
  canNext: boolean;
}) => (
  <KeyPersonnelNavButton swiper={swiper} canSlide={canNext} direction="next" />
);

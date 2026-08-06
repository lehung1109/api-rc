import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

import { cn } from "@/lib/utils";

const navButtonClass = cn(
  "key-personnel-nav-button",
  "absolute top-1/2 z-10 hidden h-14 w-14 cursor-pointer place-items-center md:grid",
  "text-brand-white transition-colors duration-300",
  "hover:text-brand-white-hover",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white",
  "disabled:pointer-events-none disabled:opacity-30",
);

export interface KeyPersonnelNavButtonModel {
  swiper: SwiperType | null;
  direction: "prev" | "next";
}

const KeyPersonnelNavButton = ({
  swiper,
  direction,
}: KeyPersonnelNavButtonModel) => {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={() => (isPrev ? swiper?.slidePrev() : swiper?.slideNext())}
      className={cn(
        navButtonClass,
        isPrev
          ? "key-personnel-nav-prev left-0 -translate-x-full -translate-y-1/2"
          : "key-personnel-nav-next right-0 translate-x-full -translate-y-1/2",
      )}
      aria-label={isPrev ? "Previous slide" : "Next slide"}
    >
      <Icon className="h-14 w-14" strokeWidth={1.5} aria-hidden />
    </button>
  );
};

export const KeyPersonnelNavPrev = ({
  swiper,
}: {
  swiper: SwiperType | null;
}) => <KeyPersonnelNavButton swiper={swiper} direction="prev" />;

export const KeyPersonnelNavNext = ({
  swiper,
}: {
  swiper: SwiperType | null;
}) => <KeyPersonnelNavButton swiper={swiper} direction="next" />;

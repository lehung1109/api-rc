import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";

import { cn } from "@/lib/utils";

const navSideClass = cn(
  "feature-cards-carousel-nav-side",
  "pointer-events-auto flex h-full items-center justify-center self-stretch",
  "bg-gradient-to-b from-black/45 via-black/30 to-black/45",
  "px-1.5 sm:px-2",
  "opacity-0 transition-opacity duration-300",
  "group-hover:opacity-100",
  "max-md:opacity-100",
);

const navButtonClass = cn(
  "grid h-10 w-10 cursor-pointer place-items-center p-0",
  "text-white transition-colors duration-300",
  "hover:bg-[#f47c20] hover:text-white",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
);

const FeatureCardsCarouselNav = () => {
  const swiper = useSwiper();

  return (
    <div className="feature-cards-carousel-nav pointer-events-none absolute inset-0 z-10 flex justify-between">
      <div className={cn(navSideClass, "feature-cards-carousel-nav-side-prev")}>
        <button
          type="button"
          onClick={() => swiper.slidePrev()}
          className={cn(navButtonClass, "feature-cards-carousel-nav-prev")}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
        </button>
      </div>

      <div className={cn(navSideClass, "feature-cards-carousel-nav-side-next")}>
        <button
          type="button"
          onClick={() => swiper.slideNext()}
          className={cn(navButtonClass, "feature-cards-carousel-nav-next")}
          aria-label="Next slide"
        >
          <ChevronRight className="h-7 w-7" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default FeatureCardsCarouselNav;

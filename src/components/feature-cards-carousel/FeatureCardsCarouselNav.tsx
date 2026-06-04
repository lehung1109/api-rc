import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";

import { cn } from "@/lib/utils";

const navSideClass = cn(
  "feature-cards-carousel-nav-side",
  "pointer-events-auto flex h-full items-center justify-center self-stretch",
  "bg-gradient-to-b from-brand-navy/45 via-brand-navy/30 to-brand-navy/45",
  "px-1.5 sm:px-2",
  "opacity-0 transition-opacity duration-300",
  "group-hover:opacity-100",
  "max-md:opacity-100",
);

const navButtonClass = cn(
  "grid h-10 w-10 cursor-pointer place-items-center p-0",
  "text-brand-white transition-colors duration-300",
  "hover:bg-brand-gold-hover hover:text-brand-white",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white",
);

const FeatureCardsCarouselNav = () => {
  const swiper = useSwiper();

  return (
    <div className="feature-cards-carousel-nav pointer-events-none absolute inset-0 z-10 flex justify-between">
      <div
        className={cn(
          navSideClass,
          "feature-cards-carousel-nav-side-prev bg-brand-white/50 hover:bg-brand-white group/nav p-0 sm:p-0",
        )}
      >
        <button
          type="button"
          onClick={() => swiper.slidePrev()}
          className={cn(
            navButtonClass,
            "feature-cards-carousel-nav-prev h-full text-brand-navy group-hover/nav:text-brand-gold-hover hover:text-brand-gold-hover hover:bg-transparent",
          )}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
        </button>
      </div>

      <div
        className={cn(
          navSideClass,
          "feature-cards-carousel-nav-side-next bg-brand-white/50 hover:bg-brand-white group/nav p-0 sm:p-0",
        )}
      >
        <button
          type="button"
          onClick={() => swiper.slideNext()}
          className={cn(
            navButtonClass,
            "feature-cards-carousel-nav-next h-full text-brand-navy group-hover/nav:text-brand-gold-hover hover:text-brand-gold-hover hover:bg-transparent",
          )}
          aria-label="Next slide"
        >
          <ChevronRight className="h-7 w-7" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default FeatureCardsCarouselNav;

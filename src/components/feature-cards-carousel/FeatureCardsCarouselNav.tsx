import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";

const FeatureCardsCarouselNav = () => {
  const swiper = useSwiper();

  return (
    <div className="feature-cards-carousel-nav pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-1 sm:px-2">
      <button
        type="button"
        onClick={() => swiper.slidePrev()}
        className="feature-cards-carousel-nav-prev pointer-events-auto grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-neutral-300 bg-white/90 text-neutral-700 shadow-sm transition-colors hover:border-[#f47c20] hover:bg-[#f47c20] hover:text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => swiper.slideNext()}
        className="feature-cards-carousel-nav-next pointer-events-auto grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-neutral-300 bg-white/90 text-neutral-700 shadow-sm transition-colors hover:border-[#f47c20] hover:bg-[#f47c20] hover:text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default FeatureCardsCarouselNav;

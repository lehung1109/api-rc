import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";

const CarouselNav = () => {
  const swiper = useSwiper();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-[3%] group-hover:opacity-100 opacity-0 transition-all duration-300 group-hover:px-[2%]">
      <button
        onClick={() => swiper.slidePrev()}
        className="cursor-pointer pointer-events-auto !text-brand-white hover:!bg-brand-gold-hover hover:!border-brand-gold-hover !grid !h-10 !w-10 !rounded-full !border-2 !border-brand-white !border-solid place-items-center transition-all duration-300 !p-0"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="cursor-pointer pointer-events-auto !text-brand-white hover:!bg-brand-gold-hover hover:!border-brand-gold-hover !grid !h-10 !w-10 !rounded-full !border-2 !border-brand-white !border-solid place-items-center transition-all duration-300 !p-0"
        aria-label="Next slide"
      >
        <ChevronRight className="h-7 w-7" />
      </button>
    </div>
  );
};

export default CarouselNav;

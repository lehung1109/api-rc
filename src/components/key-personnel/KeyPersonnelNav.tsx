import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";

import { cn } from "@/lib/utils";

const navButtonClass = cn(
  "key-personnel-nav-button",
  "pointer-events-auto grid h-10 w-10 cursor-pointer place-items-center",
  "text-brand-white transition-colors duration-300",
  "hover:text-brand-white-hover",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white",
  "disabled:pointer-events-none disabled:opacity-30",
);

const KeyPersonnelNav = () => {
  const swiper = useSwiper();

  return (
    <div className="key-personnel-nav pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between">
      <button
        type="button"
        onClick={() => swiper.slidePrev()}
        className={cn(navButtonClass, "key-personnel-nav-prev -ml-1 md:-ml-2")}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-7 w-7" strokeWidth={1.5} aria-hidden />
      </button>

      <button
        type="button"
        onClick={() => swiper.slideNext()}
        className={cn(navButtonClass, "key-personnel-nav-next -mr-1 md:-mr-2")}
        aria-label="Next slide"
      >
        <ChevronRight className="h-7 w-7" strokeWidth={1.5} aria-hidden />
      </button>
    </div>
  );
};

export default KeyPersonnelNav;

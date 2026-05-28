"use client";

import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";

import FeatureCardsCarouselCard, {
  type FeatureCardsCarouselItemModel,
} from "./FeatureCardsCarouselCard";
import FeatureCardsCarouselNav from "./FeatureCardsCarouselNav";

export type { FeatureCardsCarouselItemModel };

export interface FeatureCardsCarouselModel {
  items: FeatureCardsCarouselItemModel[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  className?: string;
}

const FeatureCardsCarousel = (model: FeatureCardsCarouselModel) => {
  const {
    items,
    slidesPerView = 3,
    spaceBetween = 16,
    loop = true,
    className,
  } = model;

  if (items.length === 0) {
    return null;
  }

  const perView = slidesPerView;
  const useSwiper = items.length >= perView;
  const enableLoop = loop !== false && items.length > perView;

  const itemKey = (item: FeatureCardsCarouselItemModel, index: number) =>
    `${item.image.url}-${item.title}-${index}`;

  if (!useSwiper) {
    return (
      <div
        className={cn("feature-cards-carousel w-full", className)}
        style={{
          display: "grid",
          gap: spaceBetween,
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item, index) => (
          <FeatureCardsCarouselCard key={itemKey(item, index)} {...item} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("feature-cards-carousel group relative w-full", className)}
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={spaceBetween}
        loop={enableLoop}
        className="feature-cards-carousel-swiper w-full"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: perView,
          },
        }}
      >
        <FeatureCardsCarouselNav />

        {items.map((item, index) => (
          <SwiperSlide key={itemKey(item, index)} className="!h-auto">
            <FeatureCardsCarouselCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureCardsCarousel;

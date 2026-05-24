"use client";

import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import CarouselNav from "./CarouselNav";

export interface CarouselSlideModel {
  image: MediaModel;
}

export interface CarouselModel {
  slides: CarouselSlideModel[];
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

const Carousel = ({
  slides,
  autoplay = true,
  loop = true,
  className,
}: CarouselModel) => {
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className={`${className} group`}>
      <Swiper
        modules={[Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={loop && slides.length > 1}
        className="w-full"
        style={
          {
            "--swiper-pagination-bullet-width": "40px",
            "--swiper-pagination-bullet-height": "6px",
            "--swiper-pagination-bullet-border-radius": "0",
            "--swiper-pagination-bullet-inactive-color": "#ed1b24",
            "--swiper-pagination-bullet-inactive-opacity": "0.4",
            "--swiper-pagination-color": "#ed1b24",
            "--swiper-pagination-bullet-horizontal-gap": "8px",
          } as React.CSSProperties
        }
      >
        <CarouselNav />

        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.image.url}-${index}`}>
            <Media {...slide.image} className="block h-auto w-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

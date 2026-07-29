"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { MediaModel } from "../media/Media";

export interface ProductGalleryItemModel {
  image: MediaModel;
}

export interface ProductGalleryModel {
  className?: string;
  items: ProductGalleryItemModel[];
}

const mainLinkStyle: React.CSSProperties = {
  display: "block",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  borderRadius: 16,
  cursor: "zoom-in",
};

const mainImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const thumbImageStyle: React.CSSProperties = {
  aspectRatio: "16 / 10",
  objectFit: "cover",
  borderRadius: 10,
  opacity: 0.6,
  width: "100%",
  display: "block",
};

const ProductGallery = (model: ProductGalleryModel) => {
  const { className, items } = model;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lightbox: { init: () => void; destroy: () => void } | undefined;

    const init = async () => {
      const PhotoSwipeLightbox = (await import("photoswipe/lightbox")).default;
      if (!mainGalleryRef.current) {
        return;
      }

      lightbox = new PhotoSwipeLightbox({
        gallery: mainGalleryRef.current,
        children: "a",
        pswpModule: () => import("photoswipe"),
        spacing: 0.8,
        paddingFn: (viewportSize, itemData, index) => {
          return {
            top: 20,
            bottom: 40,
            left: viewportSize.x < 768 ? 0 : 100,
            right: viewportSize.x < 768 ? 0 : 100,
          };
        },
      });

      lightbox.init();
    };

    void init();

    return () => {
      lightbox?.destroy();
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const itemKey = (item: ProductGalleryItemModel, index: number) =>
    `${item.image.url}-${index}`;

  return (
    <div className={cn("product-gallery", className)}>
      <div ref={mainGalleryRef}>
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          loop
          slidesPerView={1}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className="product-gallery-main"
        >
          {items.map((item, index) => {
            const { image } = item;
            const { url, alt, display_dimensions } = image;

            return (
              <SwiperSlide key={itemKey(item, index)}>
                <a
                  href={url}
                  data-pswp-width={display_dimensions.width}
                  data-pswp-height={display_dimensions.height}
                  style={mainLinkStyle}
                >
                  <img
                    src={url}
                    alt={alt}
                    width={display_dimensions.width}
                    height={display_dimensions.height}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    style={mainImageStyle}
                  />
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        slidesPerView={3}
        spaceBetween={8}
        className="mt-3 product-gallery-thumbs"
        breakpoints={{
          768: {
            slidesPerView: 5,
          },
        }}
      >
        {items.map((item, index) => {
          const { image } = item;
          const { url, alt, display_dimensions } = image;

          return (
            <SwiperSlide
              key={itemKey(item, index)}
              className="cursor-pointer opacity-[0.4] [&.swiper-slide-thumb-active]:opacity-100 hover:opacity-100 transition-opacity duration-300"
            >
              <button type="button" aria-label={`Go to ${alt}`}>
                <img
                  src={url}
                  alt=""
                  width={display_dimensions.width}
                  height={display_dimensions.height}
                  loading="lazy"
                  decoding="async"
                  style={thumbImageStyle}
                />
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductGallery;

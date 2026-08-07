"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import KeyPersonnelCard, {
  type KeyPersonnelItemModel,
} from "./KeyPersonnelCard";
import {
  KeyPersonnelNavNext,
  KeyPersonnelNavPrev,
  useKeyPersonnelNavState,
} from "./KeyPersonnelNav";

export type { KeyPersonnelItemModel };

export interface KeyPersonnelModel {
  className?: string;
  title: string;
  items: KeyPersonnelItemModel[];
}

const KeyPersonnel = (model: KeyPersonnelModel) => {
  const { className, title, items } = model;
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const { canPrev, canNext } = useKeyPersonnelNavState(swiper);

  const validItems = items.filter(
    (item) => item.image?.url?.trim() && item.title?.trim(),
  );
  const sectionTitle = title.trim();

  if (validItems.length === 0 && !sectionTitle) {
    return null;
  }

  const itemKey = (item: KeyPersonnelItemModel, index: number) =>
    `${item.image.url}-${item.title}-${index}`;

  return (
    <section
      className={cn(
        "key-personnel group !bg-brand-navy !px-6 !py-20 md:!px-14",
        className,
      )}
    >
      <div className="key-personnel-inner !mx-auto !w-full !max-w-7xl">
        {sectionTitle ? (
          <h2 className="key-personnel-title !mb-8 !text-base !uppercase !text-brand-white/70">
            {sectionTitle}
          </h2>
        ) : null}

        {validItems.length > 0 ? (
          <div className="key-personnel-slider key-personnel-nav !relative !w-full">
            <KeyPersonnelNavPrev swiper={swiper} canPrev={canPrev} />

            <Swiper
              modules={[Pagination]}
              slidesPerView={2}
              slidesPerGroup={2}
              spaceBetween={24}
              loop={false}
              pagination={{ clickable: true }}
              onSwiper={setSwiper}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
              }}
              className="key-personnel-swiper key-personnel-pagination !w-full !pb-12"
              style={
                {
                  "--swiper-pagination-bullet-width": "8px",
                  "--swiper-pagination-bullet-height": "8px",
                  "--swiper-pagination-bullet-border-radius": "9999px",
                  "--swiper-pagination-bullet-inactive-color":
                    "var(--e-global-color-tertiary)",
                  "--swiper-pagination-bullet-inactive-opacity": "0.45",
                  "--swiper-pagination-color": "var(--e-global-color-tertiary)",
                  "--swiper-pagination-bullet-horizontal-gap": "6px",
                } as React.CSSProperties
              }
            >
              {validItems.map((item, index) => (
                <SwiperSlide key={itemKey(item, index)} className="!h-auto">
                  <KeyPersonnelCard {...item} />
                </SwiperSlide>
              ))}
            </Swiper>

            <KeyPersonnelNavNext swiper={swiper} canNext={canNext} />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default KeyPersonnel;

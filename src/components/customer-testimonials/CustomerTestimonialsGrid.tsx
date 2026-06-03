"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import CustomerTestimonialsCard from "./CustomerTestimonialsCard";
import type { CustomerTestimonialsItemModel } from "./CustomerTestimonialsCard";

export type { CustomerTestimonialsItemModel };

export interface CustomerTestimonialsModel {
  className?: string;
  title: string;
  description: string;
  items: CustomerTestimonialsItemModel[];
}

const isValidItem = (item: CustomerTestimonialsItemModel): boolean =>
  Boolean(item.youtubeVideoId.trim() && item.image.url.trim());

const CustomerTestimonialsGrid = (model: CustomerTestimonialsModel) => {
  const { className, items } = model;

  const validItems = useMemo(() => items.filter(isValidItem), [items]);

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [iframeTitle, setIframeTitle] = useState("YouTube video");

  const handleOpen = useCallback(
    (videoId: string) => {
      const item = validItems.find((i) => i.youtubeVideoId.trim() === videoId);
      setIframeTitle(item?.image.alt.trim() || "YouTube video");
      setActiveVideoId(videoId);
    },
    [validItems],
  );

  const handleClose = useCallback(() => {
    setActiveVideoId(null);
  }, []);

  useEffect(() => {
    if (!activeVideoId) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeVideoId, handleClose]);

  if (validItems.length === 0) {
    return null;
  }

  const itemKey = (item: CustomerTestimonialsItemModel, index: number) =>
    `${item.youtubeVideoId}-${item.image.url}-${index}`;

  return (
    <>
      <div
        className={cn(
          "customer-testimonials-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
          className,
        )}
      >
        {validItems.map((item, index) => (
          <CustomerTestimonialsCard
            key={itemKey(item, index)}
            item={item}
            onOpen={handleOpen}
          />
        ))}
      </div>

      {activeVideoId ? (
        <div
          className="customer-testimonials-modal customer-testimonials-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={iframeTitle}
          onClick={handleClose}
        >
          <div
            className="customer-testimonials-modal-dialog relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="customer-testimonials-modal-close absolute -top-10 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition-opacity hover:opacity-80 md:-right-10"
              onClick={handleClose}
              aria-label="Đóng video"
            >
              <X className="h-8 w-8" aria-hidden="true" />
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                className="customer-testimonials-modal-iframe h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title={iframeTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CustomerTestimonialsGrid;

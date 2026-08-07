"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { fetchProjectCategoryGalleryPage } from "@/lib/project-category-gallery/fetch";
import type {
  ProjectCategoryGalleryItemModel,
  ProjectCategoryGalleryModel,
} from "@/lib/project-category-gallery/types";
import { cn } from "@/lib/utils";

import ProjectCategoryGalleryCard from "./ProjectCategoryGalleryCard";

export type { ProjectCategoryGalleryModel };

const DEFAULT_SCROLL_REVEAL_TARGET_ID = "project-category-gallery";
const DEFAULT_LOAD_MORE_LABEL = "XEM THÊM";

const isValidItem = (item: ProjectCategoryGalleryItemModel): boolean =>
  Boolean(item.image?.url?.trim() && item.link?.url?.trim());

const ProjectCategoryGallery = (model: ProjectCategoryGalleryModel) => {
  const {
    className,
    filterEndpoint,
    pageSize,
    filters,
    items: initialItems,
    hasMore: initialHasMore,
    initialCategory = "",
    loadMoreLabel = DEFAULT_LOAD_MORE_LABEL,
    scrollReveal,
  } = model;

  const targetId =
    scrollReveal?.targetId?.trim() || DEFAULT_SCROLL_REVEAL_TARGET_ID;
  const sectionRef = useRef<HTMLElement | null>(null);

  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(() => initialItems.filter(isValidItem));
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const target = sectionRef.current ?? document.getElementById(targetId);
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          target.dataset.inView = "true";
          observer.unobserve(target);
          break;
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetId]);

  const loadPage = useCallback(
    async (nextCategory: string, nextPage: number) =>
      fetchProjectCategoryGalleryPage(filterEndpoint, {
        category: nextCategory,
        page: nextPage,
        pageSize,
      }),
    [filterEndpoint, pageSize],
  );

  const handleFilterClick = async (value: string) => {
    if (isFiltering || isLoadingMore || value === category) {
      return;
    }

    setIsFiltering(true);
    try {
      const result = await loadPage(value, 1);
      setCategory(value);
      setPage(1);
      setItems(result.items.filter(isValidItem));
      setHasMore(result.hasMore);
    } catch {
      // keep current list on failure
    } finally {
      setIsFiltering(false);
    }
  };

  const handleLoadMore = async () => {
    if (isFiltering || isLoadingMore || !hasMore) {
      return;
    }

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const result = await loadPage(category, nextPage);
      setPage(nextPage);
      setItems((current) => [
        ...current,
        ...result.items.filter(isValidItem),
      ]);
      setHasMore(result.hasMore);
    } catch {
      // keep button available on failure
    } finally {
      setIsLoadingMore(false);
    }
  };

  const validFilters = filters.filter((filter) => filter.label.trim().length > 0);
  const buttonLabel = loadMoreLabel.trim() || DEFAULT_LOAD_MORE_LABEL;

  const slideInBase = cn(
    "!opacity-0 !translate-y-10 !transition-[opacity,translate] !duration-[1.2s] !ease-out",
    "group-data-[in-view=true]/gallery:!opacity-100 group-data-[in-view=true]/gallery:!translate-y-0",
    "motion-reduce:!opacity-100 motion-reduce:!translate-y-0 motion-reduce:!transition-none",
  );

  const itemKey = (item: ProjectCategoryGalleryItemModel, index: number) =>
    `${item.id}-${item.image.url}-${index}`;

  return (
    <section
      ref={sectionRef}
      id={targetId}
      className={cn(
        "project-category-gallery group/gallery relative !w-full !overflow-hidden !bg-brand-white !py-20",
        className,
      )}
      aria-busy={isFiltering}
    >
      {validFilters.length > 0 ? (
        <nav
          className={cn(
            "project-category-gallery-filters mx-auto !mb-10 !flex !w-full !max-w-7xl !flex-wrap !items-center !justify-center !gap-2 !px-6 md:!px-10",
            slideInBase,
          )}
          aria-label="Lọc dự án theo danh mục"
        >
          {validFilters.map((filter) => {
            const isActive = filter.value === category;
            return (
              <button
                key={`${filter.value}-${filter.label}`}
                type="button"
                disabled={isFiltering || isLoadingMore}
                aria-pressed={isActive}
                onClick={() => {
                  void handleFilterClick(filter.value);
                }}
                className={cn(
                  "project-category-gallery-filter-item !border !border-brand-navy !px-4 !py-2 !text-base !transition-colors",
                  isActive
                    ? "!bg-brand-navy !text-brand-white"
                    : "!bg-transparent !text-brand-navy hover:!bg-brand-navy hover:!text-brand-white",
                  "disabled:!cursor-not-allowed disabled:!opacity-60",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </nav>
      ) : null}

      <div className={cn("project-category-gallery-body", slideInBase)}>
        {items.length > 0 ? (
          <ul className="project-category-gallery-grid !m-0 !grid !list-none !grid-cols-1 !gap-10 !p-0 md:!grid-cols-3">
            {items.map((item, index) => (
              <ProjectCategoryGalleryCard
                key={itemKey(item, index)}
                {...item}
              />
            ))}
          </ul>
        ) : !isFiltering ? (
          <p className="project-category-gallery-empty !px-6 !text-center !text-base !text-brand-navy/70 md:!px-10">
            Không có dự án phù hợp với danh mục đã chọn.
          </p>
        ) : null}

        {hasMore ? (
          <div className="project-category-gallery-load-more !mt-10 !flex !justify-center !px-6 md:!px-10">
            {isLoadingMore ? (
              <Loader2
                className="project-category-gallery-load-more-spinner !h-8 !w-8 !animate-spin !text-brand-navy"
                aria-label="Đang tải thêm"
              />
            ) : (
              <button
                type="button"
                disabled={isFiltering}
                onClick={() => {
                  void handleLoadMore();
                }}
                className={cn(
                  "project-category-gallery-load-more-button !border !border-brand-navy !bg-transparent !px-8 !py-3 !text-base !uppercase !text-brand-navy !transition-colors",
                  "hover:!bg-brand-navy hover:!text-brand-white",
                  "disabled:!cursor-not-allowed disabled:!opacity-60",
                )}
              >
                {buttonLabel}
              </button>
            )}
          </div>
        ) : null}
      </div>

      {isFiltering ? (
        <div
          className="project-category-gallery-loading !absolute !inset-0 !z-20 !flex !items-center !justify-center !bg-brand-white/70"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2
            className="!h-10 !w-10 !animate-spin !text-brand-navy"
            aria-label="Đang lọc dự án"
          />
        </div>
      ) : null}
    </section>
  );
};

export default ProjectCategoryGallery;

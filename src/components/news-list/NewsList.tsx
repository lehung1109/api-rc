"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { fetchNewsListPage } from "@/lib/news-list/fetch";
import type { NewsListItemModel, NewsListModel } from "@/lib/news-list/types";
import {
  readNewsListPageFromLocation,
  writeNewsListPageToUrl,
} from "@/lib/news-list/url-page";
import { cn } from "@/lib/utils";

import NewsListCard from "./NewsListCard";
import NewsListFeaturedCard from "./NewsListFeaturedCard";
import NewsListPagination from "./NewsListPagination";

export type { NewsListModel };

const isValidItem = (item: NewsListItemModel): boolean =>
  Boolean(
    item.image?.url?.trim() &&
      item.title?.trim() &&
      item.link?.url?.trim(),
  );

const NewsList = (model: NewsListModel) => {
  const {
    className,
    listEndpoint,
    pageSize,
    items: initialItems,
    totalPages: initialTotalPages,
    initialPage = 1,
    pageQueryParam,
  } = model;
  const safeInitialPage =
    Number.isFinite(initialPage) && initialPage >= 1
      ? Math.floor(initialPage)
      : 1;
  const [currentPage, setCurrentPage] = useState(safeInitialPage);
  const [items, setItems] = useState(() => initialItems.filter(isValidItem));
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const isMountedRef = useRef(false);
  const requestIdRef = useRef(0);

  const loadPage = useCallback(
    (page: number) =>
      fetchNewsListPage(listEndpoint, {
        page,
        pageSize,
      }),
    [listEndpoint, pageSize],
  );

  const goToPage = useCallback(
    async (nextPage: number, options?: { syncUrl?: boolean }) => {
      const safePage =
        Number.isFinite(nextPage) && nextPage >= 1
          ? Math.floor(nextPage)
          : 1;
      if (isLoading || safePage === currentPage) {
        return;
      }

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setIsLoading(true);

      try {
        const result = await loadPage(safePage);
        if (requestIdRef.current !== requestId) {
          return;
        }

        setCurrentPage(result.page);
        setItems(result.items.filter(isValidItem));
        setTotalPages(result.totalPages);
        if (options?.syncUrl !== false) {
          writeNewsListPageToUrl(result.page, pageQueryParam);
        }
      } finally {
        if (requestIdRef.current === requestId) {
          setIsLoading(false);
        }
      }
    },
    [currentPage, isLoading, loadPage, pageQueryParam],
  );

  useEffect(() => {
    const pageFromUrl = readNewsListPageFromLocation(pageQueryParam);
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (pageFromUrl !== safeInitialPage) {
        void goToPage(pageFromUrl, { syncUrl: false });
      }
    }
  }, [goToPage, pageQueryParam, safeInitialPage]);

  useEffect(() => {
    const handlePopState = () => {
      void goToPage(readNewsListPageFromLocation(pageQueryParam), {
        syncUrl: false,
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [goToPage, pageQueryParam]);

  if (items.length === 0 && totalPages < 1) {
    return null;
  }

  const featuredItem = currentPage === 1 ? items[0] : undefined;
  const gridItems = currentPage === 1 ? items.slice(1) : items;

  return (
    <section
      className={cn(
        "news-list !w-full !bg-brand-white !px-6 !py-20 md:!px-10",
        className,
      )}
    >
      <div className="news-list-inner !relative !mx-auto !w-full !max-w-7xl">
        {isLoading ? (
          <div
            className="news-list-loading !pointer-events-none !absolute !inset-0 !z-10 !flex !items-center !justify-center !bg-brand-white/70"
            aria-hidden="true"
          >
            <Loader2 className="news-list-loading-icon !h-8 !w-8 !animate-spin !text-brand-navy" />
          </div>
        ) : null}

        {featuredItem ? (
          <ul className="news-list-featured !m-0 !list-none !p-0">
            <NewsListFeaturedCard {...featuredItem} />
          </ul>
        ) : null}

        {gridItems.length > 0 ? (
          <ul
            className={cn(
              "news-list-grid !m-0 !grid !list-none !grid-cols-1 !gap-6 !p-0 sm:!grid-cols-2 lg:!grid-cols-4",
              featuredItem && "!mt-6",
            )}
          >
            {gridItems.map((item) => (
              <NewsListCard key={item.id} {...item} />
            ))}
          </ul>
        ) : (
          <p className="news-list-empty !m-0 !text-center !text-base !text-brand-navy">
            Không có tin tức nào.
          </p>
        )}

        <NewsListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          onPageChange={(page) => {
            void goToPage(page);
          }}
        />
      </div>
    </section>
  );
};

export default NewsList;

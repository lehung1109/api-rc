"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { fetchJobListingListPage } from "@/lib/job-listing-list/fetch";
import type {
  JobListingListItemModel,
  JobListingListModel,
} from "@/lib/job-listing-list/types";
import {
  readPageFromLocation,
  writePageToUrl,
} from "@/lib/job-listing-list/url-page";
import { cn } from "@/lib/utils";

import JobListingListCard from "./JobListingListCard";
import JobListingListPagination from "./JobListingListPagination";

export type { JobListingListModel };

const isValidItem = (item: JobListingListItemModel): boolean =>
  Boolean(
    item.image?.url?.trim() &&
      item.title?.trim() &&
      item.link?.url?.trim(),
  );

const JobListingList = (model: JobListingListModel) => {
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
    async (nextPage: number) =>
      fetchJobListingListPage(listEndpoint, {
        page: nextPage,
        pageSize,
      }),
    [listEndpoint, pageSize],
  );

  const applyPageResult = useCallback(
    (page: number, result: Awaited<ReturnType<typeof loadPage>>) => {
      setCurrentPage(page);
      setItems(result.items.filter(isValidItem));
      setTotalPages(result.totalPages);
    },
    [],
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

        applyPageResult(safePage, result);

        if (options?.syncUrl !== false) {
          writePageToUrl(safePage, pageQueryParam);
        }
      } catch {
        // keep current list on failure
      } finally {
        if (requestIdRef.current === requestId) {
          setIsLoading(false);
        }
      }
    },
    [applyPageResult, currentPage, isLoading, loadPage, pageQueryParam],
  );

  useEffect(() => {
    const urlPage = readPageFromLocation(pageQueryParam);

    if (!isMountedRef.current) {
      isMountedRef.current = true;

      if (urlPage !== safeInitialPage) {
        void goToPage(urlPage, { syncUrl: false });
      }

      return;
    }
  }, [goToPage, pageQueryParam, safeInitialPage]);

  useEffect(() => {
    const handlePopState = () => {
      const urlPage = readPageFromLocation(pageQueryParam);
      void goToPage(urlPage, { syncUrl: false });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [goToPage, pageQueryParam]);

  if (totalPages < 1 && items.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "job-listing-list !bg-brand-white !px-6 !py-20 md:!px-10",
        className,
      )}
    >
      <div className="job-listing-list-inner !relative !mx-auto !w-full !max-w-7xl">
        {isLoading ? (
          <div
            className="job-listing-list-loading !pointer-events-none !absolute !inset-0 !z-10 !flex !items-center !justify-center !bg-brand-white/70"
            aria-hidden="true"
          >
            <Loader2 className="job-listing-list-loading-icon !h-8 !w-8 !animate-spin !text-brand-navy" />
          </div>
        ) : null}

        {items.length > 0 ? (
          <ul className="job-listing-list-items !m-0 !flex !list-none !flex-col !gap-8 !p-0">
            {items.map((item) => (
              <JobListingListCard key={item.id} {...item} />
            ))}
          </ul>
        ) : (
          <p className="job-listing-list-empty !m-0 !text-center !text-base !text-brand-navy/90">
            Không có tin tuyển dụng nào.
          </p>
        )}

        <JobListingListPagination
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

export default JobListingList;

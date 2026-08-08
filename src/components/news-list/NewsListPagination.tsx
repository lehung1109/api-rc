import { ChevronRight, Ellipsis } from "lucide-react";

import { cn } from "@/lib/utils";

export interface NewsListPaginationModel {
  className?: string;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

type NewsListPaginationItem =
  | { kind: "page"; page: number }
  | { kind: "ellipsis"; key: string };

function getPageItems(
  currentPage: number,
  totalPages: number,
): NewsListPaginationItem[] {
  const pages: Array<number | "ellipsis"> =
    totalPages <= 7
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : currentPage <= 4
        ? [1, 2, 3, 4, 5, "ellipsis", totalPages]
        : currentPage >= totalPages - 3
          ? [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
          : [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
  let ellipsisCount = 0;

  return pages.map((page) => {
    if (page === "ellipsis") {
      ellipsisCount += 1;
      return { kind: "ellipsis", key: `ellipsis-${ellipsisCount}` };
    }

    return { kind: "page", page };
  });
}

const NewsListPagination = (model: NewsListPaginationModel) => {
  const { className, currentPage, totalPages, isLoading = false, onPageChange } =
    model;

  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <nav
      className={cn("news-list-pagination !mt-10 !flex !justify-center", className)}
      aria-label="Phân trang tin tức"
    >
      <ul className="news-list-pagination-list !m-0 !flex !list-none !flex-wrap !items-center !justify-center !gap-2 !p-0">
        {pageItems.map((item) => {
          if (item.kind === "ellipsis") {
            return (
              <li
                key={item.key}
                className="news-list-pagination-ellipsis !flex !h-10 !min-w-10 !items-center !justify-center !bg-brand-white-hover !text-brand-navy"
                aria-hidden="true"
              >
                <Ellipsis className="!h-5 !w-5" />
              </li>
            );
          }

          const isActive = item.page === currentPage;
          return (
            <li key={item.page} className="news-list-pagination-item">
              <button
                type="button"
                className={cn(
                  "news-list-pagination-button !inline-flex !h-10 !min-w-10 !items-center !justify-center !border-0 !px-3 !py-2 !text-base !font-bold !transition-colors",
                  isActive
                    ? "!bg-brand-navy !text-brand-white"
                    : "!bg-brand-white-hover !text-brand-navy hover:!bg-brand-navy hover:!text-brand-white",
                )}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Trang ${item.page}`}
                disabled={isLoading || isActive}
                onClick={() => onPageChange(item.page)}
              >
                {item.page}
              </button>
            </li>
          );
        })}
        {currentPage < totalPages ? (
          <li className="news-list-pagination-item news-list-pagination-item--next">
            <button
              type="button"
              className="news-list-pagination-button news-list-pagination-button--next !inline-flex !h-10 !min-w-10 !items-center !justify-center !border-0 !bg-brand-white-hover !px-3 !py-2 !text-base !text-brand-navy !transition-colors hover:!bg-brand-navy hover:!text-brand-white"
              aria-label="Trang sau"
              disabled={isLoading}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight className="!h-5 !w-5" aria-hidden="true" />
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default NewsListPagination;

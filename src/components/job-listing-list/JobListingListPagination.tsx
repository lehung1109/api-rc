import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface JobListingListPaginationModel {
  className?: string;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

const JobListingListPagination = (model: JobListingListPaginationModel) => {
  const {
    className,
    currentPage,
    totalPages,
    isLoading = false,
    onPageChange,
  } = model;

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const showNext = currentPage < totalPages;

  return (
    <nav
      className={cn(
        "job-listing-list-pagination !mt-10 !flex !justify-center",
        className,
      )}
      aria-label="Phân trang"
    >
      <ul className="job-listing-list-pagination-list !m-0 !flex !list-none !flex-wrap !items-center !justify-center !gap-2 !p-0">
        {pageNumbers.map((pageNumber) => {
          const isActive = pageNumber === currentPage;

          return (
            <li key={pageNumber} className="job-listing-list-pagination-item">
              <button
                type="button"
                className={cn(
                  "job-listing-list-pagination-button !inline-flex !h-10 !min-w-10 !items-center !justify-center !border-0 !px-3 !py-2 !text-base !font-bold !transition-colors",
                  isActive
                    ? "!bg-brand-navy !text-brand-white"
                    : "!bg-brand-white-hover !text-brand-navy hover:!bg-brand-navy hover:!text-brand-white",
                )}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Trang ${pageNumber}`}
                disabled={isLoading || isActive}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {showNext ? (
          <li className="job-listing-list-pagination-item job-listing-list-pagination-item--next">
            <button
              type="button"
              className="job-listing-list-pagination-button job-listing-list-pagination-button--next !inline-flex !h-10 !min-w-10 !items-center !justify-center !border-0 !bg-brand-white-hover !px-3 !py-2 !text-base !font-bold !text-brand-navy !transition-colors hover:!bg-brand-navy hover:!text-brand-white"
              aria-label="Trang sau"
              disabled={isLoading}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight
                className="job-listing-list-pagination-next-icon !h-5 !w-5"
                aria-hidden="true"
              />
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default JobListingListPagination;

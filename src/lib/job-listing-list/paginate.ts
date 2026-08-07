import type {
  JobListingListItemModel,
  JobListingListResponse,
} from "./types";

export function paginateJobListingList(
  catalog: JobListingListItemModel[],
  page: number,
  pageSize: number,
): JobListingListResponse {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize >= 1 ? Math.floor(pageSize) : 6;

  const totalPages =
    catalog.length === 0
      ? 0
      : Math.max(1, Math.ceil(catalog.length / safePageSize));

  const clampedPage = Math.min(safePage, totalPages || 1);
  const start = (clampedPage - 1) * safePageSize;
  const items = catalog.slice(start, start + safePageSize);

  return {
    items,
    page: clampedPage,
    totalPages,
  };
}

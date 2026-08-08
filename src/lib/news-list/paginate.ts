import type { NewsListItemModel, NewsListResponse } from "./types";

export function paginateNewsList(
  catalog: NewsListItemModel[],
  page: number,
  pageSize: number,
): NewsListResponse {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize >= 1 ? Math.floor(pageSize) : 6;
  const totalPages =
    catalog.length === 0 ? 0 : Math.max(1, Math.ceil(catalog.length / safePageSize));
  const resolvedPage = Math.min(safePage, totalPages || 1);
  const start = (resolvedPage - 1) * safePageSize;

  return {
    items: catalog.slice(start, start + safePageSize),
    page: resolvedPage,
    totalPages,
  };
}

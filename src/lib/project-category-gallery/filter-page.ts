import type {
  ProjectCategoryGalleryItemModel,
  ProjectCategoryGalleryResponse,
} from "./types";

export function filterPage(
  catalog: ProjectCategoryGalleryItemModel[],
  category: string | undefined,
  page: number,
  pageSize: number,
): ProjectCategoryGalleryResponse {
  const categoryKey = category?.trim() ?? "";
  const filtered =
    categoryKey.length === 0
      ? catalog
      : catalog.filter((item) => item.category === categoryKey);

  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize >= 1 ? Math.floor(pageSize) : 6;

  const start = (safePage - 1) * safePageSize;
  const items = filtered.slice(start, start + safePageSize);
  const hasMore = start + items.length < filtered.length;

  return { items, hasMore };
}

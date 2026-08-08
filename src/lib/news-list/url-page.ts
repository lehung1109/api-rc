const DEFAULT_PAGE_QUERY_PARAM = "paged";

function getPageQueryParam(pageQueryParam?: string): string {
  const trimmed = pageQueryParam?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : DEFAULT_PAGE_QUERY_PARAM;
}

export function readNewsListPageFromLocation(pageQueryParam?: string): number {
  if (typeof window === "undefined") {
    return 1;
  }

  const raw = new URLSearchParams(window.location.search).get(
    getPageQueryParam(pageQueryParam),
  );
  const page = raw ? Number.parseInt(raw, 10) : 1;

  return Number.isFinite(page) && page >= 1 ? page : 1;
}

export function writeNewsListPageToUrl(
  page: number,
  pageQueryParam?: string,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const key = getPageQueryParam(pageQueryParam);

  if (safePage <= 1) {
    params.delete(key);
  } else {
    params.set(key, String(safePage));
  }

  const query = params.toString();
  window.history.pushState(
    null,
    "",
    query
      ? `${window.location.pathname}?${query}${window.location.hash}`
      : `${window.location.pathname}${window.location.hash}`,
  );
}

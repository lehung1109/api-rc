const DEFAULT_PAGE_QUERY_PARAM = "paged";

export function getPageQueryParam(param?: string): string {
  const trimmed = param?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : DEFAULT_PAGE_QUERY_PARAM;
}

export function readPageFromUrl(
  search: string,
  pageQueryParam?: string,
): number {
  const key = getPageQueryParam(pageQueryParam);
  const raw = new URLSearchParams(search).get(key);
  const parsed = raw ? Number.parseInt(raw, 10) : 1;

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export function readPageFromLocation(pageQueryParam?: string): number {
  if (typeof window === "undefined") {
    return 1;
  }

  return readPageFromUrl(window.location.search, pageQueryParam);
}

export function writePageToUrl(
  page: number,
  pageQueryParam?: string,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const key = getPageQueryParam(pageQueryParam);
  const params = new URLSearchParams(window.location.search);
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;

  if (safePage <= 1) {
    params.delete(key);
  } else {
    params.set(key, String(safePage));
  }

  const query = params.toString();
  const nextUrl = query
    ? `${window.location.pathname}?${query}${window.location.hash}`
    : `${window.location.pathname}${window.location.hash}`;

  window.history.pushState(null, "", nextUrl);
}

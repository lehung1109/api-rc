import type { NewsListRequest, NewsListResponse } from "./types";

export async function fetchNewsListPage(
  listEndpoint: string,
  body: NewsListRequest,
): Promise<NewsListResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(listEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`News list request failed: ${response.status}`);
    }

    const data = (await response.json()) as NewsListResponse;
    if (!Array.isArray(data.items)) {
      throw new TypeError("Invalid news list response: missing items array");
    }

    return {
      items: data.items,
      page:
        typeof data.page === "number" && data.page >= 1
          ? Math.floor(data.page)
          : 1,
      totalPages:
        typeof data.totalPages === "number" && data.totalPages >= 0
          ? Math.floor(data.totalPages)
          : 0,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

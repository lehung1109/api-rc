import type {
  JobListingListRequest,
  JobListingListResponse,
} from "./types";

export async function fetchJobListingListPage(
  listEndpoint: string,
  body: JobListingListRequest,
): Promise<JobListingListResponse> {
  const controller = new AbortController();
  const timeoutMs = 8000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(listEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Job listing request failed: ${response.status}`);
    }

    const data = (await response.json()) as JobListingListResponse;

    if (!Array.isArray(data.items)) {
      throw new TypeError("Invalid job listing response: missing items array");
    }

    const page =
      typeof data.page === "number" && data.page >= 1
        ? Math.floor(data.page)
        : 1;
    const totalPages =
      typeof data.totalPages === "number" && data.totalPages >= 0
        ? Math.floor(data.totalPages)
        : 0;

    return {
      items: data.items,
      page,
      totalPages,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

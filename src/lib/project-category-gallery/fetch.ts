import type {
  ProjectCategoryGalleryRequest,
  ProjectCategoryGalleryResponse,
} from "./types";

export async function fetchProjectCategoryGalleryPage(
  filterEndpoint: string,
  body: ProjectCategoryGalleryRequest,
): Promise<ProjectCategoryGalleryResponse> {
  const controller = new AbortController();
  const timeoutMs = 8000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(filterEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Gallery request failed: ${response.status}`);
    }

    const data = (await response.json()) as ProjectCategoryGalleryResponse;

    if (!Array.isArray(data.items)) {
      throw new TypeError("Invalid gallery response: missing items array");
    }

    return {
      items: data.items,
      hasMore: Boolean(data.hasMore),
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

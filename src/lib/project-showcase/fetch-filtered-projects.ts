import type {
  FilterEndpointResponse,
  ProjectItem,
  ProjectShowcaseFilters,
} from "./types";
import { filterProjects } from "./filter-projects";

export async function fetchFilteredProjects(
  filterEndpoint: string,
  filters: ProjectShowcaseFilters,
  fallbackProjects: ProjectItem[],
): Promise<ProjectItem[]> {
  const controller = new AbortController();
  const timeoutMs = 8000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const response = await fetch(filterEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error(`Filter request failed: ${response.status}`);
  }

  const data = (await response.json()) as FilterEndpointResponse;

  if (!Array.isArray(data.items)) {
    throw new TypeError("Invalid filter response: missing items array");
  }

  return data.items;
}

export function getInitialDisplayedProjects(
  projects: ProjectItem[],
  filters: ProjectShowcaseFilters,
): ProjectItem[] {
  return filterProjects(projects, filters);
}

export function getFallbackDisplayedProjects(
  projects: ProjectItem[],
  filters: ProjectShowcaseFilters,
  currentItems: ProjectItem[],
): ProjectItem[] {
  try {
    return filterProjects(projects, filters);
  } catch {
    return currentItems;
  }
}

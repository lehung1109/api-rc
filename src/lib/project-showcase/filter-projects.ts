import type { ProjectItem, ProjectShowcaseFilters } from "./types";

export function filterProjects(
  projects: ProjectItem[],
  filters: ProjectShowcaseFilters,
): ProjectItem[] {
  return projects.filter((project) => {
    if (filters.area && project.area !== filters.area) {
      return false;
    }
    if (filters.beds && String(project.bedrooms) !== filters.beds) {
      return false;
    }
    if (filters.style && project.style !== filters.style) {
      return false;
    }
    return true;
  });
}

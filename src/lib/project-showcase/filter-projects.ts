import type { ProjectItem, ProjectShowcaseFilters } from "./types";

export function filterProjects(
  projects: ProjectItem[],
  filters: ProjectShowcaseFilters,
): ProjectItem[] {
  return projects.filter((project) => {
    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;
      if ((project.terms[key]?.value ?? "") !== value) return false;
    }
    return true;
  });
}

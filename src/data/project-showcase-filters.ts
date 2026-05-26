import type { ProjectShowcaseFiltersModel } from "@/lib/project-showcase/types";

import { projectShowcase } from "./project-showcase";

export const projectShowcaseFilters: ProjectShowcaseFiltersModel = {
  filterEndpoint: projectShowcase.filterEndpoint,
  filters: projectShowcase.filters,
  filterOptions: projectShowcase.filterOptions,
  projects: projectShowcase.projects,
};

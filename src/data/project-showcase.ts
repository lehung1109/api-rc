import type { ProjectShowcaseModel } from "@/lib/project-showcase/types";

import { projectShowcaseFilters } from "./project-showcase-filters";

export const projectShowcase: ProjectShowcaseModel = {
  ...projectShowcaseFilters,
};

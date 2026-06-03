import type {
  ProjectShowcaseFiltersModel,
  ProjectShowcaseModel,
} from "@/lib/project-showcase/types";

import ClientComponentWrapper from "../ClientComponentWrapper";
import ProjectShowcaseFilters from "./ProjectShowcaseFilters";

const ProjectShowcase = (model: ProjectShowcaseModel) => {
  const {
    className,
    filterEndpoint,
    taxonomies,
    filters,
    filterOptions,
    projects,
    filterColumnsDesktop,
  } = model;

  const hydrateData: ProjectShowcaseFiltersModel = {
    filterEndpoint,
    taxonomies,
    filters,
    filterOptions,
    projects,
    ...(filterColumnsDesktop !== undefined
      ? { filterColumnsDesktop }
      : {}),
  };

  return (
    <section className={`project-showcase ${className ?? ""}`}>
      <div className="container">
        <ClientComponentWrapper
          type="projectShowcaseFilters"
          hydrateData={hydrateData}
        >
          <ProjectShowcaseFilters {...hydrateData} />
        </ClientComponentWrapper>
      </div>
    </section>
  );
};

export default ProjectShowcase;

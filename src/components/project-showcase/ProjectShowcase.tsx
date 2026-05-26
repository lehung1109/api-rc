import type { ProjectShowcaseModel } from "@/lib/project-showcase/types";

import ClientComponentWrapper from "../ClientComponentWrapper";
import ReactSection from "../ReactSection";
import ProjectShowcaseFilters from "./ProjectShowcaseFilters";

const ProjectShowcase = (model: ProjectShowcaseModel) => {
  const { className, filterEndpoint, filters, filterOptions, projects } = model;

  const hydrateData = {
    filterEndpoint,
    filters,
    filterOptions,
    projects,
  };

  return (
    <section className={`project-showcase py-12 ${className ?? ""}`}>
      <div className="container">
        <ClientComponentWrapper>
          <ProjectShowcaseFilters {...hydrateData} />
          <ReactSection type="projectShowcaseFilters" data={hydrateData} />
        </ClientComponentWrapper>
      </div>
    </section>
  );
};

export default ProjectShowcase;

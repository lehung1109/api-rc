import { cn } from "@/lib/utils";
import type { ProjectCategoryGalleryModel } from "@/lib/project-category-gallery/types";

import ClientComponentWrapper from "../ClientComponentWrapper";
import ProjectCategoryGallery from "./ProjectCategoryGallery";

export type { ProjectCategoryGalleryModel };

const ProjectCategoryGalleryWrapper = (model: ProjectCategoryGalleryModel) => {
  const { className, filters, items } = model;

  const hasFilters = filters.some((filter) => filter.label.trim().length > 0);
  const hasItems = items.some(
    (item) => item.image?.url?.trim() && item.link?.url?.trim(),
  );

  if (!hasFilters && !hasItems) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("project-category-gallery-root", className)}
      type="projectCategoryGallery"
      hydrateData={model}
    >
      <ProjectCategoryGallery {...model} />
    </ClientComponentWrapper>
  );
};

export default ProjectCategoryGalleryWrapper;

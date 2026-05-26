import { Bed, LayoutGrid, Pencil } from "lucide-react";

import Media from "../media/Media";
import type { ProjectItem } from "@/lib/project-showcase/types";

const ProjectShowcaseCard = (project: ProjectItem) => {
  const { title, image, bedrooms, areaLabel, styleLabel } = project;

  return (
    <article className="project-showcase-card flex flex-col">
      <Media
        {...image}
        className="aspect-[4/3] w-full rounded-lg object-cover"
      />
      <h3 className="mt-3 line-clamp-2 text-base font-semibold text-foreground">
        {title}
      </h3>
      <ul className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <li className="flex items-center gap-1">
          <Bed className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{bedrooms} phòng</span>
        </li>
        <li className="flex items-center gap-1">
          <LayoutGrid className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{areaLabel}</span>
        </li>
        <li className="flex items-center gap-1">
          <Pencil className="size-3.5 shrink-0" aria-hidden="true" />
          <span>Style {styleLabel}</span>
        </li>
      </ul>
    </article>
  );
};

export default ProjectShowcaseCard;

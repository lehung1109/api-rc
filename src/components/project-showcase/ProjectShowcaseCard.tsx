import Media from "../media/Media";
import type { ProjectItem } from "@/lib/project-showcase/types";

const ProjectShowcaseCard = (project: ProjectItem) => {
  const { title, image, terms } = project;

  return (
    <article className="project-showcase-card flex flex-col">
      <Media
        {...image}
        className="aspect-4/3 w-full rounded-lg object-cover"
      />
      <h3 className="mt-3 line-clamp-2 text-base font-semibold text-foreground">
        {title}
      </h3>
      <ul className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {Object.entries(terms)
          .filter(([, v]) => Boolean(v?.label))
          .map(([key, v]) => (
            <li
              key={key}
              className="rounded-md bg-muted px-2 py-1 text-muted-foreground"
            >
              {v.label}
            </li>
          ))}
      </ul>
    </article>
  );
};

export default ProjectShowcaseCard;

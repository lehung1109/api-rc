import Media from "../media/Media";
import Link from "../link/Link";
import type { ProjectItem } from "@/lib/project-showcase/types";

const ProjectShowcaseCard = (project: ProjectItem) => {
  const { title, image, terms, url } = project;

  return (
    <article className="project-showcase-card group relative flex flex-col">
      <div className="overflow-hidden rounded-lg">
        <Media
          {...image}
          className="pointer-events-none aspect-4/3 w-full object-cover transition-transform duration-200 ease-out will-change-transform group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 text-base font-semibold text-foreground">
        <Link
          {...url}
          className="project-showcase-card__link before:absolute before:inset-0 before:content-[''] before:cursor-pointer"
        >
          <span className="relative z-10">{title}</span>
        </Link>
      </h3>
      <ul className="pointer-events-none mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
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

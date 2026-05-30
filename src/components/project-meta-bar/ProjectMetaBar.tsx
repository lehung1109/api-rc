import {
  BedDouble,
  Palette,
  Ruler,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectMetaBarIconKey =
  | "user-round"
  | "bed-double"
  | "palette"
  | "ruler";

const PROJECT_META_BAR_ICONS: Record<ProjectMetaBarIconKey, LucideIcon> = {
  "user-round": UserRound,
  "bed-double": BedDouble,
  palette: Palette,
  ruler: Ruler,
};

function resolveProjectMetaBarIcon(icon: ProjectMetaBarIconKey): LucideIcon {
  return PROJECT_META_BAR_ICONS[icon] ?? UserRound;
}

export interface ProjectMetaBarColumnModel {
  title: string;
  content: string;
  icon: ProjectMetaBarIconKey;
}

export interface ProjectMetaBarModel {
  className?: string;
  columns: ProjectMetaBarColumnModel[];
}

function hasColumnText(column: ProjectMetaBarColumnModel): boolean {
  return column.title.trim().length > 0 || column.content.trim().length > 0;
}

const ProjectMetaBar = (model: ProjectMetaBarModel) => {
  const { className, columns } = model;

  const visibleColumns = columns.slice(0, 4).filter(hasColumnText);

  if (visibleColumns.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "project-meta-bar w-full border-b border-[#eeeeee] bg-[#e5e5e5f2]",
        className,
      )}
    >
      <div className="project-meta-bar-inner mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-5">
        <dl className="project-meta-bar-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {visibleColumns.map((column, index) => {
            const Icon = resolveProjectMetaBarIcon(column.icon);
            const hasTitle = column.title.trim().length > 0;
            const hasContent = column.content.trim().length > 0;

            return (
              <div
                key={`${column.icon}-${index}`}
                className="project-meta-bar-column"
              >
                <dt className="project-meta-bar-title flex items-center gap-2">
                  <Icon
                    className="h-4 w-4 shrink-0 text-[#f36f21]"
                    aria-hidden
                  />
                  {hasTitle ? (
                    <span className="font-bold text-foreground">
                      {column.title}
                    </span>
                  ) : null}
                </dt>
                {hasContent ? (
                  <dd
                    className={cn(
                      "project-meta-bar-content text-[#333]",
                      hasTitle && "mt-1",
                    )}
                  >
                    {column.content}
                  </dd>
                ) : null}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};

export default ProjectMetaBar;

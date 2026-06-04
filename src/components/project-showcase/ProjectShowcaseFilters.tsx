"use client";

import { useCallback, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchFilteredProjects,
  getFallbackDisplayedProjects,
  getInitialDisplayedProjects,
} from "@/lib/project-showcase/fetch-filtered-projects";
import { cn } from "@/lib/utils";
import type {
  ProjectItem,
  ProjectShowcaseFilterColumnsDesktop,
  ProjectShowcaseFilters as Filters,
  ProjectShowcaseFiltersModel,
} from "@/lib/project-showcase/types";

import ProjectShowcaseCard from "./ProjectShowcaseCard";

const ALL_VALUE = "__all__";

function toSelectValue(value: string | undefined): string {
  return value ?? ALL_VALUE;
}

function fromSelectValue(value: string): string | undefined {
  return value === ALL_VALUE ? undefined : value;
}

const FILTER_DESKTOP_COLS: Record<ProjectShowcaseFilterColumnsDesktop, string> =
  {
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  };

const resolveFilterColumnsDesktop = (
  value?: ProjectShowcaseFilterColumnsDesktop,
): ProjectShowcaseFilterColumnsDesktop => (value === 4 ? 4 : 3);

const ProjectShowcaseFilters = ({
  filterEndpoint,
  taxonomies,
  filters: initialFilters,
  filterOptions,
  projects,
  filterColumnsDesktop: filterColumnsDesktopProp,
}: ProjectShowcaseFiltersModel) => {
  const filterColumnsDesktop = resolveFilterColumnsDesktop(
    filterColumnsDesktopProp,
  );
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [displayedItems, setDisplayedItems] = useState<ProjectItem[]>(() =>
    getInitialDisplayedProjects(projects, initialFilters),
  );
  const [isLoading, setIsLoading] = useState(false);

  const applyFilters = useCallback(
    async (nextFilters: Filters) => {
      setFilters(nextFilters);
      setIsLoading(true);

      try {
        const items = await fetchFilteredProjects(
          filterEndpoint,
          nextFilters,
          projects,
        );
        setDisplayedItems(items);
      } catch {
        setDisplayedItems((current) =>
          getFallbackDisplayedProjects(projects, nextFilters, current),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [filterEndpoint, projects],
  );

  const updateFilter = (key: string, value: string) => {
    const nextFilters: Filters = {
      ...filters,
      [key]: fromSelectValue(value),
    };
    void applyFilters(nextFilters);
  };

  return (
    <div className="project-showcase-filters">
      <div
        className={cn(
          "grid grid-cols-1 gap-4 md:grid-cols-2",
          FILTER_DESKTOP_COLS[filterColumnsDesktop],
        )}
      >
        {taxonomies?.map((t) => (
          <Select
            key={t.key}
            value={toSelectValue(filters[t.key])}
            onValueChange={(value) => updateFilter(t.key, value)}
            disabled={isLoading}
          >
            <SelectTrigger
              className="w-full bg-brand-white text-base !h-auto p-[7px_15px] leading-1.2"
              size="default"
            >
              <SelectValue placeholder={`Chọn ${t.label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>{`Chọn ${t.label}`}</SelectItem>
              {(filterOptions[t.key] ?? []).map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span
                    dangerouslySetInnerHTML={{ __html: option.label }}
                  ></span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      <div
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-y-9 md:grid-cols-3 lg:grid-cols-4"
        aria-busy={isLoading}
      >
        {displayedItems.map((project) => (
          <ProjectShowcaseCard key={project.id} {...project} />
        ))}
      </div>

      {displayedItems.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Không có dự án phù hợp với bộ lọc đã chọn.
        </p>
      ) : null}
    </div>
  );
};

export default ProjectShowcaseFilters;

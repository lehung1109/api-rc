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
import type {
  ProjectItem,
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

const ProjectShowcaseFilters = ({
  filterEndpoint,
  filters: initialFilters,
  filterOptions,
  projects,
}: ProjectShowcaseFiltersModel) => {
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

  const updateFilter = (key: keyof Filters, value: string) => {
    const nextFilters: Filters = {
      ...filters,
      [key]: fromSelectValue(value),
    };
    void applyFilters(nextFilters);
  };

  return (
    <div className="project-showcase-filters">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select
          value={toSelectValue(filters.area)}
          onValueChange={(value) => updateFilter("area", value)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full bg-white sm:flex-1" size="default">
            <SelectValue placeholder="Chọn diện tích" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Tất cả</SelectItem>
            {filterOptions.areas.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={toSelectValue(filters.beds)}
          onValueChange={(value) => updateFilter("beds", value)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full bg-white sm:flex-1" size="default">
            <SelectValue placeholder="Chọn số phòng ngủ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Tất cả</SelectItem>
            {filterOptions.bedrooms.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={toSelectValue(filters.style)}
          onValueChange={(value) => updateFilter("style", value)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full bg-white sm:flex-1" size="default">
            <SelectValue placeholder="Chọn phong cách thiết kế" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Tất cả</SelectItem>
            {filterOptions.styles.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
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

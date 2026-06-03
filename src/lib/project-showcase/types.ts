import type { LinkModel } from "@/components/link/Link";
import type { MediaModel } from "@/components/media/Media";

export type ProjectShowcaseFilters = Record<string, string | undefined>;

export type ProjectShowcaseTaxonomy = {
  key: string;
  label: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  image: MediaModel;
  terms: Record<string, { value: string; label: string }>;
  url: LinkModel;
};

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterEndpointResponse = {
  items: ProjectItem[];
};

export type ProjectShowcaseFilterColumnsDesktop = 3 | 4;

export interface ProjectShowcaseFiltersModel {
  filterEndpoint: string;
  taxonomies: ProjectShowcaseTaxonomy[];
  filters: ProjectShowcaseFilters;
  filterOptions: Record<string, FilterOption[]>;
  projects: ProjectItem[];
  filterColumnsDesktop?: ProjectShowcaseFilterColumnsDesktop;
}

export interface ProjectShowcaseModel extends ProjectShowcaseFiltersModel {
  className?: string;
}

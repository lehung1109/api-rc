import type { MediaModel } from "@/components/media/Media";

export type ProjectShowcaseFilters = {
  area?: string;
  beds?: string;
  style?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  image: MediaModel;
  bedrooms: number;
  area: string;
  areaLabel: string;
  style: string;
  styleLabel: string;
};

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterEndpointResponse = {
  items: ProjectItem[];
};

export interface ProjectShowcaseFiltersModel {
  filterEndpoint: string;
  filters: ProjectShowcaseFilters;
  filterOptions: {
    areas: FilterOption[];
    bedrooms: FilterOption[];
    styles: FilterOption[];
  };
  projects: ProjectItem[];
}

export interface ProjectShowcaseModel extends ProjectShowcaseFiltersModel {
  className?: string;
}

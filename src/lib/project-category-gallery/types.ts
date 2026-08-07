import type { LinkModel } from "@/components/link/Link";
import type { MediaModel } from "@/components/media/Media";

export interface ProjectCategoryGalleryFilterModel {
  label: string;
  value: string; // "" = Tất cả
}

export interface ProjectCategoryGalleryItemModel {
  id: string;
  image: MediaModel;
  title: string;
  description: string;
  link: LinkModel;
  category: string;
}

export interface ProjectCategoryGalleryScrollRevealModel {
  targetId: string;
}

export interface ProjectCategoryGalleryModel {
  className?: string;
  filterEndpoint: string;
  pageSize: number;
  filters: ProjectCategoryGalleryFilterModel[];
  items: ProjectCategoryGalleryItemModel[];
  hasMore: boolean;
  initialCategory?: string;
  loadMoreLabel?: string;
  scrollReveal?: ProjectCategoryGalleryScrollRevealModel;
}

export interface ProjectCategoryGalleryRequest {
  category?: string;
  page?: number;
  pageSize?: number;
}

export interface ProjectCategoryGalleryResponse {
  items: ProjectCategoryGalleryItemModel[];
  hasMore: boolean;
}

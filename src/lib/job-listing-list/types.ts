import type { LinkModel } from "@/components/link/Link";
import type { MediaModel } from "@/components/media/Media";

export interface JobListingListItemModel {
  id: string;
  image: MediaModel;
  categoryLabel: string;
  title: string;
  link: LinkModel;
  statusLabel?: string;
  employmentType?: string;
  location?: string;
  description: string;
}

export interface JobListingListModel {
  className?: string;
  listEndpoint: string;
  pageSize: number;
  items: JobListingListItemModel[];
  totalPages: number;
  initialPage?: number;
  pageQueryParam?: string;
}

export interface JobListingListRequest {
  page?: number;
  pageSize?: number;
}

export interface JobListingListResponse {
  items: JobListingListItemModel[];
  page: number;
  totalPages: number;
}

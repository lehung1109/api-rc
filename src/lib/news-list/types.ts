import type { LinkModel } from "@/components/link/Link";
import type { MediaModel } from "@/components/media/Media";

export interface NewsListItemModel {
  id: string;
  image: MediaModel;
  backgroundImage?: MediaModel;
  time: string;
  title: string;
  description: string;
  link: LinkModel;
}

export interface NewsListModel {
  className?: string;
  listEndpoint: string;
  pageSize: number;
  items: NewsListItemModel[];
  totalPages: number;
  initialPage?: number;
  pageQueryParam?: string;
}

export interface NewsListRequest {
  page?: number;
  pageSize?: number;
}

export interface NewsListResponse {
  items: NewsListItemModel[];
  page: number;
  totalPages: number;
}

declare module "virtual:preview-pages" {
  export interface PreviewPageVariant {
    id: string;
    title: string;
    path: string;
  }

  export interface PreviewPage {
    slug: string;
    title: string;
    path: string;
    source: "html" | "tsx";
    variants: PreviewPageVariant[];
  }

  export const previewPages: PreviewPage[];
}
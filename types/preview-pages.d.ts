declare module "virtual:preview-pages" {
  export interface PreviewPage {
    slug: string;
    title: string;
    path: string;
  }

  export const previewPages: PreviewPage[];
}
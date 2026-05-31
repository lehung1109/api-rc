import { cn } from "@/lib/utils";

export interface HtmlContentModel {
  html: string;
  className?: string;
  /** Wrapper tag — default `article` */
  as?: "article" | "div" | "section";
}

const HtmlContent = (model: HtmlContentModel) => {
  const { html, className, as } = model;

  if (html.trim() === "") {
    return null;
  }

  const Tag = as ?? "article";

  return (
    <Tag
      className={cn("html-content entry-content", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HtmlContent;

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import PageTitleBarBreadcrumb from "./PageTitleBarBreadcrumb";

export interface PageTitleBarBreadcrumbItemModel {
  label: string;
  link: LinkModel;
}

export interface PageTitleBarBreadcrumbLevelModel {
  items: PageTitleBarBreadcrumbItemModel[];
}

export interface PageTitleBarModel {
  className?: string;
  title: string;
  breadcrumbLevels: PageTitleBarBreadcrumbLevelModel[];
}

const PageTitleBar = (model: PageTitleBarModel) => {
  const { className, title, breadcrumbLevels } = model;

  const hasTitle = title.trim().length > 0;
  const hasBreadcrumb = breadcrumbLevels.some(
    (level) => level.items.length > 0,
  );

  if (!hasTitle && !hasBreadcrumb) {
    return null;
  }

  return (
    <section
      className={cn(
        "page-title-bar w-full border-b border-[#eeeeee]",
        className,
      )}
    >
      <div className="page-title-bar-inner mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:px-6 md:py-4">
        {hasTitle ? (
          <h1 className="page-title-bar-title text-[#f36f21] font-bold uppercase leading-snug">
            {title}
          </h1>
        ) : null}
        {hasBreadcrumb ? (
          <PageTitleBarBreadcrumb levels={breadcrumbLevels} />
        ) : null}
      </div>
    </section>
  );
};

export default PageTitleBar;

import { Fragment } from "react";

import { cn } from "@/lib/utils";
import Link from "../link/Link";
import type { PageTitleBarBreadcrumbLevelModel } from "./PageTitleBar";

export interface PageTitleBarBreadcrumbProps {
  levels: PageTitleBarBreadcrumbLevelModel[];
  className?: string;
}

const PageTitleBarBreadcrumb = ({
  levels,
  className,
}: PageTitleBarBreadcrumbProps) => {
  const nonEmptyLevels = levels.filter((level) => level.items.length > 0);

  if (nonEmptyLevels.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(
        "page-title-bar-breadcrumb text-sm break-words text-[#888888] md:text-right",
        className,
      )}
      aria-label="Breadcrumb"
    >
      {nonEmptyLevels.map((level, levelIndex) => (
        <Fragment key={levelIndex}>
          {levelIndex > 0 ? (
            <span className="page-title-bar-breadcrumb-sep" aria-hidden>
              {" / "}
            </span>
          ) : null}
          {level.items.map((item, itemIndex) => (
            <Fragment key={`${item.link.url}-${item.label}`}>
              {itemIndex > 0 ? (
                <span className="page-title-bar-breadcrumb-sep" aria-hidden>
                  {" - "}
                </span>
              ) : null}
              <Link
                {...item.link}
                className={cn(
                  "page-title-bar-breadcrumb-link hover:text-[#666666] hover:underline",
                  item.link.className,
                )}
              >
                {item.label}
              </Link>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </nav>
  );
};

export default PageTitleBarBreadcrumb;

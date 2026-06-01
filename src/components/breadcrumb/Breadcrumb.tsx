import { Fragment } from "react";
import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface BreadcrumbLinkLevelModel {
  label: string;
  link: LinkModel;
  verified?: boolean;
}

export interface BreadcrumbModel {
  className?: string;
  linkLevels: BreadcrumbLinkLevelModel[];
  currentLabel?: string;
}

const BreadcrumbSeparator = () => (
  <span className="breadcrumb-sep px-1" aria-hidden>
    »
  </span>
);

const Breadcrumb = (model: BreadcrumbModel) => {
  const { className, linkLevels, currentLabel } = model;

  const validLinkLevels = linkLevels
    .filter((item) => item.label.trim() && item.link.url.trim())
    .slice(0, 2);

  const trimmedCurrent = currentLabel?.trim() ?? "";
  const itemCount = validLinkLevels.length + (trimmedCurrent ? 1 : 0);

  if (itemCount === 0) {
    return null;
  }

  return (
    <nav
      className={cn("breadcrumb text-base break-words", className)}
      aria-label="Breadcrumb"
    >
      {validLinkLevels.map((item, index) => (
        <Fragment key={`${item.link.url}-${index}`}>
          {index > 0 ? <BreadcrumbSeparator /> : null}
          <Link
            {...item.link}
            className={cn(
              "breadcrumb-link text-[#e04622]",
              item.link.className,
            )}
          >
            {item.verified ? "✅ " : null}
            {item.label}
          </Link>
        </Fragment>
      ))}
      {trimmedCurrent ? (
        <>
          {validLinkLevels.length > 0 ? <BreadcrumbSeparator /> : null}
          <span
            className="breadcrumb-current text-foreground"
            aria-current="location"
          >
            {trimmedCurrent}
          </span>
        </>
      ) : null}
    </nav>
  );
};

export default Breadcrumb;

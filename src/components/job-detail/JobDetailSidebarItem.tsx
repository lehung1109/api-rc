import { BriefcaseBusiness, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface JobDetailSidebarItemModel {
  categoryLabel: string;
  title: string;
  link: LinkModel;
  metadata: string[];
}

const JobDetailSidebarItem = (model: JobDetailSidebarItemModel) => {
  const categoryLabel = model.categoryLabel.trim();
  const title = model.title.trim();
  const metadata = model.metadata.map((item) => item.trim()).filter(Boolean);

  if (!title || !model.link.url.trim()) {
    return null;
  }

  return (
    <article className="job-detail-sidebar-item !border-b !border-brand-navy/15 !py-5 first:!pt-0 last:!border-b-0 last:!pb-0">
      {categoryLabel ? (
        <p className="job-detail-sidebar-item-category !m-0 !mb-2 !text-xs !font-bold !uppercase !tracking-wide !text-brand-navy/70">
          {categoryLabel}
        </p>
      ) : null}
      <h3 className="job-detail-sidebar-item-title !m-0 !text-base !font-bold !uppercase !leading-snug !text-brand-navy">
        <Link
          {...model.link}
          className={cn(
            "job-detail-sidebar-item-link !text-inherit !no-underline hover:!text-brand-gold-hover",
            model.link.className,
          )}
        >
          {title}
        </Link>
      </h3>
      {metadata.length > 0 ? (
        <ul className="job-detail-sidebar-item-metadata !m-0 !mt-3 !flex !list-none !flex-col !gap-2 !p-0 !text-xs !text-brand-navy/70">
          {metadata.map((item, index) => {
            const Icon = index === 0 ? BriefcaseBusiness : MapPin;
            return (
              <li key={item} className="!flex !items-start !gap-2">
                <Icon className="!mt-0.5 !h-3.5 !w-3.5 !shrink-0 !text-brand-gold" aria-hidden="true" />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </article>
  );
};

export default JobDetailSidebarItem;

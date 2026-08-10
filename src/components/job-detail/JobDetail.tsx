import { BriefcaseBusiness, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import JobDetailSection from "./JobDetailSection";
import type { JobDetailSectionModel } from "./JobDetailSection";
import JobDetailSidebarItem from "./JobDetailSidebarItem";
import type { JobDetailSidebarItemModel } from "./JobDetailSidebarItem";

export interface JobDetailModel {
  className?: string;
  title: string;
  metadata: string[];
  sections: JobDetailSectionModel[];
  sidebarTitle: string;
  relatedJobs: JobDetailSidebarItemModel[];
}

const JobDetail = (model: JobDetailModel) => {
  const title = model.title.trim();
  const metadata = model.metadata.map((item) => item.trim()).filter(Boolean);
  const sections = model.sections.filter(
    (section) => section.title.trim() && section.items.some((item) => item.trim()),
  );
  const sidebarTitle = model.sidebarTitle.trim();
  const relatedJobs = model.relatedJobs.filter(
    (job) => job.title.trim() && job.link.url.trim(),
  );

  if (
    !title &&
    metadata.length === 0 &&
    sections.length === 0 &&
    relatedJobs.length === 0
  ) {
    return null;
  }

  return (
    <section
      className={cn(
        "job-detail !bg-brand-white !px-6 !py-20 md:!px-10",
        model.className,
      )}
    >
      <div className="job-detail-inner !mx-auto !grid !w-full !max-w-7xl !grid-cols-1 !gap-12 md:!grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] md:!gap-16">
        <main className="job-detail-content !min-w-0">
          {title ? (
            <h1 className="job-detail-title !m-0 !text-2xl !font-bold !uppercase !leading-tight !text-brand-navy md:!text-3xl">
              {title}
            </h1>
          ) : null}
          {metadata.length > 0 ? (
            <ul className="job-detail-metadata !m-0 !mt-5 !mb-8 !flex !list-none !flex-wrap !gap-x-6 !gap-y-3 !p-0 !text-base !text-brand-navy/70">
              {metadata.map((item, index) => {
                const Icon = index === 0 ? BriefcaseBusiness : MapPin;
                return (
                  <li key={item} className="!flex !items-center !gap-2">
                    <Icon className="!h-4 !w-4 !shrink-0 !text-brand-gold" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          ) : null}
          {sections.map((section) => (
            <JobDetailSection key={section.title} {...section} />
          ))}
        </main>
        {relatedJobs.length > 0 ? (
          <aside
            className="job-detail-sidebar md:!sticky md:!top-20 md:!self-start"
            aria-labelledby="job-detail-sidebar-title"
          >
            {sidebarTitle ? (
              <h2
                id="job-detail-sidebar-title"
                className="job-detail-sidebar-title !m-0 !mb-6 !border-b !border-brand-navy/20 !pb-3 !text-base !font-bold !uppercase !text-brand-navy"
              >
                {sidebarTitle}
              </h2>
            ) : null}
            <div className="job-detail-sidebar-list !flex !flex-col">
              {relatedJobs.map((job) => (
                <JobDetailSidebarItem key={job.link.url} {...job} />
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
};

export default JobDetail;

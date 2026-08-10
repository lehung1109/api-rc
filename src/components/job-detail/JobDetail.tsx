import {
  CalendarDays,
  Clock,
  HandCoins,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import JobDetailSection from "./JobDetailSection";
import type { JobDetailSectionModel } from "./JobDetailSection";
import JobDetailSidebarItem from "./JobDetailSidebarItem";
import type { JobDetailSidebarItemModel } from "./JobDetailSidebarItem";

export interface JobDetailMetadataModel {
  vacancies: string;
  salary: string;
  employmentType: string;
  applicationDeadline: string;
}

export interface JobDetailModel {
  className?: string;
  title: string;
  metadata: JobDetailMetadataModel;
  applyLabel: string;
  applyLink: LinkModel;
  sections: JobDetailSectionModel[];
  sidebarTitle: string;
  relatedJobs: JobDetailSidebarItemModel[];
}

const JobDetail = (model: JobDetailModel) => {
  const title = model.title.trim();
  const metadataItems = [
    { label: "Số lượng cần tuyển:", value: model.metadata.vacancies.trim(), Icon: UserRound },
    { label: "Mức lương:", value: model.metadata.salary.trim(), Icon: HandCoins },
    { label: "Tính chất công việc:", value: model.metadata.employmentType.trim(), Icon: Clock },
    { label: "Hạn ứng tuyển:", value: model.metadata.applicationDeadline.trim(), Icon: CalendarDays },
  ].filter((item) => item.value);
  const applyLabel = model.applyLabel.trim();
  const hasApplyLink = Boolean(applyLabel && model.applyLink.url.trim());
  const sections = model.sections.filter(
    (section) => section.title.trim() && section.items.some((item) => item.trim()),
  );
  const sidebarTitle = model.sidebarTitle.trim();
  const relatedJobs = model.relatedJobs.filter(
    (job) => job.title.trim() && job.link.url.trim(),
  );

  if (
    !title &&
    metadataItems.length === 0 &&
    !hasApplyLink &&
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
          {metadataItems.length > 0 || hasApplyLink ? (
            <div className="job-detail-metadata !mt-5 !mb-8 !grid !grid-cols-1 !items-center !gap-6 !text-base !text-brand-navy md:!grid-cols-[minmax(0,1fr)_auto]">
              {metadataItems.length > 0 ? (
                <ul className="job-detail-metadata-list !m-0 !grid !list-none !grid-cols-1 !gap-x-8 !gap-y-4 !p-0 sm:!grid-cols-2">
                  {metadataItems.map(({ label, value, Icon }) => (
                    <li key={label} className="job-detail-metadata-item !flex !items-start !gap-2">
                      <Icon className="job-detail-metadata-icon !mt-0.5 !h-5 !w-5 !shrink-0 !text-brand-navy" aria-hidden="true" />
                      <span>
                        {label} <strong className="!font-bold">{value}</strong>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {hasApplyLink ? (
                <Link
                  {...model.applyLink}
                  className={cn(
                    "job-detail-apply-button !border !border-brand-navy !bg-transparent !px-8 !py-3 !text-center !text-base !uppercase !text-brand-navy !no-underline !transition-colors",
                    "hover:!bg-brand-navy hover:!text-brand-white",
                    model.applyLink.className,
                  )}
                >
                  {applyLabel}
                </Link>
              ) : null}
            </div>
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

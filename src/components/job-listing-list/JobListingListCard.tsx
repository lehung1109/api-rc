import { Clock, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import type { JobListingListItemModel } from "@/lib/job-listing-list/types";

import Link from "../link/Link";
import Media from "../media/Media";

export interface JobListingListCardModel extends JobListingListItemModel {
  className?: string;
}

const JobListingListCard = (model: JobListingListCardModel) => {
  const {
    image,
    title,
    link,
    statusLabel,
    employmentType,
    location,
    description,
    className,
  } = model;

  const titleText = title.trim();
  const statusText = statusLabel?.trim() ?? "";
  const employmentText = employmentType?.trim() ?? "";
  const locationText = location?.trim() ?? "";
  const descriptionText = description.trim();

  return (
    <li
      className={cn(
        "job-listing-list-item-wrap !min-w-0 !border-b !border-brand-navy/15 !pb-8 !last:border-b-0 !last:pb-0",
        className,
      )}
    >
      <article className="job-listing-list-item !flex !min-w-0 !flex-row !gap-5">
        <div className="job-listing-list-item-media !relative !aspect-[250/200] !w-[250px] !max-w-[40%] !shrink-0 !overflow-hidden">
          <Media
            {...image}
            className={cn(
              "job-listing-list-item-image !h-full !w-full !object-cover",
              image.className,
            )}
          />
        </div>

        <div className="job-listing-list-item-body !flex !min-w-0 !flex-1 !flex-col !gap-3">
          {titleText ? (
            <div className="job-listing-list-item-header !flex !min-w-0 !items-start !justify-between !gap-3">
              <h3 className="job-listing-list-item-title !m-0 !min-w-0 !flex-1 !text-base !font-bold !uppercase !leading-snug !text-brand-navy md:!text-lg">
                <Link
                  {...link}
                  className={cn(
                    "job-listing-list-item-title-link !text-inherit !no-underline hover:!text-brand-gold-hover",
                    link.className,
                  )}
                >
                  {titleText}
                </Link>
              </h3>
              {statusText ? (
                <span className="job-listing-list-item-status !shrink-0 !text-base !font-bold !text-brand-gold">
                  {statusText}
                </span>
              ) : null}
            </div>
          ) : null}

          {employmentText || locationText ? (
            <div className="job-listing-list-item-meta !flex !min-w-0 !flex-wrap !items-center !gap-x-4 !gap-y-2 !text-base !text-brand-navy/90">
              {employmentText ? (
                <p className="job-listing-list-item-meta-employment !m-0 !flex !items-center !gap-1.5">
                  <Clock
                    className="job-listing-list-item-meta-icon !h-4 !w-4 !shrink-0"
                    aria-hidden="true"
                  />
                  <span>{employmentText}</span>
                </p>
              ) : null}
              {locationText ? (
                <p className="job-listing-list-item-meta-location !m-0 !flex !items-center !gap-1.5">
                  <MapPin
                    className="job-listing-list-item-meta-icon !h-4 !w-4 !shrink-0"
                    aria-hidden="true"
                  />
                  <span>{locationText}</span>
                </p>
              ) : null}
            </div>
          ) : null}

          {descriptionText ? (
            <p className="job-listing-list-item-description !m-0 !whitespace-pre-line !text-base !leading-relaxed !text-brand-navy/90">
              {descriptionText}
            </p>
          ) : null}
        </div>
      </article>
    </li>
  );
};

export default JobListingListCard;

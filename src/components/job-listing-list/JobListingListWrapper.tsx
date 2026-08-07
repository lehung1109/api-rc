import { cn } from "@/lib/utils";
import type { JobListingListModel } from "@/lib/job-listing-list/types";

import ClientComponentWrapper from "../ClientComponentWrapper";
import JobListingList from "./JobListingList";

export type { JobListingListModel };

const isValidItem = (
  item: JobListingListModel["items"][number],
): boolean =>
  Boolean(
    item.image?.url?.trim() &&
      item.title?.trim() &&
      item.link?.url?.trim(),
  );

const JobListingListWrapper = (model: JobListingListModel) => {
  const { className, items, totalPages } = model;

  const hasItems = items.some(isValidItem);

  if (!hasItems && totalPages < 1) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("job-listing-list-root", className)}
      type="jobListingList"
      hydrateData={model}
    >
      <JobListingList {...model} />
    </ClientComponentWrapper>
  );
};

export default JobListingListWrapper;

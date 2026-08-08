import { cn } from "@/lib/utils";
import type { NewsListModel } from "@/lib/news-list/types";

import ClientComponentWrapper from "../ClientComponentWrapper";
import NewsList from "./NewsList";

export type { NewsListModel };

const NewsListWrapper = (model: NewsListModel) => {
  const hasItems = model.items.some(
    (item) =>
      Boolean(
        item.image?.url?.trim() &&
          item.title?.trim() &&
          item.link?.url?.trim(),
      ),
  );

  if (!hasItems && model.totalPages < 1) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("news-list-root", model.className)}
      type="newsList"
      hydrateData={model}
    >
      <NewsList {...model} />
    </ClientComponentWrapper>
  );
};

export default NewsListWrapper;

import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import TableOfContents, {
  type TableOfContentsItemModel,
  type TableOfContentsModel,
} from "./TableOfContents";

export type { TableOfContentsItemModel, TableOfContentsModel };

const TableOfContentsWrapper = (model: TableOfContentsModel) => {
  if (model.items.length === 0) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("table-of-contents-root", model.className)}
      type="tableOfContents"
      hydrateData={model}
    >
      <TableOfContents {...model} />
    </ClientComponentWrapper>
  );
};

export default TableOfContentsWrapper;

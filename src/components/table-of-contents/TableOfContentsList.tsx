import { cn } from "@/lib/utils";
import type { TableOfContentsItemModel } from "./TableOfContents";

export interface TableOfContentsList {
  listId?: string;
  /** DOM target id without # */
  listHeightClass?: string;
  items?: TableOfContentsItemModel[];
  onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const TableOfContentsList = (model: TableOfContentsList) => {
  const { listId, listHeightClass, items, onAnchorClick } = model;

  return (
    <ol
      id={listId}
      className={cn(
        "table-of-contents-list mt-3 list-decimal overflow-y-auto pl-5 text-sm",
        listHeightClass,
      )}
    >
      {items?.map((item) => (
        <li key={item.targetId} className="table-of-contents-item py-1">
          <a
            href={`#${item.targetId}`}
            className="table-of-contents-link text-[#333333] hover:text-[#f36f21]"
            onClick={onAnchorClick}
          >
            {item.label}
          </a>

          {item.items && (
            <TableOfContentsList
              items={item.items}
              onAnchorClick={onAnchorClick}
            />
          )}
        </li>
      ))}
    </ol>
  );
};
export default TableOfContentsList;

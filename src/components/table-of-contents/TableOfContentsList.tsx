import { ChevronRight } from "lucide-react";
import { useId } from "react";

import { cn } from "@/lib/utils";
import type { TableOfContentsItemModel } from "./TableOfContents";

export interface TableOfContentsList {
  listId?: string;
  /** DOM target id without # */
  listHeightClass?: string;
  items: TableOfContentsItemModel[];
  activeTargetId: string | undefined;
  nested?: boolean;
  onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function hasActiveDescendant(
  items: TableOfContentsItemModel[],
  activeTargetId?: string,
): boolean {
  if (!activeTargetId) return false;
  return items.some(
    (item) =>
      item.targetId === activeTargetId ||
      (item.items?.length && hasActiveDescendant(item.items, activeTargetId)),
  );
}

const TableOfContentsList = (model: TableOfContentsList) => {
  const {
    listId,
    listHeightClass,
    items,
    activeTargetId,
    nested,
    onAnchorClick,
  } = model;
  const instanceId = useId();

  return (
    <ol
      id={listId}
      className={cn(
        "table-of-contents-list !mb-4",
        nested
          ? "table-of-contents-list--nested !hidden !w-full !py-0 !px-4 peer-checked/branch:!block"
          : cn("!mt-3 !overflow-y-auto !py-0 !px-4", listHeightClass),
      )}
    >
      {items.map((item, index) => {
        const hasChildren = Boolean(item.items?.length);
        const isLinkActive = item.targetId === activeTargetId;
        const isItemActive =
          isLinkActive ||
          (hasChildren &&
            item.items &&
            hasActiveDescendant(item.items, activeTargetId));
        const branchId = `${instanceId}-branch-${index}`;

        return (
          <li
            key={item.targetId}
            className={cn(
              "table-of-contents-item !relative !z-10 !block !py-0 !px-4 !transition-[color] !duration-500",
              hasChildren &&
                "table-of-contents-item--has-children group/branch",
              hasChildren &&
                "has-[:checked]:[&_.table-of-contents-branch-chevron]:!rotate-90",
              isItemActive && "table-of-contents-item--active",
            )}
          >
            {hasChildren ? (
              <>
                <input
                  id={branchId}
                  type="checkbox"
                  className="table-of-contents-branch-input peer/branch !sr-only"
                  defaultChecked
                />
                <div className="table-of-contents-link-wrap !relative !block !min-w-0 !w-full">
                  <label
                    htmlFor={branchId}
                    className="table-of-contents-branch-toggle !absolute !top-2.5 !right-[calc(100%-30px)] !left-auto !shrink-0 !translate-y-0 !cursor-pointer !p-0.5 opacity-30 hover:!opacity-100"
                    aria-label={`Thu gọn hoặc mở rộng ${item.label}`}
                  >
                    <ChevronRight
                      className="table-of-contents-branch-chevron !hidden !h-auto !w-6 !transition-transform"
                      aria-hidden
                    />
                  </label>
                  <a
                    href={`#${item.targetId}`}
                    className={cn(
                      "table-of-contents-link !relative !block !w-full !py-2.5 !pr-2.5 pl-[50px] !font-bold",
                      isLinkActive && "table-of-contents-link--active",
                    )}
                    aria-current={isLinkActive ? "location" : undefined}
                    onClick={onAnchorClick}
                  >
                    {item.label}
                  </a>
                </div>
                <TableOfContentsList
                  items={item.items ?? []}
                  activeTargetId={activeTargetId}
                  onAnchorClick={onAnchorClick}
                  nested
                />
              </>
            ) : (
              <div className="table-of-contents-link-wrap !relative !block !w-full">
                <a
                  href={`#${item.targetId}`}
                  className={cn(
                    "table-of-contents-link !relative !block !w-full !py-2.5 !pr-2.5 pl-[50px] !font-bold",
                    isLinkActive && "table-of-contents-link--active",
                  )}
                  aria-current={isLinkActive ? "location" : undefined}
                  onClick={onAnchorClick}
                >
                  {item.label}
                </a>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
};
export default TableOfContentsList;

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
        "table-of-contents-list",
        nested
          ? "table-of-contents-list--nested hidden w-full peer-checked/branch:block"
          : cn("mt-3 overflow-y-auto", listHeightClass),
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
              "table-of-contents-item py-1",
              hasChildren &&
                "table-of-contents-item--has-children group/branch",
              hasChildren &&
                "has-[:checked]:[&_.table-of-contents-branch-chevron]:rotate-90",
              isItemActive && "table-of-contents-item--active",
            )}
          >
            {hasChildren ? (
              <>
                <input
                  id={branchId}
                  type="checkbox"
                  className="table-of-contents-branch-input peer/branch sr-only"
                  defaultChecked
                />
                <div className="flex min-w-0 flex-1 items-start gap-1">
                  <label
                    htmlFor={branchId}
                    className="table-of-contents-branch-toggle shrink-0 p-0.5"
                    aria-label={`Thu gọn hoặc mở rộng ${item.label}`}
                  >
                    <ChevronRight
                      className="table-of-contents-branch-chevron h-4 w-4 transition-transform"
                      aria-hidden
                    />
                  </label>
                  <a
                    href={`#${item.targetId}`}
                    className={cn(
                      "table-of-contents-link flex-1",
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
              <div className="flex flex-1 items-start gap-1 pl-5">
                <a
                  href={`#${item.targetId}`}
                  className={cn(
                    "table-of-contents-link flex-1",
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

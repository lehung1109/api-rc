"use client";

import { ChevronDownIcon, ListTree } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface TableOfContentsItemModel {
  label: string;
  /** DOM target id without # */
  targetId: string;
}

export interface TableOfContentsModel {
  className?: string;
  title: string;
  items: TableOfContentsItemModel[];
  /** Default 60 — top offset when scrolling to anchor */
  scrollOffset?: number;
  /** Default 500 — max height of the list */
  maxHeight?: number;
}

const TableOfContents = (model: TableOfContentsModel) => {
  const { title, items, scrollOffset, className, maxHeight = 500 } = model;

  const validItems = items.filter(
    (item) => item.label.trim() && item.targetId.trim(),
  );

  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [listOpen, setListOpen] = useState(true);
  const [isPast, setIsPast] = useState(false);
  const [stickyExpanded, setStickyExpanded] = useState(false);
  const listId = useId();

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const nav = navRef.current;
    if (!nav) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // reset nav height
        nav.style.removeProperty("height");
        const tocHeight = nav.getBoundingClientRect().height;
        setListOpen(true);

        const entry = entries[0];

        if (!entry) return;
        const past = !entry.isIntersecting;

        setIsPast(past);

        if (past) {
          nav.style.height = `${tocHeight}px`;
          setStickyExpanded(false);
          setListOpen(false);
        } else {
          setListOpen(true);
        }
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  if (validItems.length === 0) {
    return null;
  }

  const showList = !isPast || stickyExpanded;
  const isStickyCompact = isPast && !stickyExpanded;
  const isStickyExpanded = isPast && stickyExpanded;

  const panelClasses = cn(
    "table-of-contents-panel",
    isPast
      ? "fixed right-4 md:right-6 top-1/2 z-40 -translate-y-1/2 rounded-lg border border-[#eeeeee] bg-white p-0 shadow-md"
      : "relative max-w-xs",
    isStickyCompact && "table-of-contents--sticky-compact",
    isStickyExpanded &&
      "table-of-contents--sticky-expanded p-4 w-[250px] h-[100dvh] z-1000",
  );

  const listHeightClass = isStickyExpanded
    ? "max-h-[100dvh]"
    : `max-h-[${maxHeight}px]`;

  const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id =
      new URL(e.currentTarget.href, window.location.origin).hash.slice(1) ||
      e.currentTarget.getAttribute("href")?.replace(/^#/, "");
    const el = id ? document.getElementById(id) : null;
    if (!el) return;

    const offset = scrollOffset ?? 60;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    window.scrollTo({ top, behavior });
  };

  const titleGroupClassName =
    "table-of-contents-title-group flex min-w-0 flex-1 items-center gap-2 text-left" +
    (isStickyCompact ? " p-4" : "");

  return (
    <nav
      aria-label={title}
      className={cn(
        "table-of-contents relative height-[var(--toc-height)]",
        className,
      )}
      ref={navRef}
    >
      <div
        ref={sentinelRef}
        className="table-of-contents-sentinel h-full w-full absolute top-0 left-0"
        aria-hidden
      />

      <div className={panelClasses}>
        <div className="table-of-contents-header flex items-center justify-between gap-2">
          {
            <button
              type="button"
              className={titleGroupClassName}
              aria-expanded={stickyExpanded}
              onClick={() => {
                setStickyExpanded(!stickyExpanded);
                setListOpen(!listOpen);
              }}
            >
              <div className="flex items-center gap-2">
                <ListTree
                  className="h-5 w-5 shrink-0 text-[#f36f21]"
                  aria-hidden
                />
                <span
                  className={`table-of-contents-title truncate font-bold ${isStickyCompact ? "hidden" : ""}`}
                >
                  {title}
                </span>
              </div>

              <ChevronDownIcon
                className={cn(
                  "h-5 w-5 transition-transform",
                  listOpen && "rotate-180",
                  isStickyCompact && "hidden",
                )}
              />
            </button>
          }
        </div>

        {listOpen && showList && (
          <ol
            id={listId}
            className={cn(
              "table-of-contents-list mt-3 list-decimal overflow-y-auto pl-5 text-sm",
              listHeightClass,
            )}
          >
            {validItems.map((item) => (
              <li key={item.targetId} className="table-of-contents-item py-1">
                <a
                  href={`#${item.targetId}`}
                  className="table-of-contents-link text-[#333333] hover:text-[#f36f21]"
                  onClick={onAnchorClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </nav>
  );
};

export default TableOfContents;

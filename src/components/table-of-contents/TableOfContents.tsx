"use client";

import { ChevronDownIcon, ListOrdered, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import TableOfContentsList from "./TableOfContentsList";

function flattenTargetIds(items: TableOfContentsItemModel[]): string[] {
  const ids: string[] = [];
  for (const item of items) {
    if (item.targetId.trim()) ids.push(item.targetId);
    if (item.items?.length) ids.push(...flattenTargetIds(item.items));
  }
  return ids;
}

export interface TableOfContentsItemModel {
  label: string;
  /** DOM target id without # */
  targetId: string;
  items?: TableOfContentsItemModel[];
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

  const validItems = useMemo(
    () => items.filter((item) => item.label.trim() && item.targetId.trim()),
    [items],
  );

  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [listOpen, setListOpen] = useState(true);
  const [isPast, setIsPast] = useState(false);
  const [stickyExpanded, setStickyExpanded] = useState(false);
  const [activeTargetId, setActiveTargetId] = useState<string>();
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

  useEffect(() => {
    const ids = flattenTargetIds(validItems);
    if (ids.length === 0) return;

    const offset = scrollOffset ?? 60;
    let rafId: number | null = null;

    const updateActive = () => {
      let active: string | undefined = undefined;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) active = id;
        else break;
      }
      setActiveTargetId(active);
    };

    const onScrollOrResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [validItems, scrollOffset]);

  if (validItems.length === 0) {
    return null;
  }

  const showList = !isPast || stickyExpanded;
  const isStickyCompact = isPast && !stickyExpanded;
  const isStickyExpanded = isPast && stickyExpanded;

  const panelClasses = cn(
    "table-of-contents-panel",
    isPast
      ? "fixed right-4 md:right-6 top-1/2 z-40 -translate-y-1/2 rounded-lg border border-brand-white-hover bg-brand-white p-0 shadow-md"
      : "relative",
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
    (isStickyCompact ? " p-4" : "") +
    (isStickyExpanded ? " justify-between" : "");

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
                <ListOrdered
                  className="h-5 w-5 shrink-0 text-brand-gold"
                  aria-hidden
                />
                <span
                  className={`table-of-contents-title truncate font-bold ${isStickyCompact ? "hidden" : ""}`}
                >
                  {title}
                </span>
              </div>

              {isStickyExpanded ? (
                <X className="h-5 w-5 transition-transform" />
              ) : (
                <ChevronDownIcon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    listOpen && "rotate-180",
                    isStickyCompact && "hidden",
                  )}
                />
              )}
            </button>
          }
        </div>

        {listOpen && showList && (
          <TableOfContentsList
            listId={listId}
            listHeightClass={listHeightClass}
            items={validItems}
            activeTargetId={activeTargetId}
            onAnchorClick={onAnchorClick}
          />
        )}
      </div>
    </nav>
  );
};

export default TableOfContents;

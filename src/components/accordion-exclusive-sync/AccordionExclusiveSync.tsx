"use client";

import { useEffect } from "react";

export interface AccordionExclusiveSyncModel {
  /** CSS selector for the accordion container (scoped within sectionId when set). */
  rootSelector: string;
  /** CSS selector for item checkbox inputs inside the root. */
  inputSelector: string;
  /** Optional section element id to scope the query (multi-instance safe). */
  sectionId?: string;
}

const AccordionExclusiveSync = (model: AccordionExclusiveSyncModel) => {
  const { rootSelector, inputSelector, sectionId } = model;

  useEffect(() => {
    const scope: ParentNode =
      (sectionId ? document.getElementById(sectionId) : null) ?? document;
    const root = scope.querySelector(rootSelector);
    if (!root) {
      return;
    }

    const onChange = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) {
        return;
      }
      if (!target.matches(inputSelector)) {
        return;
      }
      if (!target.checked) {
        return;
      }

      const inputs = root.querySelectorAll<HTMLInputElement>(inputSelector);
      for (const input of inputs) {
        if (input !== target && input.checked) {
          input.checked = false;
        }
      }
    };

    root.addEventListener("change", onChange);

    return () => {
      root.removeEventListener("change", onChange);
    };
  }, [rootSelector, inputSelector, sectionId]);

  return null;
};

export default AccordionExclusiveSync;

"use client";

import { useEffect } from "react";

export interface ConstructionHeaderScrollMonitorModel {
  stickyAfterPx: number;
  targetId: string;
}

const ConstructionHeaderScrollMonitor = (
  model: ConstructionHeaderScrollMonitorModel,
) => {
  const { stickyAfterPx, targetId } = model;

  useEffect(() => {
    const updateScrolled = () => {
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      if (window.scrollY >= stickyAfterPx) {
        target.dataset.scrolled = "true";
      } else {
        delete target.dataset.scrolled;
      }
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolled);
    };
  }, [stickyAfterPx, targetId]);

  return null;
};

export default ConstructionHeaderScrollMonitor;

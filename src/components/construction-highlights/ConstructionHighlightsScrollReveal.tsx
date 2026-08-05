"use client";

import { useEffect } from "react";

export interface ConstructionHighlightsScrollRevealModel {
  targetId: string;
}

const ConstructionHighlightsScrollReveal = (
  model: ConstructionHighlightsScrollRevealModel,
) => {
  const { targetId } = model;

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          target.dataset.inView = "true";
          observer.unobserve(target);
          break;
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetId]);

  return null;
};

export default ConstructionHighlightsScrollReveal;

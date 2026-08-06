"use client";

import { useEffect } from "react";

export interface VisionMissionScrollRevealModel {
  targetId: string;
}

const VisionMissionScrollReveal = (model: VisionMissionScrollRevealModel) => {
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

export default VisionMissionScrollReveal;

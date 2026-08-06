import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export interface DirectorProfileItemModel {
  title: string;
  description: string;
}

export interface DirectorProfileItemProps extends DirectorProfileItemModel {
  className?: string;
  style?: CSSProperties;
}

const DirectorProfileItem = (model: DirectorProfileItemProps) => {
  const { title, description, className, style } = model;
  const titleText = title.trim();
  const descriptionText = description.trim();

  if (!titleText && !descriptionText) {
    return null;
  }

  return (
    <article
      className={cn(
        "director-profile-item border border-brand-white p-4 text-center md:p-5",
        className,
      )}
      style={style}
    >
      {titleText ? (
        <h3 className="director-profile-item-title mb-0 text-base font-bold leading-snug text-brand-white md:text-lg">
          {titleText}
        </h3>
      ) : null}
      {descriptionText ? (
        <p
          className={cn(
            "director-profile-item-description mb-0 text-base leading-relaxed text-brand-white",
            titleText && "mt-2",
          )}
        >
          {descriptionText}
        </p>
      ) : null}
    </article>
  );
};

export default DirectorProfileItem;

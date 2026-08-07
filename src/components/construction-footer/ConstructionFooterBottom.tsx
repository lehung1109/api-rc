import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface ConstructionFooterBottomModel {
  className?: string;
  copyright: string;
  badge?: MediaModel;
}

const ConstructionFooterBottom = (model: ConstructionFooterBottomModel) => {
  const { className, copyright, badge } = model;

  const copyrightText = copyright.trim();
  const hasBadge = Boolean(badge?.url.trim());

  if (!copyrightText && !hasBadge) {
    return null;
  }

  return (
    <div
      className={cn(
        "construction-footer-bottom !flex !w-full !flex-wrap !items-center !justify-between !gap-4",
        className,
      )}
    >
      {copyrightText ? (
        <p className="construction-footer-copyright !text-left !text-base !text-brand-navy">
          {copyrightText}
        </p>
      ) : (
        <span />
      )}
      {hasBadge && badge ? (
        <Media
          {...badge}
          className={cn(
            "construction-footer-badge !h-auto !w-auto !max-h-8",
            badge.className,
          )}
        />
      ) : null}
    </div>
  );
};

export default ConstructionFooterBottom;

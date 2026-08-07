import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface ConstructionFooterBrandModel {
  className?: string;
  logo: MediaModel;
}

const ConstructionFooterBrand = (model: ConstructionFooterBrandModel) => {
  const { className, logo } = model;

  if (!logo.url.trim()) {
    return null;
  }

  return (
    <div
      className={cn(
        "construction-footer-brand !flex !flex-col !items-center",
        className,
      )}
    >
      <Media
        {...logo}
        className={cn(
          "construction-footer-logo !mx-auto !h-auto !w-auto !max-w-[220px]",
          logo.className,
        )}
      />
    </div>
  );
};

export default ConstructionFooterBrand;

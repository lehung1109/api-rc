import { cn } from "@/lib/utils";

export interface ConstructionHeaderTopModel {
  hotlineText: string;
  className?: string;
}

const ConstructionHeaderTop = (model: ConstructionHeaderTopModel) => {
  const { hotlineText, className } = model;

  return (
    <div
      className={cn(
        "construction-header-top relative z-20 hidden w-full border-b border-brand-white md:block",
        "group-data-[scrolled=true]/construction-header:hidden",
        className,
      )}
    >
      <div className="px-[30px] py-2">
        <p className="construction-header-top-hotline mbe-0! text-right text-sm text-brand-white">
          {hotlineText}
        </p>
      </div>
    </div>
  );
};

export default ConstructionHeaderTop;

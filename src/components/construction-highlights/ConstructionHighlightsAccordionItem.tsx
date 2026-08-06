import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface ConstructionHighlightsItemModel {
  title: string;
  contentHtml: string;
  iconImage?: MediaModel;
  defaultOpen?: boolean;
}

export interface ConstructionHighlightsAccordionItemModel
  extends ConstructionHighlightsItemModel {
  checkboxId: string;
  className?: string;
}

const ConstructionHighlightsAccordionItem = (
  model: ConstructionHighlightsAccordionItemModel,
) => {
  const {
    title,
    contentHtml,
    iconImage,
    defaultOpen = false,
    checkboxId,
    className,
  } = model;

  const titleText = title.trim();
  const content = contentHtml.trim();
  const iconUrl = iconImage?.url.trim() ?? "";
  const hasIcon = Boolean(iconUrl);

  if (!titleText) {
    return null;
  }

  return (
    <div
      className={cn("construction-highlights-item", className)}
    >
      <input
        id={checkboxId}
        type="checkbox"
        className="construction-highlights-item-input peer/acc sr-only"
        defaultChecked={defaultOpen}
      />
      <label
        htmlFor={checkboxId}
        className={cn(
          "construction-highlights-item-trigger flex cursor-pointer items-center gap-4 py-4",
          "opacity-50 transition-opacity duration-300",
          "hover:opacity-80",
          "peer-checked/acc:opacity-100",
        )}
      >
        {hasIcon && iconImage ? (
          <span
            className={cn(
              "construction-highlights-item-icon block shrink-0 overflow-hidden",
              "aspect-square size-10 md:size-[70px]",
            )}
          >
            <Media
              {...iconImage}
              className="h-full w-full object-contain"
            />
          </span>
        ) : null}
        <span
          className={cn(
            "construction-highlights-item-title min-w-0 flex-1",
            "text-2xl font-bold leading-snug text-justify text-brand-white",
            "md:text-[25px] md:leading-tight",
          )}
        >
          {titleText}
        </span>
      </label>
      {content ? (
        <div
          className={cn(
            "construction-highlights-item-content-shell grid grid-rows-[0fr]",
            "transition-[grid-template-rows] duration-300 ease-out",
            "peer-checked/acc:grid-rows-[1fr]",
            "motion-reduce:transition-none",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={cn(
                "construction-highlights-item-content pb-5 text-base leading-relaxed",
                "text-justify text-brand-white",
                "[&_p]:mb-2 [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-5",
                "[&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:list-disc",
                hasIcon && "md:pl-[86px]",
              )}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ConstructionHighlightsAccordionItem;

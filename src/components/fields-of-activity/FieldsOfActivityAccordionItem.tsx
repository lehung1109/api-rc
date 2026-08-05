import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface FieldsOfActivityItemModel {
  title: string;
  contentHtml: string;
  iconImage?: MediaModel;
  defaultOpen?: boolean;
}

export interface FieldsOfActivityAccordionItemModel
  extends FieldsOfActivityItemModel {
  checkboxId: string;
  className?: string;
}

const FieldsOfActivityAccordionItem = (
  model: FieldsOfActivityAccordionItemModel,
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
      className={cn(
        "fields-of-activity-item group/acc overflow-visible border-b border-brand-navy/20",
        className,
      )}
    >
      <input
        id={checkboxId}
        type="checkbox"
        className="fields-of-activity-item-input peer/acc sr-only"
        defaultChecked={defaultOpen}
      />
      <label
        htmlFor={checkboxId}
        className={cn(
          "fields-of-activity-item-trigger flex cursor-pointer items-start gap-3 overflow-visible py-4",
          "text-brand-navy transition-[color,padding] duration-200",
          "hover:text-brand-gold",
          "peer-checked/acc:text-brand-gold",
          hasIcon && "peer-checked/acc:pt-14",
          "peer-checked/acc:[&_.fields-of-activity-item-icon]:block",
          "peer-checked/acc:[&_.fields-of-activity-item-chevron]:rotate-180",
        )}
      >
        <div className="fields-of-activity-item-heading relative min-w-0 flex-1 overflow-visible">
          {hasIcon && iconImage ? (
            <Media
              {...iconImage}
              className={cn(
                "fields-of-activity-item-icon absolute bottom-full right-full mb-2 hidden h-10 w-10 max-w-none object-contain",
              )}
            />
          ) : null}
          <span className="fields-of-activity-item-title block text-xl font-bold leading-snug md:text-2xl">
            {titleText}
          </span>
        </div>
        <ChevronDown
          className="fields-of-activity-item-chevron mt-1 h-6 w-6 shrink-0 transition-transform duration-200"
          aria-hidden
        />
      </label>
      {content ? (
        <div
          className={cn(
            "fields-of-activity-item-content hidden pb-4 text-base leading-relaxed text-brand-navy",
            "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
            "[&_li]:list-disc",
            "peer-checked/acc:block",
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : null}
    </div>
  );
};

export default FieldsOfActivityAccordionItem;

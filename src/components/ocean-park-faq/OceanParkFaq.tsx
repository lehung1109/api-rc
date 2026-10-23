import { ChevronDown, HelpCircle, Tag } from "lucide-react";

import { cn } from "@/lib/utils";
import AccordionExclusiveSync, {
  type AccordionExclusiveSyncModel,
} from "../accordion-exclusive-sync/AccordionExclusiveSync";
import ClientComponentWrapper from "../ClientComponentWrapper";

export interface OceanParkFaqItemModel {
  question: string;
  answerHtml: string;
  defaultOpen?: boolean;
}

export interface OceanParkKeywordPillModel {
  label: string;
  url: string;
}

export interface OceanParkFaqModel {
  className?: string;
  sectionId?: string;
  checkboxIdPrefix?: string;
  eyebrow: string;
  title: string;
  description: string;
  items: OceanParkFaqItemModel[];
  keywordGroupTitle: string;
  keywordPills: OceanParkKeywordPillModel[];
}

const DEFAULT_SECTION_ID = "ocean-park-faq";

const OceanParkFaq = (model: OceanParkFaqModel) => {
  const {
    className,
    sectionId,
    checkboxIdPrefix,
    eyebrow,
    title,
    description,
    items,
    keywordGroupTitle,
    keywordPills,
  } = model;

  const eyebrowText = (eyebrow ?? "").trim();
  const titleText = (title ?? "").trim();
  const descText = (description ?? "").trim();
  const keywordTitleText = (keywordGroupTitle ?? "").trim();

  const validItems = (items ?? []).filter(
    (item) =>
      Boolean(item) &&
      (item.question ?? "").trim().length > 0 &&
      (item.answerHtml ?? "").trim().length > 0,
  );
  const validPills = (keywordPills ?? []).filter(
    (pill) =>
      Boolean(pill) &&
      (pill.label ?? "").trim().length > 0 &&
      (pill.url ?? "").trim().length > 0,
  );

  if (
    !eyebrowText &&
    !titleText &&
    validItems.length === 0 &&
    validPills.length === 0
  ) {
    return null;
  }

  const resolvedSectionId = (sectionId ?? "").trim() || DEFAULT_SECTION_ID;
  const resolvedCheckboxPrefix =
    (checkboxIdPrefix ?? "").trim() || `${resolvedSectionId}-item`;
  const firstOpenIndex = validItems.findIndex((item) => item.defaultOpen);
  const resolvedOpenIndex = firstOpenIndex >= 0 ? firstOpenIndex : 0;
  const exclusiveSyncModel: AccordionExclusiveSyncModel = {
    rootSelector: ".ocean-park-faq-accordion",
    inputSelector: ".ocean-park-faq-item-input",
    sectionId: resolvedSectionId,
  };

  return (
    <section
      id={resolvedSectionId}
      className={cn(
        "ocean-park-faq !w-full !bg-brand-white !px-4 !py-12 !text-brand-navy md:!px-6 md:!py-16 lg:!py-20",
        className,
      )}
    >
      <div className="ocean-park-faq-inner !mx-auto !w-full !max-w-5xl">
        <div className="ocean-park-faq-header !mx-auto !max-w-4xl !text-center">
          {eyebrowText ? (
            <p className="ocean-park-faq-eyebrow !mb-3 !inline-flex !items-center !gap-2 !rounded-full !border !border-brand-gold/45 !bg-brand-gold/10 !px-4 !py-1.5 !text-sm !font-bold !uppercase !tracking-widest !text-brand-gold md:!text-base">
              <HelpCircle
                className="!h-4 !w-4 !shrink-0"
                aria-hidden="true"
              />
              <span>{eyebrowText}</span>
            </p>
          ) : null}

          {titleText ? (
            <h2 className="ocean-park-faq-title !mt-1 !mb-0 !text-2xl !font-bold !leading-tight !text-brand-navy md:!text-3xl lg:!text-4xl">
              {titleText}
            </h2>
          ) : null}

          {descText ? (
            <p className="ocean-park-faq-desc !mt-4 !mb-0 !text-base !leading-relaxed !text-brand-navy/80 md:!text-lg">
              {descText}
            </p>
          ) : null}
        </div>

        {validItems.length > 0 ? (
          <div className="ocean-park-faq-accordion !mt-8 !space-y-4 md:!mt-10">
            {validItems.map((item, index) => {
              const checkboxId = `${resolvedCheckboxPrefix}-${index}`;
              const isDefaultOpen = index === resolvedOpenIndex;
              const numberBadge = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={`${item.question}-${index}`}
                  className="ocean-park-faq-item group/faq !overflow-hidden !rounded-2xl !border !border-brand-navy/15 !bg-brand-white !shadow-md !transition-colors hover:!border-brand-gold/60"
                >
                  <input
                    id={checkboxId}
                    type="checkbox"
                    className="ocean-park-faq-item-input peer/faq !sr-only"
                    defaultChecked={isDefaultOpen}
                  />
                  <label
                    htmlFor={checkboxId}
                    className={cn(
                      "ocean-park-faq-item-trigger !flex !cursor-pointer !items-start !justify-between !gap-4 !p-5 !text-brand-navy !transition-colors md:!p-6",
                      "hover:!text-brand-gold",
                      "peer-checked/faq:!border-b peer-checked/faq:!border-brand-navy/10 peer-checked/faq:!bg-brand-navy peer-checked/faq:!text-brand-gold",
                      "peer-checked/faq:[&_.ocean-park-faq-badge]:!bg-brand-gold peer-checked/faq:[&_.ocean-park-faq-badge]:!text-brand-white",
                      "peer-checked/faq:[&_.ocean-park-faq-chevron]:!rotate-180",
                    )}
                  >
                    <span className="!flex !min-w-0 !flex-1 !items-start !gap-3.5">
                      <span className="ocean-park-faq-badge !mt-0.5 !inline-flex !h-7 !w-7 !shrink-0 !items-center !justify-center !rounded-full !bg-brand-navy/10 !text-sm !font-bold !text-brand-navy !transition-colors">
                        {numberBadge}
                      </span>
                      <span className="ocean-park-faq-question !text-base !font-bold !leading-snug md:!text-lg">
                        {item.question}
                      </span>
                    </span>
                    <ChevronDown
                      className="ocean-park-faq-chevron !mt-1 !h-5 !w-5 !shrink-0 !transition-transform !duration-200"
                      aria-hidden="true"
                    />
                  </label>

                  <div
                    className={cn(
                      "ocean-park-faq-answer !hidden !bg-brand-white-hover/40 !p-5 !text-base !leading-relaxed !text-brand-navy/90 md:!p-6 md:!text-[17px]",
                      "[&_p]:!mb-3 [&_p:last-child]:!mb-0 [&_p]:!text-base md:[&_p]:!text-[17px] [&_p]:!leading-relaxed [&_p]:!text-brand-navy/90 [&_strong]:!font-bold [&_strong]:!text-brand-navy",
                      "[&_ul]:!mt-2.5 [&_ul]:!list-disc [&_ul]:!space-y-1.5 [&_ul]:!pl-5 [&_li]:!list-disc [&_li]:!text-base md:[&_li]:!text-[17px] [&_li]:!leading-relaxed [&_li]:!text-brand-navy/90",
                      "peer-checked/faq:!block",
                    )}
                    dangerouslySetInnerHTML={{ __html: item.answerHtml.trim() }}
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        {validItems.length > 0 ? (
          <ClientComponentWrapper
            type="accordionExclusiveSync"
            hydrateData={exclusiveSyncModel}
            className="ocean-park-faq-exclusive-sync !hidden"
          >
            <AccordionExclusiveSync {...exclusiveSyncModel} />
          </ClientComponentWrapper>
        ) : null}

        {validPills.length > 0 ? (
          <div className="ocean-park-faq-keywords !mt-10 !rounded-2xl !border !border-brand-navy/15 !bg-brand-white-hover/50 !p-6 md:!mt-12 md:!p-8">
            {keywordTitleText ? (
              <h3 className="ocean-park-faq-keywords-title !mb-4 !flex !items-center !gap-2 !text-sm !font-bold !uppercase !tracking-wider !text-brand-navy md:!text-base">
                <Tag
                  className="!h-4 !w-4 !shrink-0 !text-brand-gold"
                  aria-hidden="true"
                />
                <span>{keywordTitleText}</span>
              </h3>
            ) : null}

            <div className="ocean-park-faq-keyword-pills !flex !flex-wrap !gap-2.5">
              {validPills.map((pill, idx) => (
                <a
                  key={`${pill.label}-${idx}`}
                  href={pill.url}
                  className="ocean-park-keyword-pill !inline-flex !items-center !rounded-full !border !border-brand-navy/20 !bg-brand-white !px-3.5 !py-2 !text-sm !font-medium !text-brand-navy !no-underline !transition-colors hover:!border-brand-gold hover:!bg-brand-navy hover:!text-brand-gold"
                >
                  {pill.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OceanParkFaq;

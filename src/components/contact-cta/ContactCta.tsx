import { cn } from "@/lib/utils";

import { normalizeContactPopupKey } from "../contact-popup/contact-popup-key";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface ContactCtaModel {
  className?: string;
  subtitle: string;
  title: string;
  buttonLabel: string;
  /** Must match a ContactPopup `popupKey` on the page. */
  popupTarget: string;
  image: MediaModel;
  contentBackgroundImage?: MediaModel;
}

const ContactCta = (model: ContactCtaModel) => {
  const {
    className,
    subtitle,
    title,
    buttonLabel,
    popupTarget,
    image,
    contentBackgroundImage,
  } = model;

  const subtitleText = subtitle.trim();
  const titleText = title.trim();
  const label = buttonLabel.trim();
  const targetKey = normalizeContactPopupKey(popupTarget);
  const hasImage = image.url.trim().length > 0;
  const contentBgUrl = contentBackgroundImage?.url?.trim() ?? "";
  const hasContentBg = contentBgUrl.length > 0;

  if (!subtitleText && !titleText && !label && !hasImage) {
    return null;
  }

  return (
    <section
      className={cn(
        "contact-cta w-full bg-brand-white",
        "px-6 py-20 md:px-10",
        className,
      )}
    >
      <div className="contact-cta-inner mx-auto w-full max-w-7xl overflow-hidden">
        <div className="contact-cta-grid grid grid-cols-1 md:grid-cols-2">
          <div
            className={cn(
              "contact-cta-content relative flex flex-col justify-center",
              "bg-brand-navy px-8 py-10 md:px-12 md:py-14 lg:px-16",
            )}
          >
            {hasContentBg && contentBackgroundImage ? (
              <>
                <Media
                  {...contentBackgroundImage}
                  className={cn(
                    "contact-cta-content-background pointer-events-none absolute inset-0 z-0 h-full w-full max-w-none object-cover",
                    contentBackgroundImage.className,
                  )}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-1 bg-brand-navy/65"
                  aria-hidden="true"
                />
              </>
            ) : null}

            <div className="contact-cta-copy relative z-10">
              {subtitleText ? (
                <p className="contact-cta-subtitle mb-0 text-sm font-medium uppercase tracking-[0.12em] text-brand-white">
                  {subtitleText}
                </p>
              ) : null}

              {titleText ? (
                <h2 className="contact-cta-title mt-3 text-2xl font-bold leading-snug text-brand-white md:text-3xl lg:text-[2rem]">
                  {titleText}
                </h2>
              ) : null}

              {label ? (
                <button
                  type="button"
                  {...(targetKey
                    ? { "data-contact-popup-open": targetKey }
                    : {})}
                  className={cn(
                    "contact-cta-button mt-8 inline-flex cursor-pointer items-center justify-center",
                    "border border-brand-white bg-transparent px-8 py-3",
                    "text-base font-bold uppercase tracking-wide text-brand-white",
                    "transition-colors",
                    "hover:bg-brand-white hover:text-brand-navy",
                    "md:mt-10 md:px-10 md:py-3.5",
                  )}
                >
                  {label}
                </button>
              ) : null}
            </div>
          </div>

          {hasImage ? (
            <div className="contact-cta-media min-h-[240px] md:min-h-full">
              <Media
                {...image}
                className={cn(
                  "contact-cta-image h-full w-full max-w-none object-cover",
                  image.className,
                )}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ContactCta;

import { cn } from "@/lib/utils";

import { normalizeContactPopupKey } from "../contact-popup/contact-popup-key";

export type ContactPopupButtonVariant = "white" | "navy";

export interface ContactPopupButtonModel {
  className?: string;
  buttonLabel: string;
  /** Must match a ContactPopup `popupKey` on the page. Blank → nothing rendered. */
  popupTarget: string;
  /** "white" (ghost, nền tối) mặc định; "navy" (nền sáng). */
  variant?: ContactPopupButtonVariant;
}

const VARIANT_CLASSES: Record<ContactPopupButtonVariant, string> = {
  white: cn(
    "!border-brand-white !text-brand-white",
    "hover:!bg-brand-white hover:!text-brand-navy",
  ),
  navy: cn(
    "!border-brand-navy !text-brand-navy",
    "hover:!bg-brand-navy hover:!text-brand-white",
  ),
};

const ContactPopupButton = (model: ContactPopupButtonModel) => {
  const { className, buttonLabel, popupTarget, variant = "white" } = model;

  const label = buttonLabel.trim();
  const popupTargetKey = normalizeContactPopupKey(popupTarget);

  if (!label || !popupTargetKey) {
    return null;
  }

  return (
    <button
      type="button"
      data-contact-popup-open={popupTargetKey}
      className={cn(
        "contact-popup-button !inline-flex !cursor-pointer !items-center !justify-center",
        "!border !bg-transparent !px-8 !py-3",
        "!text-base !font-bold !uppercase !tracking-wide !no-underline",
        "!transition-colors",
        "md:!px-10 md:!py-3.5",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {label}
    </button>
  );
};

export default ContactPopupButton;

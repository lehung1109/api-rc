import { cn } from "@/lib/utils";

import { normalizeContactPopupKey } from "../contact-popup/contact-popup-key";

export interface ContactPopupButtonModel {
  className?: string;
  buttonLabel: string;
  /** Must match a ContactPopup `popupKey` on the page. Blank → nothing rendered. */
  popupTarget: string;
}

const ContactPopupButton = (model: ContactPopupButtonModel) => {
  const { className, buttonLabel, popupTarget } = model;

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
        "!border !border-brand-white !bg-transparent !px-8 !py-3",
        "!text-base !font-bold !uppercase !tracking-wide !text-brand-white !no-underline",
        "!transition-colors",
        "hover:!bg-brand-white hover:!text-brand-navy",
        "md:!px-10 md:!py-3.5",
        className,
      )}
    >
      {label}
    </button>
  );
};

export default ContactPopupButton;

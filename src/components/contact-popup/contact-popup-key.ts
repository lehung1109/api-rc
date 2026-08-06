export const CONTACT_POPUP_CF7_SOURCE_ID_PREFIX = "eai-contact-popup-cf7-source";
export const CONTACT_POPUP_OPEN_EVENT = "ichouse:contact-popup:open";
export const CONTACT_POPUP_OPEN_ATTR = "data-contact-popup-open";

/** Trim, lowercase, keep only [a-z0-9-]. */
export const normalizeContactPopupKey = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const contactPopupCf7SourceId = (popupKey: string): string => {
  const key = normalizeContactPopupKey(popupKey);
  return key ? `${CONTACT_POPUP_CF7_SOURCE_ID_PREFIX}-${key}` : "";
};

export type ContactPopupOpenEventDetail = {
  key: string;
};

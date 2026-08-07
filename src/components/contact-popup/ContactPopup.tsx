"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  CONTACT_POPUP_OPEN_ATTR,
  CONTACT_POPUP_OPEN_EVENT,
  contactPopupCf7SourceId,
  normalizeContactPopupKey,
  type ContactPopupOpenEventDetail,
} from "./contact-popup-key";

export {
  CONTACT_POPUP_CF7_SOURCE_ID_PREFIX,
  CONTACT_POPUP_OPEN_ATTR,
  CONTACT_POPUP_OPEN_EVENT,
  contactPopupCf7SourceId,
  normalizeContactPopupKey,
  type ContactPopupOpenEventDetail,
} from "./contact-popup-key";

export interface ContactPopupModel {
  className?: string;
  /** Shared key linking CTA `popupTarget` to this popup. Required to open. */
  popupKey: string;
  /** Fallback when CF7 source for this key is missing (Vite preview). */
  contentHtml?: string;
}

type Wpcf7Api = {
  init?: (form: HTMLFormElement) => void;
  initForm?: (form: HTMLFormElement) => void;
};

type BodyMode = "cf7" | "fallback" | "empty" | null;

declare global {
  interface Window {
    wpcf7?: Wpcf7Api;
  }
}

const initCf7In = (container: HTMLElement) => {
  const api = window.wpcf7;
  if (!api) {
    return;
  }

  const forms = container.querySelectorAll<HTMLFormElement>("form.wpcf7-form");
  forms.forEach((form) => {
    if ((form as HTMLFormElement & { wpcf7?: unknown }).wpcf7) {
      return;
    }
    if (typeof api.init === "function") {
      api.init(form);
      return;
    }
    if (typeof api.initForm === "function") {
      api.initForm(form);
    }
  });
};

const moveChildren = (from: HTMLElement, to: HTMLElement) => {
  while (from.firstChild) {
    to.appendChild(from.firstChild);
  }
};

const ContactPopup = (model: ContactPopupModel) => {
  const { className, popupKey, contentHtml } = model;
  const key = normalizeContactPopupKey(popupKey);
  const [open, setOpen] = useState(false);
  const [bodyMode, setBodyMode] = useState<BodyMode>(null);
  const formSlotRef = useRef<HTMLDivElement>(null);
  const fallbackHtml = contentHtml?.trim() ?? "";
  const sourceId = key ? contactPopupCf7SourceId(key) : "";

  const handleOpen = useCallback(() => {
    if (!key) {
      return;
    }
    setBodyMode(null);
    setOpen(true);
  }, [key]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!key) {
      return;
    }

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const trigger = target.closest(`[${CONTACT_POPUP_OPEN_ATTR}]`);
      if (!(trigger instanceof Element)) {
        return;
      }
      const triggerKey = normalizeContactPopupKey(
        trigger.getAttribute(CONTACT_POPUP_OPEN_ATTR) ?? "",
      );
      if (triggerKey !== key) {
        return;
      }
      event.preventDefault();
      handleOpen();
    };

    const onOpenEvent = (event: Event) => {
      const detail = (event as CustomEvent<ContactPopupOpenEventDetail>).detail;
      const eventKey = normalizeContactPopupKey(detail?.key ?? "");
      if (eventKey !== key) {
        return;
      }
      handleOpen();
    };

    document.addEventListener("click", onDocumentClick);
    window.addEventListener(CONTACT_POPUP_OPEN_EVENT, onOpenEvent);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener(CONTACT_POPUP_OPEN_EVENT, onOpenEvent);
    };
  }, [handleOpen, key]);

  useEffect(() => {
    if (!open) {
      setBodyMode(null);
      return;
    }

    if (!sourceId) {
      setBodyMode(fallbackHtml.length > 0 ? "fallback" : "empty");
      return;
    }

    const source = document.getElementById(sourceId);
    if (source && source.childNodes.length > 0) {
      setBodyMode("cf7");
      return;
    }

    setBodyMode(fallbackHtml.length > 0 ? "fallback" : "empty");
  }, [open, fallbackHtml, sourceId]);

  useEffect(() => {
    if (!open || bodyMode !== "cf7" || !sourceId) {
      return;
    }

    const slot = formSlotRef.current;
    const source = document.getElementById(sourceId);
    if (!slot || !source) {
      return;
    }

    moveChildren(source, slot);
    initCf7In(slot);

    return () => {
      moveChildren(slot, source);
    };
  }, [open, bodyMode, sourceId]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "!hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  return (
    <div
      className={cn("contact-popup", className)}
      data-contact-popup-key={key || undefined}
    >
      {open ? (
        <div
          className="contact-popup-backdrop !fixed !inset-0 !z-[9999] !flex !items-center !justify-center !bg-brand-navy/50 !p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Liên hệ"
          onClick={handleClose}
        >
          <div
            className="contact-popup-dialog !relative !flex !max-h-[calc(100dvh-2rem)] !w-full !max-w-3xl !flex-col !overflow-hidden !rounded-lg !bg-brand-white !shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contact-popup-header !shrink-0 !px-3 !pt-3 md:!px-4 md:!pt-4">
              <button
                type="button"
                className="contact-popup-close !flex !h-10 !w-10 !cursor-pointer !items-center !justify-center !rounded-full !text-brand-navy !transition-opacity hover:!opacity-70"
                onClick={handleClose}
                aria-label="Đóng"
              >
                <X className="!h-7 !w-7" aria-hidden="true" />
              </button>
            </div>

            <div className="contact-popup-scroll !min-h-0 !flex-1 !overflow-y-auto !px-6 !pb-6 md:!px-10 md:!pb-10">
              {bodyMode === "cf7" ? (
                <div
                  ref={formSlotRef}
                  className="contact-popup-body !text-brand-navy"
                />
              ) : null}

              {bodyMode === "fallback" ? (
                <div
                  className="contact-popup-fallback !text-brand-navy"
                  dangerouslySetInnerHTML={{ __html: fallbackHtml }}
                />
              ) : null}

              {bodyMode === "empty" ? (
                <p className="contact-popup-empty !text-base !text-brand-navy/70">
                  Chưa chọn form
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContactPopup;

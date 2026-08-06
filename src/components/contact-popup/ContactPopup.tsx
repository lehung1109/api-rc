"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const CONTACT_POPUP_CF7_SOURCE_ID = "eai-contact-popup-cf7-source";
export const CONTACT_POPUP_OPEN_EVENT = "ichouse:contact-popup:open";

export interface ContactPopupModel {
  className?: string;
  /** Fallback when `#eai-contact-popup-cf7-source` is missing (Vite preview). */
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
  const { className, contentHtml } = model;
  const [open, setOpen] = useState(false);
  const [bodyMode, setBodyMode] = useState<BodyMode>(null);
  const formSlotRef = useRef<HTMLDivElement>(null);
  const fallbackHtml = contentHtml?.trim() ?? "";

  const handleOpen = useCallback(() => {
    setBodyMode(null);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (target.closest("[data-contact-popup-open]")) {
        event.preventDefault();
        handleOpen();
      }
    };

    const onOpenEvent = () => {
      handleOpen();
    };

    document.addEventListener("click", onDocumentClick);
    window.addEventListener(CONTACT_POPUP_OPEN_EVENT, onOpenEvent);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener(CONTACT_POPUP_OPEN_EVENT, onOpenEvent);
    };
  }, [handleOpen]);

  useEffect(() => {
    if (!open) {
      setBodyMode(null);
      return;
    }

    const source = document.getElementById(CONTACT_POPUP_CF7_SOURCE_ID);
    if (source && source.childNodes.length > 0) {
      setBodyMode("cf7");
      return;
    }

    setBodyMode(fallbackHtml.length > 0 ? "fallback" : "empty");
  }, [open, fallbackHtml]);

  useEffect(() => {
    if (!open || bodyMode !== "cf7") {
      return;
    }

    const slot = formSlotRef.current;
    const source = document.getElementById(CONTACT_POPUP_CF7_SOURCE_ID);
    if (!slot || !source) {
      return;
    }

    moveChildren(source, slot);
    initCf7In(slot);

    return () => {
      moveChildren(slot, source);
    };
  }, [open, bodyMode]);

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
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  return (
    <div className={cn("contact-popup", className)}>
      {open ? (
        <div
          className="contact-popup-backdrop fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Liên hệ"
          onClick={handleClose}
        >
          <div
            className="contact-popup-dialog relative w-full max-w-3xl rounded-lg bg-brand-white p-6 pt-14 shadow-lg md:p-10 md:pt-16"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="contact-popup-close absolute top-3 left-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-brand-navy transition-opacity hover:opacity-70"
              onClick={handleClose}
              aria-label="Đóng"
            >
              <X className="h-7 w-7" aria-hidden="true" />
            </button>

            {bodyMode === "cf7" ? (
              <div
                ref={formSlotRef}
                className="contact-popup-body text-brand-navy"
              />
            ) : null}

            {bodyMode === "fallback" ? (
              <div
                className="contact-popup-fallback text-brand-navy"
                dangerouslySetInnerHTML={{ __html: fallbackHtml }}
              />
            ) : null}

            {bodyMode === "empty" ? (
              <p className="contact-popup-empty text-base text-brand-navy/70">
                Chưa chọn form
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContactPopup;

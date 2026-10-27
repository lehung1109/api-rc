"use client";

import {
  Building2,
  CheckCircle2,
  ChevronDown,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface OceanParkLocationItemModel {
  label: string;
  address: string;
}

export interface OceanParkReferenceLinkModel {
  label: string;
  url: string;
}

export interface OceanParkContactFormModel {
  className?: string;
  sectionId?: string;
  formKey: string;
  eyebrow: string;
  title: string;
  description: string;
  hotline: string;
  zaloPhone: string;
  email: string;
  website: string;
  locations: OceanParkLocationItemModel[];
  referenceLinks: OceanParkReferenceLinkModel[];
  formTitle: string;
  formSubtitle: string;
  zoneOptions: string[];
  submitLabel: string;
  successMessage: string;
}

type Wpcf7Api = {
  init?: (form: HTMLFormElement) => void;
  initForm?: (form: HTMLFormElement) => void;
};

declare global {
  interface Window {
    wpcf7?: Wpcf7Api;
  }
}

export const OCEAN_PARK_CF7_SOURCE_ID_PREFIX = "eai-ocean-park-cf7-source-";

export const normalizeOceanParkFormKey = (raw = ""): string =>
  (raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");

export const oceanParkCf7SourceId = (formKey = ""): string => {
  const normalized = normalizeOceanParkFormKey(formKey);
  return normalized ? `${OCEAN_PARK_CF7_SOURCE_ID_PREFIX}${normalized}` : "";
};

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

const OceanParkContactForm = (model: OceanParkContactFormModel) => {
  const {
    className,
    sectionId,
    formKey,
    eyebrow,
    title,
    description,
    hotline,
    zaloPhone,
    email,
    website,
    locations,
    referenceLinks,
    formTitle,
    formSubtitle,
    zoneOptions,
    submitLabel,
    successMessage,
  } = model;

  const eyebrowText = (eyebrow ?? "").trim();
  const titleText = (title ?? "").trim();
  const descText = (description ?? "").trim();
  const hotlineText = (hotline ?? "").trim();
  const zaloText = (zaloPhone ?? "").trim();
  const emailText = (email ?? "").trim();
  const websiteText = (website ?? "").trim();
  const formTitleText = (formTitle ?? "").trim();
  const formSubtitleText = (formSubtitle ?? "").trim();

  const validLocations = (locations ?? []).filter(
    (loc) =>
      Boolean(loc) &&
      (loc.label ?? "").trim().length > 0 &&
      (loc.address ?? "").trim().length > 0,
  );
  const validReferenceLinks = (referenceLinks ?? []).filter(
    (item) =>
      Boolean(item) &&
      (item.label ?? "").trim().length > 0 &&
      (item.url ?? "").trim().length > 0,
  );
  const validZoneOptions = (zoneOptions ?? [])
    .map((opt) => (typeof opt === "string" ? opt.trim() : ""))
    .filter((opt) => opt.length > 0);

  const normalizedKey = normalizeOceanParkFormKey(formKey);
  const sourceId = oceanParkCf7SourceId(formKey);
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const cf7SlotRef = useRef<HTMLDivElement>(null);
  const [hasCf7Source, setHasCf7Source] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedZone, setSelectedZone] = useState(validZoneOptions[0] ?? "");
  const [apartmentInfo, setApartmentInfo] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const resolvedSectionId = (sectionId ?? "").trim() || "dang-ky-tu-van";

  useEffect(() => {
    const targetHash = `#${resolvedSectionId}`;
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const anchor = target.closest("a");
      if (!anchor) {
        return;
      }
      const href = (anchor.getAttribute("href") ?? "").trim();
      const isSamePageHash =
        href === targetHash ||
        (anchor.hash === targetHash &&
          anchor.origin === window.location.origin &&
          anchor.pathname === window.location.pathname);
      if (!isSamePageHash) {
        return;
      }
      const scrollTarget = formCardRef.current ?? sectionRef.current;
      if (!scrollTarget) {
        return;
      }
      event.preventDefault();
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, "", targetHash);
      }
      scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [resolvedSectionId]);

  useEffect(() => {
    if (!sourceId) {
      setHasCf7Source(false);
      return;
    }
    const source = document.getElementById(sourceId);
    if (source && source.children.length > 0) {
      setHasCf7Source(true);
      return;
    }
    setHasCf7Source(false);
  }, [sourceId]);

  useEffect(() => {
    if (!hasCf7Source || !sourceId) {
      return;
    }
    const slot = cf7SlotRef.current;
    const source = document.getElementById(sourceId);
    if (!slot || !source) {
      return;
    }

    moveChildren(source, slot);
    initCf7In(slot);

    return () => {
      moveChildren(slot, source);
    };
  }, [hasCf7Source, sourceId]);

  if (
    !eyebrowText &&
    !titleText &&
    !formTitleText &&
    !hotlineText &&
    validLocations.length === 0 &&
    validZoneOptions.length === 0
  ) {
    return null;
  }

  const inputIdPrefix =
    (sectionId ?? "").trim() ||
    (normalizedKey && normalizedKey !== "ocean-park-consultation"
      ? `dang-ky-tu-van-${normalizedKey}`
      : "dang-ky-tu-van");
  const hotlineDigits = hotlineText.replace(/[^\d+]/g, "");
  const zaloDigits = zaloText.replace(/\D/g, "");
  const resolvedSuccessMessage =
    (successMessage ?? "").trim() ||
    "Cảm ơn Quý cư dân! Kiến trúc sư trưởng IC HOUSE tại Sao Biển 23 Vinhomes Ocean Park đã tiếp nhận yêu cầu và sẽ liên hệ gửi mặt bằng 2D + báo giá chi tiết trong vòng 15 phút.";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage(
        "Vui lòng nhập đầy đủ Họ tên và Số điện thoại để KTS IC HOUSE gửi bản vẽ & báo giá.",
      );
      setSubmitted(false);
      return;
    }
    const normalizedPhone = phone.replace(/[\s.()-]/g, "");
    if (!/^\+?\d{8,15}$/.test(normalizedPhone)) {
      setErrorMessage(
        "Số điện thoại không hợp lệ (cần từ 8–15 chữ số). Vui lòng kiểm tra lại.",
      );
      setSubmitted(false);
      return;
    }
    setErrorMessage("");
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id={resolvedSectionId}
      data-ocean-park-form-key={normalizedKey || undefined}
      className={cn(
        "ocean-park-contact-form !w-full !bg-brand-white-hover/50 !text-brand-navy !mb-5 lg:!mb-20",
        className,
      )}
    >
      <div className="ocean-park-contact-form-inner !mx-auto !grid !w-full !max-w-7xl !grid-cols-1 !gap-8 lg:!grid-cols-12 lg:!gap-10 !mb-5 lg:!mb-20">
        {/* Left Column: Brand Contact Info, 3 Locations & Reference Links */}
        <div className="ocean-park-contact-info !flex !flex-col !justify-between !rounded-3xl !bg-brand-navy !p-6 !text-brand-white !shadow-xl md:!p-8 lg:!col-span-6 lg:!p-10">
          <div>
            {eyebrowText ? (
              <p className="ocean-park-contact-eyebrow !mb-3 !inline-block !rounded-full !border !border-brand-gold/45 !bg-brand-gold/15 !px-4 !py-1.5 !text-sm !font-bold !uppercase !tracking-widest !text-brand-gold">
                {eyebrowText}
              </p>
            ) : null}

            {titleText ? (
              <h2 className="ocean-park-contact-title !mt-1 !mb-0 !text-2xl !font-bold !leading-tight !text-brand-white md:!text-3xl">
                {titleText}
              </h2>
            ) : null}

            {descText ? (
              <p className="ocean-park-contact-desc !mt-3.5 !mb-0 !text-base !leading-relaxed !text-brand-white-hover/90">
                {descText}
              </p>
            ) : null}

            {/* Direct Hotline & Zalo Cards */}
            <div className="!mt-6 !grid !grid-cols-1 !gap-4 sm:!grid-cols-2">
              {hotlineText && hotlineDigits ? (
                <a
                  href={`tel:${hotlineDigits}`}
                  className="!flex !items-center !gap-3.5 !rounded-2xl !border !border-brand-gold/45 !bg-brand-white/10 !p-4 !text-brand-white !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white"
                >
                  <span className="!flex !h-11 !w-11 !shrink-0 !items-center !justify-center !rounded-full !bg-brand-gold !text-brand-white">
                    <Phone className="!h-5 !w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="!block !text-xs !font-semibold !uppercase !tracking-wider !text-brand-white-hover/85">
                      Hotline KTS Trưởng
                    </span>
                    <strong className="!text-lg !font-extrabold !text-brand-gold md:!text-xl">
                      {hotlineText}
                    </strong>
                  </div>
                </a>
              ) : null}

              {zaloText && zaloDigits ? (
                <a
                  href={`https://zalo.me/${zaloDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!flex !items-center !gap-3.5 !rounded-2xl !border !border-brand-white/25 !bg-brand-white/10 !p-4 !text-brand-white !no-underline !transition-colors hover:!border-brand-gold"
                >
                  <span className="!flex !h-11 !w-11 !shrink-0 !items-center !justify-center !rounded-full !bg-brand-white/15 !text-brand-gold">
                    <MessageCircle className="!h-5 !w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="!block !text-xs !font-semibold !uppercase !tracking-wider !text-brand-white-hover/85">
                      Zalo Nhận Bản Vẽ 3D
                    </span>
                    <strong className="!text-lg !font-bold !text-brand-white md:!text-xl">
                      {zaloText}
                    </strong>
                  </div>
                </a>
              ) : null}
            </div>

            {/* Email & Website */}
            {emailText || websiteText ? (
              <div className="!mt-4 !flex !flex-wrap !items-center !gap-5 !text-sm !text-brand-white-hover/90 md:!text-base">
                {emailText ? (
                  <span className="!inline-flex !items-center !gap-2">
                    <Mail
                      className="!h-4 !w-4 !text-brand-gold"
                      aria-hidden="true"
                    />
                    <span>{emailText}</span>
                  </span>
                ) : null}
                {websiteText ? (
                  <span className="!inline-flex !items-center !gap-2">
                    <Globe
                      className="!h-4 !w-4 !text-brand-gold"
                      aria-hidden="true"
                    />
                    <span>{websiteText}</span>
                  </span>
                ) : null}
              </div>
            ) : null}

            {/* 3 Strategic Locations */}
            {validLocations.length > 0 ? (
              <div className="ocean-park-contact-locations !mt-7 !space-y-3.5 !border-t !border-brand-white/20 !pt-6">
                <h3 className="!mb-0 !text-sm !font-bold !uppercase !tracking-wider !text-brand-gold md:!text-base">
                  Hệ Thống Nhà Mẫu • Văn Phòng • Nhà Xưởng IC HOUSE Kế Cận Ocean Park
                </h3>
                {validLocations.map((loc, idx) => (
                  <div
                    key={`${loc.label}-${idx}`}
                    className="!flex !items-start !gap-3 !rounded-2xl !border !border-brand-white/10 !bg-brand-white/10 !p-4"
                  >
                    <MapPin
                      className="!mt-1 !h-5 !w-5 !shrink-0 !text-brand-gold"
                      aria-hidden="true"
                    />
                    <div className="!text-base !leading-relaxed">
                      <strong className="!block !font-bold !text-brand-gold">
                        {loc.label}
                      </strong>
                      <span className="!text-brand-white-hover">
                        {loc.address}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Collapsible Reference Links for SEO & Quick Navigation */}
          {validReferenceLinks.length > 0 ? (
            <details className="ocean-park-reference-links group !mt-6 !rounded-2xl !border !border-brand-white/20 !bg-brand-white/5 !p-4">
              <summary className="!flex !cursor-pointer !list-none !items-center !justify-between !text-sm !font-bold !uppercase !tracking-wider !text-brand-gold md:!text-base">
                <span>
                  Danh mục thiết kế theo Phân khu & Tòa ({validReferenceLinks.length})
                </span>
                <ChevronDown
                  className="!h-5 !w-5 !transition-transform group-open:!rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="!mt-3.5 !flex !flex-wrap !gap-2">
                {validReferenceLinks.map((refLink, idx) => (
                  <a
                    key={`${refLink.label}-${idx}`}
                    href={refLink.url}
                    className="!rounded-full !border !border-brand-white/25 !bg-brand-white/10 !px-3.5 !py-1.5 !text-sm !text-brand-white-hover !no-underline !transition-colors hover:!border-brand-gold hover:!text-brand-gold"
                  >
                    {refLink.label}
                  </a>
                ))}
              </div>
            </details>
          ) : null}
        </div>

        {/* Right Column: CF7 Slot or Built-in Interactive Consultation Form */}
        <div
          ref={formCardRef}
          className="ocean-park-contact-form-card !order-first lg:!order-none !flex !flex-col !justify-center !rounded-3xl !border !border-brand-navy/15 !bg-brand-white !p-6 !shadow-xl md:!p-8 lg:!col-span-6 lg:!p-10"
        >
          {formTitleText ? (
            <h3 className="ocean-park-form-title !mb-0 !text-2xl !font-bold !leading-snug !text-brand-navy md:!text-3xl">
              {formTitleText}
            </h3>
          ) : null}
          {formSubtitleText ? (
            <p className="ocean-park-form-subtitle !mt-2 !mb-0 !text-base !leading-relaxed !text-brand-navy/80">
              {formSubtitleText}
            </p>
          ) : null}

          {hasCf7Source ? (
            <div
              ref={cf7SlotRef}
              className="ocean-park-cf7-slot !mt-6 !text-brand-navy"
            />
          ) : (
            <form
              className="ocean-park-builtin-form !mt-6 !space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2">
                <div>
                  <label
                    htmlFor={`${inputIdPrefix}-fullname`}
                    className="!mb-2 !block !text-sm !font-bold !uppercase !tracking-wide !text-brand-navy"
                  >
                    Họ và tên quý khách <span className="!text-brand-gold">*</span>
                  </label>
                  <input
                    id={`${inputIdPrefix}-fullname`}
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="VD: Anh Minh — Tòa LD1"
                    className="ocean-park-input-name"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${inputIdPrefix}-phone`}
                    className="!mb-2 !block !text-sm !font-bold !uppercase !tracking-wide !text-brand-navy"
                  >
                    Số điện thoại / Zalo <span className="!text-brand-gold">*</span>
                  </label>
                  <input
                    id={`${inputIdPrefix}-phone`}
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="VD: 0988 xxx xxx"
                    className="ocean-park-input-phone"
                  />
                </div>
              </div>

              <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2">
                <div>
                  <label
                    htmlFor={`${inputIdPrefix}-zone`}
                    className="!mb-2 !flex !items-center !gap-1.5 !text-sm !font-bold !uppercase !tracking-wide !text-brand-navy"
                  >
                    <Building2
                      className="!h-4 !w-4 !text-brand-gold"
                      aria-hidden="true"
                    />
                    <span>Phân khu / Tòa căn hộ</span>
                  </label>
                  <select
                    id={`${inputIdPrefix}-zone`}
                    name="zone"
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="ocean-park-select-zone"
                  >
                    {validZoneOptions.map((zone, idx) => (
                      <option key={`${zone}-${idx}`} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`${inputIdPrefix}-apartment`}
                    className="!mb-2 !block !text-sm !font-bold !uppercase !tracking-wide !text-brand-navy"
                  >
                    Loại căn / Diện tích / Mã căn
                  </label>
                  <input
                    id={`${inputIdPrefix}-apartment`}
                    name="apartmentInfo"
                    type="text"
                    value={apartmentInfo}
                    onChange={(e) => setApartmentInfo(e.target.value)}
                    placeholder="VD: Căn 2PN+1 - 74.5m² - BE1-12A"
                    className="ocean-park-input-apartment"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor={`${inputIdPrefix}-notes`}
                  className="!mb-2 !block !text-sm !font-bold !uppercase !tracking-wide !text-brand-navy"
                >
                  Nhu cầu hoàn thiện & Phong cách yêu thích
                </label>
                <textarea
                  id={`${inputIdPrefix}-notes`}
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="VD: Cần nhận layout 2D, báo giá gói Luxury gỗ An Cường & đặt lịch xem nhà mẫu Sao Biển 23..."
                  className="ocean-park-textarea-notes"
                />
              </div>

              {errorMessage ? (
                <p
                  role="alert"
                  className="ocean-park-form-error !mb-0 !rounded-xl !border !border-red-500/30 !bg-red-50 !px-4 !py-3 !text-sm !font-medium !text-red-700 md:!text-base"
                >
                  {errorMessage}
                </p>
              ) : null}

              {submitted ? (
                <div
                  role="status"
                  className="ocean-park-contact-form-success !flex !items-start !gap-3 !rounded-xl !border !border-brand-gold !bg-brand-gold/15 !p-4 !text-sm !font-medium !text-brand-navy md:!text-base"
                >
                  <CheckCircle2
                    className="!mt-0.5 !h-5 !w-5 !shrink-0 !text-brand-gold"
                    aria-hidden="true"
                  />
                  <span>{resolvedSuccessMessage}</span>
                </div>
              ) : null}

              <button
                type="submit"
                className="ocean-park-submit-btn"
              >
                <Send className="!h-5 !w-5" aria-hidden="true" />
                <span>
                  {(submitLabel ?? "").trim() ||
                    "Đăng Ký Nhận Bản Vẽ 3D & Báo Giá Chi Tiết"}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default OceanParkContactForm;

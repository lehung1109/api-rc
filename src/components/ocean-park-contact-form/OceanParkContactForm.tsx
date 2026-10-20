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

export const normalizeOceanParkFormKey = (raw: string): string =>
  raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");

export const oceanParkCf7SourceId = (formKey: string): string => {
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

  const eyebrowText = eyebrow.trim();
  const titleText = title.trim();
  const descText = description.trim();
  const hotlineText = hotline.trim();
  const zaloText = zaloPhone.trim();
  const emailText = email.trim();
  const websiteText = website.trim();
  const formTitleText = formTitle.trim();
  const formSubtitleText = formSubtitle.trim();

  const validLocations = locations.filter(
    (loc) => loc.label.trim().length > 0 && loc.address.trim().length > 0,
  );
  const validReferenceLinks = referenceLinks.filter(
    (item) => item.label.trim().length > 0 && item.url.trim().length > 0,
  );
  const validZoneOptions = zoneOptions.filter((opt) => opt.trim().length > 0);

  const sourceId = oceanParkCf7SourceId(formKey);
  const cf7SlotRef = useRef<HTMLDivElement>(null);
  const [hasCf7Source, setHasCf7Source] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedZone, setSelectedZone] = useState(validZoneOptions[0] ?? "");
  const [apartmentInfo, setApartmentInfo] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sourceId) {
      setHasCf7Source(false);
      return;
    }
    const source = document.getElementById(sourceId);
    if (source && source.childNodes.length > 0) {
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

  const resolvedSectionId = sectionId?.trim() || "dang-ky-tu-van";
  const hotlineDigits = hotlineText.replace(/\s+/g, "");
  const zaloDigits = zaloText.replace(/\s+/g, "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage(
        "Vui lòng nhập đầy đủ Họ tên và Số điện thoại để KTS IC HOUSE gửi bản vẽ & báo giá.",
      );
      setSubmitted(false);
      return;
    }
    setErrorMessage("");
    setSubmitted(true);
  };

  return (
    <section
      id={resolvedSectionId}
      data-ocean-park-form-key={normalizeOceanParkFormKey(formKey) || undefined}
      className={cn(
        "ocean-park-contact-form !w-full !bg-brand-white-hover/50 !px-4 !py-10 !text-brand-navy md:!px-6 md:!py-16",
        className,
      )}
    >
      <div className="ocean-park-contact-form-inner !mx-auto !grid !w-full !max-w-7xl !grid-cols-1 !gap-8 lg:!grid-cols-12 lg:!gap-10">
        {/* Left Column: Brand Contact Info, 3 Locations & Reference Links */}
        <div className="ocean-park-contact-info !flex !flex-col !justify-between !rounded-2xl !bg-brand-navy !p-6 !text-brand-white !shadow-xl md:!p-8 lg:!col-span-6">
          <div>
            {eyebrowText ? (
              <p className="ocean-park-contact-eyebrow !mb-2 !inline-block !rounded-full !border !border-brand-gold/40 !bg-brand-gold/15 !px-3.5 !py-1 !text-xs !font-bold !uppercase !tracking-widest !text-brand-gold">
                {eyebrowText}
              </p>
            ) : null}

            {titleText ? (
              <h2 className="ocean-park-contact-title !mt-1 !text-2xl !font-bold !leading-snug !text-brand-white md:!text-3xl">
                {titleText}
              </h2>
            ) : null}

            {descText ? (
              <p className="ocean-park-contact-desc !mt-3 !text-xs !leading-relaxed !text-brand-white-hover/85 md:!text-sm">
                {descText}
              </p>
            ) : null}

            {/* Direct Hotline & Zalo Cards */}
            <div className="!mt-5 !grid !grid-cols-1 !gap-3 sm:!grid-cols-2">
              {hotlineText ? (
                <a
                  href={`tel:${hotlineDigits}`}
                  className="!flex !items-center !gap-3 !rounded-xl !border !border-brand-gold/40 !bg-brand-white/10 !p-3.5 !text-brand-white !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white"
                >
                  <span className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-full !bg-brand-gold !text-brand-white">
                    <Phone className="!h-4 !w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="!block !text-[11px] !uppercase !tracking-wider !text-brand-white-hover/75">
                      Hotline KTS Trưởng
                    </span>
                    <strong className="!text-base !font-extrabold !text-brand-gold">
                      {hotlineText}
                    </strong>
                  </div>
                </a>
              ) : null}

              {zaloText ? (
                <a
                  href={`https://zalo.me/${zaloDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!flex !items-center !gap-3 !rounded-xl !border !border-brand-white/20 !bg-brand-white/10 !p-3.5 !text-brand-white !no-underline !transition-colors hover:!border-brand-gold"
                >
                  <span className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-full !bg-brand-white/15 !text-brand-gold">
                    <MessageCircle className="!h-4 !w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="!block !text-[11px] !uppercase !tracking-wider !text-brand-white-hover/75">
                      Zalo Nhận Bản Vẽ 3D
                    </span>
                    <strong className="!text-base !font-bold !text-brand-white">
                      {zaloText}
                    </strong>
                  </div>
                </a>
              ) : null}
            </div>

            {/* Email & Website */}
            {(emailText || websiteText) ? (
              <div className="!mt-3 !flex !flex-wrap !items-center !gap-4 !text-xs !text-brand-white-hover/80">
                {emailText ? (
                  <span className="!inline-flex !items-center !gap-1.5">
                    <Mail
                      className="!h-3.5 !w-3.5 !text-brand-gold"
                      aria-hidden="true"
                    />
                    <span>{emailText}</span>
                  </span>
                ) : null}
                {websiteText ? (
                  <span className="!inline-flex !items-center !gap-1.5">
                    <Globe
                      className="!h-3.5 !w-3.5 !text-brand-gold"
                      aria-hidden="true"
                    />
                    <span>{websiteText}</span>
                  </span>
                ) : null}
              </div>
            ) : null}

            {/* 3 Strategic Locations */}
            {validLocations.length > 0 ? (
              <div className="ocean-park-contact-locations !mt-6 !space-y-3 !border-t !border-brand-white/15 !pt-5">
                <h3 className="!text-xs !font-bold !uppercase !tracking-wider !text-brand-gold md:!text-sm">
                  Hệ Thống Nhà Mẫu • Văn Phòng • Nhà Máy IC HOUSE Kế Cận Ocean Park
                </h3>
                {validLocations.map((loc, idx) => (
                  <div
                    key={`${loc.label}-${idx}`}
                    className="!flex !items-start !gap-2.5 !rounded-xl !bg-brand-white/5 !p-3"
                  >
                    <MapPin
                      className="!mt-0.5 !h-4 !w-4 !shrink-0 !text-brand-gold"
                      aria-hidden="true"
                    />
                    <div className="!text-xs !leading-relaxed md:!text-sm">
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
            <details className="ocean-park-reference-links group !mt-6 !rounded-xl !border !border-brand-white/15 !bg-brand-white/5 !p-3.5">
              <summary className="!flex !cursor-pointer !list-none !items-center !justify-between !text-xs !font-bold !uppercase !tracking-wider !text-brand-gold">
                <span>
                  Danh mục thiết kế theo Phân khu & Tòa ({validReferenceLinks.length})
                </span>
                <ChevronDown
                  className="!h-4 !w-4 !transition-transform group-open:!rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="!mt-3 !flex !flex-wrap !gap-1.5">
                {validReferenceLinks.map((refLink, idx) => (
                  <a
                    key={`${refLink.label}-${idx}`}
                    href={refLink.url}
                    className="!rounded-full !border !border-brand-white/20 !bg-brand-white/10 !px-3 !py-1 !text-xs !text-brand-white-hover !no-underline !transition-colors hover:!border-brand-gold hover:!text-brand-gold"
                  >
                    {refLink.label}
                  </a>
                ))}
              </div>
            </details>
          ) : null}
        </div>

        {/* Right Column: CF7 Slot or Built-in Interactive Consultation Form */}
        <div className="ocean-park-contact-form-card !flex !flex-col !justify-center !rounded-2xl !border !border-brand-navy/15 !bg-brand-white !p-6 !shadow-xl md:!p-8 lg:!col-span-6">
          {formTitleText ? (
            <h3 className="ocean-park-form-title !text-xl !font-bold !text-brand-navy md:!text-2xl">
              {formTitleText}
            </h3>
          ) : null}
          {formSubtitleText ? (
            <p className="ocean-park-form-subtitle !mt-1.5 !text-xs !leading-relaxed !text-brand-navy/75 md:!text-sm">
              {formSubtitleText}
            </p>
          ) : null}

          {hasCf7Source ? (
            <div
              ref={cf7SlotRef}
              className="ocean-park-cf7-slot !mt-5 !text-brand-navy"
            />
          ) : (
            <form
              className="ocean-park-builtin-form !mt-5 !space-y-4"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2">
                <div>
                  <label
                    htmlFor={`${resolvedSectionId}-fullname`}
                    className="!mb-1.5 !block !text-xs !font-bold !uppercase !tracking-wide !text-brand-navy"
                  >
                    Họ và tên quý khách <span className="!text-brand-gold">*</span>
                  </label>
                  <input
                    id={`${resolvedSectionId}-fullname`}
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Anh Minh — Tòa LD1"
                    className="ocean-park-input-name !w-full !rounded-xl !border !border-brand-navy/20 !bg-brand-white !px-3.5 !py-2.5 !text-sm !text-brand-navy !outline-none focus:!border-brand-gold"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${resolvedSectionId}-phone`}
                    className="!mb-1.5 !block !text-xs !font-bold !uppercase !tracking-wide !text-brand-navy"
                  >
                    Số điện thoại / Zalo <span className="!text-brand-gold">*</span>
                  </label>
                  <input
                    id={`${resolvedSectionId}-phone`}
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0988 xxx xxx"
                    className="ocean-park-input-phone !w-full !rounded-xl !border !border-brand-navy/20 !bg-brand-white !px-3.5 !py-2.5 !text-sm !text-brand-navy !outline-none focus:!border-brand-gold"
                  />
                </div>
              </div>

              <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2">
                <div>
                  <label
                    htmlFor={`${resolvedSectionId}-zone`}
                    className="!mb-1.5 !flex !items-center !gap-1.5 !text-xs !font-bold !uppercase !tracking-wide !text-brand-navy"
                  >
                    <Building2
                      className="!h-3.5 !w-3.5 !text-brand-gold"
                      aria-hidden="true"
                    />
                    <span>Phân khu / Tòa căn hộ</span>
                  </label>
                  <select
                    id={`${resolvedSectionId}-zone`}
                    name="zone"
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="ocean-park-select-zone !w-full !rounded-xl !border !border-brand-navy/20 !bg-brand-white !px-3.5 !py-2.5 !text-sm !text-brand-navy !outline-none focus:!border-brand-gold"
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
                    htmlFor={`${resolvedSectionId}-apartment`}
                    className="!mb-1.5 !block !text-xs !font-bold !uppercase !tracking-wide !text-brand-navy"
                  >
                    Loại căn / Diện tích / Mã căn
                  </label>
                  <input
                    id={`${resolvedSectionId}-apartment`}
                    name="apartmentInfo"
                    type="text"
                    value={apartmentInfo}
                    onChange={(e) => setApartmentInfo(e.target.value)}
                    placeholder="VD: Căn 2PN+1 - 74.5m² - BE1-12A"
                    className="ocean-park-input-apartment !w-full !rounded-xl !border !border-brand-navy/20 !bg-brand-white !px-3.5 !py-2.5 !text-sm !text-brand-navy !outline-none focus:!border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor={`${resolvedSectionId}-notes`}
                  className="!mb-1.5 !block !text-xs !font-bold !uppercase !tracking-wide !text-brand-navy"
                >
                  Nhu cầu hoàn thiện & Phong cách yêu thích
                </label>
                <textarea
                  id={`${resolvedSectionId}-notes`}
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="VD: Cần nhận layout 2D, báo giá gói Luxury gỗ An Cường & đặt lịch xem nhà mẫu Sao Biển 23..."
                  className="ocean-park-textarea-notes !w-full !rounded-xl !border !border-brand-navy/20 !bg-brand-white !px-3.5 !py-2.5 !text-sm !text-brand-navy !outline-none focus:!border-brand-gold"
                />
              </div>

              {errorMessage ? (
                <p
                  role="alert"
                  className="ocean-park-form-error !rounded-xl !border !border-red-500/30 !bg-red-50 !px-3.5 !py-2.5 !text-xs !font-medium !text-red-700"
                >
                  {errorMessage}
                </p>
              ) : null}

              {submitted && successMessage.trim() ? (
                <div
                  role="status"
                  className="ocean-park-contact-form-success !flex !items-start !gap-2.5 !rounded-xl !border !border-brand-gold !bg-brand-gold/15 !p-4 !text-xs !font-medium !text-brand-navy md:!text-sm"
                >
                  <CheckCircle2
                    className="!mt-0.5 !h-4 !w-4 !shrink-0 !text-brand-gold"
                    aria-hidden="true"
                  />
                  <span>{successMessage}</span>
                </div>
              ) : null}

              <button
                type="submit"
                className="ocean-park-submit-btn !inline-flex !w-full !cursor-pointer !items-center !justify-center !gap-2 !rounded-full !bg-brand-navy !px-6 !py-3.5 !text-sm !font-bold !uppercase !tracking-wide !text-brand-gold !shadow-md !transition-colors hover:!bg-brand-gold hover:!text-brand-white"
              >
                <Send className="!h-4 !w-4" aria-hidden="true" />
                <span>
                  {submitLabel.trim() || "Đăng Ký Nhận Bản Vẽ 3D & Báo Giá Chi Tiết"}
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

import { Phone } from "lucide-react";

import { cn } from "@/lib/utils";

import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface FloatingContactPhoneModel {
  label: string;
  link: LinkModel;
  className?: string;
}

const FloatingContactPhone = (model: FloatingContactPhoneModel) => {
  const { label, link, className } = model;

  const labelText = label.trim();
  const linkUrl = link.url.trim();

  if (!labelText || !linkUrl) {
    return null;
  }

  return (
    <Link
      {...link}
      className={cn(
        "floating-contact-phone relative inline-flex items-center no-underline",
        className,
        link.className,
      )}
    >
      <span
        className="floating-contact-phone-icon-wrap relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-white shadow-md"
        aria-hidden="true"
      >
        <span
          className="floating-contact-phone-ripple animate-floating-contact-phone-ripple motion-reduce:animate-none absolute inset-0 rounded-full bg-brand-gold/40"
          aria-hidden="true"
        />
        <span
          className="floating-contact-phone-ripple animate-floating-contact-phone-ripple motion-reduce:animate-none absolute inset-0 rounded-full bg-brand-gold/40 delay-[0.7s]"
          aria-hidden="true"
        />
        <Phone
          className="floating-contact-phone-icon relative z-10 h-5 w-5"
          strokeWidth={2}
        />
      </span>
      <span
        className={cn(
          "floating-contact-phone-label relative z-[9] -ml-0.5",
          "inline-flex items-center rounded-r-full bg-brand-gold py-2 pr-4 pl-2 ml-4",
          "text-[20px] font-semibold leading-none text-brand-white shadow-md",
        )}
      >
        <span className="relative z-10">{labelText}</span>
      </span>
    </Link>
  );
};

export default FloatingContactPhone;

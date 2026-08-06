import { MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface ConstructionFooterContactLinkModel {
  text: string;
  link: LinkModel;
}

export interface ConstructionFooterContactModel {
  className?: string;
  phone: ConstructionFooterContactLinkModel;
  addresses: string[];
  email: ConstructionFooterContactLinkModel;
}

const ConstructionFooterContact = (model: ConstructionFooterContactModel) => {
  const { className, phone, addresses, email } = model;

  const hasPhone =
    phone.text.trim().length > 0 && phone.link.url.trim().length > 0;
  const addressLines = addresses
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const hasAddresses = addressLines.length > 0;
  const hasEmail =
    email.text.trim().length > 0 && email.link.url.trim().length > 0;

  if (!hasPhone && !hasAddresses && !hasEmail) {
    return null;
  }

  const columnClass =
    "construction-footer-contact-col flex flex-col items-center justify-start gap-3 px-4 py-2 md:px-8";

  return (
    <div
      className={cn(
        "construction-footer-contact grid w-full grid-cols-1 gap-8 md:grid-cols-[1fr_2fr_1fr] md:gap-0",
        className,
      )}
    >
      {hasPhone ? (
        <div className={cn(columnClass, "construction-footer-contact-phone")}>
          <Phone
            className="construction-footer-contact-icon h-[30px] w-[30px] text-brand-navy"
            aria-hidden
            strokeWidth={1.5}
          />
          <Link
            {...phone.link}
            className={cn(
              "construction-footer-contact-phone-link text-base text-brand-navy",
              phone.link.className,
            )}
          >
            {phone.text}
          </Link>
        </div>
      ) : null}

      {hasAddresses ? (
        <div
          className={cn(
            columnClass,
            "construction-footer-contact-address md:border-x md:border-brand-navy/15",
          )}
        >
          <MapPin
            className="construction-footer-contact-icon h-[30px] w-[30px] text-brand-navy"
            aria-hidden
            strokeWidth={1.5}
          />
          <address className="construction-footer-contact-address-list not-italic space-y-1 text-base text-brand-navy">
            {addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </div>
      ) : null}

      {hasEmail ? (
        <div className={cn(columnClass, "construction-footer-contact-email")}>
          <Send
            className="construction-footer-contact-icon h-[30px] w-[30px] text-brand-navy"
            aria-hidden
            strokeWidth={1.5}
          />
          <Link
            {...email.link}
            className={cn(
              "construction-footer-contact-email-link text-base text-brand-navy",
              email.link.className,
            )}
          >
            {email.text}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default ConstructionFooterContact;

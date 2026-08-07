import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import ConstructionFooterBrand from "./ConstructionFooterBrand";
import ConstructionFooterBottom from "./ConstructionFooterBottom";
import ConstructionFooterContact, {
  type ConstructionFooterContactLinkModel,
} from "./ConstructionFooterContact";
import ConstructionFooterNav, {
  type ConstructionFooterMenuItemModel,
} from "./ConstructionFooterNav";
import ConstructionFooterSocial, {
  type ConstructionFooterSocialItemModel,
} from "./ConstructionFooterSocial";

export type {
  ConstructionFooterContactLinkModel,
  ConstructionFooterMenuItemModel,
  ConstructionFooterSocialItemModel,
};

export interface ConstructionFooterModel {
  className?: string;
  logo: MediaModel;
  menuItems: ConstructionFooterMenuItemModel[];
  companyName: string;
  socialLinks: ConstructionFooterSocialItemModel[];
  phone: ConstructionFooterContactLinkModel;
  addresses: string[];
  email: ConstructionFooterContactLinkModel;
  copyright: string;
  badge?: MediaModel;
}

const ConstructionFooter = (model: ConstructionFooterModel) => {
  const {
    className,
    logo,
    menuItems,
    companyName,
    socialLinks,
    phone,
    addresses,
    email,
    copyright,
    badge,
  } = model;

  const hasLogo = logo.url.trim().length > 0;
  const validMenuItems = menuItems.filter(
    (item) => item.label.trim().length > 0 && item.link.url.trim().length > 0,
  );
  const companyNameText = companyName.trim();
  const validSocialLinks = socialLinks.filter(
    (item) =>
      item.icon.url.trim().length > 0 &&
      item.link.url.trim().length > 0 &&
      item.ariaLabel.trim().length > 0,
  );
  const hasPhone =
    phone.text.trim().length > 0 && phone.link.url.trim().length > 0;
  const hasAddresses = addresses.some((line) => line.trim().length > 0);
  const hasEmail =
    email.text.trim().length > 0 && email.link.url.trim().length > 0;
  const hasContact = hasPhone || hasAddresses || hasEmail;
  const copyrightText = copyright.trim();
  const hasBadge = Boolean(badge?.url.trim());

  if (
    !hasLogo &&
    validMenuItems.length === 0 &&
    !companyNameText &&
    validSocialLinks.length === 0 &&
    !hasContact &&
    !copyrightText &&
    !hasBadge
  ) {
    return null;
  }

  return (
    <footer
      className={cn(
        "construction-footer !w-full !px-6 !pt-20 !pb-0 !text-center !text-base !text-brand-navy md:!px-10",
        className,
      )}
    >
      <div className="construction-footer-inner !mx-auto !flex !w-full !max-w-7xl !flex-col !items-center !gap-8">
        {hasLogo ? <ConstructionFooterBrand logo={logo} /> : null}

        {validMenuItems.length > 0 ? (
          <ConstructionFooterNav menuItems={validMenuItems} />
        ) : null}

        {companyNameText || validSocialLinks.length > 0 ? (
          <div className="construction-footer-company !flex !w-full !flex-col !items-center !gap-6 !border-t !border-brand-navy/15 !pt-8">
            {companyNameText ? (
              <h2 className="construction-footer-company-name !max-w-3xl !text-balance !text-2xl !font-bold !text-brand-navy">
                {companyNameText}
              </h2>
            ) : null}
            {validSocialLinks.length > 0 ? (
              <ConstructionFooterSocial socialLinks={validSocialLinks} />
            ) : null}
          </div>
        ) : null}

        {hasContact ? (
          <div className="!w-full !border-t !border-brand-navy/15 !pt-8">
            <ConstructionFooterContact
              phone={phone}
              addresses={addresses}
              email={email}
            />
          </div>
        ) : null}

        {copyrightText || hasBadge ? (
          <div className="!w-full !border-t !border-brand-navy/15 !pt-8">
            <ConstructionFooterBottom
              copyright={copyright}
              {...(hasBadge && badge ? { badge } : {})}
            />
          </div>
        ) : null}
      </div>
    </footer>
  );
};

export default ConstructionFooter;

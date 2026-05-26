import { cn } from "@/lib/utils";
import FooterBrand, { type FooterBrandModel } from "./FooterBrand";
import FooterContact, { type FooterContactModel } from "./FooterContact";
import FooterFanpages, { type FooterFanpagesModel } from "./FooterFanpages";

export interface FooterBottomModel {
  brand: FooterBrandModel;
  contact: FooterContactModel;
  fanpages: FooterFanpagesModel;
  className?: string;
}

const FooterBottom = (model: FooterBottomModel) => {
  const { brand, contact, fanpages, className } = model;

  return (
    <div
      className={cn(
        "footer-bottom border-t border-white/10",
        className,
      )}
    >
      <div className="footer-bottom-inner mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-3">
        <FooterBrand {...brand} />
        <FooterContact {...contact} />
        <FooterFanpages {...fanpages} />
      </div>
    </div>
  );
};

export default FooterBottom;

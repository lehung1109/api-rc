import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";
import { footerColumnTitleClass } from "./FooterLinkColumn";

export interface FooterPaymentMethodsModel {
  title?: string;
  logos: MediaModel[];
  className?: string;
}

const FooterPaymentMethods = (model: FooterPaymentMethodsModel) => {
  const { title = "PHƯƠNG THỨC THANH TOÁN", logos, className } = model;

  if (logos.length === 0) {
    return null;
  }

  return (
    <div className={cn("footer-payment-methods min-w-0", className)}>
      <h3
        className={cn(
          "footer-payment-methods-title md:text-base",
          footerColumnTitleClass,
        )}
      >
        {title}
      </h3>
      <div className="footer-payment-methods-grid mt-3 grid grid-cols-3 gap-2">
        {logos.map((logo) => (
          <Media
            key={logo.alt}
            {...logo}
            className={cn(
              "footer-payment-logo h-auto max-h-8 w-full object-contain",
              logo.className,
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterPaymentMethods;

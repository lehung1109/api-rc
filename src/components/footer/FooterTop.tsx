import { cn } from "@/lib/utils";
import FooterLinkColumn, {
  type FooterLinkColumnModel,
} from "./FooterLinkColumn";
import FooterPaymentMethods, {
  type FooterPaymentMethodsModel,
} from "./FooterPaymentMethods";
import FooterSocial, { type FooterSocialModel } from "./FooterSocial";

export interface FooterTopModel {
  menuColumns: FooterLinkColumnModel[];
  payment: FooterPaymentMethodsModel;
  social: FooterSocialModel;
  className?: string;
}

const FooterTop = (model: FooterTopModel) => {
  const { menuColumns, payment, social, className } = model;

  return (
    <div
      className={cn(
        "footer-top mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5",
        className,
      )}
    >
      {menuColumns.map((column) => (
        <FooterLinkColumn key={column.title} {...column} />
      ))}
      <FooterPaymentMethods {...payment} />
      <FooterSocial {...social} />
    </div>
  );
};

export default FooterTop;

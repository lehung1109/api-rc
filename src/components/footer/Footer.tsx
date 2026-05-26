import { cn } from "@/lib/utils";
import FooterBottom, { type FooterBottomModel } from "./FooterBottom";
import FooterTop, { type FooterTopModel } from "./FooterTop";

export interface FooterModel {
  className?: string;
  top: FooterTopModel;
  bottom: FooterBottomModel;
}

const Footer = (model: FooterModel) => {
  const { className, top, bottom } = model;

  return (
    <footer className={cn("footer bg-black text-white", className)}>
      <FooterTop {...top} />
      <FooterBottom {...bottom} />
    </footer>
  );
};

export default Footer;

import { Button } from "@/components/ui/button";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface HeaderTopModel {
  text: string;
  phone: string;
  link_phone: LinkModel;
}

const HeaderTop = (model: HeaderTopModel) => {
  const { text, phone, link_phone } = model;

  return (
    <div className="header-top w-full bg-brand-navy text-xs">
      <div className="container">
        <div className="relative flex h-[52px] items-center justify-between gap-4">
          <p className="header-top-text hidden text-sm font-medium text-brand-white md:block !mbe-0">
            {text}
          </p>

          <div className="hidden flex-1 md:block" aria-hidden />

          <Button asChild className="relative z-10 shrink-0">
            <Link
              {...link_phone}
              className="h-10 rounded-full !bg-brand-gold px-6 text-xs font-bold !text-brand-white hover:!bg-brand-gold-hover"
            >
              {phone}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;

import { cn } from "@/lib/utils";

import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export type FloatingContactPillVariant = "messenger" | "zalo";

export interface FloatingContactPillModel {
  label: string;
  icon: MediaModel;
  link: LinkModel;
  variant: FloatingContactPillVariant;
  className?: string;
}

const FloatingContactPill = (model: FloatingContactPillModel) => {
  const { label, icon, link, variant, className } = model;

  const labelText = label.trim();
  const iconUrl = icon.url.trim();
  const linkUrl = link.url.trim();

  if (!labelText || !iconUrl || !linkUrl) {
    return null;
  }

  return (
    <Link
      {...link}
      className={cn(
        "floating-contact-pill",
        variant === "messenger" && "bg-floating-contact-messenger",
        variant === "zalo" && "bg-floating-contact-zalo",
        "inline-flex items-center gap-2 rounded-full px-4 py-2",
        "max-md:gap-0 max-md:p-2.5",
        "text-[20px] font-semibold uppercase leading-none text-brand-white no-underline",
        "shadow-md",
        className,
        link.className,
      )}
    >
      <Media
        {...icon}
        alt=""
        className={cn(
          "floating-contact-pill-icon h-5 w-5 shrink-0 object-contain",
          icon.className,
        )}
      />
      <span className="floating-contact-pill-label max-md:sr-only">
        {labelText}
      </span>
    </Link>
  );
};

export default FloatingContactPill;

import { cn } from "@/lib/utils";

import type { FloatingContactPhoneModel } from "./FloatingContactPhone";
import FloatingContactPhone from "./FloatingContactPhone";
import type { FloatingContactPillModel } from "./FloatingContactPill";
import FloatingContactPill from "./FloatingContactPill";

export type { FloatingContactPhoneModel } from "./FloatingContactPhone";
export type {
  FloatingContactPillModel,
  FloatingContactPillVariant,
} from "./FloatingContactPill";

export interface FloatingContactModel {
  className?: string;
  messenger?: Omit<FloatingContactPillModel, "variant">;
  zalo?: Omit<FloatingContactPillModel, "variant">;
  phone?: FloatingContactPhoneModel;
}

const isPillValid = (
  item: Omit<FloatingContactPillModel, "variant"> | undefined,
): item is Omit<FloatingContactPillModel, "variant"> =>
  Boolean(
    item &&
      item.label.trim().length > 0 &&
      item.icon.url.trim().length > 0 &&
      item.link.url.trim().length > 0,
  );

const isPhoneValid = (
  item: FloatingContactPhoneModel | undefined,
): item is FloatingContactPhoneModel =>
  Boolean(
    item && item.label.trim().length > 0 && item.link.url.trim().length > 0,
  );

const FloatingContact = (model: FloatingContactModel) => {
  const { className, messenger, zalo, phone } = model;

  const hasMessenger = isPillValid(messenger);
  const hasZalo = isPillValid(zalo);
  const hasPhone = isPhoneValid(phone);

  if (!hasMessenger && !hasZalo && !hasPhone) {
    return null;
  }

  return (
    <aside
      className={cn(
        "floating-contact !pointer-events-none !fixed !bottom-[50px] !left-5 !z-50",
        "!flex !flex-col !items-start !gap-2.5",
        className,
      )}
      aria-label="Liên hệ nhanh"
    >
      <nav
        className="floating-contact-nav !pointer-events-auto !flex !flex-col !items-start !gap-2.5"
        aria-label="Liên hệ nhanh"
      >
        {hasMessenger ? (
          <FloatingContactPill {...messenger} variant="messenger" />
        ) : null}
        {hasZalo ? <FloatingContactPill {...zalo} variant="zalo" /> : null}
        {hasPhone ? <FloatingContactPhone {...phone} /> : null}
      </nav>
    </aside>
  );
};

export default FloatingContact;

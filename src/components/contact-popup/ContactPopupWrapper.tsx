import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import ContactPopup, { type ContactPopupModel } from "./ContactPopup";

export type { ContactPopupModel };

const ContactPopupWrapper = (model: ContactPopupModel) => {
  const { className } = model;

  return (
    <div className={cn("contact-popup-root", className)}>
      <ClientComponentWrapper
        className="contact-popup-island"
        type="contactPopup"
        hydrateData={model}
      >
        <ContactPopup {...model} />
      </ClientComponentWrapper>
    </div>
  );
};

export default ContactPopupWrapper;

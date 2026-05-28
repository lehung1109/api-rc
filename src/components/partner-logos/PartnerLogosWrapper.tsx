import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import ReactSection from "../ReactSection";
import PartnerLogos, { type PartnerLogosModel } from "./PartnerLogos";

export type { PartnerLogosModel };

const PartnerLogosWrapper = (model: PartnerLogosModel) => {
  const { className, ...partnerLogosModel } = model;

  if (partnerLogosModel.logos.length === 0) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("partner-logos-root", className)}
      type="partnerLogos"
      hydrateData={model}
    >
      <PartnerLogos {...partnerLogosModel} />
    </ClientComponentWrapper>
  );
};

export default PartnerLogosWrapper;

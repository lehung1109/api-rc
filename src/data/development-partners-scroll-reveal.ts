import type { DevelopmentPartnersScrollRevealModel } from "@/components/development-partners/DevelopmentPartnersScrollReveal";
import developmentPartners from "./development-partners";

const developmentPartnersScrollReveal: DevelopmentPartnersScrollRevealModel = {
  targetId:
    developmentPartners.scrollReveal?.targetId ?? "development-partners",
};

export default developmentPartnersScrollReveal;
export { developmentPartnersScrollReveal };

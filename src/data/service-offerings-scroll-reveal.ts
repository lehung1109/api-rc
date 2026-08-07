import type { ServiceOfferingsScrollRevealModel } from "@/components/service-offerings/ServiceOfferingsScrollReveal";
import serviceOfferings from "./service-offerings";

const serviceOfferingsScrollReveal: ServiceOfferingsScrollRevealModel = {
  targetId: serviceOfferings.scrollReveal?.targetId ?? "service-offerings",
};

export default serviceOfferingsScrollReveal;
export { serviceOfferingsScrollReveal };

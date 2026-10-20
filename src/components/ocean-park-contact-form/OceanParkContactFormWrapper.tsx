import { cn } from "@/lib/utils";
import ClientComponentWrapper from "../ClientComponentWrapper";
import OceanParkContactForm, {
  type OceanParkContactFormModel,
} from "./OceanParkContactForm";

export type { OceanParkContactFormModel };

const OceanParkContactFormWrapper = (model: OceanParkContactFormModel) => {
  if (
    !model.title.trim() &&
    !model.formTitle.trim() &&
    model.locations.length === 0 &&
    model.zoneOptions.length === 0
  ) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("ocean-park-contact-form-root", model.className)}
      type="oceanParkContactForm"
      hydrateData={model}
    >
      <OceanParkContactForm {...model} />
    </ClientComponentWrapper>
  );
};

export default OceanParkContactFormWrapper;

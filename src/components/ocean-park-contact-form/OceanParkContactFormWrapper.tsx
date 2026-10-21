import { cn } from "@/lib/utils";
import ClientComponentWrapper from "../ClientComponentWrapper";
import OceanParkContactForm, {
  type OceanParkContactFormModel,
} from "./OceanParkContactForm";

export type { OceanParkContactFormModel };

const OceanParkContactFormWrapper = (model: OceanParkContactFormModel) => {
  const validLocations = (model.locations ?? []).filter(
    (loc) =>
      Boolean(loc) &&
      (loc.label ?? "").trim().length > 0 &&
      (loc.address ?? "").trim().length > 0,
  );
  const validZoneOptions = (model.zoneOptions ?? []).filter(
    (opt) => typeof opt === "string" && opt.trim().length > 0,
  );

  if (
    !(model.eyebrow ?? "").trim() &&
    !(model.title ?? "").trim() &&
    !(model.formTitle ?? "").trim() &&
    !(model.hotline ?? "").trim() &&
    validLocations.length === 0 &&
    validZoneOptions.length === 0
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

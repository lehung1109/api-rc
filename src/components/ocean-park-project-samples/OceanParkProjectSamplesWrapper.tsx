import { cn } from "@/lib/utils";
import ClientComponentWrapper from "../ClientComponentWrapper";
import OceanParkProjectSamples, {
  type OceanParkProjectSamplesModel,
} from "./OceanParkProjectSamples";

export type { OceanParkProjectSamplesModel };

const OceanParkProjectSamplesWrapper = (
  model: OceanParkProjectSamplesModel,
) => {
  if (model.featuredProjects.length === 0 && !model.title.trim()) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("ocean-park-project-samples-root", model.className)}
      type="oceanParkProjectSamples"
      hydrateData={model}
    >
      <OceanParkProjectSamples {...model} />
    </ClientComponentWrapper>
  );
};

export default OceanParkProjectSamplesWrapper;

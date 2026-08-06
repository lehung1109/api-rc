import type { VisionMissionScrollRevealModel } from "@/components/vision-mission/VisionMissionScrollReveal";
import visionMission from "./vision-mission";

const visionMissionScrollReveal: VisionMissionScrollRevealModel = {
  targetId: visionMission.scrollReveal?.targetId ?? "vision-mission",
};

export default visionMissionScrollReveal;
export { visionMissionScrollReveal };

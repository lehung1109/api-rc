import type { DirectorProfileScrollRevealModel } from "@/components/director-profile/DirectorProfileScrollReveal";
import directorProfile from "./director-profile";

const directorProfileScrollReveal: DirectorProfileScrollRevealModel = {
  targetId: directorProfile.scrollReveal?.targetId ?? "director-profile",
};

export default directorProfileScrollReveal;
export { directorProfileScrollReveal };

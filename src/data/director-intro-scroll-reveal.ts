import type { DirectorIntroScrollRevealModel } from "@/components/director-intro/DirectorIntroScrollReveal";
import directorIntro from "./director-intro";

const directorIntroScrollReveal: DirectorIntroScrollRevealModel = {
  targetId: directorIntro.scrollReveal?.targetId ?? "director-intro",
};

export default directorIntroScrollReveal;
export { directorIntroScrollReveal };

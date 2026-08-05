import type { AboutIntroScrollRevealModel } from "@/components/about-intro/AboutIntroScrollReveal";
import aboutIntro from "./about-intro";

const aboutIntroScrollReveal: AboutIntroScrollRevealModel = {
  targetId: aboutIntro.scrollReveal?.targetId ?? "about-intro",
};

export default aboutIntroScrollReveal;
export { aboutIntroScrollReveal };

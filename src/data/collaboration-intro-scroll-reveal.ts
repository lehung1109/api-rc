import type { CollaborationIntroScrollRevealModel } from "@/components/collaboration-intro/CollaborationIntroScrollReveal";
import collaborationIntro from "./collaboration-intro";

const collaborationIntroScrollReveal: CollaborationIntroScrollRevealModel = {
  targetId:
    collaborationIntro.scrollReveal?.targetId ?? "collaboration-intro",
};

export default collaborationIntroScrollReveal;
export { collaborationIntroScrollReveal };

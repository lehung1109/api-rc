import type { FeaturedProjectsScrollRevealModel } from "@/components/featured-projects/FeaturedProjectsScrollReveal";
import featuredProjects from "./featured-projects";

const featuredProjectsScrollReveal: FeaturedProjectsScrollRevealModel = {
  targetId: featuredProjects.scrollReveal?.targetId ?? "featured-projects",
};

export default featuredProjectsScrollReveal;
export { featuredProjectsScrollReveal };

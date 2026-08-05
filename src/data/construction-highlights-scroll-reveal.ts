import type { ConstructionHighlightsScrollRevealModel } from "@/components/construction-highlights/ConstructionHighlightsScrollReveal";
import constructionHighlights from "./construction-highlights";

const constructionHighlightsScrollReveal: ConstructionHighlightsScrollRevealModel =
  {
    targetId:
      constructionHighlights.scrollReveal?.targetId ?? "construction-highlights",
  };

export default constructionHighlightsScrollReveal;
export { constructionHighlightsScrollReveal };

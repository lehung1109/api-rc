import type { OutstandingAdvantagesScrollRevealModel } from "@/components/outstanding-advantages/OutstandingAdvantagesScrollReveal";
import outstandingAdvantages from "./outstanding-advantages";

const outstandingAdvantagesScrollReveal: OutstandingAdvantagesScrollRevealModel =
  {
    targetId:
      outstandingAdvantages.scrollReveal?.targetId ?? "outstanding-advantages",
  };

export default outstandingAdvantagesScrollReveal;
export { outstandingAdvantagesScrollReveal };

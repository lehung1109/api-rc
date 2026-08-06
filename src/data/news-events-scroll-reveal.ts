import type { NewsEventsScrollRevealModel } from "@/components/news-events/NewsEventsScrollReveal";
import newsEvents from "./news-events";

const newsEventsScrollReveal: NewsEventsScrollRevealModel = {
  targetId: newsEvents.scrollReveal?.targetId ?? "news-events",
};

export default newsEventsScrollReveal;
export { newsEventsScrollReveal };

import PostHeroBanner from "../../src/components/post-hero-banner/PostHeroBanner";
import postHeroBanner from "../../src/data/post-hero-banner";

export const pageMeta = {
  title: "post-hero-banner",
};

export default function PostHeroBannerPage() {
  return <PostHeroBanner {...postHeroBanner} />;
}

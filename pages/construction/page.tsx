import ConstructionHeader from "../../src/components/construction-header/ConstructionHeader";
import VideoHeroBannerWrapper from "../../src/components/video-hero-banner/VideoHeroBannerWrapper";
import { constructionHeader } from "../../src/data/construction-header";
import videoHeroBannerWrapper from "../../src/data/video-hero-banner-wrapper";
import AboutIntro from "../../src/components/about-intro/AboutIntro";
import aboutIntro from "@/data/about-intro";

export const pageMeta = {
  title: "construction",
};

export default function ConstructionPage() {
  return (
    <div>
      <ConstructionHeader {...constructionHeader} />

      <VideoHeroBannerWrapper {...videoHeroBannerWrapper} />

      <AboutIntro {...aboutIntro} />

      <main className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-2xl font-bold text-brand-navy">
          Construction page preview
        </p>
        <p className="mt-4 text-base text-brand-navy/70">
          Preview page dành riêng cho ConstructionHeader — cuộn trang để kiểm
          tra sticky background.
        </p>
        <div className="mt-12 h-[120vh] rounded-lg bg-brand-white-hover/80" />
      </main>
    </div>
  );
}

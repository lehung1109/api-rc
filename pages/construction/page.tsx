import ConstructionHeader from "../../src/components/construction-header/ConstructionHeader";
import PageBackground from "../../src/components/page-background/PageBackground";
import VideoHeroBannerWrapper from "../../src/components/video-hero-banner/VideoHeroBannerWrapper";
import { constructionHeader } from "../../src/data/construction-header";
import pageBackground from "../../src/data/page-background";
import videoHeroBannerWrapper from "../../src/data/video-hero-banner-wrapper";
import AboutIntro from "../../src/components/about-intro/AboutIntro";
import aboutIntro from "@/data/about-intro";
import DirectorIntro from "../../src/components/director-intro/DirectorIntro";
import directorIntro from "@/data/director-intro";
import FieldsOfActivity from "../../src/components/fields-of-activity/FieldsOfActivity";
import fieldsOfActivity from "@/data/fields-of-activity";
import ConstructionHighlights from "../../src/components/construction-highlights/ConstructionHighlights";
import constructionHighlights from "@/data/construction-highlights";
import FeaturedProjects from "../../src/components/featured-projects/FeaturedProjects";
import featuredProjects from "@/data/featured-projects";
import ContactCta from "../../src/components/contact-cta/ContactCta";
import contactCta from "@/data/contact-cta";
import ContactPopupWrapper from "../../src/components/contact-popup/ContactPopupWrapper";
import contactPopupWrapper from "@/data/contact-popup-wrapper";

export const pageMeta = {
  title: "construction",
};

export default function ConstructionPage() {
  return (
    <div>
      <PageBackground {...pageBackground} />
      <ConstructionHeader {...constructionHeader} />

      <VideoHeroBannerWrapper {...videoHeroBannerWrapper} />

      <AboutIntro {...aboutIntro} />

      <DirectorIntro {...directorIntro} />

      <FieldsOfActivity {...fieldsOfActivity} />

      <ConstructionHighlights {...constructionHighlights} />

      <FeaturedProjects {...featuredProjects} />

      <ContactCta {...contactCta} />

      <ContactPopupWrapper {...contactPopupWrapper} />

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

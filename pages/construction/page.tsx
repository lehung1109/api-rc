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
import DirectorProfile from "../../src/components/director-profile/DirectorProfile";
import directorProfile from "@/data/director-profile";
import VisionMission from "../../src/components/vision-mission/VisionMission";
import visionMission from "@/data/vision-mission";
import KeyPersonnelWrapper from "../../src/components/key-personnel/KeyPersonnelWrapper";
import keyPersonnelWrapper from "@/data/key-personnel-wrapper";
import DevelopmentPartners from "../../src/components/development-partners/DevelopmentPartners";
import developmentPartners from "@/data/development-partners";
import FieldsOfActivity from "../../src/components/fields-of-activity/FieldsOfActivity";
import fieldsOfActivity from "@/data/fields-of-activity";
import ConstructionHighlights from "../../src/components/construction-highlights/ConstructionHighlights";
import constructionHighlights from "@/data/construction-highlights";
import FeaturedProjects from "../../src/components/featured-projects/FeaturedProjects";
import featuredProjects from "@/data/featured-projects";
import NewsEvents from "../../src/components/news-events/NewsEvents";
import newsEvents from "@/data/news-events";
import ContactCta from "../../src/components/contact-cta/ContactCta";
import contactCta from "@/data/contact-cta";
import ContactPopupWrapper from "../../src/components/contact-popup/ContactPopupWrapper";
import contactPopupWrapper from "@/data/contact-popup-wrapper";
import FloatingContact from "../../src/components/floating-contact/FloatingContact";
import floatingContact from "@/data/floating-contact";
import ConstructionFooter from "../../src/components/construction-footer/ConstructionFooter";
import constructionFooter from "@/data/construction-footer";

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

      <DirectorProfile {...directorProfile} />

      <VisionMission {...visionMission} />

      <KeyPersonnelWrapper {...keyPersonnelWrapper} />

      <DevelopmentPartners {...developmentPartners} />

      <FieldsOfActivity {...fieldsOfActivity} />

      <ConstructionHighlights {...constructionHighlights} />

      <FeaturedProjects {...featuredProjects} />

      <NewsEvents {...newsEvents} />

      <ContactCta {...contactCta} />

      <ContactPopupWrapper {...contactPopupWrapper} />

      <FloatingContact {...floatingContact} />

      <ConstructionFooter {...constructionFooter} />
    </div>
  );
}

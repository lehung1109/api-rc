import ConstructionHeader from "../../src/components/construction-header/ConstructionHeader";
import PageBackground from "../../src/components/page-background/PageBackground";
import VideoHeroBannerWrapper from "../../src/components/video-hero-banner/VideoHeroBannerWrapper";
import JobDetail from "../../src/components/job-detail/JobDetail";
import { constructionHeader } from "../../src/data/construction-header";
import pageBackground from "../../src/data/page-background";
import videoHeroBannerWrapper from "../../src/data/video-hero-banner-wrapper";
import jobDetail from "../../src/data/job-detail";
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
import CollaborationIntro from "../../src/components/collaboration-intro/CollaborationIntro";
import collaborationIntro from "@/data/collaboration-intro";
import ServiceOfferings from "../../src/components/service-offerings/ServiceOfferings";
import serviceOfferings from "@/data/service-offerings";
import OutstandingAdvantages from "../../src/components/outstanding-advantages/OutstandingAdvantages";
import outstandingAdvantages from "@/data/outstanding-advantages";
import YoutubeVideoList from "../../src/components/youtube-video-list/YoutubeVideoList";
import youtubeVideoList from "@/data/youtube-video-list";
import FieldsOfActivity from "../../src/components/fields-of-activity/FieldsOfActivity";
import fieldsOfActivity from "@/data/fields-of-activity";
import ConstructionHighlights from "../../src/components/construction-highlights/ConstructionHighlights";
import constructionHighlights from "@/data/construction-highlights";
import FeaturedProjects from "../../src/components/featured-projects/FeaturedProjects";
import featuredProjects from "@/data/featured-projects";
import ProjectCategoryGalleryWrapper from "../../src/components/project-category-gallery/ProjectCategoryGalleryWrapper";
import projectCategoryGalleryWrapper from "@/data/project-category-gallery-wrapper";
import NewsEvents from "../../src/components/news-events/NewsEvents";
import newsEvents from "@/data/news-events";
import NewsListWrapper from "../../src/components/news-list/NewsListWrapper";
import newsListWrapper from "@/data/news-list-wrapper";
import JobListingListWrapper from "../../src/components/job-listing-list/JobListingListWrapper";
import jobListingListWrapper from "@/data/job-listing-list-wrapper";
import ContactCta from "../../src/components/contact-cta/ContactCta";
import contactCta from "@/data/contact-cta";
import ContactPopupButton from "../../src/components/contact-popup-button/ContactPopupButton";
import contactPopupButton from "@/data/contact-popup-button";
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

      <JobDetail {...jobDetail} />

      <AboutIntro {...aboutIntro} />

      <DirectorIntro {...directorIntro} />

      <DirectorProfile {...directorProfile} />

      <VisionMission {...visionMission} />

      <KeyPersonnelWrapper {...keyPersonnelWrapper} />

      <DevelopmentPartners {...developmentPartners} />

      <CollaborationIntro {...collaborationIntro} />

      <ServiceOfferings {...serviceOfferings} />

      <OutstandingAdvantages {...outstandingAdvantages} />

      <YoutubeVideoList {...youtubeVideoList} />

      <FieldsOfActivity {...fieldsOfActivity} />

      <ConstructionHighlights {...constructionHighlights} />

      <FeaturedProjects {...featuredProjects} />

      <ProjectCategoryGalleryWrapper {...projectCategoryGalleryWrapper} />

      <NewsEvents {...newsEvents} />

      <NewsListWrapper {...newsListWrapper} />

      <JobListingListWrapper {...jobListingListWrapper} />

      <ContactCta {...contactCta} />

      <section className="contact-popup-button-demo !bg-brand-navy !px-6 !py-14 md:!px-10">
        <div className="!mx-auto !w-full !max-w-7xl !flex !justify-center">
          <ContactPopupButton {...contactPopupButton} />
        </div>
      </section>

      <ContactPopupWrapper {...contactPopupWrapper} />

      <FloatingContact {...floatingContact} />

      <ConstructionFooter {...constructionFooter} />
    </div>
  );
}

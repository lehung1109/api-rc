import { header } from "@/data/header";
import Header from "./header/Header";
import PageTitleBar from "./page-title-bar/PageTitleBar";
import { pageTitleBar } from "@/data/page-title-bar";
import CarouselWrapper from "./carousel/CarouselWrapper";
import carouselWrapper from "@/data/carousel-wrapper";
import ProcessSection from "./process-section/ProcessSection";
import { processSection } from "@/data/process-section";
import ProjectShowcase from "./project-showcase/ProjectShowcase";
import { projectShowcase } from "@/data/project-showcase";
import DesignConsultationCta from "./design-consultation-cta/DesignConsultationCta";
import { designConsultationCta } from "@/data/design-consultation-cta";
import FeatureCardsCarouselWrapper from "./feature-cards-carousel/FeatureCardsCarouselWrapper";
import featureCardsCarouselWrapper from "@/data/feature-cards-carousel-wrapper";
import PartnerLogosWrapper from "./partner-logos/PartnerLogosWrapper";
import partnerLogosWrapper from "@/data/partner-logos-wrapper";
import ProductGalleryWrapper from "./product-gallery/ProductGalleryWrapper";
import productGalleryWrapper from "@/data/product-gallery-wrapper";
import Footer from "./footer/Footer";
import footer from "@/data/footer";
import { relatedPostList } from "@/data/related-post-list";
import RelatedPostList from "./related-posts/RelatedPostList";

const App = () => {
  return (
    <div>
      <Header {...header} />
      <PageTitleBar {...pageTitleBar} />

      <CarouselWrapper {...carouselWrapper} />
      <ProcessSection {...processSection} />
      <ProjectShowcase {...projectShowcase} />
      <DesignConsultationCta {...designConsultationCta} />
      <FeatureCardsCarouselWrapper {...featureCardsCarouselWrapper} />
      <ProductGalleryWrapper {...productGalleryWrapper} />
      <PartnerLogosWrapper {...partnerLogosWrapper} />
      <RelatedPostList {...relatedPostList} />
      <Footer {...footer} />
    </div>
  );
};

export default App;

import { header } from "@/data/header";
import Header from "./header/Header";
import HeroSection from "./hero-section/HeroSection";
import { heroSection } from "@/data/hero-section";
import ImageOverlayCardsGrid from "./image-overlay-cards-grid/ImageOverlayCardsGrid";
import imageOverlayCardsGrid from "@/data/image-overlay-cards-grid";
import NumberIconGrid from "./number-icon-grid/NumberIconGrid";
import numberIconGrid from "@/data/number-icon-grid";
import PricingCards from "./pricing-cards/PricingCards";
import pricingCards from "@/data/pricing-cards";
import ProjectMetaBar from "./project-meta-bar/ProjectMetaBar";
import { projectMetaBar } from "@/data/project-meta-bar";
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
import FeatureCardsGrid from "./feature-cards-grid/FeatureCardsGrid";
import featureCardsGrid from "@/data/feature-cards-grid";
import PartnerLogosWrapper from "./partner-logos/PartnerLogosWrapper";
import partnerLogosWrapper from "@/data/partner-logos-wrapper";
import ProductGalleryWrapper from "./product-gallery/ProductGalleryWrapper";
import productGalleryWrapper from "@/data/product-gallery-wrapper";
import Footer from "./footer/Footer";
import footer from "@/data/footer";
import { relatedPostList } from "@/data/related-post-list";
import RelatedPostList from "./related-posts/RelatedPostList";
import breadcrumb from "@/data/breadcrumb";
import Breadcrumb from "./breadcrumb/Breadcrumb";
import inlineList from "@/data/inline-list";
import InlineList from "./inline-list/InlineList";
import TableOfContentsWrapper from "./table-of-contents/TableOfContentsWrapper";
import tableOfContentsWrapper from "@/data/table-of-contents-wrapper";
import { sectionTitle } from "@/data/section-title";
import SectionTitle from "./section-title/SectionTitle";
import CustomerTestimonialsWrapper from "./customer-testimonials/CustomerTestimonialsWrapper";
import customerTestimonialsWrapper from "@/data/customer-testimonials-wrapper";

const App = () => {
  return (
    <div>
      <Header {...header} />
      <HeroSection {...heroSection} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <ImageOverlayCardsGrid {...imageOverlayCardsGrid} />
      </div>
      <CustomerTestimonialsWrapper {...customerTestimonialsWrapper} />
      <NumberIconGrid {...numberIconGrid} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <PricingCards {...pricingCards} />
      </div>

      <SectionTitle {...sectionTitle} />

      <ProjectMetaBar {...projectMetaBar} />

      <CarouselWrapper {...carouselWrapper} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <TableOfContentsWrapper {...tableOfContentsWrapper} />
      </div>

      <div id="section-process">
        <ProcessSection {...processSection} />
      </div>
      <div id="section-showcase">
        <ProjectShowcase {...projectShowcase} />
      </div>
      <div id="section-consultation">
        <DesignConsultationCta {...designConsultationCta} />
      </div>
      <FeatureCardsCarouselWrapper {...featureCardsCarouselWrapper} />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <FeatureCardsGrid {...featureCardsGrid} />
      </div>
      <ProductGalleryWrapper {...productGalleryWrapper} />
      <PartnerLogosWrapper {...partnerLogosWrapper} />
      <div className="mx-auto max-w-7xl px-4 py-4">
        <Breadcrumb {...breadcrumb} />
      </div>
      <RelatedPostList {...relatedPostList} />
      <InlineList {...inlineList} />
      <Footer {...footer} />
    </div>
  );
};

export default App;

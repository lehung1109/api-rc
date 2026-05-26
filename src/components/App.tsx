import { header } from "@/data/header";
import Header from "./header/Header";
import CarouselWrapper from "./carousel/CarouselWrapper";
import carouselWrapper from "@/data/carousel-wrapper";
import ProcessSection from "./process-section/ProcessSection";
import { processSection } from "@/data/process-section";
import DesignConsultationCta from "./design-consultation-cta/DesignConsultationCta";
import { designConsultationCta } from "@/data/design-consultation-cta";
import FeatureCardsCarouselWrapper from "./feature-cards-carousel/FeatureCardsCarouselWrapper";
import featureCardsCarouselWrapper from "@/data/feature-cards-carousel-wrapper";
import PartnerLogosWrapper from "./partner-logos/PartnerLogosWrapper";
import partnerLogosWrapper from "@/data/partner-logos-wrapper";

const App = () => {
  return (
    <div>
      <Header {...header} />

      <CarouselWrapper {...carouselWrapper} />
      <ProcessSection {...processSection} />
      <DesignConsultationCta {...designConsultationCta} />
      <FeatureCardsCarouselWrapper {...featureCardsCarouselWrapper} />
      <PartnerLogosWrapper {...partnerLogosWrapper} />
    </div>
  );
};

export default App;

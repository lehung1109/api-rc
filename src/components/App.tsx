import { header } from "@/data/header";
import Header from "./header/Header";
import CarouselWrapper from "./carousel/CarouselWrapper";
import carousel from "@/data/carousel";
import ProcessSection from "./process-section/ProcessSection";
import { processSection } from "@/data/process-section";
import DesignConsultationCta from "./design-consultation-cta/DesignConsultationCta";
import { designConsultationCta } from "@/data/design-consultation-cta";

const App = () => {
  return (
    <div>
      <Header {...header} />

      <CarouselWrapper {...carousel} />
      <ProcessSection {...processSection} />
      <DesignConsultationCta {...designConsultationCta} />
    </div>
  );
};

export default App;

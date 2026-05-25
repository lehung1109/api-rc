import { header } from "@/data/header";
import Header from "./header/Header";
import CarouselWrapper from "./carousel/CarouselWrapper";
import carousel from "@/data/carousel";
import ProcessSection from "./process-section/ProcessSection";
import { processSection } from "@/data/process-section";

const App = () => {
  return (
    <div>
      <Header {...header} />

      <CarouselWrapper {...carousel} />
      <ProcessSection {...processSection} />
    </div>
  );
};

export default App;

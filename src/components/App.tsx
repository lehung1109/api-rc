import { header } from "@/data/header";
import Header from "./header/Header";
import Carousel from "./carousel/Carousel";
import carousel from "@/data/carousel";
import ClientComponentWrapper from "./ClientComponentWrapper";
import ReactSection from "./ReactSection";
import ProcessSection from "./process-section/ProcessSection";
import { processSection } from "@/data/process-section";

const App = () => {
  return (
    <div>
      <Header {...header} />

      <ClientComponentWrapper>
        <Carousel {...carousel} />
        <ReactSection type="carousel" data={carousel} />
        <ProcessSection {...processSection} />
      </ClientComponentWrapper>
    </div>
  );
};

export default App;

import { header } from "@/data/header";
import Header from "./header/Header";
import Carousel from "./carousel/Carousel";
import carousel from "@/data/carousel";
import ClientComponentWrapper from "./ClientComponentWrapper";
import ReactSection from "./ReactSection";

const App = () => {
  return (
    <div>
      <Header {...header} />

      <ClientComponentWrapper>
        <Carousel {...carousel} />
        <ReactSection type="carousel" data={carousel} />
      </ClientComponentWrapper>
    </div>
  );
};

export default App;

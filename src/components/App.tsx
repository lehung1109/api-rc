import { header } from "@/data/header";
import Header from "./header/Header";
import Carousel from "./carousel/Carousel";
import carousel from "@/data/carousel";

const App = () => {
  return (
    <div>
      <Header {...header} />
      <Carousel {...carousel} />
    </div>
  );
};

export default App;

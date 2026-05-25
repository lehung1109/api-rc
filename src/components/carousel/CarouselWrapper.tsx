import ClientComponentWrapper from "../ClientComponentWrapper";
import ReactSection from "../ReactSection";
import Carousel, {
  type CarouselModel,
  type CarouselSlideModel,
} from "./Carousel";

export type { CarouselModel, CarouselSlideModel };

const CarouselWrapper = (model: CarouselModel) => {
  if (model.slides.length === 0) {
    return null;
  }

  return (
    <ClientComponentWrapper>
      <Carousel {...model} />
      <ReactSection type="carousel" data={model} />
    </ClientComponentWrapper>
  );
};

export default CarouselWrapper;

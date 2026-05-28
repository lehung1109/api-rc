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
    <ClientComponentWrapper type="carousel" hydrateData={model}>
      <Carousel {...model} />
    </ClientComponentWrapper>
  );
};

export default CarouselWrapper;

import Carousel from "../../src/components/carousel/Carousel";
import carousel from "../../src/data/carousel";

export const pageMeta = {
  title: "carousel",
};

export default function CarouselPage() {
  return <Carousel {...carousel} />;
}

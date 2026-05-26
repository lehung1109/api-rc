import type { CarouselModel } from "@/components/carousel/Carousel";

const carouselWrapper: CarouselModel = {
  slides: [
    {
      image: {
        url: "https://placehold.co/2600x800/png",
        alt: "Image 1",
        display_dimensions: {
          width: 100,
          height: 100,
        },
      },
    },
    {
      image: {
        url: "https://placehold.co/1300x400/png",
        alt: "Image 1",
        display_dimensions: {
          width: 100,
          height: 100,
        },
      },
    },
  ],
};

export default carouselWrapper;

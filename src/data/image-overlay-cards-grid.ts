import type { ImageOverlayCardsGridModel } from "@/components/image-overlay-cards-grid/ImageOverlayCardsGrid";

const imageOverlayCardsGrid: ImageOverlayCardsGridModel = {
  gap: 24,
  items: [
    {
      image: {
        url: "https://placehold.co/400x400/png",
        alt: "Thiết kế nội thất nhà phố",
        display_dimensions: { width: 400, height: 400 },
      },
      title: "Thiết kế nội thất nhà phố",
      link: { url: "#", is_external: false, nofollow: false },
    },
    {
      image: {
        url: "https://placehold.co/400x400/png?text=2",
        alt: "Thiết kế nội thất chung cư",
        display_dimensions: { width: 400, height: 400 },
      },
      title: "Thiết kế nội thất chung cư",
      link: { url: "#", is_external: false, nofollow: false },
    },
    {
      image: {
        url: "https://placehold.co/400x400/png?text=3",
        alt: "Thiết kế nội thất biệt thự",
        display_dimensions: { width: 400, height: 400 },
      },
      title: "Thiết kế nội thất biệt thự",
    },
  ],
};

export default imageOverlayCardsGrid;

import type { PageBackgroundModel } from "@/components/page-background/PageBackground";

const pageBackground: PageBackgroundModel = {
  mobileImage: {
    url: "https://placehold.co/768x1024/152243/ffffff?text=Page+BG+Mobile",
    alt: "Nền trang mobile",
    display_dimensions: {
      width: 768,
      height: 1024,
    },
  },
  desktopImage: {
    url: "/images/concrete-bg-official-updated.jpg",
    alt: "Nền trang desktop",
    display_dimensions: {
      width: 1920,
      height: 1080,
    },
  },
};

export default pageBackground;
export { pageBackground };

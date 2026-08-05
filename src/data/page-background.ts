import type { PageBackgroundModel } from "@/components/page-background/PageBackground";

const pageBackground: PageBackgroundModel = {
  mobileImage: {
    url: "/images/concrete-bg-official-updated-mobile.jpg",
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

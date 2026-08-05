import type { AboutIntroModel } from "@/components/about-intro/AboutIntro";

const aboutIntro: AboutIntroModel = {
  backgroundMobileImage: {
    url: "https://placehold.co/768x1024/152243/ffffff?text=About+BG+Mobile",
    alt: "Nền About Intro mobile",
    display_dimensions: {
      width: 768,
      height: 1024,
    },
  },
  backgroundDesktopImage: {
    url: "https://placehold.co/1920x1080/152243/ffffff?text=About+BG+Desktop",
    alt: "Nền About Intro desktop",
    display_dimensions: {
      width: 1920,
      height: 1080,
    },
    srcSet:
      "https://placehold.co/1280x800/152243/ffffff?text=About+BG+Tablet 1280w, " +
      "https://placehold.co/1920x1080/152243/ffffff?text=About+BG+Desktop 1920w",
    sizes: "100vw",
  },
  image: {
    url: "https://placehold.co/960x720/png?text=About+Team",
    alt: "Đội ngũ kiến trúc sư và kỹ sư",
    display_dimensions: {
      width: 960,
      height: 720,
    },
    srcSet:
      "https://placehold.co/640x480/png?text=About+Team+Mobile 640w, " +
      "https://placehold.co/960x720/png?text=About+Team 960w",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  subtitle: "ICHOUSE CHÚNG TÔI LÀ AI?",
  descriptionHtml:
    "<p>ICHOUSE là Tổng thầu thiết kế và thi công công trình dân dụng tại Hà Nội, TP. Hồ Chí Minh và các tỉnh lân cận. Đội ngũ Kiến trúc sư, Kỹ sư có chuyên môn cao sẽ đưa ra các giải pháp tổng thể, cá nhân hoá cho từng khách hàng.</p>",
  buttonLabel: "TÌM HIỂU THÊM",
  buttonLink: {
    url: "/gioi-thieu",
    is_external: false,
    nofollow: false,
  },
  scrollReveal: {
    targetId: "about-intro",
  },
};

export default aboutIntro;
export { aboutIntro };

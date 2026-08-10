import type { PostHeroBannerModel } from "@/components/post-hero-banner/PostHeroBanner";

const postHeroBanner = {
  backgroundImage: {
    url: "https://placehold.co/1600x900/jpg",
    alt: "The Meridian",
    display_dimensions: { width: 1600, height: 900 },
  },
  breadcrumbItems: [
    {
      label: "Trang chủ",
      link: { url: "/", is_external: false, nofollow: false },
    },
    {
      label: "Dự án tiêu biểu",
      link: { url: "/du-an-tieu-bieu/", is_external: false, nofollow: false },
    },
  ],
  title: "The Meridian - Vẻ đẹp tân cổ điển vượt lên giá trị thẩm mỹ",
} satisfies PostHeroBannerModel;

export default postHeroBanner;

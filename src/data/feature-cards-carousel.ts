import type { FeatureCardsCarouselModel } from "@/components/feature-cards-carousel/FeatureCardsCarousel";

const featureCardsCarousel: FeatureCardsCarouselModel = {
  slidesPerView: 3,
  spaceBetween: 16,
  items: [
    {
      image: {
        url: "https://placehold.co/400x280/png",
        alt: "Feature 1",
        display_dimensions: { width: 400, height: 280 },
      },
      title: "Thiết kế nội thất",
      description:
        "Tư vấn và thiết kế không gian sống hiện đại, tối ưu công năng và thẩm mỹ cho từng căn hộ.",
    },
    {
      image: {
        url: "https://placehold.co/400x280/png",
        alt: "Feature 2",
        display_dimensions: { width: 400, height: 280 },
      },
      title: "Thi công trọn gói",
      description:
        "Đội ngũ thi công chuyên nghiệp, đảm bảo tiến độ và chất lượng theo bản vẽ thiết kế.",
    },
    {
      image: {
        url: "https://placehold.co/400x280/png",
        alt: "Feature 3",
        display_dimensions: { width: 400, height: 280 },
      },
      title: "Nội thất cao cấp",
      description:
        "Cung cấp nội thất nhập khẩu và nội địa chất lượng, bảo hành dài hạn.",
    },
    {
      image: {
        url: "https://placehold.co/400x280/png",
        alt: "Feature 4",
        display_dimensions: { width: 400, height: 280 },
      },
      title: "Bảo trì & hậu mãi",
      description:
        "Hỗ trợ bảo trì, nâng cấp không gian sau bàn giao với chính sách rõ ràng.",
    },
  ],
};

export default featureCardsCarousel;

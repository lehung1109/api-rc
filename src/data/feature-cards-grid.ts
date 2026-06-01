import type { FeatureCardsGridModel } from "@/components/feature-cards-grid/FeatureCardsGrid";

const featureCardsGrid: FeatureCardsGridModel = {
  columnsTablet: 2,
  columnsDesktop: 3,
  gap: 16,
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
      link: { url: "#", is_external: false, nofollow: false },
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
      layout: "media-left",
      link: { url: "#", is_external: false, nofollow: false },
    },
    {
      image: {
        url: "https://placehold.co/400x280/png",
        alt: "Feature 3",
        display_dimensions: { width: 400, height: 280 },
      },
      title: "Nội thất cao cấp",
      link: { url: "#", is_external: false, nofollow: false },
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
      layout: "media-left",
      link: { url: "#", is_external: false, nofollow: false },
    },
    {
      image: {
        url: "https://placehold.co/400x280/png",
        alt: "Feature 5",
        display_dimensions: { width: 400, height: 280 },
      },
      title: "Tư vấn phong thủy",
      link: { url: "#", is_external: false, nofollow: false },
    },
    {
      image: {
        url: "https://placehold.co/400x280/png",
        alt: "Feature 6",
        display_dimensions: { width: 400, height: 280 },
      },
      title: "Thi công nhanh",
      description: "Cam kết tiến độ thi công theo hợp đồng.",
      link: { url: "#", is_external: false, nofollow: false },
    },
  ],
};

export default featureCardsGrid;

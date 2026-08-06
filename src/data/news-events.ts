import type { NewsEventsModel } from "@/components/news-events/NewsEvents";

const newsEvents: NewsEventsModel = {
  title: "TIN TỨC - SỰ KIỆN",
  items: [
    {
      image: {
        url: "https://placehold.co/800x450/png?text=News+1",
        alt: "Lễ khởi công",
        display_dimensions: { width: 800, height: 450 },
      },
      time: "15/03/2026",
      title:
        "Một buổi lễ khởi công, nhưng là cả hành trình chuẩn bị chỉn chu!",
      link: {
        url: "/tin-tuc/le-khoi-cong",
        is_external: false,
        nofollow: false,
      },
    },
    {
      image: {
        url: "https://placehold.co/800x450/png?text=News+2",
        alt: "Nhà 2 mặt tiền",
        display_dimensions: { width: 800, height: 450 },
      },
      time: "12/03/2026",
      title: "Top 8 thiết kế nhà 2 mặt tiền đẹp và tối ưu công năng",
      link: {
        url: "/tin-tuc/nha-2-mat-tien",
        is_external: false,
        nofollow: false,
      },
    },
    {
      image: {
        url: "https://placehold.co/800x450/png?text=News+3",
        alt: "Văn phòng 7 tầng",
        display_dimensions: { width: 800, height: 450 },
      },
      time: "10/03/2026",
      title: "Gợi ý 6 mẫu nhà văn phòng 7 tầng hiện đại",
      link: {
        url: "/tin-tuc/van-phong-7-tang",
        is_external: false,
        nofollow: false,
      },
    },
    {
      image: {
        url: "https://placehold.co/800x450/png?text=News+4",
        alt: "Showroom",
        display_dimensions: { width: 800, height: 450 },
      },
      time: "08/03/2026",
      title: "Không gian showroom tối giản với ánh sáng tự nhiên",
      link: {
        url: "/tin-tuc/showroom",
        is_external: false,
        nofollow: false,
      },
    },
    {
      image: {
        url: "https://placehold.co/800x450/png?text=News+5",
        alt: "Thi công nội thất",
        display_dimensions: { width: 800, height: 450 },
      },
      time: "05/03/2026",
      title: "Quy trình thi công nội thất chuẩn ICHouse",
      link: {
        url: "/tin-tuc/quy-trinh-thi-cong",
        is_external: false,
        nofollow: false,
      },
    },
  ],
  buttonLabel: "TÌM HIỂU THÊM",
  buttonLink: {
    url: "/tin-tuc",
    is_external: false,
    nofollow: false,
  },
  scrollReveal: {
    targetId: "news-events",
  },
};

export default newsEvents;
export { newsEvents };

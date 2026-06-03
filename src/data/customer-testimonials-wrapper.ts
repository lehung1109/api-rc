import type { CustomerTestimonialsModel } from "@/components/customer-testimonials/CustomerTestimonialsWrapper";

const customerTestimonialsWrapper: CustomerTestimonialsModel = {
  title: "Cảm nhận của khách hàng",
  description:
    "Mời bạn tham khảo cảm nhận của các khách hàng đã dùng dịch vụ thiết kế – thi công tại Hoàn Mỹ Decor",
  items: [
    {
      image: {
        url: "https://placehold.co/640x360/333/fff?text=Nha+pho+Ninh+Binh",
        alt: "Nhà phố 450m² Ninh Bình",
        display_dimensions: { width: 640, height: 360 },
      },
      youtubeVideoId: "dQw4w9WgXcQ",
    },
    {
      image: {
        url: "https://placehold.co/640x360/444/fff?text=Riverside+150m2",
        alt: "Riverside 150m² nội thất chung cư",
        display_dimensions: { width: 640, height: 360 },
      },
      youtubeVideoId: "dQw4w9WgXcQ",
    },
    {
      image: {
        url: "https://placehold.co/640x360/555/fff?text=Nha+pho+Bac+Giang",
        alt: "Nhà phố Bắc Giang hoàn thiện",
        display_dimensions: { width: 640, height: 360 },
      },
      youtubeVideoId: "dQw4w9WgXcQ",
    },
  ],
};

export default customerTestimonialsWrapper;

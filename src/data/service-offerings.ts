import type { ServiceOfferingsModel } from "@/components/service-offerings/ServiceOfferings";

const serviceOfferings: ServiceOfferingsModel = {
  items: [
    {
      title: "Thiết kế kiến trúc và nội thất công trình dân dụng",
      descriptionHtml: `<ul>
<li>Thiết kế mặt bằng công năng và phối cảnh 3D ngoại thất, nội thất.</li>
<li>Triển khai chi tiết hồ sơ thiết kế thi công kiến trúc, kết cấu và điện nước hoàn thiện.</li>
</ul>`,
      image: {
        url: "https://placehold.co/450x480/png?text=Thiet+ke",
        alt: "Thiết kế kiến trúc và nội thất",
        display_dimensions: { width: 450, height: 480 },
      },
    },
    {
      title: "Thi công xây dựng công trình",
      descriptionHtml: `<ul>
<li>Thi công xây dựng phần thô và Thi công hoàn thiện, lắp đặt trang thiết bị cơ điện.</li>
<li>Sản xuất, thi công lắp đặt đồ nội thất &amp; các giải pháp thông minh.</li>
</ul>`,
      image: {
        url: "https://placehold.co/450x480/png?text=Thi+cong",
        alt: "Thi công xây dựng công trình",
        display_dimensions: { width: 450, height: 480 },
      },
    },
  ],
  scrollReveal: {
    targetId: "service-offerings",
  },
};

export default serviceOfferings;
export { serviceOfferings };

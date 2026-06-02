import type { PricingCardsModel } from "@/components/pricing-cards/PricingCards";

const pricingCards = {
  items: [
    {
      title: "Gói cơ bản",
      price: "180,000đ/m²",
      htmlText: `
        <ul>
          <li>Phong cách: Hiện đại, Tối giản</li>
          <li>Tư vấn thiết kế miễn phí</li>
          <li>Thời gian triển khai: 10-20 ngày</li>
          <li>Chỉnh sửa tối đa 3 lần</li>
          <li>Kiến trúc sư 1-3 năm kinh nghiệm</li>
          <li>Bàn giao: 3D + Bản vẽ kỹ thuật</li>
          <li>Dự toán chi phí ngân sách</li>
        </ul>
      `,
      buttonLabel: "Đăng ký thiết kế",
      buttonLink: {
        url: "/lien-he",
        is_external: false,
        nofollow: false,
      },
    },
    {
      title: "Gói nâng cao",
      price: "250,000đ/m²",
      htmlText: `
        <ul>
          <li>Phong cách: Hiện đại, Tối giản, Tân cổ, Đương đại</li>
          <li>Tư vấn thiết kế miễn phí</li>
          <li>Thời gian triển khai: 15-25 ngày</li>
          <li>Chỉnh sửa tối đa <strong>5 lần</strong></li>
          <li>Kiến trúc sư <strong>3-5 năm</strong> kinh nghiệm</li>
          <li>Bàn giao: 3D + Bản vẽ kỹ thuật</li>
          <li>Dự toán chi phí ngân sách</li>
          <li>Giám sát quyền tác giả</li>
        </ul>
      `,
      buttonLabel: "Đăng ký thiết kế",
      buttonLink: {
        url: "/lien-he",
        is_external: false,
        nofollow: false,
      },
      active: true,
    },
    {
      title: "Gói cao cấp",
      price: "350,000đ/m²",
      htmlText: `
        <ul>
          <li>Phong cách: Hiện đại, Tối giản, Tân cổ, Đương đại, Luxury</li>
          <li>Tư vấn thiết kế miễn phí</li>
          <li>Thời gian triển khai: 20-30 ngày</li>
          <li>Chỉnh sửa tối đa <strong>7 lần</strong></li>
          <li>Kiến trúc sư <strong>5-7 năm</strong> kinh nghiệm</li>
          <li>Bàn giao: 3D + Bản vẽ kỹ thuật</li>
          <li>Dự toán chi phí ngân sách</li>
          <li>Giám sát quyền tác giả</li>
          <li>Hỗ trợ làm hồ sơ cấp phép cải tạo, thi công nội thất</li>
        </ul>
      `,
      buttonLabel: "Đăng ký thiết kế",
      buttonLink: {
        url: "/lien-he",
        is_external: false,
        nofollow: false,
      },
    },
    {
      title: "Gói Luxury",
      price: "1,000,000đ/m²",
      htmlText: `
        <ul>
          <li>Phong cách: Modern Luxury, Cổ điển</li>
          <li>Tư vấn thiết kế miễn phí</li>
          <li>Thời gian triển khai: 45-60 ngày</li>
          <li>Chỉnh sửa tối đa <strong>Không giới hạn</strong></li>
          <li>Kiến trúc sư <strong>trên 10 năm</strong> kinh nghiệm</li>
          <li>Bàn giao: 3D + Bản vẽ kỹ thuật</li>
          <li>Dự toán chi phí ngân sách</li>
          <li>Giám sát quyền tác giả</li>
          <li>Hỗ trợ làm hồ sơ cấp phép cải tạo, thi công nội thất</li>
        </ul>
      `,
      buttonLabel: "Đăng ký thiết kế",
      buttonLink: {
        url: "/lien-he",
        is_external: false,
        nofollow: false,
      },
    },
  ],
} satisfies PricingCardsModel;

export default pricingCards;


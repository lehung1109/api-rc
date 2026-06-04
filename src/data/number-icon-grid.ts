import type { NumberIconGridModel } from "@/components/number-icon-grid/NumberIconGrid";

const iconDimensions = { width: 80, height: 80 };

const numberIconGrid: NumberIconGridModel = {
  items: [
    {
      number: 1,
      image: {
        url: "https://placehold.co/80x80/D9A441/ffffff/png?text=1",
        alt: "Khảo sát và tư vấn",
        display_dimensions: iconDimensions,
      },
      title: "Khảo sát và tư vấn về từng hạng mục",
    },
    {
      number: 2,
      image: {
        url: "https://placehold.co/80x80/D9A441/ffffff/png?text=2",
        alt: "Báo giá thiết kế và thi công",
        display_dimensions: iconDimensions,
      },
      title: "Báo giá thiết kế & thi công các hạng mục",
    },
    {
      number: 3,
      image: {
        url: "https://placehold.co/80x80/D9A441/ffffff/png?text=3",
        alt: "Thảo luận và ký hợp đồng",
        display_dimensions: iconDimensions,
      },
      title: "Thảo luận và ký hợp đồng thi công",
    },
    {
      number: 4,
      image: {
        url: "https://placehold.co/80x80/D9A441/ffffff/png?text=4",
        alt: "Triển khai thi công dự án",
        display_dimensions: iconDimensions,
      },
      title: "Triển khai thi công dự án nội thất",
    },
    {
      number: 5,
      image: {
        url: "https://placehold.co/80x80/D9A441/ffffff/png?text=5",
        alt: "Nghiệm thu và bàn giao",
        display_dimensions: iconDimensions,
      },
      title: "Nghiệm thu và bàn giao sản phẩm",
    },
    {
      number: 6,
      image: {
        url: "https://placehold.co/80x80/D9A441/ffffff/png?text=6",
        alt: "Bảo hành sản phẩm",
        display_dimensions: iconDimensions,
      },
      title: "Bảo hành sản phẩm sau khi bàn giao",
    },
  ],
};

export default numberIconGrid;

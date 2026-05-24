import type { ProcessSectionModel } from "@/components/process-section/ProcessSection";
import { Banknote, Cog, PencilRuler, UserRound } from "lucide-react";

const processSection: ProcessSectionModel = {
  backgroundImage: {
    url: "https://placehold.co/2600x800/png",
    alt: "Process Section Background",
    display_dimensions: {
      width: 1920,
      height: 1080,
    },
  },
  steps: [
    {
      id: 1,
      title: "Tư vấn",
      description: "Liên hệ tư vấn và ước lượng quy mô sản phẩm",
      icon: UserRound,
    },
    {
      id: 2,
      title: "Thiết kế",
      description: "Phác họa và tính toán chi tiết cho dự án sắp thực hiện",
      icon: PencilRuler,
    },
    {
      id: 3,
      title: "Thi công lắp đặt",
      description: "Đội ngũ thi công giàu kinh nghiệm, chuyên nghiệp",
      icon: Cog,
    },
    {
      id: 4,
      title: "Thanh toán bảo trì",
      description: "Bảo trì theo kỳ hạn tiêu chuẩn của nhà sản xuất",
      icon: Banknote,
    },
  ],
};

export { processSection };

import type { ProcessSectionModel } from "@/components/process-section/ProcessSection";

const processSectionIntroContent =
  '<h2 class="uppercase text-[1.6rem] font-bold">QUY TRÌNH THI CÔNG CỦA HOÀN MỸ <span class="text-orange-500">DECOR</span></h2><p class="mt-4">Để Quý khách hàng không mất quá nhiều thời gian trong việc lựa chọn đơn vị Tư vấn – Thiết kế nội thất uy tín, Hoàn Mỹ Decor giới thiệu tới Quý khách hàng Quy trình Tư vấn – Thiết kế nội thất chuyên nghiệp, trọn gói.</p>';

const processSection: ProcessSectionModel = {
  introContent: processSectionIntroContent,
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
      icon: "user-round",
    },
    {
      id: 2,
      title: "Thiết kế",
      description: "Phác họa và tính toán chi tiết cho dự án sắp thực hiện",
      icon: "pencil-ruler",
    },
    {
      id: 3,
      title: "Thi công lắp đặt",
      description: "Đội ngũ thi công giàu kinh nghiệm, chuyên nghiệp",
      icon: "cog",
    },
    {
      id: 4,
      title: "Thanh toán bảo trì",
      description: "Bảo trì theo kỳ hạn tiêu chuẩn của nhà sản xuất",
      icon: "banknote",
    },
  ],
};

export { processSection };

import type { ProcessSectionModel } from "@/components/process-section/ProcessSection";

const processSectionIntroContent =
  '<h2 class="uppercase text-[1.6rem] font-bold">QUY TRÌNH THIẾT KẾ & THI CÔNG CỦA NỘI THẤT <span class="text-orange-500">IC HOUSE</span></h2><p class="mt-4">Để Quý khách hàng không mất quá nhiều thời gian trong việc lựa chọn đơn vị Tư vấn – Thiết kế nội thất uy tín, Nội thất IC HOUSE giới thiệu tới Quý khách hàng Quy trình Tư vấn – Thiết kế – Sản xuất & Thi công nội thất chuyên nghiệp, trọn gói.</p>';

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
      title: "Tư vấn & Khảo sát",
      description: "Khảo sát thực tế tại căn hộ và tư vấn phương án tối ưu công năng",
      icon: "user-round",
    },
    {
      id: 2,
      title: "Thiết kế 3D Bespoke",
      description: "Lên mặt bằng 2D, phối cảnh 3D cá nhân hóa và bảng dự toán chi tiết",
      icon: "pencil-ruler",
    },
    {
      id: 3,
      title: "Sản xuất & Thi công",
      description: "Sản xuất trực tiếp tại nhà máy 2.000m² và lắp đặt chuẩn kỹ thuật",
      icon: "cog",
    },
    {
      id: 4,
      title: "Bàn giao & Bảo hành",
      description: "Nghiệm thu bàn giao, bảo hành 2 năm và bảo trì định kỳ 5 năm",
      icon: "banknote",
    },
  ],
};

export { processSection };

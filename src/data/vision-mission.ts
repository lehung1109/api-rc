import type { VisionMissionModel } from "@/components/vision-mission/VisionMission";

const visionMission: VisionMissionModel = {
  columns: [
    {
      title: "TẦM NHÌN",
      items: [
        {
          title: "2027 - Doanh nghiệp xây dựng dân dụng có vị thế tại Việt Nam",
          description:
            "Trở thành doanh nghiệp xây dựng dân dụng có vị thế tại Việt Nam, kiến tạo những công trình nhà ở kiểu mẫu, góp phần thay đổi diện mạo đô thị và nâng cao chất lượng sống của khách hàng.",
        },
        {
          title: "2030 - Doanh nghiệp xây dựng dân dụng kiểu mẫu tại Việt Nam",
          description:
            "Trở thành hình mẫu trong lĩnh vực xây dựng nhà ở dân dụng cao cấp tại Việt Nam - nơi hội tụ đội ngũ chuyên nghiệp, quy trình chuẩn hóa và công trình đạt chuẩn chất lượng cao, góp phần phát triển bền vững ngành xây dựng.",
        },
      ],
    },
    {
      title: "SỨ MỆNH",
      items: [
        {
          title: "Tạo nên những công trình giàu sức sáng tạo",
          description:
            "ICHOUSE tạo nên những công trình giàu sức sáng tạo mang phong cách kiến trúc đặc sắc, áp dụng các giải pháp kết cấu và công nghệ xây dựng Châu Âu, đảm bảo tính bền vững với thời gian.",
        },
        {
          title: "Góp phần phát triển xã hội bền vững",
          description:
            "Ngoài ra, ICHOUSE còn góp phần phát triển xã hội trên cơ sở là tác nhân quan trọng trong xu thế phát triển bền vững ở lĩnh vực này.",
        },
      ],
    },
  ],
  scrollReveal: {
    targetId: "vision-mission",
  },
};

export default visionMission;
export { visionMission };

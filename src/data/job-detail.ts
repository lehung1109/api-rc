import type { JobDetailModel } from "@/components/job-detail/JobDetail";

const jobDetail: JobDetailModel = {
  title: "Architecto tuyển dụng Content Creator - HCM",
  metadata: ["Toàn thời gian", "Hồ Chí Minh"],
  sections: [
    {
      title: "Mô tả công việc",
      items: [
        "Lên ý tưởng, kịch bản và trực tiếp sản xuất nội dung trên các nền tảng truyền thông của công ty.",
        "Phối hợp cùng đội ngũ thiết kế để xây dựng hình ảnh, video và bài viết nhất quán với định hướng thương hiệu.",
        "Theo dõi hiệu quả nội dung, cập nhật xu hướng và đề xuất phương án cải thiện tương tác.",
      ],
    },
    {
      title: "Quyền lợi được hưởng",
      items: [
        "Thu nhập cạnh tranh theo năng lực và hiệu quả công việc.",
        "Được tham gia đầy đủ các chế độ bảo hiểm, nghỉ phép và hoạt động nội bộ.",
        "Môi trường sáng tạo, chủ động và có cơ hội phát triển cùng các dự án thực tế.",
      ],
    },
    {
      title: "Yêu cầu công việc",
      items: [
        "Có kinh nghiệm sáng tạo nội dung cho website và mạng xã hội.",
        "Khả năng viết, biên tập và kể chuyện tốt; ưu tiên ứng viên có kỹ năng quay dựng cơ bản.",
        "Chủ động, có trách nhiệm và phối hợp nhóm hiệu quả.",
      ],
    },
    {
      title: "Thông tin liên hệ",
      items: [
        "Gửi CV và portfolio về email tuyển dụng của công ty.",
        "Tiêu đề email: Content Creator - Họ và tên.",
      ],
    },
  ],
  sidebarTitle: "Ứng tuyển khác",
  relatedJobs: [
    {
      categoryLabel: "Architecto tuyển dụng",
      title: "Content Creator - HCM",
      link: {
        url: "/tuyen-dung/content-creator-hcm",
        is_external: false,
        nofollow: false,
      },
      metadata: ["Toàn thời gian", "Hồ Chí Minh"],
    },
    {
      categoryLabel: "Architecto tuyển dụng",
      title: "Kiến trúc sư triển khai",
      link: {
        url: "/tuyen-dung/kien-truc-su-trien-khai",
        is_external: false,
        nofollow: false,
      },
      metadata: ["Toàn thời gian", "Hà Nội"],
    },
    {
      categoryLabel: "Architecto tuyển dụng",
      title: "Nhân viên kinh doanh",
      link: {
        url: "/tuyen-dung/nhan-vien-kinh-doanh",
        is_external: false,
        nofollow: false,
      },
      metadata: ["Toàn thời gian", "Hà Nội"],
    },
    {
      categoryLabel: "Architecto tuyển dụng",
      title: "Chuyên viên Marketing",
      link: {
        url: "/tuyen-dung/chuyen-vien-marketing",
        is_external: false,
        nofollow: false,
      },
      metadata: ["Toàn thời gian", "Hà Nội"],
    },
  ],
};

export default jobDetail;

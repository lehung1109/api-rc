import type { ProjectMetaBarModel } from "@/components/project-meta-bar/ProjectMetaBar";

const projectMetaBar: ProjectMetaBarModel = {
  columns: [
    {
      title: "Khách hàng",
      content: "Anh Công",
      icon: "user-round",
    },
    {
      title: "Số phòng ngủ",
      content: "2 phòng",
      icon: "bed-double",
    },
    {
      title: "Phong cách thiết kế",
      content: "Hiện đại",
      icon: "palette",
    },
    {
      title: "Diện tích",
      content: "50-100m²",
      icon: "ruler",
    },
  ],
};

export { projectMetaBar };

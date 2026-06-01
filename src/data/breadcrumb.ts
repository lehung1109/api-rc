import type { BreadcrumbModel } from "@/components/breadcrumb/Breadcrumb";

const breadcrumb: BreadcrumbModel = {
  linkLevels: [
    {
      label: "Trang chủ",
      link: {
        url: "/",
        is_external: false,
        nofollow: false,
      },
    },
    {
      label: "(Đã xác minh)",
      link: {
        url: "/ban-dao-bep",
        is_external: false,
        nofollow: false,
      },
      verified: true,
    },
  ],
  currentLabel:
    "TOP 30+Mẫu bàn đảo bếp rời đẹp, thông minh và hiện đại 2026",
};

export default breadcrumb;

import type { PageTitleBarModel } from "@/components/page-title-bar/PageTitleBar";

const pageTitleBar: PageTitleBarModel = {
  title: "THIẾT KẾ NỘI THẤT CĂN HỘ CAO CẤP VINHOMES OCEAN PARK – IC HOUSE",
  breadcrumbLevels: [
    {
      items: [
        {
          label: "Home",
          link: {
            url: "/",
            is_external: false,
            nofollow: false,
          },
        },
      ],
    },
    {
      items: [
        {
          label: "Chung cư",
          link: {
            url: "/chung-cu",
            is_external: false,
            nofollow: false,
          },
        },
        {
          label: "Thi công chung cư",
          link: {
            url: "/thi-cong-chung-cu",
            is_external: false,
            nofollow: false,
          },
        },
        {
          label: "Thiết kế chung cư",
          link: {
            url: "/thiet-ke-chung-cu",
            is_external: false,
            nofollow: false,
          },
        },
      ],
    },
  ],
};

export { pageTitleBar };

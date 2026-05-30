import type { PageTitleBarModel } from "@/components/page-title-bar/PageTitleBar";

const pageTitleBar: PageTitleBarModel = {
  title: "THIẾT KẾ NỘI THẤT CHUNG CƯ TONE ĐEN TRẮNG – HM18",
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

import type { HeaderInnerModel } from "@/components/header/HeaderInner";

const headerInner: HeaderInnerModel = {
  logo: {
    url: "//noithat.ichouse.vn/wp-content/uploads/2024/02/ct-el-logo-dark.png",
    alt: "Nội thất IC HOUSE",
    display_dimensions: {
      width: 100,
      height: 100,
    },
    link: {
      url: "/",
      nofollow: false,
      is_external: false,
    },
  },
  info_list: [
    {
      icon: {
        url: "//noithat.ichouse.vn/wp-content/uploads/2024/02/ct-el-logo-dark.png",
        alt: "Icon",
        display_dimensions: {
          width: 100,
          height: 100,
        },
      },
      text: "<p><strong>Nhà mẫu Ocean Park</strong></p><p>Sao Biển 23, Vinhomes Ocean Park</p>",
    },
    {
      icon: {
        url: "//noithat.ichouse.vn/wp-content/uploads/2024/02/ct-el-logo-dark.png",
        alt: "Icon",
        display_dimensions: {
          width: 100,
          height: 100,
        },
      },
      text: "<p><strong>Văn phòng & Nhà máy</strong></p><p>Số 01 Voi Phục • Như Quỳnh</p>",
    },
    {
      icon: {
        url: "//noithat.ichouse.vn/wp-content/uploads/2024/02/ct-el-logo-dark.png",
        alt: "Icon",
        display_dimensions: {
          width: 100,
          height: 100,
        },
      },
      text: "<p><strong>Giờ làm việc</strong></p><p>T2 - CN: 08:00 - 18:30</p>",
    },
  ],
};

export { headerInner };

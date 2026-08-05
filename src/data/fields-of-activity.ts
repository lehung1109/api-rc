import type { FieldsOfActivityModel } from "@/components/fields-of-activity/FieldsOfActivity";

const fieldsOfActivity: FieldsOfActivityModel = {
  title: "Lĩnh vực hoạt động",
  items: [
    {
      title: "Thiết kế kiến trúc và nội thất công trình dân dụng",
      contentHtml:
        "<ul><li>Thiết kế kiến trúc công trình dân dụng</li><li>Thiết kế nội thất và hồ sơ kỹ thuật thi công</li></ul>",
      iconImage: {
        url: "https://placehold.co/80x80/D9A441/022B63/png?text=Icon",
        alt: "Biểu tượng thiết kế",
        display_dimensions: {
          width: 80,
          height: 80,
        },
      },
      defaultOpen: true,
    },
    {
      title: "Thi công xây dựng công trình",
      contentHtml:
        "<ul><li>Thi công xây dựng phần thô và hoàn thiện</li><li>Giám sát và bàn giao công trình</li></ul>",
      iconImage: {
        url: "https://placehold.co/80x80/022B63/ffffff/png?text=Icon",
        alt: "Biểu tượng thi công",
        display_dimensions: {
          width: 80,
          height: 80,
        },
      },
      defaultOpen: false,
    },
  ],
  images: [
    {
      url: "https://placehold.co/480x640/888888/ffffff?text=Blueprint",
      alt: "Bản vẽ kiến trúc và mẫu vật liệu",
      display_dimensions: {
        width: 480,
        height: 640,
      },
    },
    {
      url: "https://placehold.co/480x640/666666/ffffff?text=Construction",
      alt: "Kỹ sư trên công trường",
      display_dimensions: {
        width: 480,
        height: 640,
      },
    },
  ],
  buttonLabel: "TÌM HIỂU THÊM",
  buttonLink: {
    url: "/linh-vuc-hoat-dong",
    is_external: false,
    nofollow: false,
  },
  scrollReveal: {
    targetId: "fields-of-activity",
  },
};

export default fieldsOfActivity;
export { fieldsOfActivity };

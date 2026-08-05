import type { ConstructionHighlightsModel } from "@/components/construction-highlights/ConstructionHighlights";

const constructionHighlights: ConstructionHighlightsModel = {
  subtitle: "ĐIỂM NỔI BẬT CỦA ICHOUSE",
  titleHtml:
    'Với hơn 10 năm kinh nghiệm trong lĩnh vực xây dựng, <span class="text-brand-gold">ICHOUSE</span> tự hào là đơn vị <span class="text-brand-gold">tiên phong</span> trong việc cung cấp các giải pháp xây dựng toàn diện và đồng bộ.',
  items: [
    {
      title:
        "Đối tác thi công số 1 của các công ty thiết kế hàng đầu Việt Nam",
      contentHtml:
        "<p>ICHOUSE đồng hành cùng các công ty thiết kế hàng đầu để hiện thực hóa ý tưởng kiến trúc thành công trình chất lượng, đúng tiến độ và thẩm mỹ.</p>",
      iconImage: {
        url: "https://placehold.co/80x80/ffffff/022B63/png?text=01",
        alt: "Biểu tượng đối tác thi công",
        display_dimensions: {
          width: 80,
          height: 80,
        },
      },
      defaultOpen: true,
    },
    {
      title: "Đội ngũ chuyên gia giàu kinh nghiệm",
      contentHtml:
        "<p>Đội ngũ kiến trúc sư và quản lý dự án dày dạn kinh nghiệm, kiểm soát chặt chẽ từng giai đoạn từ thiết kế đến bàn giao.</p>",
      iconImage: {
        url: "https://placehold.co/80x80/ffffff/022B63/png?text=02",
        alt: "Biểu tượng chuyên gia",
        display_dimensions: {
          width: 80,
          height: 80,
        },
      },
      defaultOpen: false,
    },
    {
      title: "Đội ngũ Kỹ sư chuyên môn cao",
      contentHtml:
        "<p>Kỹ sư chuyên môn cao giám sát kỹ thuật tại công trường, đảm bảo tiêu chuẩn an toàn và chất lượng thi công.</p>",
      iconImage: {
        url: "https://placehold.co/80x80/ffffff/022B63/png?text=03",
        alt: "Biểu tượng kỹ sư",
        display_dimensions: {
          width: 80,
          height: 80,
        },
      },
      defaultOpen: false,
    },
    {
      title: "Dịch vụ xây dựng toàn diện và đồng bộ",
      contentHtml:
        "<p>Cung cấp giải pháp xây dựng đồng bộ từ phần thô đến hoàn thiện, tối ưu chi phí và tiến độ cho chủ đầu tư.</p>",
      iconImage: {
        url: "https://placehold.co/80x80/ffffff/022B63/png?text=04",
        alt: "Biểu tượng dịch vụ toàn diện",
        display_dimensions: {
          width: 80,
          height: 80,
        },
      },
      defaultOpen: false,
    },
  ],
  image: {
    url: "https://placehold.co/960x720/888888/ffffff?text=Construction+Highlights",
    alt: "Kỹ sư trên công trường với bản vẽ kiến trúc",
    display_dimensions: {
      width: 960,
      height: 720,
    },
    srcSet:
      "https://placehold.co/640x480/888888/ffffff?text=Highlights+Mobile 640w, " +
      "https://placehold.co/960x720/888888/ffffff?text=Construction+Highlights 960w",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  scrollReveal: {
    targetId: "construction-highlights",
  },
};

export default constructionHighlights;
export { constructionHighlights };

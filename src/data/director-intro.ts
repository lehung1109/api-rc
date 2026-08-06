import type { DirectorIntroModel } from "@/components/director-intro/DirectorIntro";

const directorIntro: DirectorIntroModel = {
  image: {
    url: "https://placehold.co/640x800/png?text=Director",
    alt: "Giám đốc – TS. Nguyễn Văn A",
    display_dimensions: {
      width: 640,
      height: 800,
    },
    srcSet:
      "https://placehold.co/480x600/png?text=Director+Mobile 480w, " +
      "https://placehold.co/640x800/png?text=Director 640w",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  subtitle: "GIÁM ĐỐC – TS. NGUYỄN VĂN A",
  descriptionHtml:
    "<p>ICHOUSE ra đời với mong muốn thay đổi cách thức xây dựng và quy chuẩn công trình chất lượng của người Việt. Tôn chỉ làm việc của ICHOUSE là “tri thức trong xây dựng”.</p>",
  buttonLabel: "TÌM HIỂU THÊM",
  buttonLink: {
    url: "/gioi-thieu",
    is_external: false,
    nofollow: false,
  },
  scrollReveal: {
    targetId: "director-intro",
  },
};

export default directorIntro;
export { directorIntro };

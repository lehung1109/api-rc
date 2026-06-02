import type { HeroSectionModel } from "@/components/hero-section/HeroSection";

const heroSection = {
  backgroundImage: {
    url: "https://placehold.co/1600x700/jpg",
    alt: "Hero background",
    display_dimensions: { width: 1600, height: 700 },
  },
  subtitle: "Thi công nội thất chung cư đẹp",
  title: "Cùng Kiến trúc sư kinh nghiệm",
  htmlText:
    "<ul><li>Đa dạng phong cách bởi nhân lực 30+ KTS</li><li>Kỹ năng trong nghề từ 2 - 10 năm kinh nghiệm</li><li>Trải qua 5000+ Thiết kế chung cư từ phân khúc cao cấp tới giá rẻ</li></ul>",
  buttonLabel: "Tư vấn miễn phí",
  buttonLink: { url: "#tu-van", is_external: false, nofollow: false },
} satisfies HeroSectionModel;

export default heroSection;


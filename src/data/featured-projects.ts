import type { FeaturedProjectsModel } from "@/components/featured-projects/FeaturedProjects";

const featuredProjects: FeaturedProjectsModel = {
  subtitle: "DỰ ÁN",
  title: "Dự án nổi bật tại ICHOUSE",
  items: [
    {
      image: {
        url: "https://placehold.co/600x800/png?text=Villa+1",
        alt: "Biệt thự Nghĩa Đô",
        display_dimensions: { width: 600, height: 800 },
      },
      title: "Biệt thự Nghĩa Đô",
      description: "Chủ đầu tư: Mr. TAI\nMô hình: Biệt thự - Villa",
      link: {
        url: "/du-an/biet-thu-nghia-do",
        is_external: false,
        nofollow: false,
      },
    },
    {
      image: {
        url: "https://placehold.co/600x800/png?text=THT+Tower",
        alt: "THT Tower",
        display_dimensions: { width: 600, height: 800 },
      },
      title: "THT TOWER",
      description: "VĂN PHÒNG",
      link: { url: "/du-an/tht-tower", is_external: false, nofollow: false },
    },
    {
      image: {
        url: "https://placehold.co/600x800/png?text=Residence",
        alt: "Nhà phố hiện đại",
        display_dimensions: { width: 600, height: 800 },
      },
      title: "Nhà phố hiện đại",
      description: "Chủ đầu tư: Mr. Hùng\nMô hình: Nhà phố",
      link: {
        url: "/du-an/nha-pho-hien-dai",
        is_external: false,
        nofollow: false,
      },
    },
  ],
  buttonLabel: "XEM TẤT CẢ DỰ ÁN",
  buttonLink: {
    url: "/du-an",
    is_external: false,
    nofollow: false,
  },
  scrollReveal: {
    targetId: "featured-projects",
  },
};

export default featuredProjects;
export { featuredProjects };

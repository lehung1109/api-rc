import type { ProjectShowcaseFiltersModel } from "@/lib/project-showcase/types";

const projectImage = (seed: number) => ({
  url: `https://placehold.co/600x400/png?text=Project+${seed}`,
  alt: `Dự án ${seed}`,
  display_dimensions: { width: 600, height: 400 },
});

const projectUrl = (id: string) => ({
  url: `/du-an/${id}`,
  is_external: false,
  nofollow: false,
});

export const projectShowcaseFilters: ProjectShowcaseFiltersModel = {
  filterEndpoint: "/api/projects/filter",
  taxonomies: [
    { key: "area", label: "Diện tích" },
    { key: "beds", label: "Số phòng ngủ" },
    { key: "style", label: "Phong cách" },
  ],
  filters: {
    area: "50-100",
    beds: "2",
    style: "modern",
  },
  filterOptions: {
    area: [
      { value: "50-100", label: "50-100m²" },
      { value: "100-200", label: "100-200m²" },
      { value: "200-plus", label: ">200m²" },
    ],
    beds: [
      { value: "2", label: "2 phòng" },
      { value: "4", label: "4 phòng" },
    ],
    style: [
      { value: "modern", label: "Hiện đại" },
      { value: "neoclassical", label: "Tân cổ điển" },
      { value: "indochine", label: "Indochine" },
    ],
  },
  projects: [
    {
      id: "hm18",
      title: "Thiết kế nội thất chung cư tone đen trắng - HM18",
      url: projectUrl("hm18"),
      image: projectImage(18),
      terms: {
        area: { value: "50-100", label: "50-100m²" },
        beds: { value: "2", label: "2 phòng" },
        style: { value: "modern", label: "Hiện đại" },
      },
    },
    {
      id: "hm48",
      title:
        "Thiết kế nội thất biệt thự Vinhomes Riverside (Anh Ngọc Anh) – HM48",
      url: projectUrl("hm48"),
      image: projectImage(48),
      terms: {
        area: { value: "100-200", label: "100-200m²" },
        beds: { value: "2", label: "2 phòng" },
        style: { value: "neoclassical", label: "Tân cổ điển" },
      },
    },
    {
      id: "hm19",
      title: "Thiết kế nội thất biệt thự tone đen tại Hà Nội – HM19",
      url: projectUrl("hm19"),
      image: projectImage(19),
      terms: {
        area: { value: "50-100", label: "50-100m²" },
        beds: { value: "2", label: "2 phòng" },
        style: { value: "modern", label: "Hiện đại" },
      },
    },
    {
      id: "hm14",
      title: "Thiết kế nội thất biệt thự An Quý Villa Dương Nội – HM14",
      url: projectUrl("hm14"),
      image: projectImage(14),
      terms: {
        area: { value: "200-plus", label: ">200m²" },
        beds: { value: "4", label: "4 phòng" },
        style: { value: "indochine", label: "Indochine" },
      },
    },
    {
      id: "hm22",
      title: "Thiết kế nội thất căn hộ Masteri Thảo Điền – HM22",
      url: projectUrl("hm22"),
      image: projectImage(22),
      terms: {
        area: { value: "50-100", label: "50-100m²" },
        beds: { value: "2", label: "2 phòng" },
        style: { value: "modern", label: "Hiện đại" },
      },
    },
    {
      id: "hm31",
      title: "Thiết kế nội thất penthouse Landmark 81 – HM31",
      url: projectUrl("hm31"),
      image: projectImage(31),
      terms: {
        area: { value: "200-plus", label: ">200m²" },
        beds: { value: "4", label: "4 phòng" },
        style: { value: "modern", label: "Hiện đại" },
      },
    },
    {
      id: "hm27",
      title: "Thiết kế nội thất biệt thự Ecopark tone kem – HM27",
      url: projectUrl("hm27"),
      image: projectImage(27),
      terms: {
        area: { value: "100-200", label: "100-200m²" },
        beds: { value: "4", label: "4 phòng" },
        style: { value: "neoclassical", label: "Tân cổ điển" },
      },
    },
    {
      id: "hm35",
      title: "Thiết kế nội thất shophouse Indochine Quận 2 – HM35",
      url: projectUrl("hm35"),
      image: projectImage(35),
      terms: {
        area: { value: "100-200", label: "100-200m²" },
        beds: { value: "2", label: "2 phòng" },
        style: { value: "indochine", label: "Indochine" },
      },
    },
  ],
};

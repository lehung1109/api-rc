import { filterPage } from "@/lib/project-category-gallery/filter-page";
import type {
  ProjectCategoryGalleryItemModel,
  ProjectCategoryGalleryModel,
} from "@/lib/project-category-gallery/types";

export const projectCategoryGalleryCatalog: ProjectCategoryGalleryItemModel[] =
  [
    {
      id: "1",
      image: {
        url: "https://placehold.co/502x602/png?text=Ciputra",
        alt: "Biệt thự Ciputra",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Biệt thự Ciputra - Không gian sống chuẩn quốc tế",
      description: "Chủ đầu tư: Mr. Trung\nMô hình: Biệt thự - Villa",
      link: {
        url: "/du-an/biet-thu-ciputra",
        is_external: false,
        nofollow: false,
      },
      category: "biet-thu-villa",
    },
    {
      id: "2",
      image: {
        url: "https://placehold.co/502x602/png?text=Villa+2",
        alt: "Biệt thự Nghĩa Đô",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Biệt thự Nghĩa Đô",
      description: "Chủ đầu tư: Mr. Tai\nMô hình: Biệt thự - Villa",
      link: {
        url: "/du-an/biet-thu-nghia-do",
        is_external: false,
        nofollow: false,
      },
      category: "biet-thu-villa",
    },
    {
      id: "3",
      image: {
        url: "https://placehold.co/502x602/png?text=Villa+3",
        alt: "Biệt thự Tây Hồ",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Biệt thự Tây Hồ",
      description: "Chủ đầu tư: Mrs. Lan\nMô hình: Biệt thự - Villa",
      link: {
        url: "/du-an/biet-thu-tay-ho",
        is_external: false,
        nofollow: false,
      },
      category: "biet-thu-villa",
    },
    {
      id: "4",
      image: {
        url: "https://placehold.co/502x602/png?text=Nha+Pho+1",
        alt: "Nhà phố hiện đại",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Nhà phố hiện đại",
      description: "Chủ đầu tư: Mr. Hùng\nMô hình: Nhà phố",
      link: {
        url: "/du-an/nha-pho-hien-dai",
        is_external: false,
        nofollow: false,
      },
      category: "nha-pho",
    },
    {
      id: "5",
      image: {
        url: "https://placehold.co/502x602/png?text=Nha+Pho+2",
        alt: "Nhà phố Cầu Giấy",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Nhà phố Cầu Giấy",
      description: "Chủ đầu tư: Mr. Minh\nMô hình: Nhà phố",
      link: {
        url: "/du-an/nha-pho-cau-giay",
        is_external: false,
        nofollow: false,
      },
      category: "nha-pho",
    },
    {
      id: "6",
      image: {
        url: "https://placehold.co/502x602/png?text=Nha+Pho+3",
        alt: "Nhà phố Long Biên",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Nhà phố Long Biên",
      description: "Chủ đầu tư: Mrs. Hà\nMô hình: Nhà phố",
      link: {
        url: "/du-an/nha-pho-long-bien",
        is_external: false,
        nofollow: false,
      },
      category: "nha-pho",
    },
    {
      id: "7",
      image: {
        url: "https://placehold.co/502x602/png?text=KD+1",
        alt: "Nhà phố kết hợp kinh doanh Đống Đa",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Nhà phố kết hợp kinh doanh Đống Đa",
      description:
        "Chủ đầu tư: Mr. Quang\nMô hình: Nhà phố kết hợp kinh doanh",
      link: {
        url: "/du-an/nha-pho-kd-dong-da",
        is_external: false,
        nofollow: false,
      },
      category: "nha-pho-kinh-doanh",
    },
    {
      id: "8",
      image: {
        url: "https://placehold.co/502x602/png?text=KD+2",
        alt: "Nhà phố kết hợp kinh doanh Hai Bà Trưng",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Nhà phố kết hợp kinh doanh Hai Bà Trưng",
      description:
        "Chủ đầu tư: Mrs. Mai\nMô hình: Nhà phố kết hợp kinh doanh",
      link: {
        url: "/du-an/nha-pho-kd-hai-ba-trung",
        is_external: false,
        nofollow: false,
      },
      category: "nha-pho-kinh-doanh",
    },
    {
      id: "9",
      image: {
        url: "https://placehold.co/502x602/png?text=KD+3",
        alt: "Nhà phố kết hợp kinh doanh Hoàng Mai",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Nhà phố kết hợp kinh doanh Hoàng Mai",
      description:
        "Chủ đầu tư: Mr. Dũng\nMô hình: Nhà phố kết hợp kinh doanh",
      link: {
        url: "/du-an/nha-pho-kd-hoang-mai",
        is_external: false,
        nofollow: false,
      },
      category: "nha-pho-kinh-doanh",
    },
    {
      id: "10",
      image: {
        url: "https://placehold.co/502x602/png?text=VP+1",
        alt: "THT Tower",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "THT TOWER",
      description: "Chủ đầu tư: Tập đoàn THT\nMô hình: Văn phòng",
      link: {
        url: "/du-an/tht-tower",
        is_external: false,
        nofollow: false,
      },
      category: "van-phong",
    },
    {
      id: "11",
      image: {
        url: "https://placehold.co/502x602/png?text=VP+2",
        alt: "Văn phòng Mỹ Đình",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Văn phòng Mỹ Đình",
      description: "Chủ đầu tư: Công ty ABC\nMô hình: Văn phòng",
      link: {
        url: "/du-an/van-phong-my-dinh",
        is_external: false,
        nofollow: false,
      },
      category: "van-phong",
    },
    {
      id: "12",
      image: {
        url: "https://placehold.co/502x602/png?text=VP+3",
        alt: "Văn phòng Cầu Giấy",
        display_dimensions: { width: 502, height: 602 },
      },
      title: "Văn phòng Cầu Giấy",
      description: "Chủ đầu tư: Công ty XYZ\nMô hình: Văn phòng",
      link: {
        url: "/du-an/van-phong-cau-giay",
        is_external: false,
        nofollow: false,
      },
      category: "van-phong",
    },
  ];

const PAGE_SIZE = 6;

const initialPage = filterPage(
  projectCategoryGalleryCatalog,
  "",
  1,
  PAGE_SIZE,
);

const projectCategoryGalleryWrapper: ProjectCategoryGalleryModel = {
  filterEndpoint: "/api/project-category-gallery",
  pageSize: PAGE_SIZE,
  filters: [
    { label: "Tất cả", value: "" },
    { label: "Biệt thự - Villa", value: "biet-thu-villa" },
    { label: "Nhà phố", value: "nha-pho" },
    { label: "Nhà phố kết hợp kinh doanh", value: "nha-pho-kinh-doanh" },
    { label: "Văn phòng", value: "van-phong" },
  ],
  items: initialPage.items,
  hasMore: initialPage.hasMore,
  initialCategory: "",
  loadMoreLabel: "XEM THÊM",
  scrollReveal: {
    targetId: "project-category-gallery",
  },
};

export default projectCategoryGalleryWrapper;
export { projectCategoryGalleryWrapper };

import { paginateJobListingList } from "@/lib/job-listing-list/paginate";
import type {
  JobListingListItemModel,
  JobListingListModel,
} from "@/lib/job-listing-list/types";

export const PAGE_SIZE = 3;

export const jobListingListCatalog: JobListingListItemModel[] = [
  {
    id: "1",
    image: {
      url: "https://placehold.co/250x200/png?text=HR",
      alt: "Tuyển dụng Hành chính Nhân sự",
      display_dimensions: { width: 250, height: 200 },
    },
    categoryLabel: "Hành chính-Nhân sự",
    title: "TUYỂN DỤNG NHÂN VIÊN HÀNH CHÍNH NHÂN SỰ",
    link: {
      url: "/tuyen-dung/nhan-vien-hanh-chinh-nhan-su",
      is_external: false,
      nofollow: false,
    },
    statusLabel: "Hết hạn",
    employmentType: "Toàn thời gian",
    location: "Hà Nội",
    description:
      "ICHOUSE tuyển dụng Nhân viên Hành chính Nhân sự làm việc tại văn phòng Hà Nội. Ứng viên có kinh nghiệm quản lý hồ sơ, tuyển dụng và chính sách nhân sự được ưu tiên.",
  },
  {
    id: "2",
    image: {
      url: "https://placehold.co/250x200/png?text=Architect",
      alt: "Tuyển dụng Kiến trúc sư",
      display_dimensions: { width: 250, height: 200 },
    },
    categoryLabel: "KIẾN TRÚC SƯ",
    title: "TUYỂN DỤNG KIẾN TRÚC SƯ THIẾT KẾ",
    link: {
      url: "/tuyen-dung/kien-truc-su-thiet-ke",
      is_external: false,
      nofollow: false,
    },
    statusLabel: "Hết hạn",
    employmentType: "Toàn thời gian",
    location: "Tầng 2, Tòa nhà CT2A, KĐT Geleximco, Lê Trọng Tấn, Hà Đông, Hà Nội",
    description:
      "Tham gia thiết kế concept và triển khai hồ sơ kiến trúc cho các dự án nhà ở và biệt thự cao cấp. Yêu cầu thành thạo AutoCAD, SketchUp và có portfolio dự án thực tế.",
  },
  {
    id: "3",
    image: {
      url: "https://placehold.co/250x200/png?text=Sales",
      alt: "Tuyển dụng Nhân viên kinh doanh",
      display_dimensions: { width: 250, height: 200 },
    },
    categoryLabel: "Kinh doanh",
    title: "TUYỂN DỤNG NHÂN VIÊN KINH DOANH BẤT ĐỘNG SẢN",
    link: {
      url: "/tuyen-dung/nhan-vien-kinh-doanh",
      is_external: false,
      nofollow: false,
    },
    employmentType: "Toàn thời gian",
    location: "Hà Nội",
    description:
      "Tìm kiếm và tư vấn khách hàng các giải pháp thiết kế thi công trọn gói. Môi trường năng động, thu nhập theo hiệu quả công việc.",
  },
  {
    id: "4",
    image: {
      url: "https://placehold.co/250x200/png?text=Interior",
      alt: "Tuyển dụng Nhân viên thiết kế nội thất",
      display_dimensions: { width: 250, height: 200 },
    },
    categoryLabel: "Thiết kế nội thất",
    title: "TUYỂN DỤNG NHÂN VIÊN THIẾT KẾ NỘI THẤT",
    link: {
      url: "/tuyen-dung/nhan-vien-thiet-ke-noi-that",
      is_external: false,
      nofollow: false,
    },
    employmentType: "Toàn thời gian",
    location: "Hà Nội",
    description:
      "Phát triển ý tưởng nội thất, lựa chọn vật liệu và phối cảnh 3D cho dự án nhà phố, chung cư và biệt thự.",
  },
  {
    id: "5",
    image: {
      url: "https://placehold.co/250x200/png?text=Project",
      alt: "Tuyển dụng Quản lý dự án",
      display_dimensions: { width: 250, height: 200 },
    },
    categoryLabel: "Quản lý dự án",
    title: "TUYỂN DỤNG QUẢN LÝ DỰ ÁN THI CÔNG",
    link: {
      url: "/tuyen-dung/quan-ly-du-an",
      is_external: false,
      nofollow: false,
    },
    employmentType: "Toàn thời gian",
    location: "Hà Nội",
    description:
      "Giám sát tiến độ, chất lượng và an toàn lao động tại công trường. Kinh nghiệm quản lý dự án xây dựng từ 3 năm trở lên.",
  },
  {
    id: "6",
    image: {
      url: "https://placehold.co/250x200/png?text=Marketing",
      alt: "Tuyển dụng Marketing",
      display_dimensions: { width: 250, height: 200 },
    },
    categoryLabel: "Marketing",
    title: "TUYỂN DỤNG CHUYÊN VIÊN MARKETING",
    link: {
      url: "/tuyen-dung/chuyen-vien-marketing",
      is_external: false,
      nofollow: false,
    },
    employmentType: "Toàn thời gian",
    location: "Hà Nội",
    description:
      "Lên kế hoạch và triển khai chiến dịch digital marketing, quản trị fanpage và nội dung website cho thương hiệu ICHOUSE.",
  },
  {
    id: "7",
    image: {
      url: "https://placehold.co/250x200/png?text=Accountant",
      alt: "Tuyển dụng Kế toán",
      display_dimensions: { width: 250, height: 200 },
    },
    categoryLabel: "Kế toán",
    title: "TUYỂN DỤNG NHÂN VIÊN KẾ TOÁN TỔNG HỢP",
    link: {
      url: "/tuyen-dung/nhan-vien-ke-toan",
      is_external: false,
      nofollow: false,
    },
    employmentType: "Toàn thời gian",
    location: "Hà Nội",
    description:
      "Theo dõi sổ sách kế toán, hóa đơn và báo cáo thuế định kỳ. Ưu tiên ứng viên có chứng chỉ kế toán và kinh nghiệm ngành xây dựng.",
  },
  {
    id: "8",
    image: {
      url: "https://placehold.co/250x200/png?text=Engineer",
      alt: "Tuyển dụng Kỹ sư giám sát",
      display_dimensions: { width: 250, height: 200 },
    },
    categoryLabel: "Giám sát thi công",
    title: "TUYỂN DỤNG KỸ SƯ GIÁM SÁT THI CÔNG",
    link: {
      url: "/tuyen-dung/ky-su-giam-sat",
      is_external: false,
      nofollow: false,
    },
    employmentType: "Toàn thời gian",
    location: "Hà Nội và các tỉnh lân cận",
    description:
      "Kiểm soát chất lượng thi công, nghiệm thu hạng mục và phối hợp với đội thiết kế tại hiện trường.",
  },
];

const initialPageResult = paginateJobListingList(
  jobListingListCatalog,
  1,
  PAGE_SIZE,
);

const jobListingListWrapper: JobListingListModel = {
  listEndpoint: "/api/job-listing-list",
  pageSize: PAGE_SIZE,
  items: initialPageResult.items,
  totalPages: initialPageResult.totalPages,
  initialPage: initialPageResult.page,
  pageQueryParam: "paged",
};

export default jobListingListWrapper;

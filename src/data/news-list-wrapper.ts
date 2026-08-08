import { paginateNewsList } from "@/lib/news-list/paginate";
import type { NewsListItemModel, NewsListModel } from "@/lib/news-list/types";

export const NEWS_LIST_PAGE_SIZE = 5;

const placeholderImage = (id: number, title: string) => ({
  url: `https://placehold.co/800x450/png?text=News+${id}`,
  alt: title,
  display_dimensions: { width: 800, height: 450 },
});

const createItem = (
  id: number,
  time: string,
  title: string,
  description: string,
): NewsListItemModel => ({
  id: String(id),
  image: placeholderImage(id, title),
  backgroundImage: {
    ...placeholderImage(id + 20, "Nền bài viết nổi bật"),
    alt: "",
  },
  time,
  title,
  description,
  link: {
    url: `/tin-tuc/tin-${id}`,
    is_external: false,
    nofollow: false,
  },
});

export const newsListCatalog: NewsListItemModel[] = [
  createItem(
    1,
    "22/07/2026",
    "Một buổi lễ khởi công, nhưng là cả hành trình chuẩn bị chỉn chu!",
    "Vừa qua, trong niềm hứng khởi và hân hoan của chủ đầu tư, Arteco đã chính thức khởi công dự án mới với sự chuẩn bị kỹ lưỡng từ đội ngũ.",
  ),
  createItem(
    2,
    "18/07/2026",
    "Top 8 thiết kế nhà 2 mặt tiền kinh doanh không nên bỏ qua",
    "Khám phá các phương án tối ưu mặt bằng, công năng và nhận diện thương hiệu.",
  ),
  createItem(
    3,
    "17/07/2026",
    "Gợi ý 6 mẫu nhà văn phòng 7 tầng hiện đại chuẩn xu hướng",
    "Những mẫu công trình tối ưu không gian làm việc, ánh sáng và vận hành.",
  ),
  createItem(
    4,
    "16/07/2026",
    "Xây nhà biệt thự 2 tầng đẹp hiện đại với 6 mẫu thiết kế của năm",
    "Tổng hợp giải pháp kiến trúc dành cho gia chủ yêu thích không gian sống hiện đại.",
  ),
  createItem(
    5,
    "16/07/2026",
    "5+ mẫu nhà ở kết hợp văn phòng cho thuê đẹp và tối ưu công năng",
    "Cân bằng giữa nhu cầu sinh hoạt riêng tư và hiệu quả khai thác thương mại.",
  ),
  createItem(
    6,
    "17/06/2026",
    "Nghị định 207/2026/NĐ-CP và những cập nhật quan trọng về nhà ở",
    "Thông tin pháp lý mới được đội ngũ chuyên môn tổng hợp cho khách hàng.",
  ),
  createItem(
    7,
    "15/06/2026",
    "Tiếp nối thành công, hội nghị nhà thầu lần II do Arteco tổ chức",
    "Sự kiện kết nối đối tác, nâng cao chất lượng hợp tác và tiến độ thi công.",
  ),
  createItem(
    8,
    "10/06/2026",
    "Giải pháp chống nóng mặt tiền nhà hướng tây hữu hiệu",
    "Các giải pháp vật liệu và kiến trúc giúp cải thiện vi khí hậu cho công trình.",
  ),
  createItem(
    9,
    "08/06/2026",
    "Kinh nghiệm lựa chọn vật liệu hoàn thiện cho nhà phố",
    "Những lưu ý về thẩm mỹ, độ bền và ngân sách khi hoàn thiện không gian sống.",
  ),
  createItem(
    10,
    "05/06/2026",
    "Xu hướng thiết kế nội thất tối giản nhưng vẫn giàu cảm xúc",
    "Không gian tinh gọn tạo trải nghiệm sống thoáng đãng và bền vững theo thời gian.",
  ),
  createItem(
    11,
    "02/06/2026",
    "Hoàn thiện hồ sơ thiết kế trước khi thi công cần những gì",
    "Các hạng mục quan trọng giúp kiểm soát ngân sách, chất lượng và tiến độ.",
  ),
  createItem(
    12,
    "29/05/2026",
    "Cập nhật tiến độ các công trình tiêu biểu trong tháng 5",
    "Ghi nhận quá trình thi công và các dấu mốc hoàn thiện mới nhất.",
  ),
];

const initialPage = paginateNewsList(newsListCatalog, 1, NEWS_LIST_PAGE_SIZE);

const newsListWrapper: NewsListModel = {
  listEndpoint: "/api/news-list",
  pageSize: NEWS_LIST_PAGE_SIZE,
  items: initialPage.items,
  totalPages: initialPage.totalPages,
  initialPage: initialPage.page,
  pageQueryParam: "paged",
};

export default newsListWrapper;

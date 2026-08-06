import type { KeyPersonnelModel } from "@/components/key-personnel/KeyPersonnel";

const keyPersonnelWrapper: KeyPersonnelModel = {
  title: "ĐỘI NGŨ NHÂN SỰ CHỦ CHỐT",
  items: [
    {
      image: {
        url: "https://placehold.co/480x600/png?text=Nga",
        alt: "KS. Lưu Hoàng Nga",
        display_dimensions: { width: 480, height: 600 },
      },
      title: "KS. Lưu Hoàng Nga",
      descriptionHtml: `<ul>
<li>Tốt nghiệp Đại học Xây dựng Hà Nội</li>
<li>Chứng chỉ hành nghề giám sát thi công xây dựng công trình</li>
<li>15 năm kinh nghiệm trong lĩnh vực xây dựng dân dụng</li>
</ul>`,
      link: { url: "#", is_external: false, nofollow: false },
      linkLabel: "Xem chi tiết",
    },
    {
      image: {
        url: "https://placehold.co/480x600/png?text=Hung",
        alt: "KS. Nguyễn Văn Hùng",
        display_dimensions: { width: 480, height: 600 },
      },
      title: "KS. Nguyễn Văn Hùng",
      descriptionHtml: `<ul>
<li>Tốt nghiệp Đại học Kiến trúc Hà Nội</li>
<li>Chứng chỉ hành nghề thiết kế kết cấu công trình</li>
<li>12 năm kinh nghiệm thiết kế và giám sát thi công</li>
</ul>`,
      link: { url: "#", is_external: false, nofollow: false },
      linkLabel: "Xem chi tiết",
    },
    {
      image: {
        url: "https://placehold.co/480x600/png?text=Lan",
        alt: "ThS. Phạm Thị Lan",
        display_dimensions: { width: 480, height: 600 },
      },
      title: "ThS. Phạm Thị Lan",
      descriptionHtml: `<ul>
<li>Thạc sĩ Quản lý xây dựng — Đại học Xây dựng</li>
<li>Chứng chỉ QS / ước lượng chi phí công trình</li>
<li>10 năm kinh nghiệm quản lý dự án dân dụng cao cấp</li>
</ul>`,
    },
    {
      image: {
        url: "https://placehold.co/480x600/png?text=Minh",
        alt: "KS. Trần Quốc Minh",
        display_dimensions: { width: 480, height: 600 },
      },
      title: "KS. Trần Quốc Minh",
      descriptionHtml: `<ul>
<li>Tốt nghiệp Đại học Bách khoa Hà Nội</li>
<li>Chứng chỉ an toàn lao động xây dựng</li>
<li>8 năm kinh nghiệm thi công và điều phối hiện trường</li>
</ul>`,
      link: { url: "#", is_external: false, nofollow: false },
      linkLabel: "Xem chi tiết",
    },
    {
      image: {
        url: "https://placehold.co/480x600/png?text=Ha",
        alt: "KS. Lê Thu Hà",
        display_dimensions: { width: 480, height: 600 },
      },
      title: "KS. Lê Thu Hà",
      descriptionHtml: `<ul>
<li>Tốt nghiệp Đại học Xây dựng Hà Nội</li>
<li>Chuyên môn MEP / điện nước công trình</li>
<li>9 năm kinh nghiệm thiết kế và nghiệm thu hệ thống kỹ thuật</li>
</ul>`,
    },
  ],
};

export default keyPersonnelWrapper;

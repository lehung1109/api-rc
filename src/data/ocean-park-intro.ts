import type { OceanParkIntroModel } from "@/components/ocean-park-intro/OceanParkIntro";

export const oceanParkIntro: OceanParkIntroModel = {
  eyebrow: "IC HOUSE LUXURY — NỘI THẤT MAY ĐO ĐẠI ĐÔ THỊ OCEAN PARK 1 • 2 • 3",
  title:
    "Chuyên Thiết Kế & Thi Công Nội Thất Cao Cấp Tại Vinhomes Ocean Park",
  leadHtml: [
    "<p><strong>IC HOUSE</strong> định vị giải pháp tư vấn mặt bằng chuyên sâu, thiết kế 3D Bespoke và sản xuất – thi công nội thất trọn gói phân khúc <strong>Trung – Cao cấp & Luxury</strong> cho các tòa căn hộ tại <strong>Ocean Park 1</strong> (<strong>The Paris Ocean Park 1</strong>, <strong>The London Ocean Park 1</strong> – <strong>Tòa LD1</strong>, <strong>Tòa LD2</strong>, <strong>Tòa LD3</strong>; <strong>The Beverly Ocean Park 1</strong> – <strong>Tòa BE1</strong>, <strong>Tòa BE2</strong>, <strong>Tòa BE3</strong>, <strong>Tòa BE4</strong>), <strong>Ocean Park 2</strong> (<strong>LUMIÈRE SpringBay Ocean Park 2</strong>, <strong>Masteri Trinity Square Ocean Park 2</strong>) và <strong>Dự án căn hộ cao tầng Ocean Park 3</strong>.</p>",
    "<p>Sở hữu <strong>Nhà mẫu ngay tại Sao Biển 23 Vinhomes Ocean Park</strong>, <strong>Văn phòng tại Số 01 Voi Phục Gia Lâm</strong> và <strong>Nhà máy sản xuất 2.000m² tại Như Quỳnh</strong> sát vách đại đô thị, IC HOUSE cam kết tiến độ chuẩn xác và chất lượng hoàn thiện tinh xảo cho từng căn hộ.</p>",
  ].join(""),
  highlights: [
    {
      label: "Thiết kế 3D Bespoke",
      value: "250.000đ – 350.000đ/m²",
      note: "KTS trưởng 5–15 năm kinh nghiệm chủ trì",
    },
    {
      label: "Thi công trọn gói Cao cấp",
      value: "Từ 120 triệu/căn",
      note: "Gói Luxury đồng bộ: 180 – 260 triệu/căn",
    },
    {
      label: "Ưu đãi ký HĐ thi công",
      value: "Miễn phí 100% TK",
      note: "Hoàn trả toàn bộ phí thiết kế 3D & hồ sơ kỹ thuật",
    },
    {
      label: "Nhà mẫu & Xưởng tại chỗ",
      value: "Sao Biển 23 OCP",
      note: "Bảo hành 2 năm • Bảo trì 5 năm tận căn hộ",
    },
  ],
  subdivisionBadges: [
    "The London (Tòa LD1 • LD2 • LD3)",
    "The Beverly (Tòa BE1 • BE2 • BE3 • BE4)",
    "The Paris Ocean Park 1",
    "LUMIÈRE SpringBay Ocean Park 2",
    "Masteri Trinity Square Ocean Park 2",
    "Căn hộ cao tầng Ocean Park 3",
  ],
  steps: [
    {
      number: "01",
      title: "Khảo sát thực tế tại tòa trong 15 phút",
      description:
        "KTS từ văn phòng Số 01 Voi Phục có mặt đo đạc trực tiếp từng góc căn hộ Chung cư Ocean Park 1, Ocean Park 2, Ocean Park 3 và tư vấn công năng tại chỗ.",
    },
    {
      number: "02",
      title: "Thiết kế 3D & Trải nghiệm Nhà mẫu Sao Biển 23",
      description:
        "Cá nhân hóa phong cách Modern Luxury, Japandi, Neoclassic, Wabi Sabi; mời gia chủ kiểm chứng trực tiếp cốt gỗ An Cường, đá Vicostone và sơn Inchem tại nhà mẫu.",
    },
    {
      number: "03",
      title: "Sản xuất giá xưởng & Thi công đúng cam kết",
      description:
        "Gia công CNC tự động tại nhà máy Ngọc Trai – Như Quỳnh ngay sát dự án, báo giá minh bạch không phát sinh, hỗ trợ trọn gói thủ tục ban quản lý tòa nhà.",
    },
  ],
  primaryCta: {
    label: "Gọi tư vấn: 0869 855 885",
    link: {
      url: "tel:0869855885",
      is_external: false,
      nofollow: false,
    },
  },
  secondaryCta: {
    label: "Nhận báo giá theo mã căn",
    link: {
      url: "#dang-ky-tu-van",
      is_external: false,
      nofollow: false,
    },
  },
};

export default oceanParkIntro;

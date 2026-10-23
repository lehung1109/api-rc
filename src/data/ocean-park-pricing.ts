import type { OceanParkPricingModel } from "@/components/ocean-park-pricing/OceanParkPricing";

export const oceanParkPricing: OceanParkPricingModel = {
  eyebrow:
    "BẢNG BÁO GIÁ GỐC TẠI NHÀ XƯỞNG 2.000M² GẦN OCEAN PARK — MINH BẠCH TỪNG HẠNG MỤC",
  title:
    "Báo Giá Thiết Kế & Thi Công Nội Thất Vinhomes Ocean Park Trọn Gói Cao Cấp 1 • 2 • 3",
  description:
    "Nhờ sở hữu Nhà máy sản xuất nội thất 2.000m² ngay tại Ngọc Trai – Như Quỳnh (cách Ocean Park chỉ 10 phút), Nhà mẫu nội khu tại Sao Biển 23 và Văn phòng KTS tại Số 01 Voi Phục Gia Lâm, IC HOUSE mang đến báo giá gốc tại xưởng tiết kiệm 15–20% so với thị trường, cam kết 100% vật liệu chính hãng An Cường, đá thạch anh Vicostone, sơn Inchem và phụ kiện Blum/Hafele.",
  featuredPackage: {
    badge:
      "GÓI THI CÔNG NỘI THẤT TRỌN GÓI BESPOKE LUXURY — GIÁ XƯỞNG TRỰC TIẾP SÁT OCEAN PARK",
    title:
      "Hoàn Thiện Nội Thất Căn Hộ Vinhomes Ocean Park Trọn Gói Cao Cấp (Từ 120 triệu/căn • Phổ biến 180 – 260 triệu/căn)",
    price: "180 – 260 triệu",
    unit: "/ căn hộ 2PN – 2PN+1 hoàn thiện đồng bộ chuẩn Luxury tại xưởng IC HOUSE",
    note: "Gói khởi điểm từ 120 triệu/căn (Studio/1PN). Miễn phí 100% phí thiết kế 3D Bespoke (250.000đ – 350.000đ/m²) và miễn phí khảo sát tại tòa khi ký hợp đồng thi công nội thất trọn gói.",
    handoverSavingNote:
      "Đặc quyền tối ưu ngân sách theo tiêu chuẩn bàn giao: Khấu trừ & tiết kiệm ngay 35 – 60 triệu/căn cho các tòa đã có sẵn hệ tủ bếp, điều hòa âm trần & thiết bị cao cấp như Căn hộ The Beverly (BE1–BE4), Căn hộ The London (LD1–LD3), The Paris (Ocean Park 1), Căn hộ LUMIÈRE SpringBay và Dự án Masteri Trinity Square (Ocean Park 2).",
  },
  primaryCta: {
    label: "Gọi nhận báo giá xưởng: 0869 855 885",
    link: {
      url: "tel:0869855885",
      is_external: false,
      nofollow: false,
    },
  },
  secondaryCta: {
    label: "Nhận bảng dự toán BOQ theo mã căn",
    link: {
      url: "#dang-ky-tu-van",
      is_external: false,
      nofollow: false,
    },
  },
  unitEstimatesTitle:
    "Bảng Giá Dự Toán Thi Công Nội Thất Trọn Gói Theo Loại Căn Hộ Ocean Park",
  unitEstimatesSubtitle:
    "Báo giá sản xuất trực tiếp tại Nhà xưởng IC HOUSE gần Ocean Park — Áp dụng cho Căn hộ The London, Căn hộ The Beverly, The Paris, Căn hộ LUMIÈRE SpringBay, Dự án Masteri Trinity Square & Căn hộ cao tầng Ocean Park 3",
  unitEstimates: [
    {
      unitType: "Studio / 1PN",
      areaRange: "28m² – 43m²",
      priceRange: "120 – 155 triệu",
      targetZones: "The London (LD1–LD3), The Paris, Cao tầng Ocean Park 3",
    },
    {
      unitType: "1PN+1",
      areaRange: "45m² – 54m²",
      priceRange: "145 – 185 triệu",
      targetZones: "The Beverly (BE1–BE4), The London, LUMIÈRE SpringBay",
    },
    {
      unitType: "2PN / 2PN+1",
      areaRange: "58m² – 76m²",
      priceRange: "180 – 260 triệu",
      highlight: true,
      targetZones:
        "The Beverly, The London, LUMIÈRE SpringBay, Masteri Trinity Square",
    },
    {
      unitType: "3PN / Căn góc VIP",
      areaRange: "82m² – 108m²",
      priceRange: "260 – 380 triệu",
      targetZones: "Căn góc Tòa BE1–BE4, Tòa LD1–LD3, Masteri Trinity Square",
    },
    {
      unitType: "Duplex / Penthouse / Ghép căn",
      areaRange: "115m² – 180m²+",
      priceRange: "420 – 750+ triệu",
      targetZones: "LUMIÈRE SpringBay, Masteri Trinity Square, Ocean Park 1-2-3",
    },
  ],
  roomEstimates: [
    {
      roomName: "Nội thất Phòng khách liền Bếp",
      englishName: "Living & Kitchen Bespoke",
      priceRange: "75 – 125 triệu",
    },
    {
      roomName: "Nội thất Phòng ngủ Master Luxury",
      englishName: "Master Bedroom Suite",
      priceRange: "45 – 75 triệu",
    },
    {
      roomName: "Nội thất Phòng ngủ phụ / Trẻ em",
      englishName: "Second / Kids Bedroom",
      priceRange: "30 – 50 triệu",
    },
    {
      roomName: "Không gian +1 Đa năng & Logia",
      englishName: "Multi-function +1 & Balcony",
      priceRange: "18 – 35 triệu",
    },
  ],
  commitments: [
    {
      title: "Hạng mục thi công trọn gói từ A–Z",
      items: [
        {
          label: "Cải tạo trần thạch cao – sàn gỗ – tường & điện ánh sáng",
          detail:
            "Trần thạch cao Vĩnh Tường chống ẩm, hệ đèn LED ray nam châm / âm trần CRI>90, vách ốp tường PVC vân đá / than tre / Veneer, phào chỉ PU và sàn gỗ xương cá cao cấp.",
        },
        {
          label: "Hệ tủ bếp cánh kính & Đảo bếp đá Vicostone",
          detail:
            "Tủ bếp kịch trần MDF lõi xanh An Cường / Plywood chịu nước, mặt đá thạch anh Vicostone chống thấm ố, kính ốp bếp cường lực Hải Long và phụ kiện giá bát nâng hạ Inox 304.",
        },
        {
          label: "Nội thất liền tường & Đồ rời may đo đồng bộ",
          detail:
            "Tủ quần áo cánh kính khung nhôm Anode tích hợp đèn LED cảm biến, giường bọc da/nỉ Bỉ, sofa may đo theo kích thước phòng khách, bàn ăn mặt đá và rèm cửa 2 lớp.",
        },
      ],
    },
    {
      title: "Cam kết vật liệu chính hãng tại Xưởng & Nhà mẫu",
      items: [
        {
          label: "100% cốt gỗ An Cường & Sơn Inchem 5 lớp",
          detail:
            "Sử dụng gỗ MDF lõi xanh chống ẩm An Cường chính hãng (có hóa đơn & phiếu xuất kho), Plywood phủ Veneer óc chó/sồi tự nhiên và buồng sơn Inchem 5 lớp tại nhà máy Như Quỳnh.",
        },
        {
          label: "Đá thạch anh Vicostone & Nhôm kính Anode",
          detail:
            "Đá Vicostone chính hãng bảo hành 15 năm, khung nhôm Anode mạ Champagne chống bám vân tay và chi tiết inox 304 mạ PVD sang trọng.",
        },
        {
          label: "Phụ kiện Blum (Áo) / Hafele (Đức) chính hãng",
          detail:
            "Toàn bộ bản lề, ray âm giảm chấn, tay nâng tủ bếp vận hành êm ái; cam kết phạt hợp đồng 200% nếu phát hiện pha trộn vật liệu kém chất lượng.",
        },
      ],
    },
    {
      title: "Đặc quyền 3 vị trí địa lý sát vách Ocean Park",
      items: [
        {
          label: "Xem Nhà mẫu tại Sao Biển 23 & Nghiệm thu mộc tại Xưởng",
          detail:
            "Cư dân đi bộ/xe điện nội khu tới Nhà mẫu Sao Biển 23 Vinhomes Ocean Park xem thực tế, và được mời sang Nhà xưởng 2.000m² tại Ngọc Trai – Như Quỳnh kiểm tra phôi gỗ trước khi sơn.",
        },
        {
          label: "Văn phòng Số 01 Voi Phục bao trọn thủ tục Ban quản lý",
          detail:
            "Đội ngũ kỹ sư IC HOUSE tại Gia Lâm đại diện lập toàn bộ bản vẽ kỹ thuật MEP và nộp hồ sơ xin cấp phép thi công với BQL Vinhomes & Masterise Homes.",
        },
        {
          label: "Bảo hành 2 năm • Bảo trì 5 năm có mặt trong 2 giờ",
          detail:
            "Nhờ có Văn phòng Số 01 Voi Phục, Nhà mẫu Sao Biển 23 và Nhà xưởng ngay cạnh khu đô thị, đội kỹ thuật IC HOUSE xử lý bảo hành tận căn hộ chỉ sau 2–24 giờ.",
        },
      ],
    },
  ],
  bottomPrompt: {
    title:
      "Nhận bảng dự toán BOQ bóc tách từng hạng mục giá xưởng theo đúng mã căn hộ của bạn",
    description:
      "Chỉ cần gửi mã tòa (LD1–LD3 The London, BE1–BE4 The Beverly, The Paris, LUMIÈRE SpringBay, Masteri Trinity Square, Ocean Park 3), KTS Trưởng IC HOUSE tại Số 01 Voi Phục & Sao Biển 23 sẽ gửi bảng báo giá chi tiết trong 30 phút.",
    buttonLabel: "Yêu cầu bảng báo giá chi tiết",
    buttonLink: {
      url: "#dang-ky-tu-van",
      is_external: false,
      nofollow: false,
    },
  },
};

export default oceanParkPricing;

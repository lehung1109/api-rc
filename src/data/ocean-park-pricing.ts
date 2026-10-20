import type { OceanParkPricingModel } from "@/components/ocean-park-pricing/OceanParkPricing";

export const oceanParkPricing: OceanParkPricingModel = {
  eyebrow: "BẢNG GIÁ & DỰ TOÁN ĐẦU TƯ PHÂN KHÚC CAO CẤP",
  title:
    "Báo Giá Thiết Kế & Thi Công Nội Thất Cao Cấp Tại Vinhomes Ocean Park 1 • 2 • 3",
  description:
    "Khác biệt hoàn toàn với các gói nội thất đại trà giá rẻ, IC HOUSE cung cấp giải pháp nội thất may đo Bespoke Luxury sử dụng vật liệu chính hãng An Cường, đá thạch anh Vicostone, sơn Inchem và phụ kiện Blum/Hafele với dự toán minh bạch theo từng mã căn hộ.",
  featuredPackage: {
    badge: "GÓI BESPOKE LUXURY ĐỒNG BỘ — LỰA CHỌN HÀNG ĐẦU TẠI OCEAN PARK",
    title:
      "Hoàn Thiện Nội Thất Trọn Gói Cao Cấp (Từ 120 triệu/căn • Phổ biến 180 – 260 triệu/căn)",
    price: "180 – 260 triệu",
    unit: "/ căn hộ 2PN – 2PN+1 hoàn thiện chuẩn Luxury",
    note: "Gói khởi điểm từ 120 triệu/căn (Studio/1PN). Miễn phí 100% chi phí thiết kế 3D (250.000đ – 350.000đ/m²) khi ký hợp đồng thi công trọn gói tại IC HOUSE.",
    handoverSavingNote:
      "Đặc quyền tối ưu ngân sách: Tiết kiệm ngay 35 – 60 triệu/căn cho các tòa đã bàn giao sẵn hệ tủ bếp & thiết bị cao cấp như The Beverly, The London, The Paris (Ocean Park 1), LUMIÈRE SpringBay và Masteri Trinity Square (Ocean Park 2).",
  },
  primaryCta: {
    label: "Gọi nhận dự toán: 0869 855 885",
    link: {
      url: "tel:0869855885",
      is_external: false,
      nofollow: false,
    },
  },
  secondaryCta: {
    label: "Nhận BOQ chi tiết theo mã căn",
    link: {
      url: "#dang-ky-tu-van",
      is_external: false,
      nofollow: false,
    },
  },
  unitEstimatesTitle: "Dự Toán Ngân Sách Theo Loại Căn Hộ Điển Hình",
  unitEstimatesSubtitle:
    "Áp dụng cho Căn hộ The London, Căn hộ The Beverly, The Paris, Căn hộ LUMIÈRE SpringBay, Dự án Masteri Trinity Square & Căn hộ cao tầng Ocean Park 3",
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
      roomName: "Không gian Phòng khách & Bếp",
      englishName: "Living & Dining Bespoke",
      priceRange: "75 – 125 triệu",
    },
    {
      roomName: "Phòng ngủ Master Luxury",
      englishName: "Master Suite",
      priceRange: "45 – 75 triệu",
    },
    {
      roomName: "Phòng ngủ phụ / Phòng trẻ em",
      englishName: "Second Bedroom / Kids",
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
      title: "Gói thi công bao gồm",
      items: [
        {
          label: "Cải tạo trần – sàn – tường & ánh sáng",
          detail:
            "Trần thạch cao Vĩnh Tường chống ẩm, hệ đèn LED âm trần CRI>90, phào chỉ PU/PS, giấy dán tường Nhật/Hàn và sàn gỗ xương cá cao cấp.",
        },
        {
          label: "Hệ tủ bếp & Đảo bếp may đo",
          detail:
            "Tủ bếp kịch trần chống ẩm tuyệt đối, mặt đá thạch anh Vicostone chống thấm ố, kính ốp bếp cường lực Hải Long và phụ kiện thông minh.",
        },
        {
          label: "Nội thất liền tường & Đồ rời đồng bộ",
          detail:
            "Tủ áo cánh kính khung nhôm Anode tích hợp đèn cảm biến, giường bọc da/nỉ cao cấp, sofa may đo, bàn ăn mặt đá và rèm tự động 2 lớp.",
        },
      ],
    },
    {
      title: "Vật liệu & Phụ kiện cao cấp",
      items: [
        {
          label: "Cốt gỗ & Bề mặt chính hãng",
          detail:
            "100% gỗ MDF lõi xanh chống ẩm An Cường, Plywood chịu nước phủ Veneer óc chó/sồi tự nhiên và sơn Inchem 5 lớp tiêu chuẩn quốc tế.",
        },
        {
          label: "Đá & Kim loại hoàn thiện",
          detail:
            "Đá thạch anh Vicostone nhóm B/C bảo hành chính hãng, khung nhôm Anode mạ Champagne và inox 304 mạ PVD sang trọng.",
        },
        {
          label: "Phụ kiện chuyển động êm ái",
          detail:
            "Bản lề, ray âm giảm chấn, tay nâng Blum (Áo) hoặc Hafele (Đức), cam kết đền gấp 200% nếu phát hiện vật liệu sai hợp đồng.",
        },
      ],
    },
    {
      title: "Quyền lợi đặc quyền khách hàng",
      items: [
        {
          label: "Trải nghiệm thực tế trước khi ký",
          detail:
            "Tham quan trực tiếp Nhà mẫu IC HOUSE tại Sao Biển 23 Vinhomes Ocean Park và kiểm tra phôi gỗ tại Nhà máy Như Quỳnh (2.000m²).",
        },
        {
          label: "Trọn gói thủ tục Ban quản lý",
          detail:
            "IC HOUSE đại diện chuẩn bị toàn bộ bản vẽ kỹ thuật MEP và hồ sơ xin cấp phép thi công với BQL Vinhomes & Masterise Homes.",
        },
        {
          label: "Bảo hành 2 năm • Bảo trì 5 năm",
          detail:
            "Đội ngũ kỹ thuật túc trực ngay tại Văn phòng Số 01 Voi Phục và Sao Biển 23 hỗ trợ xử lý tận căn hộ trong vòng 24 giờ.",
        },
      ],
    },
  ],
  bottomPrompt: {
    title: "Nhận bảng dự toán BOQ bóc tách từng hạng mục theo đúng mã căn hộ của bạn",
    description:
      "Chỉ cần gửi mã tòa (LD1–LD3, BE1–BE4, The Paris, LUMIÈRE SpringBay, Masteri Trinity Square, Ocean Park 3), KTS Trưởng IC HOUSE sẽ gửi bảng dự toán chi tiết trong 30 phút.",
    buttonLabel: "Yêu cầu bảng dự toán chi tiết",
    buttonLink: {
      url: "#dang-ky-tu-van",
      is_external: false,
      nofollow: false,
    },
  },
};

export default oceanParkPricing;

import type { FooterModel } from "@/components/footer/Footer";
import type { LinkModel } from "@/components/link/Link";

const link = (url: string, is_external = false): LinkModel => ({
  url,
  is_external,
  nofollow: false,
});

const iconDimensions = { width: 24, height: 24 };
const paymentDimensions = { width: 48, height: 32 };
const badgeDimensions = { width: 120, height: 48 };

const facebookEmbed = (pageUrl: string) =>
  `<iframe src="https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" width="340" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`;

const footer: FooterModel = {
  top: {
    menuColumns: [
      {
        title: "VỀ NỘI THẤT IC HOUSE",
        links: [
          { label: "Giới thiệu IC HOUSE", link: link("/gioi-thieu") },
          { label: "Nhà mẫu Sao Biển 23 Ocean Park", link: link("/nha-mau-ocean-park") },
          { label: "Nhà máy sản xuất 2.000m²", link: link("/nha-may-san-xuat") },
          { label: "Đối tác chiến lược", link: link("/doi-tac-chien-luoc") },
          { label: "Thông tin tuyển dụng", link: link("/tuyen-dung") },
        ],
      },
      {
        title: "CHÍNH SÁCH & CAM KẾT",
        links: [
          {
            label: "Chính sách bảo hành 2 năm & bảo trì 5 năm",
            link: link("/chinh-sach-bao-hanh"),
          },
          {
            label: "Cam kết vật liệu chính hãng",
            link: link("/cam-ket-vat-lieu"),
          },
          { label: "Quy trình thiết kế & thi công", link: link("/quy-trinh-lam-viec") },
          {
            label: "Chính sách bảo mật thông tin",
            link: link("/chinh-sach-bao-mat-thong-tin"),
          },
        ],
      },
      {
        title: "DỊCH VỤ NỘI THẤT CAO CẤP",
        links: [
          { label: "Nội thất Vinhomes Ocean Park 1 • 2 • 3", link: link("/noi-that-vinhomes-ocean-park") },
          { label: "Thiết kế nội thất chung cư Luxury", link: link("/tk/chung-cu") },
          { label: "Thiết kế & Thi công biệt thự", link: link("/tk/biet-thu") },
          {
            label: "Báo giá thiết kế & thi công trọn gói",
            link: link("/bao-gia"),
          },
          { label: "Câu hỏi thường gặp", link: link("/cau-hoi-thuong-gap") },
        ],
      },
    ],
    payment: {
      logos: [
        {
          url: "https://placehold.co/48x32/png?text=VISA",
          alt: "VISA",
          display_dimensions: paymentDimensions,
        },
        {
          url: "https://placehold.co/48x32/png?text=MC",
          alt: "Mastercard",
          display_dimensions: paymentDimensions,
        },
        {
          url: "https://placehold.co/48x32/png?text=123Pay",
          alt: "123Pay",
          display_dimensions: paymentDimensions,
        },
        {
          url: "https://placehold.co/48x32/png?text=ATM",
          alt: "ATM",
          display_dimensions: paymentDimensions,
        },
        {
          url: "https://placehold.co/48x32/png?text=Napas",
          alt: "Napas",
          display_dimensions: paymentDimensions,
        },
        {
          url: "https://placehold.co/48x32/png?text=VietinBank",
          alt: "VietinBank",
          display_dimensions: paymentDimensions,
        },
      ],
    },
    social: {
      links: [
        {
          icon: {
            url: "https://placehold.co/24x24/png?text=FB",
            alt: "Facebook",
            display_dimensions: iconDimensions,
          },
          link: link("https://www.facebook.com/", true),
        },
        {
          icon: {
            url: "https://placehold.co/24x24/png?text=IG",
            alt: "Instagram",
            display_dimensions: iconDimensions,
          },
          link: link("https://www.instagram.com/", true),
        },
        {
          icon: {
            url: "https://placehold.co/24x24/png?text=TT",
            alt: "TikTok",
            display_dimensions: iconDimensions,
          },
          link: link("https://www.tiktok.com/", true),
        },
        {
          icon: {
            url: "https://placehold.co/24x24/png?text=YT",
            alt: "YouTube",
            display_dimensions: iconDimensions,
          },
          link: link("https://www.youtube.com/", true),
        },
      ],
    },
  },
  bottom: {
    brand: {
      logo: {
        url: "https://placehold.co/220x80/png?text=IC+HOUSE",
        alt: "Nội thất IC HOUSE",
        display_dimensions: { width: 220, height: 80 },
        link: link("/"),
      },
      descriptionHtml:
        "<p>Nội thất IC HOUSE chuyên tư vấn thiết kế 3D Bespoke, sản xuất và thi công nội thất trọn gói cao cấp cho căn hộ chung cư, biệt thự, liền kề và văn phòng với nhà máy sản xuất trực tiếp 2.000m².</p>",
      badges: [
        {
          url: "https://placehold.co/120x48/png?text=NCA",
          alt: "NCA Tín nhiệm mạng",
          display_dimensions: badgeDimensions,
        },
        {
          url: "https://placehold.co/120x48/png?text=DMCA",
          alt: "DMCA Protected",
          display_dimensions: badgeDimensions,
        },
      ],
      hotlineText: "0978 305 740",
      hotline: link("tel:0978305740"),
    },
    contact: {
      blocks: [
        {
          title: "TRỤ SỞ VĂN PHÒNG THIẾT KẾ IC HOUSE",
          contentHtml: `<p>Địa chỉ: Số 01 Voi Phục, Gia Lâm, Hà Nội</p>
<p>Hotline: <a href="tel:0978305740">0978 305 740</a></p>
<p>Email: <a href="mailto:noithatichouse@gmail.com">noithatichouse@gmail.com</a></p>
<p>Website: <a href="https://noithat.ichouse.vn">noithat.ichouse.vn</a></p>`,
        },
        {
          title: "NHÀ MẪU NỘI THẤT VINHOMES OCEAN PARK",
          contentHtml: `<p>Địa chỉ: Sao Biển 23, KĐT Vinhomes Ocean Park, Gia Lâm, Hà Nội</p>
<p>Hotline KTS Trưởng: <a href="tel:0978305740">0978 305 740</a></p>
<p>Zalo Nhận Bản Vẽ 3D: <a href="https://zalo.me/0978305740">0978 305 740</a></p>`,
        },
        {
          title: "PHẠM VI DỰ ÁN TRỌNG ĐIỂM TẠI OCEAN PARK 1 • 2 • 3",
          contentHtml: `<p>Vinhomes Ocean Park 1 — The London (LD1–LD3), The Beverly (BE1–BE4), The Paris</p>
<p>Vinhomes Ocean Park 2 & 3 — LUMIÈRE SpringBay, Masteri Trinity Square, Căn hộ cao tầng Ocean Park 3</p>
<p>Hotline: <a href="tel:0978305740">0978 305 740</a></p>`,
        },
      ],
    },
    fanpages: {
      factories: {
        title: "Nhà máy – Xưởng sản xuất nội thất IC HOUSE",
        contentHtml: `<p>Nhà máy sản xuất trực tiếp 2.000m² — Thôn Ngọc Trai, Xã Như Quỳnh, Tỉnh Hưng Yên (Kế cận KĐT Vinhomes Ocean Park 1 • 2 • 3)</p>`,
      },
      embeds: [
        {
          embedHtml: facebookEmbed("https://www.facebook.com/facebook"),
        },
        {
          embedHtml: facebookEmbed(
            "https://www.facebook.com/facebook/videos",
          ),
        },
      ],
    },
  },
};

export default footer;

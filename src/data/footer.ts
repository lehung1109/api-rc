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
        title: "VỀ CHÚNG TÔI",
        links: [
          { label: "Giới thiệu công ty", link: link("/gioi-thieu-cong-ty") },
          { label: "Tiêu chí bán hàng", link: link("/tieu-chi-ban-hang") },
          { label: "Đối tác chiến lược", link: link("/doi-tac-chien-luoc") },
          { label: "Hệ thống Showroom", link: link("/he-thong-showroom") },
          { label: "Thông tin tuyển dụng", link: link("/tuyen-dung") },
        ],
      },
      {
        title: "CHÍNH SÁCH",
        links: [
          {
            label: "Chính sách vận chuyển",
            link: link("/chinh-sach-van-chuyen"),
          },
          {
            label: "Chính sách bảo hành",
            link: link("/chinh-sach-bao-hanh"),
          },
          { label: "Hình thức thanh toán", link: link("/hinh-thuc-thanh-toan") },
          {
            label: "Chính sách bảo mật thông tin",
            link: link("/chinh-sach-bao-mat-thong-tin"),
          },
        ],
      },
      {
        title: "HỖ TRỢ KHÁCH HÀNG",
        links: [
          { label: "Câu hỏi thường gặp", link: link("/cau-hoi-thuong-gap") },
          { label: "Quy định đổi trả", link: link("/quy-dinh-doi-tra") },
          { label: "Tư vấn vật liệu", link: link("/tu-van-vat-lieu") },
          {
            label: "Giải đáp cùng chuyên gia",
            link: link("/giai-dap-cung-chuyen-gia"),
          },
          { label: "Quy trình làm việc", link: link("/quy-trinh-lam-viec") },
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
            url: "https://placehold.co/24x24/png?text=X",
            alt: "Twitter",
            display_dimensions: iconDimensions,
          },
          link: link("https://twitter.com/", true),
        },
        {
          icon: {
            url: "https://placehold.co/24x24/png?text=P",
            alt: "Pinterest",
            display_dimensions: iconDimensions,
          },
          link: link("https://www.pinterest.com/", true),
        },
        {
          icon: {
            url: "https://placehold.co/24x24/png?text=IN",
            alt: "LinkedIn",
            display_dimensions: iconDimensions,
          },
          link: link("https://www.linkedin.com/", true),
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
        url: "https://placehold.co/220x80/png?text=HOAN+MY+DECOR",
        alt: "Hoàn Mỹ Decor",
        display_dimensions: { width: 220, height: 80 },
        link: link("/"),
      },
      descriptionHtml:
        "<p>Công ty TNHH Nội thất Hoàn Mỹ chuyên thiết kế, thi công và sản xuất nội thất trọn gói cho chung cư, biệt thự, nhà phố và văn phòng với chất lượng cao và giá tốt.</p>",
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
      hotlineText: "939084328",
      hotline: link("tel:939084328"),
    },
    contact: {
      blocks: [
        {
          title: "TRỤ SỞ CHÍNH & SHOWROOM NỘI THẤT",
          contentHtml: `<p>Địa chỉ: Số 15, ngõ 102 Phúc Diễn, Phúc Diễn, Hà Đông, Hà Nội</p>
<p>Hotline: <a href="tel:0968886516">0968886516</a></p>
<p>Email: <a href="mailto:Hoanmydecor.vn@gmail.com">Hoanmydecor.vn@gmail.com</a></p>`,
        },
        {
          title: "CHI NHÁNH VINHOME GREEN BAY",
          contentHtml: `<p>Địa chỉ: Tòa G2, Vinhome Green Bay, Mễ Trì, Nam Từ Liêm, Hà Nội</p>
<p>Hotline: <a href="tel:0968886516">0968886516</a></p>`,
        },
        {
          title: "CHI NHÁNH NAM TỪ LIÊM",
          contentHtml: `<p>Vinhome Smart City — Tòa S1.05, S1.06, S1.10, S1.11, S2.05, S2.06</p>
<p>HD Mon Hàm Nghi — Số 1 Hàm Nghi, Nam Từ Liêm, Hà Nội</p>
<p>Hotline: <a href="tel:0968886516">0968886516</a></p>`,
        },
        {
          title: "CHI NHÁNH TẠI TP. HẢI PHÒNG",
          contentHtml: `<p>Địa chỉ: Số 15 Lê Hồng Phong, Kiến An, Hải Phòng</p>
<p>Hotline: <a href="tel:0968886516">0968886516</a></p>`,
        },
      ],
    },
    fanpages: {
      factories: {
        title: "Nhà máy – Xưởng sản xuất nội thất",
        contentHtml: `<p>Xưởng Phúc Thọ — Thị trấn Phúc Thọ, Phúc Thọ, Hà Nội</p>
<p>Xưởng Láng Hòa Lạc — Khu công nghiệp Láng Hòa Lạc, Hà Nội</p>`,
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

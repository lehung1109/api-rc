import type { ContactCtaModel } from "@/components/contact-cta/ContactCta";

const contactCta: ContactCtaModel = {
  subtitle: "LIÊN HỆ NGAY VỚI CHÚNG TÔI",
  title: "Liên hệ với ICHouse để nhận tư vấn miễn phí",
  buttonLabel: "ĐẶT LỊCH NGAY",
  popupTarget: "tu-van",
  image: {
    url: "https://placehold.co/960x640/png?text=Contact+CTA",
    alt: "Đội ngũ tư vấn công trình",
    display_dimensions: {
      width: 960,
      height: 640,
    },
    srcSet:
      "https://placehold.co/640x427/png?text=Contact+CTA 640w, " +
      "https://placehold.co/960x640/png?text=Contact+CTA 960w",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  contentBackgroundImage: {
    url: "https://placehold.co/800x600/0a2a5c/1a4a8c?text=Blueprint",
    alt: "",
    display_dimensions: {
      width: 800,
      height: 600,
    },
  },
};

export default contactCta;
export { contactCta };

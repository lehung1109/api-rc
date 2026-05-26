import type { DesignConsultationCtaModel } from "@/components/design-consultation-cta/DesignConsultationCta";

const designConsultationCta: DesignConsultationCtaModel = {
  backgroundImage: {
    url: "https://placehold.co/1920x400/1a1a1a/666?text=Interior",
    alt: "Không gian nội thất",
    display_dimensions: {
      width: 1920,
      height: 400,
    },
  },
  heading: "ĐĂNG KÝ TƯ VẤN THIẾT KẾ NỘI THẤT",
  subheading:
    "Chúng tôi sẽ giúp bạn tạo ra không gian hoàn hảo cho tổ ấm của bạn!",
  ctaLabel: "LIÊN HỆ NGAY",
  cta: {
    url: "/lien-he",
    is_external: false,
    nofollow: false,
  },
};

export { designConsultationCta };

import type { PartnerLogosModel } from "@/components/partner-logos/PartnerLogos";

const logoDimensions = { width: 160, height: 48 };

const partnerLogosWrapper: PartnerLogosModel = {
  slidesPerView: 5,
  spaceBetween: 32,
  loop: true,
  logos: [
    {
      url: "https://placehold.co/160x48/png?text=VICOSTONE",
      alt: "VICOSTONE",
      display_dimensions: logoDimensions,
    },
    {
      url: "https://placehold.co/160x48/png?text=VINHOMES",
      alt: "VINHOMES",
      display_dimensions: logoDimensions,
    },
    {
      url: "https://placehold.co/160x48/png?text=blum",
      alt: "blum",
      display_dimensions: logoDimensions,
    },
    {
      url: "https://placehold.co/160x48/png?text=AN+CUONG",
      alt: "AN CƯỜNG",
      display_dimensions: logoDimensions,
    },
    {
      url: "https://placehold.co/160x48/png?text=TAN+HOANG+MINH",
      alt: "TÂN HOÀNG MINH GROUP",
      display_dimensions: logoDimensions,
    },
    {
      url: "https://placehold.co/160x48/png?text=VIETCERAMICS",
      alt: "VIETCERAMICS",
      display_dimensions: logoDimensions,
    },
    {
      url: "https://placehold.co/160x48/png?text=HAFELE",
      alt: "HÄFELE",
      display_dimensions: logoDimensions,
    },
  ],
};

export default partnerLogosWrapper;

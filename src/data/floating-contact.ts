import type { FloatingContactModel } from "@/components/floating-contact/FloatingContact";
import type { LinkModel } from "@/components/link/Link";

const link = (url: string, is_external = true): LinkModel => ({
  url,
  is_external,
  nofollow: false,
});

const iconDimensions = { width: 20, height: 20 };

const floatingContact: FloatingContactModel = {
  messenger: {
    label: "ĐĂNG KÝ TƯ VẤN",
    icon: {
      url: "https://placehold.co/20x20/ffffff/0084FF/png?text=m",
      alt: "Messenger",
      display_dimensions: iconDimensions,
    },
    link: link("https://m.me/", true),
  },
  zalo: {
    label: "CHAT ZALO",
    icon: {
      url: "https://placehold.co/20x20/ffffff/0068FF/png?text=z",
      alt: "Zalo",
      display_dimensions: iconDimensions,
    },
    link: link("https://zalo.me/", true),
  },
  phone: {
    label: "0000 000 000",
    link: link("tel:0000000000", false),
  },
};

export default floatingContact;
export { floatingContact };

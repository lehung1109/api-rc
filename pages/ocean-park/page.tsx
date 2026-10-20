import FloatingContact from "../../src/components/floating-contact/FloatingContact";
import Footer from "../../src/components/footer/Footer";
import Header from "../../src/components/header/Header";
import HeroSection, {
  type HeroSectionModel,
} from "../../src/components/hero-section/HeroSection";
import OceanParkAdvantages from "../../src/components/ocean-park-advantages/OceanParkAdvantages";
import OceanParkContactFormWrapper from "../../src/components/ocean-park-contact-form/OceanParkContactFormWrapper";
import OceanParkFaq from "../../src/components/ocean-park-faq/OceanParkFaq";
import OceanParkIntro from "../../src/components/ocean-park-intro/OceanParkIntro";
import OceanParkPricing from "../../src/components/ocean-park-pricing/OceanParkPricing";
import OceanParkProjectSamplesWrapper from "../../src/components/ocean-park-project-samples/OceanParkProjectSamplesWrapper";
import { floatingContact } from "../../src/data/floating-contact";
import footer from "../../src/data/footer";
import { header } from "../../src/data/header";
import { heroSection } from "../../src/data/hero-section";
import { oceanParkAdvantages } from "../../src/data/ocean-park-advantages";
import { oceanParkContactFormWrapper } from "../../src/data/ocean-park-contact-form-wrapper";
import { oceanParkFaq } from "../../src/data/ocean-park-faq";
import { oceanParkIntro } from "../../src/data/ocean-park-intro";
import { oceanParkPricing } from "../../src/data/ocean-park-pricing";
import { oceanParkProjectSamplesWrapper } from "../../src/data/ocean-park-project-samples-wrapper";

export const pageMeta = {
  title: "ocean-park",
};

const oceanParkHero: HeroSectionModel = {
  backgroundImage: heroSection.backgroundImage,
  subtitle: "Làm việc cùng nội thất IC HOUSE",
  title:
    "Thi công nội thất căn hộ tại Vinhomes Ocean Park - Gia Lâm - Hà Nội.",
  htmlText:
    "<ul><li><strong>30+ Kiến trúc sư</strong> sáng tạo, làm chủ nhiều phong cách thiết kế từ hiện đại, tối giản đến tân cổ điển.</li><li><strong>Kinh nghiệm 3 – 15 năm</strong> thực chiến, đảm bảo giải pháp thẩm mỹ và tối ưu công năng.</li><li><strong>Hơn 1500+ dự án căn hộ</strong> từ trung đến cao cấp – khẳng định uy tín và khả năng đáp ứng mọi nhu cầu.</li></ul>",
  buttonLabel: "Tư vấn miễn phí",
  buttonLink: { url: "#dang-ky-tu-van", is_external: false, nofollow: false },
};

export default function OceanParkPage() {
  return (
    <div>
      <Header {...header} />
      <HeroSection {...oceanParkHero} />
      <OceanParkIntro {...oceanParkIntro} />
      <OceanParkProjectSamplesWrapper {...oceanParkProjectSamplesWrapper} />
      <OceanParkPricing {...oceanParkPricing} />
      <OceanParkAdvantages {...oceanParkAdvantages} />
      <OceanParkContactFormWrapper {...oceanParkContactFormWrapper} />
      <OceanParkFaq {...oceanParkFaq} />
      <FloatingContact {...floatingContact} />
      <Footer {...footer} />
    </div>
  );
}

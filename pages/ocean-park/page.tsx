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
  subtitle: heroSection.subtitle,
  title: heroSection.title,
  htmlText: heroSection.htmlText,
  buttonLabel: heroSection.buttonLabel,
  buttonLink: heroSection.buttonLink,
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

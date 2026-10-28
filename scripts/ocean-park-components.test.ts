import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import OceanParkAdvantages from "../src/components/ocean-park-advantages/OceanParkAdvantages";
import OceanParkContactForm from "../src/components/ocean-park-contact-form/OceanParkContactForm";
import OceanParkContactFormWrapper from "../src/components/ocean-park-contact-form/OceanParkContactFormWrapper";
import OceanParkFaq from "../src/components/ocean-park-faq/OceanParkFaq";
import OceanParkIntro from "../src/components/ocean-park-intro/OceanParkIntro";
import OceanParkPricing from "../src/components/ocean-park-pricing/OceanParkPricing";
import OceanParkProjectSamples from "../src/components/ocean-park-project-samples/OceanParkProjectSamples";
import OceanParkProjectSamplesWrapper from "../src/components/ocean-park-project-samples/OceanParkProjectSamplesWrapper";
import { oceanParkAdvantages } from "../src/data/ocean-park-advantages";
import oceanParkContactForm from "../src/data/ocean-park-contact-form";
import { oceanParkFaq } from "../src/data/ocean-park-faq";
import { oceanParkIntro } from "../src/data/ocean-park-intro";
import { oceanParkPricing } from "../src/data/ocean-park-pricing";
import oceanParkProjectSamples from "../src/data/ocean-park-project-samples";

describe("OceanParkIntro", () => {
  test("renders high-end policies, process steps, subdivision badges, and CTAs", () => {
    const html = renderToStaticMarkup(createElement(OceanParkIntro, oceanParkIntro));

    assert.ok(html.includes("ocean-park-intro"));
    assert.ok(html.includes("The London"));
    assert.ok(html.includes("The Paris"));
    assert.ok(html.includes("The Beverly"));
    assert.ok(html.includes("LUMIÈRE SpringBay"));
    assert.ok(html.includes("Masteri Trinity Square"));
    assert.ok(html.includes("120 triệu"));
    assert.ok(html.includes("0978 305 740"));
  });

  test("returns empty string when all fields are empty", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkIntro, {
        eyebrow: "  ",
        title: "  ",
        leadHtml: "  ",
        highlights: [],
        subdivisionBadges: [],
        steps: [],
        primaryCta: {
          label: "",
          link: { url: "", is_external: false, nofollow: false },
        },
        secondaryCta: {
          label: "",
          link: { url: "", is_external: false, nofollow: false },
        },
      }),
    );

    assert.equal(html, "");
  });
});

describe("OceanParkProjectSamples", () => {
  test("renders zone filter tabs, unit type tabs, and luxury apartment cards with tower codes", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkProjectSamples, oceanParkProjectSamples),
    );

    assert.ok(html.includes("ocean-park-project-samples"));
    assert.ok(html.includes("Tòa LD1"));
    assert.ok(html.includes("Tòa LD2"));
    assert.ok(html.includes("Tòa LD3"));
    assert.ok(html.includes("Tòa BE1"));
    assert.ok(html.includes("Tòa BE2"));
    assert.ok(html.includes("Tòa BE3"));
    assert.ok(html.includes("Tòa BE4"));
    assert.ok(html.includes("Căn hộ The London"));
    assert.ok(html.includes("Căn hộ The Beverly"));
    assert.ok(html.includes("The Paris Ocean Park 1"));
    assert.ok(html.includes("Căn hộ LUMIÈRE SpringBay"));
    assert.ok(html.includes("Dự án Masteri Trinity Square"));
    assert.ok(html.includes("Căn hộ cao tầng Ocean Park 3"));
  });

  test("renders wrapper with client island script and returns empty string when empty", () => {
    const wrapperHtml = renderToStaticMarkup(
      createElement(OceanParkProjectSamplesWrapper, oceanParkProjectSamples),
    );
    assert.ok(wrapperHtml.includes('data-rct="oceanParkProjectSamples"'));

    const emptyWrapperHtml = renderToStaticMarkup(
      createElement(OceanParkProjectSamplesWrapper, {
        eyebrow: "",
        title: "   ",
        description: "",
        zoneTabs: [],
        unitTypeTabs: [],
        featuredProjects: [
          {
            ...oceanParkProjectSamples.featuredProjects[0]!,
            title: "   ",
          },
        ],
        ctaBanner: {
          title: "",
          description: "",
          buttonLabel: "",
          buttonLink: { url: "", is_external: false, nofollow: false },
        },
      }),
    );
    assert.equal(emptyWrapperHtml, "");
  });
});

describe("OceanParkPricing", () => {
  test("renders luxury package pricing, unit & room estimates, and 3 commitment columns", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkPricing, oceanParkPricing),
    );

    assert.ok(html.includes("ocean-park-pricing"));
    assert.ok(html.includes("180 – 260 triệu"));
    assert.ok(html.includes("35 – 60 triệu"));
    assert.ok(html.includes("Vicostone"));
    assert.ok(html.includes("An Cường"));
    assert.ok(html.includes("Blum"));
    assert.ok(html.includes("The Beverly"));
    assert.ok(html.includes("The London"));
    assert.ok(html.includes("LUMIÈRE SpringBay"));
  });

  test("returns empty string when all pricing fields are empty", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkPricing, {
        eyebrow: "",
        title: "   ",
        description: "",
        featuredPackage: {
          badge: "",
          title: "",
          price: "",
          unit: "",
          note: "",
          handoverSavingNote: "",
        },
        primaryCta: {
          label: "",
          link: { url: "", is_external: false, nofollow: false },
        },
        secondaryCta: {
          label: "",
          link: { url: "", is_external: false, nofollow: false },
        },
        unitEstimatesTitle: "",
        unitEstimatesSubtitle: "",
        unitEstimates: [],
        roomEstimates: [],
        commitments: [],
        bottomPrompt: {
          title: "",
          description: "",
          buttonLabel: "",
          buttonLink: { url: "", is_external: false, nofollow: false },
        },
      }),
    );
    assert.equal(html, "");
  });
});

describe("OceanParkAdvantages", () => {
  test("highlights IC HOUSE model home inside Ocean Park, nearby office, and nearby factory", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkAdvantages, oceanParkAdvantages),
    );

    assert.ok(html.includes("ocean-park-advantages"));
    assert.ok(html.includes("Sao Biển 23, KĐT Vinhomes Ocean Park, Gia Lâm, Hà Nội"));
    assert.ok(html.includes("Số 01 Voi Phục, Gia Lâm, Hà Nội"));
    assert.ok(html.includes("Thôn Ngọc Trai, Xã Như Quỳnh, Tỉnh Hưng Yên"));
  });

  test("returns empty string when all advantages fields are empty", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkAdvantages, {
        eyebrow: "",
        title: "   ",
        description: "",
        localStrengths: [],
        capabilityPillars: [],
        proofBanner: {
          title: "",
          description: "",
          buttonLabel: "",
          buttonLink: { url: "", is_external: false, nofollow: false },
        },
      }),
    );
    assert.equal(html, "");
  });
});

describe("OceanParkContactForm", () => {
  test("renders inline consultation form with Ocean Park tower selector and 3 IC HOUSE addresses", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkContactForm, oceanParkContactForm),
    );

    assert.ok(html.includes("ocean-park-contact-form"));
    assert.ok(html.includes('id="dang-ky-tu-van"'));
    assert.ok(html.includes("0978 305 740"));
    assert.ok(html.includes("Sao Biển 23"));
    assert.ok(html.includes("The London Ocean Park 1"));
    assert.ok(html.includes("LUMIÈRE SpringBay Ocean Park 2"));
    assert.ok(html.includes("Masteri Trinity Square Ocean Park 2"));
  });

  test("hotline card uses group hover classes so strong phone text and icon badge contrast with gold hover background", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkContactForm, oceanParkContactForm),
    );

    assert.match(
      html,
      /<a[^>]*href="tel:0978305740"[^>]*class="[^"]*\bgroup\b[^"]*hover:!bg-brand-gold[^"]*"/,
    );
    assert.match(
      html,
      /<strong[^>]*class="[^"]*!text-brand-gold[^"]*group-hover:!text-brand-white[^"]*">0978 305 740<\/strong>/,
    );
  });

  test("renders wrapper with client island script and returns empty string when empty", () => {
    const wrapperHtml = renderToStaticMarkup(
      createElement(OceanParkContactFormWrapper, oceanParkContactForm),
    );
    assert.ok(wrapperHtml.includes('data-rct="oceanParkContactForm"'));

    const emptyWrapperHtml = renderToStaticMarkup(
      createElement(OceanParkContactFormWrapper, {
        formKey: "",
        eyebrow: "  ",
        title: "   ",
        description: "",
        hotline: "  ",
        zaloPhone: "",
        email: "",
        website: "",
        locations: [{ label: " ", address: " " }],
        referenceLinks: [],
        formTitle: "",
        formSubtitle: "",
        zoneOptions: ["   "],
        submitLabel: "",
        successMessage: "",
      }),
    );
    assert.equal(emptyWrapperHtml, "");
  });
});

const REQUIRED_KEYWORDS = [
  "Ocean Park 1",
  "The Paris",
  "The Paris Ocean Park 1",
  "The London",
  "The London Ocean Park 1",
  "Tòa LD1",
  "Tòa LD2",
  "Tòa LD3",
  "The Beverly",
  "The Beverly Ocean Park 1",
  "Tòa BE1",
  "Tòa BE2",
  "Tòa BE3",
  "Tòa BE4",
  "Ocean Park 2",
  "LUMIÈRE SpringBay",
  "LUMIÈRE SpringBay Ocean Park 2",
  "Masteri Trinity Square",
  "Masteri Trinity Square Ocean Park 2",
  "Ocean Park 3",
  "Căn hộ cao tầng Ocean Park 3",
  "Dự án căn hộ Ocean Park 3",
  "Chung cư Ocean Park 1",
  "Căn hộ The Beverly",
  "Căn hộ The London",
  "Dự án Masteri Trinity Square",
  "Căn hộ LUMIÈRE SpringBay",
];

describe("OceanParkFaq & Full Keyword Coverage", () => {
  test("renders FAQ accordion items with exclusive sync and all 27 Google Ads keywords across the suite", () => {
    const faqHtml = renderToStaticMarkup(createElement(OceanParkFaq, oceanParkFaq));
    assert.ok(faqHtml.includes("ocean-park-faq"));
    assert.ok(faqHtml.includes("ocean-park-faq-item-input"));

    const combinedHtml = [
      renderToStaticMarkup(createElement(OceanParkIntro, oceanParkIntro)),
      renderToStaticMarkup(
        createElement(OceanParkProjectSamples, oceanParkProjectSamples),
      ),
      renderToStaticMarkup(createElement(OceanParkPricing, oceanParkPricing)),
      renderToStaticMarkup(
        createElement(OceanParkAdvantages, oceanParkAdvantages),
      ),
      renderToStaticMarkup(
        createElement(OceanParkContactForm, oceanParkContactForm),
      ),
      faqHtml,
    ].join("\n");

    for (const keyword of REQUIRED_KEYWORDS) {
      assert.ok(
        combinedHtml.includes(keyword),
        `Missing required Google Ads keyword: "${keyword}"`,
      );
    }
  });

  test("returns empty string when all FAQ fields are empty", () => {
    const emptyHtml = renderToStaticMarkup(
      createElement(OceanParkFaq, {
        eyebrow: "",
        title: "   ",
        description: "",
        items: [],
        keywordGroupTitle: "",
        keywordPills: [],
      }),
    );
    assert.equal(emptyHtml, "");
  });

  test("defaults to opening the first FAQ item when no item has defaultOpen set", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkFaq, {
        ...oceanParkFaq,
        items: oceanParkFaq.items.map((item) => ({
          ...item,
          defaultOpen: false,
        })),
      }),
    );

    assert.match(
      html,
      /<input[^>]*id="ocean-park-faq-item-0"[^>]*checked=""/,
    );
  });

  test("applies WordPress Porto specificity guards on rich HTML lead and FAQ answer blocks", () => {
    const introHtml = renderToStaticMarkup(
      createElement(OceanParkIntro, oceanParkIntro),
    );
    const faqHtml = renderToStaticMarkup(
      createElement(OceanParkFaq, oceanParkFaq),
    );

    assert.ok(
      introHtml.includes("[&amp;_p]:!text-brand-white-hover"),
      "OceanParkIntro leadHtml must enforce [&_p]:!text-brand-white-hover against Porto p color rules",
    );
    assert.ok(
      faqHtml.includes("[&amp;_li]:!list-disc"),
      "OceanParkFaq answerHtml must enforce [&_li]:!list-disc against Porto li resets",
    );
  });
});

describe("Defensive Rendering & Edge Cases (API {} / Partial Props)", () => {
  test("all 6 Ocean Park components and wrappers return empty string without throwing on {} or partial props", () => {
    const components = [
      OceanParkIntro,
      OceanParkProjectSamples,
      OceanParkProjectSamplesWrapper,
      OceanParkPricing,
      OceanParkAdvantages,
      OceanParkContactForm,
      OceanParkContactFormWrapper,
      OceanParkFaq,
    ];

    for (const Comp of components) {
      assert.doesNotThrow(() => {
        const html = renderToStaticMarkup(createElement(Comp as any, {}));
        assert.equal(html, "");
      }, `${Comp.name} threw on empty {} props`);

      assert.doesNotThrow(() => {
        renderToStaticMarkup(
          createElement(Comp as any, {
            highlights: [{}],
            steps: [{}],
            featuredProjects: [{}],
            zoneTabs: [{}],
            unitTypeTabs: [{}],
            unitEstimates: [{}],
            roomEstimates: [{}],
            commitments: [{ title: "Test", items: [{}] }],
            localStrengths: [{}],
            capabilityPillars: [{}],
            locations: [{}],
            referenceLinks: [{}],
            zoneOptions: [null as any, "  "],
            items: [{}],
            keywordPills: [{}],
          }),
        );
      }, `${Comp.name} threw on partial array items`);
    }
  });

  test("OceanParkContactForm sanitizes tel: and zalo.me links when phone numbers contain dots, dashes, or parentheses", () => {
    const html = renderToStaticMarkup(
      createElement(OceanParkContactForm, {
        ...oceanParkContactForm,
        hotline: "0978.305.740",
        zaloPhone: "(0978) 305-740",
      }),
    );

    assert.ok(
      html.includes('href="tel:0978305740"'),
      "tel: link must strip dots and non-digit characters",
    );
    assert.ok(
      html.includes('href="https://zalo.me/0978305740"'),
      "zalo.me link must strip parentheses, spaces, and dashes",
    );
  });
});

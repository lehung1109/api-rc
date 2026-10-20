import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import OceanParkIntro from "../src/components/ocean-park-intro/OceanParkIntro";
import OceanParkPricing from "../src/components/ocean-park-pricing/OceanParkPricing";
import OceanParkProjectSamples from "../src/components/ocean-park-project-samples/OceanParkProjectSamples";
import OceanParkProjectSamplesWrapper from "../src/components/ocean-park-project-samples/OceanParkProjectSamplesWrapper";
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
    assert.ok(html.includes("0869 855 885"));
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

    const emptyHtml = renderToStaticMarkup(
      createElement(OceanParkProjectSamples, {
        eyebrow: "",
        title: "   ",
        description: "",
        zoneTabs: [],
        unitTypeTabs: [],
        featuredProjects: [],
        ctaBanner: {
          title: "",
          description: "",
          buttonLabel: "",
          buttonLink: { url: "", is_external: false, nofollow: false },
        },
      }),
    );
    assert.equal(emptyHtml, "");
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

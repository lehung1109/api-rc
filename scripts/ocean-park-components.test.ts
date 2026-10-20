import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import OceanParkIntro from "../src/components/ocean-park-intro/OceanParkIntro";
import { oceanParkIntro } from "../src/data/ocean-park-intro";

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

import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import CollaborationIntro, {
  type CollaborationIntroModel,
} from "../src/components/collaboration-intro/CollaborationIntro";

const base: CollaborationIntroModel = {
  subtitle: "",
  titleHtml: "",
  image: {
    url: "",
    alt: "",
    display_dimensions: { width: 0, height: 0 },
  },
  bottomTitle: "",
  items: [],
  note: "",
  buttonLabel: "TRỞ THÀNH ĐỐI TÁC ICHOUSE!",
  buttonLink: { url: "", is_external: false, nofollow: false },
};

const render = (model: CollaborationIntroModel) =>
  renderToStaticMarkup(createElement(CollaborationIntro, model));

const BUTTON_CLASS = "collaboration-intro-button";

describe("CollaborationIntro popup CTA", () => {
  test("renders <button data-contact-popup-open> when popupTarget is set", () => {
    const markup = render({ ...base, popupTarget: "tu-van" });
    assert.ok(markup.includes("<button"));
    assert.ok(markup.includes('data-contact-popup-open="tu-van"'));
    assert.ok(markup.includes(BUTTON_CLASS));
    assert.ok(!markup.includes("<a"));
  });

  test("keeps <a> link when popupTarget is absent", () => {
    const markup = render({
      ...base,
      buttonLink: { url: "/hop-tac", is_external: false, nofollow: false },
    });
    assert.ok(markup.includes("<a"));
    assert.ok(markup.includes(BUTTON_CLASS));
    assert.ok(!markup.includes("data-contact-popup-open"));
  });

  test("normalizes popupTarget to a slug key", () => {
    const markup = render({ ...base, popupTarget: " Tu Van " });
    assert.ok(markup.includes('data-contact-popup-open="tu-van"'));
  });

  test("does not render CTA when buttonLabel is blank", () => {
    const markup = render({ ...base, buttonLabel: "  ", popupTarget: "tu-van" });
    assert.ok(!markup.includes(BUTTON_CLASS));
    assert.ok(!markup.includes("data-contact-popup-open"));
  });
});

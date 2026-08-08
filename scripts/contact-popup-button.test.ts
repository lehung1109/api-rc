import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import ContactPopupButton, {
  type ContactPopupButtonModel,
} from "../src/components/contact-popup-button/ContactPopupButton";

const render = (model: ContactPopupButtonModel) =>
  renderToStaticMarkup(createElement(ContactPopupButton, model));

const BUTTON_CLASS = "contact-popup-button";

describe("ContactPopupButton", () => {
  test("renders a button with data-contact-popup-open when popupTarget is set", () => {
    const markup = render({ buttonLabel: "Liên hệ ngay", popupTarget: "tu-van" });
    assert.ok(markup.includes("<button"));
    assert.ok(markup.includes('data-contact-popup-open="tu-van"'));
    assert.ok(markup.includes(BUTTON_CLASS));
    assert.ok(!markup.includes("<a"));
  });

  test("normalizes popupTarget to a slug key", () => {
    const markup = render({ buttonLabel: "Liên hệ ngay", popupTarget: " Tu Van " });
    assert.ok(markup.includes('data-contact-popup-open="tu-van"'));
  });

  test("renders nothing when popupTarget is blank", () => {
    const markup = render({ buttonLabel: "Liên hệ ngay", popupTarget: "   " });
    assert.equal(markup, "");
  });

  test("renders nothing when buttonLabel is blank", () => {
    const markup = render({ buttonLabel: "  ", popupTarget: "tu-van" });
    assert.equal(markup, "");
  });

  test("appends className to the button", () => {
    const markup = render({
      buttonLabel: "Liên hệ ngay",
      popupTarget: "tu-van",
      className: "my-custom-class",
    });
    assert.ok(markup.includes(BUTTON_CLASS));
    assert.ok(markup.includes("my-custom-class"));
  });

  test("defaults to white variant with ghost classes", () => {
    const markup = render({ buttonLabel: "Liên hệ ngay", popupTarget: "tu-van" });
    assert.ok(markup.includes("!border-brand-white"));
    assert.ok(markup.includes("!text-brand-white"));
    assert.ok(markup.includes("hover:!bg-brand-white hover:!text-brand-navy"));
  });

  test("renders navy variant with navy border and text, white on hover", () => {
    const markup = render({
      buttonLabel: "Liên hệ ngay",
      popupTarget: "tu-van",
      variant: "navy",
    });
    assert.ok(markup.includes("!border-brand-navy"));
    assert.ok(markup.includes("!text-brand-navy"));
    assert.ok(markup.includes("hover:!bg-brand-navy hover:!text-brand-white"));
    assert.ok(!markup.includes("!border-brand-white"));
  });
});

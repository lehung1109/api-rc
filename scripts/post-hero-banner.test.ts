import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import PostHeroBanner, {
  type PostHeroBannerModel,
} from "../src/components/post-hero-banner/PostHeroBanner";

const backgroundImage = {
  url: "https://example.com/hero.jpg",
  alt: "",
  display_dimensions: { width: 1600, height: 900 },
  srcSet: "hero-640.jpg 640w, hero-1600.jpg 1600w",
  sizes: "100vw",
};

const render = (model: Partial<PostHeroBannerModel>) =>
  renderToStaticMarkup(
    createElement(PostHeroBanner, model as PostHeroBannerModel),
  );

describe("PostHeroBanner optional content", () => {
  test("renders only the responsive background when content is omitted", () => {
    const markup = render({ backgroundImage });

    assert.ok(markup.includes("post-hero-banner"));
    assert.ok(markup.includes('srcSet="hero-640.jpg 640w, hero-1600.jpg 1600w"'));
    assert.ok(markup.includes('sizes="100vw"'));
    assert.ok(!markup.includes("post-hero-banner-content"));
    assert.ok(!markup.includes("<nav"));
    assert.ok(!markup.includes("<h1"));
  });

  test("renders one valid breadcrumb without requiring a second item", () => {
    const markup = render({
      backgroundImage,
      breadcrumbItems: [
        {
          label: "Trang chủ",
          link: { url: "/", is_external: false, nofollow: false },
        },
      ],
    });

    assert.ok(markup.includes("post-hero-banner-breadcrumb"));
    assert.ok(markup.includes("Trang chủ"));
    assert.ok(!markup.includes("post-hero-banner-breadcrumb-separator"));
  });

  test("omits blank title and invalid breadcrumbs without blank content markup", () => {
    const markup = render({
      backgroundImage,
      title: "   ",
      breadcrumbItems: [
        {
          label: "Thiếu URL",
          link: { url: "", is_external: false, nofollow: false },
        },
      ],
    });

    assert.ok(markup.includes("post-hero-banner"));
    assert.ok(!markup.includes("post-hero-banner-content"));
    assert.ok(!markup.includes("<nav"));
    assert.ok(!markup.includes("<h1"));
  });

  test("returns empty markup when the background is missing", () => {
    assert.equal(
      render({
        backgroundImage: { ...backgroundImage, url: "" },
        title: "Tiêu đề",
      }),
      "",
    );
  });
});

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import JobDetail, {
  type JobDetailModel,
} from "../src/components/job-detail/JobDetail";

const validModel: JobDetailModel = {
  title: "Tuyển dụng Content Creator",
  metadata: ["Toàn thời gian", "Hồ Chí Minh"],
  sections: [
    {
      title: "Mô tả công việc",
      items: ["Lên ý tưởng nội dung", "Phối hợp cùng đội ngũ"],
    },
    {
      title: "",
      items: ["Không được hiển thị"],
    },
    {
      title: "Yêu cầu",
      items: ["", "Có kinh nghiệm sáng tạo nội dung"],
    },
  ],
  sidebarTitle: "Ứng tuyển khác",
  relatedJobs: [
    {
      categoryLabel: "Kiến trúc sư",
      title: "Kiến trúc sư triển khai",
      link: { url: "/jobs/kien-truc-su", is_external: false, nofollow: false },
      metadata: ["Toàn thời gian", "Hà Nội"],
    },
    {
      categoryLabel: "Không hợp lệ",
      title: "Thiếu liên kết",
      link: { url: "", is_external: false, nofollow: false },
      metadata: [],
    },
  ],
};

describe("JobDetail render contract", () => {
  test("renders structured job content with semantic landmarks", () => {
    const html = renderToStaticMarkup(createElement(JobDetail, validModel));

    assert.match(html, /^<section/);
    assert.match(html, /<h1[^>]*>Tuyển dụng Content Creator<\/h1>/);
    assert.match(html, /<h2[^>]*>Mô tả công việc<\/h2>/);
    assert.match(html, /<ul[^>]*>.*<li[^>]*>Lên ý tưởng nội dung<\/li>/);
    assert.match(html, /<aside/);
    assert.match(html, /<article/);
  });

  test("filters invalid sections, bullets, and related jobs", () => {
    const html = renderToStaticMarkup(createElement(JobDetail, validModel));

    assert.doesNotMatch(html, /Không được hiển thị/);
    assert.doesNotMatch(html, /Thiếu liên kết/);
    assert.equal((html.match(/Có kinh nghiệm sáng tạo nội dung/g) ?? []).length, 1);
  });

  test("returns no markup when all meaningful content is empty", () => {
    const emptyModel: JobDetailModel = {
      title: "",
      metadata: [""],
      sections: [{ title: "", items: [""] }],
      sidebarTitle: "",
      relatedJobs: [],
    };

    assert.equal(renderToStaticMarkup(createElement(JobDetail, emptyModel)), "");
  });

  test("uses the white container layout and sticky desktop sidebar", () => {
    const html = renderToStaticMarkup(createElement(JobDetail, validModel));

    for (const className of [
      "!bg-brand-white",
      "!py-20",
      "!max-w-7xl",
      "md:!grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]",
      "md:!sticky",
      "md:!top-20",
      "md:!self-start",
    ]) {
      assert.ok(html.includes(className), `Missing layout class ${className}`);
    }
  });

  test("mounts canonical sample data immediately after the construction hero", async () => {
    const dataSource = await readFile(
      new URL("../src/data/job-detail.ts", import.meta.url),
      "utf8",
    );
    const pageSource = await readFile(
      new URL("../pages/construction/page.tsx", import.meta.url),
      "utf8",
    );

    assert.match(dataSource, /const jobDetail: JobDetailModel =/);
    assert.match(dataSource, /export default jobDetail/);
    assert.match(pageSource, /import JobDetail from/);
    assert.match(pageSource, /import jobDetail from/);

    const heroIndex = pageSource.indexOf(
      "<VideoHeroBannerWrapper {...videoHeroBannerWrapper} />",
    );
    const jobDetailIndex = pageSource.indexOf("<JobDetail {...jobDetail} />");
    const aboutIndex = pageSource.indexOf("<AboutIntro {...aboutIntro} />");

    assert.ok(heroIndex >= 0, "Construction page must render the hero");
    assert.ok(jobDetailIndex > heroIndex, "JobDetail must render after the hero");
    assert.ok(aboutIndex > jobDetailIndex, "JobDetail must render before AboutIntro");
  });

  test("marks every Tailwind utility in the feature as important", async () => {
    const featureDir = new URL("../src/components/job-detail/", import.meta.url);
    const fileNames = [
      "JobDetail.tsx",
      "JobDetailSection.tsx",
      "JobDetailSidebarItem.tsx",
    ];
    const utilityToken = /(?<=^|[\s\"])(?:[a-z-]+:)*-?(?:m|p|gap|space|grid|flex|block|hidden|w|h|min|max|text|font|leading|tracking|bg|border|rounded|sticky|top|self|list|underline|no-underline|uppercase|relative|absolute|overflow)[^\s\"]*/g;

    for (const fileName of fileNames) {
      const source = await readFile(new URL(fileName, featureDir), "utf8");
      const classStrings = source.match(/className=(?:\{cn\()?\"([^\"]+)\"/g) ?? [];

      for (const classString of classStrings) {
        const utilities = classString.match(utilityToken) ?? [];
        for (const utility of utilities) {
          const finalSegment = utility.split(":").at(-1) ?? utility;
          assert.ok(
            finalSegment.startsWith("!"),
            `${fileName} has non-important utility ${utility}`,
          );
        }
      }
    }
  });
});

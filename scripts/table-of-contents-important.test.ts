import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, test } from "node:test";

const featureDir = new URL(
  "../src/components/table-of-contents/",
  import.meta.url,
);
const stylesUrl = new URL("../src/styles.css", import.meta.url);

const expectedImportantUtilities: Record<string, string[]> = {
  "TableOfContents.tsx": [
    "!fixed",
    "!right-0",
    "!top-1/2",
    "!z-40",
    "!-translate-y-1/2",
    "!rounded-lg",
    "!border",
    "!bg-brand-white",
    "!p-0",
    "!shadow-md",
    "!relative",
    "!p-3",
    "!w-[300px]",
    "!h-[100dvh]",
    "!z-1000",
    "!max-h-[100dvh]",
    "!flex",
    "!min-w-0",
    "!flex-1",
    "!items-center",
    "!gap-2",
    "!text-left",
    "!justify-between",
    "!height-[var(--toc-height)]",
    "!h-full",
    "!w-full",
    "!absolute",
    "!top-0",
    "!left-0",
    "!h-5",
    "!w-5",
    "!shrink-0",
    "!truncate",
    "!font-bold",
    "!hidden",
    "!transition-transform",
    "!rotate-180",
    "!max-w-full",
    "!border-brand-navy",
    "!border-0",
    "!p-2.5",
    "!text-[22px]",
    "!size-7",
    "!text-brand-navy",
    "!w-[300px]",
  ],
  "TableOfContentsList.tsx": [
    "!hidden",
    "!w-full",
    "peer-checked/branch:!block",
    "!mt-3",
    "!overflow-y-auto",
    "has-[:checked]:[&_.table-of-contents-branch-chevron]:!rotate-90",
    "!sr-only",
    "!min-w-0",
    "!shrink-0",
    "!p-0.5",
    "!absolute",
    "!right-[calc(100%-30px)]",
    "!left-auto",
    "!h-auto",
    "!w-6",
    "!transition-transform",
    "!block",
    "!relative",
    "!p-0",
    "!font-bold",
    "!py-2.5",
    "!pr-2.5",
    "!pl-[50px]",
    "opacity-30",
    "hover:!opacity-100",
    "!translate-y-0",
    "!top-2.5",
    "!cursor-pointer",
  ],
};

describe("Table of Contents Tailwind important contract", () => {
  for (const [fileName, utilities] of Object.entries(
    expectedImportantUtilities,
  )) {
    test(`${fileName} marks every Tailwind utility as important`, async () => {
      const source = await readFile(new URL(fileName, featureDir), "utf8");

      for (const utility of utilities) {
        assert.ok(
          source.includes(utility),
          `${fileName} is missing important utility ${utility}`,
        );
      }
    });
  }

  test("moves pseudo-element and responsive sticky styles into styles.css", async () => {
    const styles = await readFile(stylesUrl, "utf8");

    const normalizedStyles = styles.replace(/\s+/g, " ");

    for (const contract of [
      ".table-of-contents-link::before",
      "transform: scaleX(0)",
      ".table-of-contents-link--active::before",
      "transform: scaleX(1)",
      ".table-of-contents-item .table-of-contents-item::before",
      ".table-of-contents-item .table-of-contents-item .table-of-contents-item::before",
      "calc(50% - 278px)",
      "calc(50% - 520px)",
      "calc(50% - 330px)",
      "calc(50% - 570px)",
    ]) {
      assert.ok(
        normalizedStyles.includes(contract),
        `styles.css is missing ${contract}`,
      );
    }
  });

  test("keeps opacity-0 as the only non-important exception", async () => {
    const sources = await Promise.all(
      [
        "TableOfContents.tsx",
        "TableOfContentsList.tsx",
        "TableOfContentsWrapper.tsx",
      ].map((fileName) => readFile(new URL(fileName, featureDir), "utf8")),
    );

    assert.ok(sources.every((source) => !source.includes("!opacity-0")));
  });
});

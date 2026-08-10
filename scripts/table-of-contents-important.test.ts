import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, test } from "node:test";

const featureDir = new URL(
  "../src/components/table-of-contents/",
  import.meta.url,
);

const expectedImportantUtilities: Record<string, string[]> = {
  "TableOfContents.tsx": [
    "!fixed",
    "!right-4",
    "md:!right-6",
    "!top-1/2",
    "!z-40",
    "!-translate-y-1/2",
    "!rounded-lg",
    "!border",
    "!border-brand-white-hover",
    "!bg-brand-white",
    "!p-0",
    "!shadow-md",
    "!relative",
    "!p-4",
    "!w-[250px]",
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
    "!text-brand-gold",
    "!truncate",
    "!font-bold",
    "!hidden",
    "!transition-transform",
    "!rotate-180",
  ],
  "TableOfContentsList.tsx": [
    "!hidden",
    "!w-full",
    "peer-checked/branch:!block",
    "!mt-3",
    "!overflow-y-auto",
    "!py-1",
    "!pl-5",
    "has-[:checked]:[&_.table-of-contents-branch-chevron]:!rotate-90",
    "!sr-only",
    "!flex",
    "!min-w-0",
    "!flex-1",
    "!items-start",
    "!gap-1",
    "!shrink-0",
    "!p-0.5",
    "!absolute",
    "!top-1/2",
    "!-translate-y-1/2",
    "!left-2.5",
    "!h-auto",
    "!w-6",
    "!transition-transform",
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

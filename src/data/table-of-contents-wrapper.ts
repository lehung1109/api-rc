import type { TableOfContentsModel } from "@/components/table-of-contents/TableOfContents";

const tableOfContentsWrapper: TableOfContentsModel = {
  title: "Mục lục",
  items: [
    { label: "Quy trình thi công", targetId: "section-process" },
    {
      label: "Dự án tiêu biểu",
      targetId: "section-showcase",
      items: [
        {
          label: "Dự án 1",
          targetId: "project-1",
          items: [
            { label: "Dự án 1.1", targetId: "project-1-1" },
            { label: "Dự án 1.2", targetId: "project-1-2" },
            { label: "Dự án 1.3", targetId: "project-1-3" },
          ],
        },
        {
          label: "Dự án 2",
          targetId: "project-2",
          items: [
            { label: "Dự án 2.1", targetId: "project-2-1" },
            { label: "Dự án 2.2", targetId: "project-2-2" },
            { label: "Dự án 2.3", targetId: "project-2-3" },
          ],
        },
      ],
    },
    { label: "Liên hệ tư vấn", targetId: "section-consultation" },
  ],
};

export default tableOfContentsWrapper;

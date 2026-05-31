import type { TableOfContentsModel } from "@/components/table-of-contents/TableOfContents";

const tableOfContentsWrapper: TableOfContentsModel = {
  title: "Mục lục",
  items: [
    { label: "Quy trình thi công", targetId: "section-process" },
    { label: "Dự án tiêu biểu", targetId: "section-showcase" },
    { label: "Liên hệ tư vấn", targetId: "section-consultation" },
  ],
};

export default tableOfContentsWrapper;

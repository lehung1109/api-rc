import TableOfContents from "../../src/components/table-of-contents/TableOfContents";
import tableOfContents from "../../src/data/table-of-contents";
import tableOfContentsContent from "../../src/data/table-of-contents-content";

export const pageMeta = {
  title: "table-of-contents",
};

export default function TableOfContentsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <TableOfContents {...tableOfContents} />

      <article
        className="prose max-w-none pt-8"
        dangerouslySetInnerHTML={{ __html: tableOfContentsContent }}
      />
    </main>
  );
}

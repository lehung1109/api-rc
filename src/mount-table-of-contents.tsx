import ReactDOM from "react-dom/client";

import HtmlContent from "@/components/html-content/HtmlContent";
import TableOfContentsWrapper from "@/components/table-of-contents/TableOfContentsWrapper";
import tableOfContentsContent from "@/data/table-of-contents-content";
import tableOfContentsWrapper from "@/data/table-of-contents-wrapper";

import "./styles.css";

const app = document.getElementById("app");

if (app) {
  ReactDOM.createRoot(app).render(
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <TableOfContentsWrapper {...tableOfContentsWrapper} />
      </div>
      <HtmlContent
        html={tableOfContentsContent}
        className="mx-auto max-w-3xl px-4 py-6"
      />
    </div>,
  );
}

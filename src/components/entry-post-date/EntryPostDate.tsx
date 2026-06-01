import type { HtmlContentModel } from "@/components/html-content/HtmlContent";
import HtmlContent from "@/components/html-content/HtmlContent";
import type { LinkModel } from "@/components/link/Link";

export interface EntryPostDateModel {
  dateLabel: string;
  dateLink: LinkModel;
  term: { text: string; link: LinkModel };
  className?: string;
  as?: HtmlContentModel["as"];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatAnchor(link: LinkModel, children: string): string {
  const href = escapeHtml(link.url);
  const attrs: string[] = [`href="${href}"`];

  if (link.is_external) {
    attrs.push('target="_blank"');
  }

  if (link.nofollow) {
    attrs.push('rel="nofollow"');
  }

  if (link.className) {
    attrs.push(`class="${escapeHtml(link.className)}"`);
  }

  return `<a ${attrs.join(" ")}>${escapeHtml(children)}</a>`;
}

export function buildEntryPostDateHtml(model: EntryPostDateModel): string {
  const dateAnchor = formatAnchor(model.dateLink, model.dateLabel);
  const termAnchor = formatAnchor(model.term.link, model.term.text);

  return `<p>Bài viết được đăng ngày ${dateAnchor} by ${termAnchor}</p>`;
}

const EntryPostDate = (model: EntryPostDateModel) => {
  const { className, as } = model;

  if (model.dateLabel.trim() === "" || model.term.text.trim() === "") {
    return null;
  }

  return (
    <HtmlContent
      html={buildEntryPostDateHtml(model)}
      {...(className !== undefined ? { className } : {})}
      {...(as !== undefined ? { as } : {})}
    />
  );
};

export default EntryPostDate;

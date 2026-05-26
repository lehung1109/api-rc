import { cn } from "@/lib/utils";
import { footerColumnTitleClass } from "./FooterLinkColumn";

export interface FooterContactBlockModel {
  title: string;
  contentHtml: string;
}

export interface FooterContactModel {
  blocks: FooterContactBlockModel[];
  className?: string;
}

const FooterContact = (model: FooterContactModel) => {
  const { blocks, className } = model;

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className={cn("footer-contact min-w-0 space-y-5", className)}>
      {blocks.map((block) => (
        <div key={block.title} className="footer-contact-block">
          <h3
            className={cn(
              "footer-contact-block-title",
              footerColumnTitleClass,
            )}
          >
            {block.title}
          </h3>
          <div
            className="footer-contact-block-content mt-2 text-sm leading-relaxed text-white/90 [&_a]:text-white/90 [&_a]:underline [&_a]:hover:text-[#f47c20] [&>p]:!mbe-0"
            dangerouslySetInnerHTML={{ __html: block.contentHtml }}
          />
        </div>
      ))}
    </div>
  );
};

export default FooterContact;

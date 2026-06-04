import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface RelatedPostListModel {
  title?: string;
  links: { label: string; link: LinkModel }[];
  className?: string;
}

const RelatedPostList = (model: RelatedPostListModel) => {
  const { title, links, className } = model;

  if (links.length === 0) {
    return null;
  }

  return (
    <div className={cn("related-post-list", className)}>
      {title ? (
        <div
          className="related-post-list-title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : null}

      <ul className="related-post-list-list space-y-1 list-disc mb-5">
        {links.map((item) => (
          <li key={item.link.url} className="related-post-list-item ml-5">
            <Link
              {...item.link}
              className={cn(
                "related-post-list-link text-brand-gold",
                item.link.className,
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedPostList;

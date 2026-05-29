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
    <>
      <div dangerouslySetInnerHTML={{ __html: title ?? "" }} />

      <ul
        className={cn("related-post-list space-y-1 list-disc mb-5", className)}
      >
        {links.map((item) => (
          <li key={item.link.url}>
            <Link className="text-[#f36f21]" {...item.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RelatedPostList;

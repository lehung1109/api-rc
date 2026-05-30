import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface InlineListModel {
  items: {
    link: LinkModel;
    text: string;
  }[];
  className?: string;
}

const InlineList = (model: InlineListModel) => {
  const { items, className } = model;

  return (
    <div className={cn("inline-list", className)}>
      {items.map((item) => (
        <div key={item.text}>
          <Link {...item.link}>{item.text}</Link>
        </div>
      ))}
    </div>
  );
};

export default InlineList;

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface KeyPersonnelItemModel {
  image: MediaModel;
  title: string;
  descriptionHtml: string;
  link?: LinkModel;
  linkLabel?: string;
}

const KeyPersonnelCard = (item: KeyPersonnelItemModel) => {
  const { image, title, descriptionHtml, link, linkLabel } = item;

  const trimmedLabel = linkLabel?.trim() ?? "";
  const trimmedUrl = link?.url?.trim() ?? "";
  const showLink = Boolean(trimmedUrl && trimmedLabel);
  const description = descriptionHtml.trim();

  return (
    <article className="key-personnel-card !flex !h-full !flex-col">
      <div className="key-personnel-card-media !relative !aspect-[4/5] !w-full !overflow-hidden">
        <Media
          {...image}
          className={cn(
            "key-personnel-card-image !absolute !inset-0 !h-full !w-full !object-cover",
            image.className,
          )}
        />
      </div>

      <div className="key-personnel-card-body !mt-4 !flex !flex-1 !flex-col !gap-2">
        <h3 className="key-personnel-card-title !text-lg !font-bold !text-brand-white md:!text-xl">
          {title}
        </h3>

        {description ? (
          <div
            className="key-personnel-card-description !text-base !text-brand-white/70 [&_li]:!ml-5 [&_ol]:!list-decimal [&_ul]:!list-disc"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : null}

        {showLink && link ? (
          <Link
            {...link}
            className={cn(
              "key-personnel-card-link",
              "!relative !mt-auto !inline-block !w-fit !pt-2 !text-base !text-brand-white !no-underline",
              "after:!absolute after:!bottom-0 after:!left-0 after:!h-px after:!w-full after:!origin-left",
              "after:!scale-x-[0.35] after:!bg-brand-white after:!transition-transform after:!duration-300",
              "hover:after:!scale-x-100 hover:after:!bg-brand-white",
              link.className,
            )}
          >
            {trimmedLabel}
          </Link>
        ) : null}
      </div>
    </article>
  );
};

export default KeyPersonnelCard;

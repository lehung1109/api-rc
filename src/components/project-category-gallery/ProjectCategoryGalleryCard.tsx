import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProjectCategoryGalleryItemModel } from "@/lib/project-category-gallery/types";

import Link from "../link/Link";
import Media from "../media/Media";

export type { ProjectCategoryGalleryItemModel };

const ProjectCategoryGalleryCard = (item: ProjectCategoryGalleryItemModel) => {
  const { image, title, description, link } = item;
  const titleText = title.trim();
  const descriptionText = description.trim();

  return (
    <li className="project-category-gallery-item-wrap !min-w-0">
      <Link
        {...link}
        className={cn(
          "project-category-gallery-item group !relative !block !aspect-[502/602] !overflow-hidden !no-underline",
          link.className,
        )}
      >
        <div className="project-category-gallery-item-media !absolute !inset-0">
          <Media
            {...image}
            className={cn(
              "project-category-gallery-item-image !absolute !inset-0 !h-full !w-full !object-cover !transition-transform !duration-300 !ease-out group-hover:!scale-105",
              image.className,
            )}
          />
        </div>

        <span
          className="project-category-gallery-item-overlay !pointer-events-none !absolute !inset-0 !bg-brand-navy/65 !opacity-0 !transition-opacity !duration-300 group-hover:!opacity-100"
          aria-hidden="true"
        />

        <span
          className="project-category-gallery-item-plus !pointer-events-none !absolute !inset-0 !z-10 !flex !items-center !justify-center !opacity-0 !transition-opacity !duration-300 group-hover:!opacity-100"
          aria-hidden="true"
        >
          <Plus
            className="!h-16 !w-16 !text-brand-white md:!h-[190px] md:!w-[190px] [&_path]:![vector-effect:non-scaling-stroke]"
            strokeWidth={1}
          />
        </span>

        <div className="project-category-gallery-item-content !absolute !inset-x-0 !bottom-0 !z-10 !px-4 !pb-5 !text-center !opacity-0 !transition-opacity !duration-300 group-hover:!opacity-100">
          {titleText ? (
            <h3 className="project-category-gallery-item-title !text-lg !font-bold !text-brand-white">
              {titleText}
            </h3>
          ) : null}
          {descriptionText ? (
            <p className="project-category-gallery-item-description !mt-1 !whitespace-pre-line !text-base !text-brand-white">
              {descriptionText}
            </p>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default ProjectCategoryGalleryCard;

import { cn } from "@/lib/utils";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface NumberIconGridItemModel {
  number: number;
  image: MediaModel;
  title: string;
}

const NumberIconGridCard = (item: NumberIconGridItemModel) => {
  const { number, image, title } = item;
  const titleText = title.trim();

  return (
    <article className="number-icon-grid-card group relative w-full min-w-0 bg-white pt-[60px] px-[10px] pb-[25px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-shadow duration-200 rounded-xl">
      <span
        className="number-icon-grid-card-number absolute top-0 left-0 z-10 block bg-[#e5e5e5] p-0 text-[70px] leading-none font-bold text-white transition-[transform,background-color,translate] duration-200 group-hover:-translate-x-[10px] group-hover:-translate-y-[10px] group-hover:bg-[#fec10d]"
        aria-hidden="true"
      >
        {number}
      </span>

      <div className="number-icon-grid-card-media mb-4 flex justify-center">
        <Media
          {...image}
          className={cn(
            "number-icon-grid-card-image block h-20 w-auto max-w-full object-contain transition-transform duration-200 ease-out group-hover:scale-105",
            image.className,
          )}
        />
      </div>

      {titleText ? (
        <h3 className="number-icon-grid-card-title text-center text-base text-[#f36f21] transition-colors duration-200 group-hover:text-[#d82a28] font-bold">
          {titleText}
        </h3>
      ) : null}
    </article>
  );
};

export default NumberIconGridCard;

import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface MediaModel {
  url: string;
  alt: string;
  display_dimensions: {
    width: number;
    height: number;
  };
  link?: LinkModel;
  className?: string;
  srcSet?: string;
  sizes?: string;
}

const Media = (model: MediaModel) => {
  const { url, alt, display_dimensions, link, className, srcSet, sizes } =
    model;

  return (
    <>
      {link ? (
        <Link {...link}>
          <img
            src={url}
            alt={alt}
            width={display_dimensions.width}
            height={display_dimensions.height}
            className={className}
            srcSet={srcSet}
            sizes={sizes}
          />
        </Link>
      ) : (
        <img
          src={url}
          alt={alt}
          width={display_dimensions.width}
          height={display_dimensions.height}
          className={className}
          srcSet={srcSet}
          sizes={sizes}
        />
      )}
    </>
  );
};

export default Media;

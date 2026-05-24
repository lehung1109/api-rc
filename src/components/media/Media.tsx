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
}

const Media = (model: MediaModel) => {
  const { url, alt, display_dimensions, link, className } = model;

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
          />
        </Link>
      ) : (
        <img
          src={url}
          alt={alt}
          width={display_dimensions.width}
          height={display_dimensions.height}
          className={className}
        />
      )}
    </>
  );
};

export default Media;

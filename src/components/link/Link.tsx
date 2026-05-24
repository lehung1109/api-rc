export interface LinkModel {
  url: string;
  is_external: boolean;
  nofollow: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Link = (model: LinkModel) => {
  const { url, is_external, nofollow, className, children } = model;

  return (
    <a
      href={url}
      target={is_external ? "_blank" : "_self"}
      rel={nofollow ? "nofollow" : ""}
      className={className}
    >
      {children}
    </a>
  );
};

export default Link;

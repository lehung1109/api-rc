import Media, { type MediaModel } from "../media/Media";

export interface SectionTitleModel {
  title: string;
  backgroundImage: MediaModel; // should be 243 x 10
}

const SectionTitle = (model: SectionTitleModel) => {
  const { title, backgroundImage } = model;

  return (
    <h2
      className={`section-title flex items-center justify-center gap-10 text-center`}
    >
      <Media {...backgroundImage} className="max-md:hidden" />
      <span className={`section-title-underline`}>
        {title}

        <Media {...backgroundImage} className="mt-2.5" />
      </span>
      <Media {...backgroundImage} className="max-md:hidden" />
    </h2>
  );
};

export default SectionTitle;

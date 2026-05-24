import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface HeaderInnerModel {
  logo: MediaModel;
  info_list: {
    icon: MediaModel;
    text: string;
  }[];
}

const HeaderInner = (model: HeaderInnerModel) => {
  const { logo, info_list } = model;

  return (
    <div className="flex items-center justify-between gap-16">
      <div className="leading-0 max-w-[200px]">
        <Media {...logo} className="w-full h-auto" />
      </div>

      <div className="flex items-center justify-between gap-8">
        {info_list.map((info) => (
          <div key={info.text} className="flex items-center gap-4">
            <div className="leading-0">
              <Media {...info.icon} className="w-[45px] h-auto" />
            </div>

            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: info.text }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default HeaderInner;

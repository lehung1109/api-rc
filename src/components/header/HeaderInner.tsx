import { Menu } from "lucide-react";

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
    <div className="header-inner flex items-center justify-between gap-4 md:gap-16">
      <div className="header-inner-logo leading-0 max-w-[200px]">
        <Media {...logo} className="h-auto w-full" />
      </div>

      <div className="header-inner-info hidden items-center justify-between gap-8 md:flex">
        {info_list.map((info) => (
          <div key={info.text} className="flex items-center gap-4">
            <div className="leading-0">
              <Media {...info.icon} className="h-auto w-[45px]" />
            </div>

            <div
              className="text-sm [&>p]:!mbe-0"
              dangerouslySetInnerHTML={{ __html: info.text }}
            />
          </div>
        ))}
      </div>

      <label
        htmlFor="header-menu-open"
        className="header-menu-open-trigger flex cursor-pointer items-center justify-center p-2 text-[#1f1f1f] md:hidden"
        aria-label="Mở menu"
      >
        <Menu className="h-6 w-6" />
      </label>
    </div>
  );
};

export default HeaderInner;

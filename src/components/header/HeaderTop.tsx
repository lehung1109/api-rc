import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface HeaderTopModel {
  text: string;
  phone: string;
  search_placeholder: string;
  link_phone: {
    url: string;
    nofollow: boolean;
    is_external: boolean;
  };
}

const HeaderTop = (model: HeaderTopModel) => {
  const { text, phone, search_placeholder, link_phone } = model;

  return (
    <div className="w-full bg-[#f36f21] text-xs">
      <div className="container">
        <div className="flex h-[52px] items-center justify-between gap-4">
          <p className="hidden text-sm font-medium text-white md:block !mbe-0">
            {text}
          </p>

          <div className="flex flex-1 justify-center md:max-w-[420px]">
            <div className="relative w-full max-w-[360px] md:max-w-[420px]">
              <Input
                placeholder={search_placeholder}
                className="h-9 rounded-full border-0 bg-white pr-10 !text-xs shadow-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <Button asChild>
            <a
              href={link_phone.url}
              target={link_phone.is_external ? "_blank" : "_self"}
              rel={link_phone.nofollow ? "nofollow" : ""}
              className="h-10 rounded-full !bg-[#10b981] px-6 text-xs font-bold !text-white hover:!bg-[#0ea271]"
            >
              {phone}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;

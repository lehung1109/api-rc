import { Button } from "@/components/ui/button";
import AutocompleteSearch, {
  type AutocompleteSearchModel,
} from "./AutocompleteSearch";
import ReactSection from "../ReactSection";
import ClientComponentWrapper from "../ClientComponentWrapper";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface HeaderTopModel {
  text: string;
  phone: string;
  link_phone: LinkModel;
  autocomplete_search: AutocompleteSearchModel;
}

const HeaderTop = (model: HeaderTopModel) => {
  const { text, phone, link_phone, autocomplete_search } = model;

  return (
    <div className="w-full bg-[#f36f21] text-xs">
      <div className="container">
        <div className="flex h-[52px] items-center justify-between gap-4">
          <p className="hidden text-sm font-medium text-white md:block !mbe-0">
            {text}
          </p>

          <ClientComponentWrapper className="flex flex-1 justify-center md:max-w-[420px] relative">
            <AutocompleteSearch {...autocomplete_search} />
          </ClientComponentWrapper>
          <ReactSection type="autocompleteSearch" data={autocomplete_search} />

          <Button asChild>
            <Link
              {...link_phone}
              className="h-10 rounded-full !bg-[#10b981] px-6 text-xs font-bold !text-white hover:!bg-[#039565]"
            >
              {phone}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;

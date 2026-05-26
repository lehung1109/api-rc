import ClientComponentWrapper from "../ClientComponentWrapper";
import ReactSection from "../ReactSection";
import AutocompleteSearch, {
  type AutocompleteSearchModel,
} from "./AutocompleteSearch";
import { cn } from "@/lib/utils";

export interface HeaderSearchProps {
  autocomplete_search: AutocompleteSearchModel;
  className?: string;
}

const HeaderSearch = ({
  autocomplete_search,
  className,
}: HeaderSearchProps) => {
  return (
    <ClientComponentWrapper
      className={cn(
        "header-overlay-search relative flex flex-1 justify-center",
        className,
      )}
    >
      <AutocompleteSearch {...autocomplete_search} />
      <ReactSection type="autocompleteSearch" data={autocomplete_search} />
    </ClientComponentWrapper>
  );
};

export default HeaderSearch;

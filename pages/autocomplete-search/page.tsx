import AutocompleteSearch from "../../src/components/header/AutocompleteSearch";
import { autocompleteSearch } from "../../src/data/autocomplete-search";

export const pageMeta = {
  title: "autocomplete-search",
};

export default function AutocompleteSearchPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <AutocompleteSearch {...autocompleteSearch} />
    </main>
  );
}

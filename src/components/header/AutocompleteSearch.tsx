"use client";

import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import AutocompleteItems from "./AutocompleteItems";

export interface AutocompleteSearchModel {
  placeholder: string;
  api_url: string;
}

const AutocompleteSearch = (model: AutocompleteSearchModel) => {
  const { placeholder, api_url } = model;

  const [value, setValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!value || value.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const response = await fetch(
        `${api_url}?search=${value}&per_page=5&_embed=wp:featuredmedia&_fields=id,link,title.rendered,_links.wp:featuredmedia,_embedded.wp:featuredmedia`,
      );
      const data = await response.json();
      setResults(data);
      setLoading(false);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          placeholder={placeholder}
          className="h-9 rounded-full md:border-0 bg-white pr-10 !text-xs shadow-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 border-1 border-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />

        {loading ? (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 animate-spin" />
        ) : (
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        )}

        {results.length > 0 && isFocused && (
          <AutocompleteItems results={results} />
        )}
      </div>
    </div>
  );
};

export default AutocompleteSearch;

import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AutocompleteSearchModel } from "../header/AutocompleteSearch";
import HeaderSearch from "../header/HeaderSearch";

export interface ConstructionHeaderModalAnimationModel {
  enableFadeIn?: boolean;
  enableSlideIn?: boolean;
}

export interface ConstructionHeaderSearchModalModel {
  autocomplete_search: AutocompleteSearchModel;
  closeLabel: string;
  checkboxId: string;
  animation?: ConstructionHeaderModalAnimationModel;
  className?: string;
}

const ConstructionHeaderSearchModal = (
  model: ConstructionHeaderSearchModalModel,
) => {
  const {
    autocomplete_search,
    closeLabel,
    checkboxId,
    animation,
    className,
  } = model;

  const enableFadeIn = animation?.enableFadeIn !== false;
  const enableSlideIn = animation?.enableSlideIn !== false;

  return (
    <div
      className={cn(
        "construction-header-search-modal",
        "fixed inset-0 z-[70] flex items-center justify-center bg-transparent p-4",
        "invisible pointer-events-none",
        "peer-checked/search:visible peer-checked/search:pointer-events-auto",
        "transition-[opacity,transform] duration-300 ease-out",
        enableFadeIn && "opacity-0 peer-checked/search:opacity-100",
        !enableFadeIn && "opacity-100",
        enableSlideIn && "translate-y-4 peer-checked/search:translate-y-0",
        !enableSlideIn && "translate-y-0",
        className,
      )}
    >
      <label
        htmlFor={checkboxId}
        className="construction-header-search-modal-backdrop absolute inset-0 cursor-pointer"
        aria-hidden
      />
      <div
        className="construction-header-search-modal-overlay pointer-events-none absolute inset-0 bg-[#0b0b0bcc]"
        aria-hidden
      />

      <label
        htmlFor={checkboxId}
        className="construction-header-search-modal-close absolute top-4 right-4 z-10 flex cursor-pointer items-center justify-center p-3 text-brand-white"
        aria-label={closeLabel}
      >
        <X className="h-8 w-8" />
      </label>

      <div className="construction-header-search-modal-content relative z-10 w-full max-w-xl px-4">
        <HeaderSearch
          autocomplete_search={autocomplete_search}
          className="construction-header-search-modal-input w-full"
        />
      </div>
    </div>
  );
};

export default ConstructionHeaderSearchModal;

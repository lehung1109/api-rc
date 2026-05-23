import { lazy } from "react";

export const clientComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  autocompleteSearch: lazy(() => import("./header/AutocompleteSearch")),
};

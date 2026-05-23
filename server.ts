import React from "react";
import { renderToString } from "react-dom/server";
import fs from "node:fs";
import prettier from "prettier";

// Import các React component cần SSR
import Header from "@components/header/Header";
import { header } from "@/data/header";
import AutocompleteSearch from "@/components/header/AutocompleteSearch";
import { autocompleteSearch } from "@/data/autocomplete-search";

// Map tên component -> component thật
const COMPONENT_MAP = {
  Header: {
    component: Header,
    model: header,
    needFormat: true,
  },
  AutocompleteSearch: {
    component: AutocompleteSearch,
    model: autocompleteSearch,
    needFormat: false,
  },
};

// create  html folder if not exists
if (!fs.existsSync("html")) {
  fs.mkdirSync("html");
}

// loop COMPONENT_MAP
for (const [key, value] of Object.entries(COMPONENT_MAP)) {
  let html = renderToString(
    React.createElement(value.component as any, value.model as any),
  );

  if (value.needFormat) {
    html = await prettier.format(html, { parser: "html" });
  }

  fs.writeFileSync(`html/${key}.html`, html);
}

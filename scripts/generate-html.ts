import React from "react";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import prettier from "prettier";

import { renderComponentHtml } from "../src/lib/render-component-html";
import Header from "@components/header/Header";
import { header } from "@/data/header";
import App from "@/components/App";
import { discoverClientComponents } from "../src/lib/discover-client-components";

type ComponentMapEntry = {
  component: React.ComponentType<any>;
  model: any;
  needFormat: boolean;
};

const STATIC_COMPONENT_MAP: Record<string, ComponentMapEntry> = {
  App: {
    component: App,
    model: {},
    needFormat: true,
  },
  Header: {
    component: Header,
    model: header,
    needFormat: true,
  },
};

const clientEntries = await discoverClientComponents();

const CLIENT_COMPONENT_MAP: Record<string, ComponentMapEntry> =
  Object.fromEntries(
    await Promise.all(
      clientEntries.map(async (entry) => {
        const [componentMod, dataMod] = await Promise.all([
          import(pathToFileURL(entry.componentImportPath).href),
          import(pathToFileURL(entry.dataImportPath).href),
        ]);

        const model = dataMod[entry.dataExportName] ?? dataMod.default;

        if (model === undefined) {
          throw new Error(
            `Export "${entry.dataExportName}" or default not found in ${entry.dataImportPath}`,
          );
        }

        return [
          entry.componentName,
          {
            component: componentMod.default,
            model,
            needFormat: entry.needFormat,
          },
        ] satisfies [string, ComponentMapEntry];
      }),
    ),
  );

const COMPONENT_MAP = {
  ...STATIC_COMPONENT_MAP,
  ...CLIENT_COMPONENT_MAP,
};

if (!fs.existsSync("html")) {
  fs.mkdirSync("html");
}

for (const [key, value] of Object.entries(COMPONENT_MAP)) {
  let html = renderComponentHtml(
    React.createElement(value.component, value.model),
  );

  if (value.needFormat) {
    html = await prettier.format(html, { parser: "html" });
  }

  fs.writeFileSync(`html/${key}.html`, html);
}

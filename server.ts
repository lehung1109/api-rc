import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'node:fs';

// Import các React component cần SSR
import Header from '@components/header/Header';
import { header } from '@/data/header';

// Map tên component -> component thật
const COMPONENT_MAP = {
  Header: {
    component: Header,
    model: header,
  },
};

// create  dist/html folder if not exists
if (!fs.existsSync('dist/html')) {
  fs.mkdirSync('dist/html');
}

// loop COMPONENT_MAP
for (const [key, value] of Object.entries(COMPONENT_MAP)) {
  const html = renderToString(React.createElement(value.component, value.model));
  fs.writeFileSync(`dist/html/${key}.html`, html);
}
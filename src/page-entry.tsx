/// <reference types="vite/client" />

import ReactDOM from "react-dom/client";
import type { ComponentType } from "react";

import "./styles.css";

type PageModule = {
  default: ComponentType;
  pageMeta?: {
    title?: string;
  };
};

const pageModules = import.meta.glob<PageModule>("../pages/**/page.tsx");

const getPageSlug = () => {
  const match = /^\/pages\/(.+?)\/?$/.exec(window.location.pathname);
  const slug = match?.[1];

  return slug ? decodeURIComponent(slug) : "";
};

const renderMissingPage = (slug: string) => (
  <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-slate-900">
    <p className="text-sm font-medium">Page not found: {slug}</p>
  </main>
);

const renderPage = async () => {
  const slug = getPageSlug();
  const loadPage = pageModules[`../pages/${slug}/page.tsx`];
  const app = document.getElementById("app");

  if (!app) {
    return;
  }

  if (!loadPage) {
    ReactDOM.createRoot(app).render(renderMissingPage(slug));
    return;
  }

  const pageModule = await loadPage();
  const Page = pageModule.default;

  if (pageModule.pageMeta?.title) {
    document.title = pageModule.pageMeta.title;
  }

  ReactDOM.createRoot(app).render(<Page />);
};

await renderPage();

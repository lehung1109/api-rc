/// <reference types="vite/client" />

import ReactDOM from "react-dom/client";
import type { ComponentType } from "react";

import { enableMocking } from "./mocks/enable";
import "./styles.css";

type PageModule = {
  default: ComponentType<{ variant?: string }>;
  pageMeta?: {
    title?: string;
  };
  pageVariants?: Array<{
    id: string;
    title?: string;
  }>;
};

const pageModules = import.meta.glob<PageModule>("../pages/**/page.tsx");

const getPageSlug = () => {
  const match = /^\/pages\/(.+?)\/?$/.exec(window.location.pathname);
  const slug = match?.[1];

  return slug ? decodeURIComponent(slug) : "";
};

const getRequestedVariant = () =>
  new URLSearchParams(window.location.search).get("variant") ?? "default";

const getSelectedVariant = (pageModule: PageModule) => {
  const requestedVariant = getRequestedVariant();
  const variants = pageModule.pageVariants ?? [{ id: "default" }];

  return variants.some((variant) => variant.id === requestedVariant)
    ? requestedVariant
    : "default";
};

const renderMissingPage = (slug: string) => (
  <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-slate-900">
    <p className="text-sm font-medium">Page not found: {slug}</p>
  </main>
);

const renderPage = async () => {
  await enableMocking();

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
  const variant = getSelectedVariant(pageModule);

  if (pageModule.pageMeta?.title) {
    document.title = pageModule.pageMeta.title;
  }

  ReactDOM.createRoot(app).render(<Page variant={variant} />);
};

await renderPage();

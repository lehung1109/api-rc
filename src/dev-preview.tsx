import ReactDOM from "react-dom/client";
import { useState } from "react";

import { previewPages } from "virtual:preview-pages";

import "./styles.css";

type SelectedPreview = {
  slug: string;
  variant: string;
};

const getDefaultVariant = (slug: string) => {
  const page = previewPages.find((previewPage) => previewPage.slug === slug);

  return (
    page?.variants.find((variant) => variant.id === "default") ??
    page?.variants[0]
  );
};

const getPreviewUrl = (slug: string, variant: string) => {
  const params = new URLSearchParams({ page: slug });

  if (variant !== "default") {
    params.set("variant", variant);
  }

  return `/?${params.toString()}`;
};

const getInitialSlug = () => {
  const requestedSlug = new URLSearchParams(window.location.search).get("page");
  const requestedPage = previewPages.find(
    (page) => page.slug === requestedSlug,
  );
  const homePage = previewPages.find((page) => page.slug === "home");
  const fallbackPage = homePage ?? previewPages[0];

  return requestedPage?.slug ?? fallbackPage?.slug ?? "";
};

const getInitialSelection = (): SelectedPreview => {
  const params = new URLSearchParams(window.location.search);
  const slug = getInitialSlug();
  const requestedVariant = params.get("variant") ?? "default";
  const page = previewPages.find((previewPage) => previewPage.slug === slug);
  const variant = page?.variants.some(
    (previewVariant) => previewVariant.id === requestedVariant,
  )
    ? requestedVariant
    : "default";

  return { slug, variant };
};

const DevPreview = () => {
  const [selectedPreview, setSelectedPreview] = useState(getInitialSelection);
  const selectedPage =
    previewPages.find((page) => page.slug === selectedPreview.slug) ??
    previewPages[0];
  const selectedVariant =
    selectedPage?.variants.find(
      (variant) => variant.id === selectedPreview.variant,
    ) ?? getDefaultVariant(selectedPage?.slug ?? "");

  const selectPage = (slug: string, variant = "default") => {
    const page = previewPages.find((previewPage) => previewPage.slug === slug);
    const hasVariant = page?.variants.some(
      (previewVariant) => previewVariant.id === variant,
    );

    if (!page || !hasVariant) {
      return;
    }

    setSelectedPreview({ slug, variant });
    window.history.pushState(null, "", getPreviewUrl(slug, variant));
  };

  if (!selectedPage) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-slate-900">
        <p className="text-sm font-medium">No preview pages found in pages/.</p>
      </main>
    );
  }

  return (
    <div className="grid h-screen grid-cols-[280px_minmax(0,1fr)] bg-slate-100 text-slate-950">
      <aside className="flex min-h-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h1 className="text-base font-semibold tracking-normal">
            Preview pages
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {previewPages.length} pages from pages/
          </p>
        </div>

        <nav
          aria-label="Preview pages"
          className="min-h-0 flex-1 overflow-y-auto p-3"
        >
          <ul className="space-y-3">
            {previewPages.map((page) => {
              const defaultVariant = getDefaultVariant(page.slug);

              return (
                <li
                  className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                  key={page.slug}
                >
                  <section>
                    <h2 className="px-3 pb-1 text-xs font-semibold uppercase tracking-normal text-slate-500">
                      {page.title}
                    </h2>

                    <ul className="space-y-1">
                      {page.variants.map((variant) => {
                        const isVariantSelected =
                          page.slug === selectedPage.slug &&
                          variant.id === selectedVariant?.id;
                        const variantTitle =
                          variant.id === defaultVariant?.id
                            ? page.title
                            : variant.title;

                        return (
                          <li key={`${page.slug}:${variant.id}`}>
                            <a
                              aria-current={
                                isVariantSelected ? "page" : undefined
                              }
                              className={[
                                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isVariantSelected
                                  ? "bg-slate-950 text-white"
                                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                              ].join(" ")}
                              href={getPreviewUrl(page.slug, variant.id)}
                              onClick={(event) => {
                                event.preventDefault();
                                selectPage(page.slug, variant.id);
                              }}
                            >
                              {variantTitle}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main className="min-h-0 p-4">
        <div className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <iframe
            className="h-full w-full border-0"
            src={selectedVariant?.path ?? selectedPage.path}
            title="Selected preview page"
          />
        </div>
      </main>
    </div>
  );
};

const app = document.getElementById("app");

if (app) {
  ReactDOM.createRoot(app).render(<DevPreview />);
}

import ReactDOM from "react-dom/client";
import { useState } from "react";

import { previewPages } from "virtual:preview-pages";

import "./styles.css";

const getInitialSlug = () => {
  const requestedSlug = new URLSearchParams(window.location.search).get("page");
  const requestedPage = previewPages.find(
    (page) => page.slug === requestedSlug,
  );
  const homePage = previewPages.find((page) => page.slug === "home");
  const fallbackPage = homePage ?? previewPages[0];

  return requestedPage?.slug ?? fallbackPage?.slug ?? "";
};

const DevPreview = () => {
  const [selectedSlug, setSelectedSlug] = useState(getInitialSlug);
  const selectedPage =
    previewPages.find((page) => page.slug === selectedSlug) ?? previewPages[0];

  const selectPage = (slug: string) => {
    const hasPage = previewPages.some((page) => page.slug === slug);

    if (!hasPage) {
      return;
    }

    setSelectedSlug(slug);
    window.history.pushState(null, "", `/?page=${encodeURIComponent(slug)}`);
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
          <ul className="space-y-1">
            {previewPages.map((page) => {
              const isSelected = page.slug === selectedPage.slug;

              return (
                <li key={page.slug}>
                  <a
                    aria-current={isSelected ? "page" : undefined}
                    className={[
                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isSelected
                        ? "bg-slate-950 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                    ].join(" ")}
                    href={`/?page=${encodeURIComponent(page.slug)}`}
                    onClick={(event) => {
                      event.preventDefault();
                      selectPage(page.slug);
                    }}
                  >
                    {page.title}
                  </a>
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
            src={selectedPage.path}
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

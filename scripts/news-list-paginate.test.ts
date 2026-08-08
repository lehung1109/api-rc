import assert from "node:assert/strict";

import { paginateNewsList } from "../src/lib/news-list/paginate";
import type { NewsListItemModel } from "../src/lib/news-list/types";

const catalog: NewsListItemModel[] = [1, 2, 3, 4, 5].map((id) => ({
  id: String(id),
  image: {
    url: `https://example.com/${id}.jpg`,
    alt: `Tin ${id}`,
    display_dimensions: { width: 800, height: 450 },
  },
  backgroundImage: {
    url: "",
    alt: "",
    display_dimensions: { width: 0, height: 0 },
  },
  time: "22/07/2026",
  title: `Tin ${id}`,
  description: `Mô tả ${id}`,
  link: { url: `/tin-${id}`, is_external: false, nofollow: false },
}));

const firstPage = paginateNewsList(catalog, 0, 2);
assert.deepEqual(firstPage, {
  items: catalog.slice(0, 2),
  page: 1,
  totalPages: 3,
});

const finalPage = paginateNewsList(catalog, 99, 2);
assert.deepEqual(finalPage, {
  items: catalog.slice(4, 6),
  page: 3,
  totalPages: 3,
});

import { http, HttpResponse } from "msw";

import { projectCategoryGalleryCatalog } from "@/data/project-category-gallery-wrapper";
import { projectShowcase } from "@/data/project-showcase";
import { filterPage } from "@/lib/project-category-gallery/filter-page";
import type { ProjectCategoryGalleryRequest } from "@/lib/project-category-gallery/types";
import { filterProjects } from "@/lib/project-showcase/filter-projects";
import type { ProjectShowcaseFilters } from "@/lib/project-showcase/types";

const MOCK_API_DELAY_MS = 5000;

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const handlers = [
  http.post("/api/project-category-gallery", async ({ request }) => {
    await delay(MOCK_API_DELAY_MS);
    const body = (await request.json()) as ProjectCategoryGalleryRequest;
    const page = typeof body.page === "number" && body.page >= 1 ? body.page : 1;
    const pageSize =
      typeof body.pageSize === "number" && body.pageSize >= 1
        ? Math.min(body.pageSize, 24)
        : 6;

    return HttpResponse.json(
      filterPage(
        projectCategoryGalleryCatalog,
        body.category,
        page,
        pageSize,
      ),
    );
  }),

  http.post("/api/projects/filter", async ({ request }) => {
    await delay(MOCK_API_DELAY_MS);
    const body = (await request.json()) as ProjectShowcaseFilters;
    const filters: ProjectShowcaseFilters = {};
    if (body.area) {
      filters.area = body.area;
    }
    if (body.beds) {
      filters.beds = body.beds;
    }
    if (body.style) {
      filters.style = body.style;
    }

    return HttpResponse.json({
      items: filterProjects(projectShowcase.projects, filters),
    });
  }),
];

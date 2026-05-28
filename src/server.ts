import express from "express";
import React from "react";
import { z } from "zod";

import { projectShowcase } from "./data/project-showcase";
import { buildServerRegistry } from "./generated/server-registry";
import { sha256Hex } from "./lib/content-hash";
import { filterProjects } from "./lib/project-showcase/filter-projects";
import type { ProjectShowcaseFilters } from "./lib/project-showcase/types";
import { fillClientIslands } from "./lib/fill-client-islands";
import { renderComponentHtml } from "./lib/render-component-html";

const PORT = Number(process.env.PORT) || 3000;
const JSON_LIMIT = process.env.JSON_LIMIT ?? "1mb";

const renderRequestSchema = z.object({
  component: z.string().min(1),
  props: z.record(z.string(), z.unknown()).optional().default({}),
});

const projectFilterSchema = z.object({
  area: z.string().optional(),
  beds: z.string().optional(),
  style: z.string().optional(),
});

const registry = buildServerRegistry();

export const app = express();

app.use(express.json({ limit: JSON_LIMIT }));

app.use("/api/render-rc", (req, res, next) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  next();
});

app.post("/api/render-rc", async (req, res) => {
  const parsed = renderRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.flatten(),
    });
    return;
  }

  const { component, props } = parsed.data;
  const Component = registry.get(component);
  if (!Component) {
    res.status(404).json({ error: `Component "${component}" not found` });
    return;
  }

  try {
    const rcid = sha256Hex(JSON.stringify({ component, props }));

    const html = await renderComponentHtml(React.createElement(Component, props), {
      identifierPrefix: rcid,
    });

    // Replace client-island placeholders with island-root SSR, and attach per-island rcid.
    // This prevents `useId`/Radix id mismatches caused by hydrating islands from a different root.
    const htmlWithIslands = await fillClientIslands(html);

    // Backward-compat: any remaining islands without rcid get the root rcid.
    const htmlWithRcid = htmlWithIslands.replace(
      /<script(\s+[^>]*\bdata-rct=(?:"[^"]+"|'[^']+')[^>]*)>/g,
      (full, attrs) => {
        if (/\bdata-rcid=(?:"[^"]+"|'[^']+')/.test(attrs)) {
          return full;
        }
        return `<script${attrs} data-rcid="${rcid}">`;
      },
    );

    res.status(200).json({
      html: htmlWithRcid,
      hash: sha256Hex(htmlWithRcid),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Render failed";
    res.status(500).json({ error: message });
  }
});

app.post("/api/projects/filter", (req, res) => {
  const parsed = projectFilterSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.flatten(),
    });
    return;
  }

  const filters: ProjectShowcaseFilters = {};
  if (parsed.data.area) {
    filters.area = parsed.data.area;
  }
  if (parsed.data.beds) {
    filters.beds = parsed.data.beds;
  }
  if (parsed.data.style) {
    filters.style = parsed.data.style;
  }
  const items = filterProjects(projectShowcase.projects, filters);
  res.status(200).json({ items });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(
    `Render server listening on http://localhost:${PORT} (${registry.size} components)`,
  );
});

import { createHash } from "node:crypto";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { z } from "zod";

import { buildServerRegistry } from "./generated/server-registry";

const PORT = Number(process.env.PORT) || 3000;
const JSON_LIMIT = process.env.JSON_LIMIT ?? "1mb";

const renderRequestSchema = z.object({
  component: z.string().min(1),
  props: z.record(z.string(), z.unknown()).optional().default({}),
});

function sha256Hex(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

const registry = buildServerRegistry();

export const app = express();

app.use(express.json({ limit: JSON_LIMIT }));

app.use("/render", (req, res, next) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  next();
});

app.post("/render", (req, res) => {
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
    const html = renderToString(React.createElement(Component, props));
    res.status(200).json({
      html,
      hash: sha256Hex(html),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Render failed";
    res.status(500).json({ error: message });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(
    `Render server listening on http://localhost:${PORT} (${registry.size} components)`,
  );
});

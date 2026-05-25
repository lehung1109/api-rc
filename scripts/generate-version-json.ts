import fs from "node:fs";
import path from "node:path";

import { buildVersionJson } from "../src/lib/build-version-json";

const DIST_DIR = path.resolve(process.cwd(), "dist");
const OUT_FILE = path.join(DIST_DIR, "version.json");

const payload = await buildVersionJson(DIST_DIR);

fs.mkdirSync(DIST_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

console.log(
  `[generate-version-json] Wrote ${Object.keys(payload.components).length} component versions to ${OUT_FILE}`,
);

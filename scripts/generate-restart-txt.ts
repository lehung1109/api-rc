import fs from "node:fs";
import path from "node:path";

// create 1 folder dist/temp/restart.txt
const TEMP_DIR = path.resolve(process.cwd(), "dist", "temp");
const OUT_FILE = path.join(TEMP_DIR, "restart.txt");

// payload is timestamp
const payload = Date.now();

fs.mkdirSync(TEMP_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

console.log(`[generate-restart-txt] Wrote ${payload} to ${OUT_FILE}`);

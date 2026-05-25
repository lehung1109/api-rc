import crypto from "node:crypto";

/** Full SHA-256 hex digest (matches `/render` response `hash`). */
export function sha256Hex(content: string): string {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex");
}

export function hashContent(content: Buffer | string): string {
  const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content);
  return crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 12);
}

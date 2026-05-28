/**
 * Browser-safe stable hashing for generating deterministic DOM ids.
 *
 * Not cryptographic. Intended for short, deterministic ids that are consistent
 * between SSR and client render.
 */
export function stableHashHex(input: string): string {
  // FNV-1a 32-bit
  let hash = 0x811c9dc5;
  for (const ch of input) {
    const code = ch.codePointAt(0) ?? 0;
    hash ^= code;
    hash = Math.imul(hash, 0x01000193);
  }

  // Convert to unsigned 32-bit hex, padded
  return (hash >>> 0).toString(16).padStart(8, "0");
}


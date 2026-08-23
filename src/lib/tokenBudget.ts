import type { Format } from "./topics";

/** Output token ceilings per format — sized generously above the prompt's
 *  target length (word/paragraph/bullet counts) so structured JSON output
 *  never gets truncated mid-object. Article and deck now carry real content
 *  (1000+ words / 6 slides), not just headline fragments. */
export function maxOutputTokensFor(format: Format): number {
  if (format === "article") return 8000;
  if (format === "deck") return 4000;
  return 1500;
}

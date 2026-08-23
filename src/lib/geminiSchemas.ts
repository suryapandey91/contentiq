import type { Format } from "./topics";

/** Hand-written JSON Schema (Gemini's supported OpenAPI-3.0 subset via
 *  responseJsonSchema) mirroring src/lib/schema.ts's Zod definitions. Kept
 *  separate because Gemini's schema dialect doesn't accept a Zod object
 *  directly and only supports a limited property set. */

const chartPoint = {
  type: "object",
  properties: {
    label: { type: "string", description: "Short axis label, e.g. a year or category (max ~6 chars)" },
    value: { type: "number", minimum: 0, maximum: 100, description: "Relative value 0-100 for the bar height" },
  },
  required: ["label", "value"],
};

const postSchema = {
  type: "object",
  properties: {
    hook: { type: "string", description: "A sharp, one-sentence opening line for a LinkedIn post — the scroll-stopper" },
    body: { type: "string", description: "2-4 sentence body making one specific, well-argued point. No hashtags, no emoji." },
    tag: { type: "string", description: "A short 1-3 word label for the topic, used as a badge" },
    chart: { type: "array", items: chartPoint, minItems: 4, maxItems: 4 },
  },
  required: ["hook", "body", "tag", "chart"],
};

const articleSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "A sharp article headline, under 60 characters" },
    dek: { type: "string", description: "A one-sentence subtitle/deck expanding on the headline" },
    intro: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: { type: "string" },
      description: "The opening 2 paragraphs (120-180 words each) that set up the article's thesis",
    },
    quote: { type: "string", description: "A punchy pull-quote (no quotation marks) that captures the article's thesis" },
    body: {
      type: "array",
      minItems: 6,
      maxItems: 9,
      items: { type: "string" },
      description:
        "6-9 paragraphs (100-150 words each) forming the substantive middle of the article: develop the argument with concrete examples and reasoning, address at least one counterargument or objection, and explore practical implications. This is the bulk of the article's length.",
    },
    table: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          metric: { type: "string", description: "Short row label, e.g. a metric or dimension name" },
          before: { type: "string", description: "Short before-state description" },
          after: { type: "string", description: "Short after-state description" },
        },
        required: ["metric", "before", "after"],
      },
    },
    conclusion: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: { type: "string" },
      description: "The closing 2 paragraphs (100-150 words each): synthesize the argument and land on a clear, memorable takeaway",
    },
  },
  required: ["title", "dek", "intro", "quote", "body", "table", "conclusion"],
};

const deckSlide = {
  type: "object",
  properties: {
    heading: { type: "string", description: "Short slide headline, under 8 words" },
    bullets: {
      type: "array",
      minItems: 3,
      maxItems: 4,
      items: { type: "string" },
      description: "3-4 substantive bullet points (under 18 words each) making specific, concrete claims — not generic filler",
    },
  },
  required: ["heading", "bullets"],
};

const deckSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "Deck title slide headline, under 8 words" },
    sub: { type: "string", description: "Title slide subtitle, under 10 words" },
    slides: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: deckSlide,
      description: "3 content slides carrying the actual argument: e.g. the problem/context, the core insight, and the implications — each with real, specific bullet points",
    },
    chartTitle: { type: "string", description: "Headline for the data slide, under 8 words" },
    chart: { type: "array", items: chartPoint, minItems: 4, maxItems: 4 },
    chartInsight: { type: "string", description: "One sharp sentence explaining what the chart shows and why it matters" },
    closeLine: { type: "string", description: "A punchy one-line closing statement for the final slide" },
  },
  required: ["title", "sub", "slides", "chartTitle", "chart", "chartInsight", "closeLine"],
};

export const GEMINI_JSON_SCHEMA_BY_FORMAT: Record<Format, object> = {
  post: postSchema,
  article: articleSchema,
  deck: deckSchema,
};

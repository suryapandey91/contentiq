import { z } from "zod";

/** Shared structured-output schemas for the three generated formats.
 *  Used to build both the Zod schema (Anthropic/OpenAI structured output)
 *  and the JSON-schema shape Gemini expects (see providers/gemini.ts). */

export const ChartPointSchema = z.object({
  label: z.string().describe("Short axis label, e.g. a year or category (max ~6 chars)"),
  value: z.number().min(0).max(100).describe("Relative value 0-100 for the bar height"),
});

export const PostSchema = z.object({
  hook: z
    .string()
    .describe("A sharp, one-sentence opening line for a LinkedIn post — the scroll-stopper"),
  body: z
    .string()
    .describe("2-4 sentence body making one specific, well-argued point. No hashtags, no emoji."),
  tag: z.string().describe("A short 1-3 word label for the topic, used as a badge"),
  chart: z.array(ChartPointSchema).length(4).describe("4 illustrative data points supporting the argument"),
});

export const ArticleSchema = z.object({
  title: z.string().describe("A sharp article headline, under 60 characters"),
  dek: z.string().describe("A one-sentence subtitle/deck expanding on the headline"),
  intro: z
    .array(z.string())
    .length(2)
    .describe("The opening 2 paragraphs (120-180 words each) that set up the article's thesis"),
  quote: z.string().describe("A punchy pull-quote (no quotation marks) that captures the article's thesis"),
  body: z
    .array(z.string())
    .min(6)
    .max(9)
    .describe(
      "6-9 paragraphs (100-150 words each) forming the substantive middle of the article: develop the argument with concrete examples and reasoning, address at least one counterargument or objection, and explore practical implications. This is the bulk of the article's length.",
    ),
  table: z
    .array(
      z.object({
        metric: z.string().describe("Short row label, e.g. a metric or dimension name"),
        before: z.string().describe("Short before-state description"),
        after: z.string().describe("Short after-state description"),
      }),
    )
    .length(3)
    .describe("A 3-row before/after table supporting the article's argument"),
  conclusion: z
    .array(z.string())
    .length(2)
    .describe("The closing 2 paragraphs (100-150 words each): synthesize the argument and land on a clear, memorable takeaway"),
});

export const DeckSlideSchema = z.object({
  heading: z.string().describe("Short slide headline, under 8 words"),
  bullets: z
    .array(z.string())
    .min(3)
    .max(4)
    .describe("3-4 substantive bullet points (under 18 words each) making specific, concrete claims — not generic filler"),
});

export const DeckSchema = z.object({
  title: z.string().describe("Deck title slide headline, under 8 words"),
  sub: z.string().describe("Title slide subtitle, under 10 words"),
  slides: z
    .array(DeckSlideSchema)
    .length(3)
    .describe("3 content slides carrying the actual argument: e.g. the problem/context, the core insight, and the implications — each with real, specific bullet points"),
  chartTitle: z.string().describe("Headline for the data slide, under 8 words"),
  chart: z.array(ChartPointSchema).length(4).describe("4 illustrative data points for the chart slide"),
  chartInsight: z.string().describe("One sharp sentence explaining what the chart shows and why it matters"),
  closeLine: z.string().describe("A punchy one-line closing statement for the final slide"),
});

export const SCHEMA_BY_FORMAT = {
  post: PostSchema,
  article: ArticleSchema,
  deck: DeckSchema,
} as const;

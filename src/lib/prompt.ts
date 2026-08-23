import type { Format } from "./topics";
import type { Topic } from "./topics";

const FORMAT_INSTRUCTIONS: Record<Format, string> = {
  post:
    "Write a LinkedIn POST: a hook line, a short punchy body (2-4 sentences), a 1-3 word tag, " +
    "and 4 illustrative chart data points that visually back up the argument.",
  article:
    "Write a full-length long-form ARTICLE of at least 1,000 words total, structured as: a headline; a one-sentence dek; " +
    "a 2-paragraph intro that sets up the thesis; a pull quote; a 6-9 paragraph body that is the substantive bulk of the " +
    "piece — develop the argument with concrete, specific examples (not generic ones), reason through the mechanics of " +
    "why it's true, explicitly address at least one real counterargument or objection, and cover practical implications " +
    "for the reader; a 3-row before/after table with concrete contrasts; and a 2-paragraph conclusion that synthesizes " +
    "the argument and lands on a clear, memorable takeaway. Every paragraph must earn its place — no padding or " +
    "repetition just to hit length; go deeper and more specific instead of restating the thesis.",
  deck:
    "Write a substantive 6-slide DECK, not a bare outline: a title slide (title + subtitle); 3 content slides that " +
    "carry the actual argument — e.g. the problem/context, the core insight, and the practical implications — each " +
    "with a short heading and 3-4 specific, concrete bullet points (real claims with real detail, never generic " +
    "filler like 'leverage synergies'); a data slide (a chart headline, 4 illustrative chart values, and a one-sentence " +
    "insight explaining what the data shows and why it matters); and a punchy one-line closing statement for the " +
    "final slide. A reader should walk away having learned something specific, not just seen a title and a chart.",
};

export const SYSTEM_PROMPT = `You are the writing engine behind ContentIQ, a tool that turns a professional's point of view into LinkedIn content.

Voice: sharp and analytical. Write like someone who has actually done the work, not a marketing account. Prefer a specific, arguable claim over a safe generalization. No hashtags, no emoji, no "in today's fast-paced world"-style filler, no exclamation points used as punctuation for excitement.

Audience: professionals following AI/ML, GenAI, data management, product management, agentic AI, the future of work, and talent systems.

Any numeric chart data you produce is illustrative (to visually support the argument), not a claim of real statistics — keep values plausible and directionally sensible, not wild.

Respond ONLY with the structured output requested — no preamble, no markdown fences, no commentary outside the schema.`;

export function buildUserPrompt(topic: Topic, format: Format, angle?: string): string {
  const angleLine = angle?.trim()
    ? `\n\nThe author's specific angle for this draft: "${angle.trim()}". Center the piece on this angle.`
    : "";
  return `Topic: ${topic.label}\nTopic brief: ${topic.brief}${angleLine}\n\n${FORMAT_INSTRUCTIONS[format]}`;
}

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import type { Topic, Format } from "../topics";
import { SCHEMA_BY_FORMAT } from "../schema";
import { SYSTEM_PROMPT, buildUserPrompt } from "../prompt";
import type { GeneratedContent } from "../types";

const DEFAULT_MODEL = "gpt-4o";

export async function generateWithOpenAI(
  topic: Topic,
  format: Format,
  angle: string | undefined,
): Promise<GeneratedContent> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to .env.local to generate with GPT.",
    );
  }

  const client = new OpenAI();
  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  const schema = SCHEMA_BY_FORMAT[format];

  const completion = await client.chat.completions.parse({
    model,
    temperature: 0.9,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(topic, format, angle) },
    ],
    response_format: zodResponseFormat(schema, `contentiq_${format}`),
  });

  const parsed = completion.choices[0]?.message?.parsed;
  if (!parsed) {
    throw new Error("GPT's response didn't match the expected shape.");
  }
  return parsed as GeneratedContent;
}

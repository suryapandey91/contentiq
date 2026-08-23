import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { Topic, Format } from "../topics";
import { SCHEMA_BY_FORMAT } from "../schema";
import { SYSTEM_PROMPT, buildUserPrompt } from "../prompt";
import { maxOutputTokensFor } from "../tokenBudget";
import type { GeneratedContent } from "../types";

const DEFAULT_MODEL = "claude-opus-5";

export async function generateWithAnthropic(
  topic: Topic,
  format: Format,
  angle: string | undefined,
): Promise<GeneratedContent> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local to generate with Claude.",
    );
  }

  const client = new Anthropic();
  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
  const schema = SCHEMA_BY_FORMAT[format];

  const response = await client.messages.parse({
    model,
    max_tokens: maxOutputTokensFor(format),
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(topic, format, angle) }],
    output_config: {
      format: zodOutputFormat(schema),
    },
  });

  if (!response.parsed_output) {
    throw new Error("Claude's response didn't match the expected shape.");
  }
  return response.parsed_output as GeneratedContent;
}

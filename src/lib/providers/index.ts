import type { Provider, Format, Topic } from "../topics";
import type { GeneratedContent } from "../types";
import { generateWithAnthropic } from "./anthropic";
import { generateWithOpenAI } from "./openai";
import { generateWithGemini } from "./gemini";

export async function generate(
  provider: Provider,
  topic: Topic,
  format: Format,
  angle: string | undefined,
): Promise<GeneratedContent> {
  switch (provider) {
    case "anthropic":
      return generateWithAnthropic(topic, format, angle);
    case "openai":
      return generateWithOpenAI(topic, format, angle);
    case "gemini":
      return generateWithGemini(topic, format, angle);
    default:
      throw new Error(`Unknown provider: ${provider satisfies never}`);
  }
}

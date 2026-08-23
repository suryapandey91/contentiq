import { GoogleGenAI } from "@google/genai";
import type { Topic, Format } from "../topics";
import { SCHEMA_BY_FORMAT } from "../schema";
import { GEMINI_JSON_SCHEMA_BY_FORMAT } from "../geminiSchemas";
import { SYSTEM_PROMPT, buildUserPrompt } from "../prompt";
import type { GeneratedContent } from "../types";

const DEFAULT_MODEL = "gemini-3.6-flash";

export async function generateWithGemini(
  topic: Topic,
  format: Format,
  angle: string | undefined,
): Promise<GeneratedContent> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to .env.local to generate with Gemini.",
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  const response = await ai.models.generateContent({
    model,
    contents: buildUserPrompt(topic, format, angle),
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseJsonSchema: GEMINI_JSON_SCHEMA_BY_FORMAT[format],
      temperature: 0.9,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned content that wasn't valid JSON.");
  }

  const schema = SCHEMA_BY_FORMAT[format];
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `Gemini's response didn't match the expected shape: ${parsed.error.message}`,
    );
  }
  return parsed.data as GeneratedContent;
}

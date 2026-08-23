import { NextResponse } from "next/server";
import { TOPIC_BY_ID, type Format, type Provider } from "@/lib/topics";
import { generate } from "@/lib/providers";
import type { GenerateResponse } from "@/lib/types";

const FORMATS: Format[] = ["post", "article", "deck"];
const PROVIDERS: Provider[] = ["anthropic", "openai", "gemini"];

export async function POST(request: Request): Promise<NextResponse<GenerateResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const { topicId, format, angle, provider } = (body ?? {}) as Record<string, unknown>;

  const topic = typeof topicId === "string" ? TOPIC_BY_ID[topicId] : undefined;
  if (!topic) {
    return NextResponse.json({ ok: false, error: "Unknown topic." }, { status: 400 });
  }
  if (typeof format !== "string" || !FORMATS.includes(format as Format)) {
    return NextResponse.json({ ok: false, error: "Unknown format." }, { status: 400 });
  }
  if (typeof provider !== "string" || !PROVIDERS.includes(provider as Provider)) {
    return NextResponse.json({ ok: false, error: "Unknown provider." }, { status: 400 });
  }
  if (angle !== undefined && typeof angle !== "string") {
    return NextResponse.json({ ok: false, error: "Angle must be a string." }, { status: 400 });
  }

  try {
    const data = await generate(provider as Provider, topic, format as Format, angle);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed unexpectedly.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

"use client";

import { useState } from "react";
import {
  TOPICS,
  FORMATS,
  PROVIDERS,
  TOPIC_BY_ID,
  type Format,
  type Provider,
} from "@/lib/topics";
import type { GenerateResponse, GeneratedContent, PostContent, ArticleContent, DeckContent, Draft } from "@/lib/types";
import { saveDraft } from "@/lib/library";
import { exportDeckToPptx } from "@/lib/pptx";
import { downloadText } from "@/lib/downloadText";
import { PostView, ArticleView, DeckView } from "@/components/ContentViews";

type Stage = "idle" | "generating" | "done" | "error";

export default function WorkspacePage() {
  const [topicId, setTopicId] = useState(TOPICS[0].id);
  const [format, setFormat] = useState<Format>("post");
  const [angle, setAngle] = useState("");
  const [provider, setProvider] = useState<Provider>("gemini");
  const [stage, setStage] = useState<Stage>("idle");
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const topic = TOPIC_BY_ID[topicId];

  async function generate() {
    setStage("generating");
    setError(null);
    setSavedMessage(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, format, angle, provider }),
      });
      const json: GenerateResponse = await res.json();
      if (!json.ok) {
        setError(json.error);
        setStage("error");
        return;
      }
      setContent(json.data);
      setStage("done");
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setStage("error");
    }
  }

  function handleSave() {
    if (!content) return;
    const draft: Draft = {
      id: crypto.randomUUID(),
      topicId,
      topicLabel: topic.label,
      format,
      angle: angle.trim() || undefined,
      provider,
      content,
      createdAt: new Date().toISOString(),
    };
    saveDraft(draft);
    setSavedMessage("Saved to library.");
  }

  async function handleExport() {
    if (!content) return;
    setExporting(true);
    try {
      if (format === "deck") {
        await exportDeckToPptx(topic.label, content as DeckContent);
      } else if (format === "post") {
        const p = content as PostContent;
        downloadText(
          `${topic.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-post.md`,
          `${p.hook}\n\n${p.body}\n\n#${p.tag.replace(/\s+/g, "")}\n`,
        );
      } else {
        const a = content as ArticleContent;
        const table = a.table
          .map((r) => `| ${r.metric} | ${r.before} | ${r.after} |`)
          .join("\n");
        const md = [
          `# ${a.title}`,
          a.dek,
          ...a.intro,
          `> ${a.quote}`,
          ...a.body,
          `| | Before | After |\n| --- | --- | --- |\n${table}`,
          ...a.conclusion,
        ].join("\n\n");
        downloadText(`${topic.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-article.md`, md + "\n");
      }
    } finally {
      setExporting(false);
    }
  }

  function onFieldChange() {
    setStage("idle");
    setContent(null);
    setError(null);
    setSavedMessage(null);
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "48px clamp(20px,5vw,72px) 80px",
        display: "grid",
        gridTemplateColumns: "300px minmax(0,1fr)",
        gap: 40,
        alignItems: "start",
      }}
    >
      <div className="card elev-sm" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="field">
          <label htmlFor="topic-select">Topic</label>
          <select
            className="input"
            id="topic-select"
            value={topicId}
            onChange={(e) => {
              setTopicId(e.target.value);
              onFieldChange();
            }}
          >
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label id="fmt-label">Format</label>
          <div className="seg" role="radiogroup" aria-labelledby="fmt-label">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="seg-opt"
                data-active={format === f.id}
                onClick={() => {
                  setFormat(f.id);
                  onFieldChange();
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label id="provider-label">Model</label>
          <select
            className="input"
            aria-labelledby="provider-label"
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value as Provider);
              onFieldChange();
            }}
          >
            {PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="angle-input">Angle (optional)</label>
          <input
            className="input"
            id="angle-input"
            placeholder="e.g. why evals matter more than model choice"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={generate}
          disabled={stage === "generating"}
        >
          {stage === "generating" ? "Drafting…" : "Generate draft"}
        </button>
        <p style={{ fontSize: 12, lineHeight: "18px", margin: 0, color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
          ContentIQ drafts from your point of view with real GenAI, and generates the chart or
          table that best supports it.
        </p>
      </div>

      <div>
        {stage === "idle" && (
          <div style={{ border: "1px dashed var(--color-divider)", padding: "64px 24px", textAlign: "center", color: "color-mix(in srgb, var(--color-text) 55%, transparent)", fontSize: 14 }}>
            Pick a topic, format, and model, then generate a draft.
          </div>
        )}

        {stage === "generating" && (
          <div style={{ border: "1px dashed var(--color-divider)", padding: "64px 24px", textAlign: "center", color: "color-mix(in srgb, var(--color-text) 55%, transparent)", fontSize: 14 }}>
            Drafting…
          </div>
        )}

        {stage === "error" && error && (
          <div style={{ border: "1px solid #b3261e", borderRadius: 4, padding: "20px 24px", color: "#b3261e", fontSize: 14, lineHeight: "22px" }}>
            {error}
          </div>
        )}

        {stage === "done" && content && format === "post" && (
          <PostView content={content as PostContent} topicLabel={topic.label} />
        )}
        {stage === "done" && content && format === "article" && (
          <ArticleView content={content as ArticleContent} topicLabel={topic.label} />
        )}
        {stage === "done" && content && format === "deck" && (
          <DeckView content={content as DeckContent} topicLabel={topic.label} />
        )}

        {stage === "done" && content && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
            <button type="button" className="btn btn-secondary" onClick={handleSave}>
              Save to library
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleExport} disabled={exporting}>
              {exporting ? "Exporting…" : format === "deck" ? "Export .pptx" : "Export .md"}
            </button>
            {savedMessage && (
              <span style={{ fontSize: 13, color: "var(--color-accent-700)" }}>{savedMessage}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


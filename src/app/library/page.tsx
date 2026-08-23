"use client";

import { useState } from "react";
import { TOPICS } from "@/lib/topics";
import type { Draft, PostContent, ArticleContent, DeckContent } from "@/lib/types";
import { deleteDraft } from "@/lib/library";
import { useDrafts } from "@/lib/useDrafts";
import { PostView, ArticleView, DeckView } from "@/components/ContentViews";

function draftTitle(draft: Draft): string {
  if (draft.format === "post") return (draft.content as PostContent).hook;
  if (draft.format === "article") return (draft.content as ArticleContent).title;
  return (draft.content as DeckContent).title;
}

function draftSnippet(draft: Draft): string {
  if (draft.format === "post") return (draft.content as PostContent).body;
  if (draft.format === "article") return (draft.content as ArticleContent).dek;
  return (draft.content as DeckContent).sub;
}

function formatLabel(format: Draft["format"]): string {
  return format === "post" ? "Post" : format === "article" ? "Article" : "Deck";
}

export default function LibraryPage() {
  const drafts = useDrafts();
  const [filter, setFilter] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggleFilter(id: string) {
    setFilter((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }

  function handleDelete(id: string) {
    deleteDraft(id);
    if (expandedId === id) setExpandedId(null);
  }

  const filtered = filter.length ? drafts.filter((d) => filter.includes(d.topicId)) : drafts;
  const expanded = drafts.find((d) => d.id === expandedId) || null;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px clamp(20px,5vw,72px) 80px" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "0 0 8px" }}>Library</h2>
      <p style={{ fontSize: 14, margin: "0 0 24px", color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
        Everything you&apos;ve generated and saved, filterable by topic — stored in this browser.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tag ${filter.includes(t.id) ? "tag-accent" : "tag-outline"}`}
            onClick={() => toggleFilter(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {expanded && (
        <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid var(--color-divider)" }}>
          <button type="button" className="btn btn-ghost" style={{ marginBottom: 16 }} onClick={() => setExpandedId(null)}>
            ← Back to library
          </button>
          {expanded.format === "post" && <PostView content={expanded.content as PostContent} topicLabel={expanded.topicLabel} />}
          {expanded.format === "article" && <ArticleView content={expanded.content as ArticleContent} topicLabel={expanded.topicLabel} />}
          {expanded.format === "deck" && <DeckView content={expanded.content as DeckContent} topicLabel={expanded.topicLabel} />}
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ border: "1px dashed var(--color-divider)", padding: "64px 24px", textAlign: "center", color: "color-mix(in srgb, var(--color-text) 55%, transparent)", fontSize: 14 }}>
          {drafts.length === 0
            ? "Nothing saved yet — generate a draft in the workspace and save it here."
            : "No saved drafts match this filter."}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
        {filtered.map((item) => (
          <div key={item.id} className="card" style={{ cursor: "pointer" }}>
            <div onClick={() => setExpandedId(item.id)}>
              <div className="card-kicker">{formatLabel(item.format)} · {item.topicLabel}</div>
              <div className="card-title">{draftTitle(item)}</div>
              <p className="card-body">{draftSnippet(item)}</p>
            </div>
            <div className="card-meta">
              <span>{new Date(item.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
              <span>·</span>
              <span>{item.provider}</span>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ marginLeft: "auto", fontSize: 11, padding: "2px 6px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

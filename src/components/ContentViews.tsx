import type { CSSProperties } from "react";
import type { PostContent, ArticleContent, DeckContent } from "@/lib/types";

const mutedText = "color-mix(in srgb, var(--color-text) 78%, transparent)";

const articleParagraph: CSSProperties = {
  fontSize: 16,
  lineHeight: "27px",
  margin: 0,
  textAlign: "justify",
  color: "color-mix(in srgb, var(--color-text) 85%, transparent)",
};

export function PostView({ content, topicLabel }: { content: PostContent; topicLabel: string }) {
  return (
    <div className="card elev-sm" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "var(--color-accent-200)", color: "var(--color-accent-800)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15,
          }}
        >
          Y
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: "var(--font-heading-weight)" as unknown as number, fontSize: 14 }}>You</p>
          <p style={{ margin: 0, fontSize: 12, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>Posting on LinkedIn</p>
        </div>
      </div>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontStyle: "italic", fontSize: 19, lineHeight: "27px", margin: 0 }}>
        {content.hook}
      </p>
      <p style={{ fontSize: 15, lineHeight: "24px", margin: 0, color: mutedText }}>{content.body}</p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100, paddingTop: 12, borderTop: "2px solid var(--color-divider)" }}>
        {content.chart.map((bar, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
            <div style={{ width: "100%", maxWidth: 36, background: "var(--color-accent-200)", borderTop: "2px solid var(--color-accent)", height: `${10 + bar.value}px` }} />
            <span style={{ fontSize: 10, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{bar.label}</span>
          </div>
        ))}
      </div>
      <span className="tag tag-accent" style={{ alignSelf: "flex-start" }}>{topicLabel}</span>
    </div>
  );
}

export function ArticleView({ content, topicLabel }: { content: ArticleContent; topicLabel: string }) {
  return (
    <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 16 }}>
      <span className="tag tag-outline" style={{ alignSelf: "flex-start" }}>{topicLabel} — Article</span>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontSize: 31, lineHeight: 1.2, letterSpacing: "-0.01em", margin: 0 }}>
        {content.title}
      </h2>
      <p style={{ fontSize: 16, lineHeight: "26px", margin: 0, textAlign: "justify", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
        {content.dek}
      </p>
      {content.intro.map((p, i) => (
        <p key={`intro-${i}`} style={articleParagraph}>{p}</p>
      ))}
      <blockquote style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontStyle: "italic", fontSize: 22, lineHeight: "31px", letterSpacing: "-0.005em", margin: "8px 0" }}>
        &ldquo;{content.quote}&rdquo;
      </blockquote>
      {content.body.map((p, i) => (
        <p key={`body-${i}`} style={articleParagraph}>{p}</p>
      ))}
      <table className="table">
        <thead><tr><th></th><th>Before</th><th>After</th></tr></thead>
        <tbody>
          {content.table.map((row, i) => (
            <tr key={i}><td>{row.metric}</td><td>{row.before}</td><td>{row.after}</td></tr>
          ))}
        </tbody>
      </table>
      {content.conclusion.map((p, i) => (
        <p key={`conclusion-${i}`} style={articleParagraph}>{p}</p>
      ))}
    </div>
  );
}

const slideBase: CSSProperties = {
  width: 260,
  aspectRatio: "16/9",
  border: "1px solid var(--color-divider)",
  padding: 16,
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  overflow: "hidden",
};

const slideKicker: CSSProperties = {
  fontSize: 9,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-accent-700)",
  margin: "0 0 6px",
  flexShrink: 0,
};

// Clamped to 2 lines so a long heading can never squeeze a sibling flex
// child (e.g. the chart bars) down to near-zero height — a fixed-height
// pixel bar would then overflow upward and visually overlap the heading.
const slideHeading: CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontWeight: "var(--font-heading-weight)" as unknown as number,
  fontSize: 14,
  lineHeight: 1.25,
  margin: "0 0 8px",
  flexShrink: 0,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const slideBullet: CSSProperties = {
  fontSize: 10,
  lineHeight: "14px",
  margin: "0 0 4px",
  color: "color-mix(in srgb, var(--color-text) 82%, transparent)",
  display: "flex",
  gap: 5,
};

export function DeckView({ content, topicLabel }: { content: DeckContent; topicLabel: string }) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ ...slideBase, justifyContent: "center" }}>
        <p style={slideKicker}>{topicLabel}</p>
        <p style={{ ...slideHeading, fontSize: 16, margin: 0 }}>{content.title}</p>
        <p style={{ fontSize: 10, margin: "8px 0 0", color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>{content.sub}</p>
      </div>

      {content.slides.map((slide, i) => (
        <div key={i} style={slideBase}>
          <p style={slideKicker}>{String(i + 2).padStart(2, "0")}</p>
          <p style={slideHeading}>{slide.heading}</p>
          {slide.bullets.map((b, j) => (
            <p key={j} style={slideBullet}><span style={{ flexShrink: 0 }}>—</span><span style={{ minWidth: 0 }}>{b}</span></p>
          ))}
        </div>
      ))}

      <div style={slideBase}>
        <p style={slideKicker}>Data</p>
        <p style={slideHeading}>{content.chartTitle}</p>
        <div style={{ height: 40, flexShrink: 0, display: "flex", alignItems: "flex-end", gap: 4 }}>
          {content.chart.map((bar, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ width: "100%", background: "var(--color-accent-200)", borderTop: "2px solid var(--color-accent)", height: `${4 + bar.value * 0.3}px` }} />
              <span style={{ fontSize: 8, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{bar.label}</span>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 9, lineHeight: "13px", margin: "8px 0 0", fontStyle: "italic",
            color: "color-mix(in srgb, var(--color-text) 70%, transparent)",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {content.chartInsight}
        </p>
      </div>

      <div style={{ ...slideBase, border: "1px solid var(--color-accent)", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontStyle: "italic", fontSize: 14, lineHeight: 1.35, margin: 0, color: "var(--color-accent-700)" }}>
          {content.closeLine}
        </p>
      </div>
    </div>
  );
}

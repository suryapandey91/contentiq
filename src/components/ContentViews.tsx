import type { PostContent, ArticleContent, DeckContent } from "@/lib/types";

const mutedText = "color-mix(in srgb, var(--color-text) 78%, transparent)";

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
      <blockquote style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontStyle: "italic", fontSize: 22, lineHeight: "31px", letterSpacing: "-0.005em", margin: "8px 0" }}>
        &ldquo;{content.quote}&rdquo;
      </blockquote>
      <table className="table">
        <thead><tr><th></th><th>Before</th><th>After</th></tr></thead>
        <tbody>
          {content.table.map((row, i) => (
            <tr key={i}><td>{row.metric}</td><td>{row.before}</td><td>{row.after}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DeckView({ content, topicLabel }: { content: DeckContent; topicLabel: string }) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ width: 220, aspectRatio: "16/9", border: "1px solid var(--color-divider)", padding: 16, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", margin: "0 0 8px" }}>{topicLabel}</p>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontSize: 15, lineHeight: 1.25, margin: 0 }}>{content.title}</p>
        <p style={{ fontSize: 10, margin: "8px 0 0", color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>{content.sub}</p>
      </div>
      <div style={{ width: 220, aspectRatio: "16/9", border: "1px solid var(--color-divider)", padding: 16, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 56 }}>
          {content.chart.map((bar, i) => (
            <div key={i} style={{ flex: 1, background: "var(--color-accent-200)", borderTop: "2px solid var(--color-accent)", height: `${4 + bar.value * 0.44}px` }} />
          ))}
        </div>
      </div>
      <div style={{ width: 220, aspectRatio: "16/9", border: "1px solid var(--color-accent)", padding: 16, display: "flex", alignItems: "center" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontStyle: "italic", fontSize: 14, lineHeight: 1.35, margin: 0, color: "var(--color-accent-700)" }}>
          {content.closeLine}
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import WorkspaceMockup from "@/components/WorkspaceMockup";

const STATS = [
  { num: "3", label: "Formats from one brief" },
  { num: "7", label: "Topics on rotation" },
  { num: "3", label: "Model providers" },
  { num: "GenAI", label: "Real generation, not fixtures" },
];

const FEATURES = [
  { num: "01", title: "Slide decks", copy: "Brief in, deck out — a title slide, one chart slide pulled from your numbers, and a closer that states the point. Exports as a real .pptx." },
  { num: "02", title: "LinkedIn posts", copy: "A hook, a short argument, and a chart sized for the feed — generated fresh from your topic and angle, not a template." },
  { num: "03", title: "Long-form articles", copy: "A structured argument with a pull quote and a before/after table, ready to publish or paste into an editor." },
  { num: "04", title: "Charts & dashboards", copy: "The same numbers rendered as a bar chart, a table, or a slide — generated to match the shape you picked." },
];

export default function HomePage() {
  return (
    <div>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "96px clamp(20px,5vw,72px) 72px" }}>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            fontSize: "clamp(44px,6.5vw,88px)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          <span style={{ display: "block" }}>One brief.</span>
          <span style={{ display: "block" }}>Four formats.</span>
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: "28px",
            maxWidth: "58ch",
            margin: "28px 0 0",
            textAlign: "justify",
            color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
          }}
        >
          ContentIQ turns a point of view on AI/ML, GenAI, data management, product management,
          agents, the future of work, or talent systems into a LinkedIn post, an article, or a
          slide deck — generated live by Claude, GPT, or Gemini, with the chart or table already
          built in.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
          <Link href="/workspace" className="btn btn-primary">Start a draft</Link>
          <Link href="/library" className="btn btn-ghost">See the library</Link>
        </div>
      </section>

      <hr style={{ height: 1, border: 0, margin: 0, background: "var(--color-divider)" }} />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "52px clamp(20px,5vw,72px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,auto)", justifyContent: "space-between", gap: "32px 28px" }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(30px,3vw,44px)", color: "var(--color-accent)", margin: 0 }}>
                {s.num}
              </p>
              <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 70%, transparent)", margin: "8px 0 0" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ height: 1, border: 0, margin: 0, background: "var(--color-divider)" }} />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px clamp(20px,5vw,72px) 64px" }}>
        <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", margin: "0 0 8px" }}>
          What ContentIQ does
        </span>
        {FEATURES.map((f) => (
          <div
            key={f.num}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(64px,140px) minmax(0,300px) minmax(0,1fr)",
              gap: "28px clamp(24px,4vw,64px)",
              alignItems: "baseline",
              padding: "26px 0",
              borderTop: "1px solid var(--color-divider)",
            }}
          >
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontSize: 14, margin: 0 }}>{f.num}</p>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontSize: 23, lineHeight: 1.2, letterSpacing: "-0.01em", margin: 0 }}>
              {f.title}
            </h3>
            <p style={{ fontSize: 15, lineHeight: "26px", margin: 0, maxWidth: "52ch", textAlign: "justify", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
              {f.copy}
            </p>
          </div>
        ))}
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px clamp(20px,5vw,72px) 80px",
          display: "grid",
          gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)",
          gap: "28px clamp(24px,5vw,96px)",
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", margin: "0 0 12px" }}>
            The ContentIQ workspace
          </span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as unknown as number, fontSize: 30, lineHeight: 1.25, letterSpacing: "-0.01em", margin: 0 }}>
            Charts and tables, generated in — not screenshotted in
          </h2>
          <p style={{ fontSize: 15, lineHeight: "26px", margin: "16px 0 0", maxWidth: "44ch", textAlign: "justify", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
            Every draft carries the same numbers as a bar chart, a before/after table, or a slide
            — generated by the model to match the format, not pasted from a spreadsheet.
          </p>
        </div>
        <div className="plate" style={{ aspectRatio: "951/665" }}>
          <WorkspaceMockup />
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px clamp(20px,5vw,72px)" }}>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontSize: "clamp(30px,4vw,48px)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-accent-700)",
            }}
          >
            <span style={{ display: "block" }}>Open a brief.</span>
            <span style={{ display: "block" }}>Ship a draft before lunch.</span>
          </h3>
          <div style={{ marginTop: 24 }}>
            <Link href="/workspace" className="btn btn-primary">Start a draft</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

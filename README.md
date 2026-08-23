# ContentIQ

Turns a point of view on AI/ML, GenAI, data management, product management,
agents, the future of work, or talent systems into a LinkedIn post, an
article, or a slide deck — generated live by Claude, GPT, or Gemini.

Built with Next.js (App Router). Generation happens server-side in
`/api/generate` so your API key is never exposed to the browser. Saved
drafts live in your browser's `localStorage` (no database).

## Setup

```bash
npm install
cp .env.local.example .env.local
```

Edit `.env.local` and add the key for **whichever provider you plan to
use** — you only need one:

- **Gemini** — get a key at https://aistudio.google.com/apikey, set `GEMINI_API_KEY`
- **Claude** — get a key at https://console.anthropic.com/settings/keys, set `ANTHROPIC_API_KEY`
- **GPT** — get a key at https://platform.openai.com/api-keys, set `OPENAI_API_KEY`

Then run the dev server:

```bash
npm run dev
```

Open http://localhost:3000. In the Workspace, pick a topic, a format
(Post / Article / Deck), and the model provider matching the key you set,
then click **Generate draft**.

## What's real here

- **Generation is real.** Every draft (hook/body, article + table, or deck
  outline + chart data) is generated on the fly by the selected model, via
  structured JSON output validated with Zod — not template fixtures.
- **Deck export is a real `.pptx`** file (via `pptxgenjs`), styled to match
  the app's design system.
- **Post/Article export** downloads a formatted Markdown file.
- **Library persistence** is browser `localStorage` — drafts you save stay
  on this device/browser; there's no server-side database in this build.

## Project structure

```
src/
  app/
    page.tsx              Home (marketing)
    workspace/page.tsx     Generation UI
    library/page.tsx       Saved drafts
    api/generate/route.ts  Server-side LLM call
  lib/
    topics.ts              The 7 topics + formats + providers
    schema.ts               Zod schemas for structured output (Post/Article/Deck)
    geminiSchemas.ts         JSON-Schema mirror of schema.ts for Gemini
    prompt.ts                System/user prompt builders
    providers/               One module per LLM (anthropic/openai/gemini) + dispatcher
    library.ts                localStorage CRUD for saved drafts
    pptx.ts                   Deck -> .pptx export
    downloadText.ts            Post/Article -> .md export
  components/
    NavBar.tsx, ContentViews.tsx, WorkspaceMockup.tsx
```

## Notes

- Chart values in generated content are explicitly framed to the model as
  *illustrative*, not real statistics — they exist to make the post/deck
  visually match the design's data-driven look.
- `npm audit` reports a high-severity advisory in `pptxgenjs`'s transitive
  `image-size` dependency (DoS via malformed image parsing). This app never
  feeds untrusted images through pptxgenjs — decks are text/chart only — so
  that code path isn't reachable here.

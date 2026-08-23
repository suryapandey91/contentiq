export type Topic = {
  id: string;
  label: string;
  /** One-line brief handed to the model so it knows the angle this topic
   *  usually takes — keeps generations on-theme without hardcoding content. */
  brief: string;
};

export const TOPICS: Topic[] = [
  {
    id: "ai-ml",
    label: "AI/ML",
    brief:
      "Practical AI/ML capability for engineering leaders: model strategy, evaluation harnesses, and where real differentiation lives once model access is a commodity.",
  },
  {
    id: "genai",
    label: "GenAI",
    brief:
      "How generative AI actually changes day-to-day knowledge work: what tasks disappear, what bottleneck moves in, and what skill becomes more valuable.",
  },
  {
    id: "data-mgmt",
    label: "Data Management",
    brief:
      "Data governance, lineage, and quality as it's actually used (or ignored) inside real organizations — not the vendor pitch.",
  },
  {
    id: "product-mgmt",
    label: "Product Management",
    brief:
      "How AI is changing product management practice: roadmaps, PRDs, evaluation-driven iteration, and the shrinking distance from guess to evidence.",
  },
  {
    id: "agents",
    label: "Agents",
    brief:
      "Autonomous AI agents in production: escalation paths, action scope, failure modes, and the organizational design question of who an agent answers to.",
  },
  {
    id: "future-of-work",
    label: "Future of Work",
    brief:
      "How management, org charts, and team composition change as AI agents take on real work alongside people.",
  },
  {
    id: "talent-os",
    label: "Talent OS",
    brief:
      "Talent and skills systems moving from job-title-based org charts to living skills graphs that track capability, not seats.",
  },
];

export const TOPIC_BY_ID: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
);

export type Format = "post" | "article" | "deck";

export const FORMATS: { id: Format; label: string }[] = [
  { id: "post", label: "Post" },
  { id: "article", label: "Article" },
  { id: "deck", label: "Deck" },
];

export type Provider = "anthropic" | "openai" | "gemini";

export const PROVIDERS: { id: Provider; label: string }[] = [
  { id: "anthropic", label: "Claude (Anthropic)" },
  { id: "openai", label: "GPT (OpenAI)" },
  { id: "gemini", label: "Gemini (Google)" },
];

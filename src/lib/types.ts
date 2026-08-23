import type { Format, Provider } from "./topics";

export type ChartPoint = { label: string; value: number };

export type PostContent = {
  hook: string;
  body: string;
  tag: string;
  chart: ChartPoint[];
};

export type ArticleContent = {
  title: string;
  dek: string;
  intro: string[];
  quote: string;
  body: string[];
  table: { metric: string; before: string; after: string }[];
  conclusion: string[];
};

export type DeckSlide = {
  heading: string;
  bullets: string[];
};

export type DeckContent = {
  title: string;
  sub: string;
  slides: DeckSlide[];
  chartTitle: string;
  chart: ChartPoint[];
  chartInsight: string;
  closeLine: string;
};

export type GeneratedContent = PostContent | ArticleContent | DeckContent;

export type GenerateRequest = {
  topicId: string;
  format: Format;
  angle?: string;
  provider: Provider;
};

export type GenerateResponse =
  | { ok: true; data: GeneratedContent }
  | { ok: false; error: string };

export type Draft = {
  id: string;
  topicId: string;
  topicLabel: string;
  format: Format;
  angle?: string;
  provider: Provider;
  content: GeneratedContent;
  createdAt: string;
};

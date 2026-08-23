import type { DeckContent } from "./types";

/** Builds and downloads a real .pptx file for a generated deck, styled to
 *  echo the Classical design system's palette. Client-side only (pptxgenjs
 *  writeFile triggers a browser download). */
export async function exportDeckToPptx(topicLabel: string, deck: DeckContent): Promise<void> {
  const PptxGenJS = (await import("pptxgenjs")).default;
  const pptx = new PptxGenJS();

  pptx.defineLayout({ name: "CONTENTIQ", width: 10, height: 5.625 });
  pptx.layout = "CONTENTIQ";

  const BG = "F3F2F2";
  const TEXT = "201F1D";
  const ACCENT = "B68235";
  const ACCENT_LIGHT = "FFE3BF";
  const DIVIDER = "D9D6D3";

  // Slide 1 — title
  const s1 = pptx.addSlide();
  s1.background = { color: BG };
  s1.addText(topicLabel.toUpperCase(), {
    x: 0.6, y: 0.55, w: 8.8, h: 0.4,
    fontFace: "Georgia", fontSize: 12, color: ACCENT, charSpacing: 2,
  });
  s1.addText(deck.title, {
    x: 0.6, y: 1.1, w: 8.8, h: 2.2,
    fontFace: "Georgia", fontSize: 40, color: TEXT, bold: false, valign: "top",
  });
  s1.addText(deck.sub, {
    x: 0.6, y: 3.4, w: 8.8, h: 0.8,
    fontFace: "Georgia", italic: true, fontSize: 16, color: ACCENT,
  });
  s1.addShape(pptx.ShapeType.rect, { x: 0.6, y: 3.25, w: 1.4, h: 0.02, fill: { color: ACCENT } });

  // Slide 2 — chart
  const s2 = pptx.addSlide();
  s2.background = { color: BG };
  s2.addText(topicLabel.toUpperCase(), {
    x: 0.6, y: 0.4, w: 8.8, h: 0.4,
    fontFace: "Georgia", fontSize: 12, color: ACCENT, charSpacing: 2,
  });
  s2.addChart(
    pptx.ChartType.bar,
    [
      {
        name: "Value",
        labels: deck.chart.map((c) => c.label),
        values: deck.chart.map((c) => c.value),
      },
    ],
    {
      x: 0.6, y: 1.0, w: 8.8, h: 4.0,
      chartColors: [ACCENT],
      catAxisLabelColor: TEXT,
      valAxisLabelColor: TEXT,
      catAxisLineColor: DIVIDER,
      valAxisLineColor: DIVIDER,
      showLegend: false,
      showValue: true,
      dataLabelColor: TEXT,
      barGapWidthPct: 40,
    },
  );

  // Slide 3 — closing line
  const s3 = pptx.addSlide();
  s3.background = { color: ACCENT_LIGHT };
  s3.addText(`"${deck.closeLine}"`, {
    x: 0.8, y: 1.8, w: 8.4, h: 2.0,
    fontFace: "Georgia", italic: true, fontSize: 28, color: "5A3B0A", valign: "middle", align: "left",
  });
  s3.addText(topicLabel, {
    x: 0.8, y: 4.6, w: 8.4, h: 0.5,
    fontFace: "Georgia", fontSize: 12, color: "7D5411", charSpacing: 2,
  });

  const fileName = `${deck.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pptx`;
  await pptx.writeFile({ fileName });
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-heading-family",
  display: "swap",
});

const body = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ContentIQ — One brief. Four formats.",
  description:
    "ContentIQ turns a point of view on AI/ML, GenAI, data management, product management, agents, the future of work, or talent systems into a LinkedIn post, an article, or a slide deck — generated with real GenAI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <div style={{ minHeight: "100vh", background: "var(--color-bg)", color: "var(--color-text)" }}>
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/workspace", label: "Workspace" },
  { href: "/library", label: "Library" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px clamp(20px,5vw,72px)",
        borderBottom: "2px solid var(--color-divider)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: "var(--font-heading-weight)" as unknown as number,
          fontSize: 22,
          letterSpacing: "-0.01em",
          color: "var(--color-text)",
        }}
      >
        ContentIQ
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {LINKS.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 14,
                color: active ? "var(--color-accent)" : "var(--color-text)",
              }}
            >
              {link.label}
            </Link>
          );
        })}
        <Link href="/workspace" className="btn btn-primary">
          Open workspace
        </Link>
      </div>
    </nav>
  );
}

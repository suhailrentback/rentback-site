// app/legal/layout.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export const dynamic = "force-static";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#f6faf8",
        color: "#0b0b0b",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          background: "#ffffffcc",
          backdropFilter: "saturate(1.8) blur(8px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: "#059669" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 11.5L12 4l9 7.5" />
            <path d="M5 10v9h14v-9" />
          </svg>
          RentBack
        </div>

        {/* Language toggle via query param (keeps current path) */}
        <nav style={{ display: "flex", gap: 8 }}>
          <Link
            href="?lang=en"
            prefetch={false}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(5,150,105,0.20)",
              background: "#ffffff",
              fontWeight: 600,
            }}
          >
            English
          </Link>
          <Link
            href="?lang=ur"
            prefetch={false}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(5,150,105,0.20)",
              background: "#ffffff",
              fontWeight: 600,
            }}
          >
            اردو
          </Link>
        </nav>
      </header>

      {/* Body container */}
      <main style={{ flex: 1, padding: 16 }}>
        <div
          style={{
            margin: "0 auto",
            maxWidth: 860,
            borderRadius: 16,
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            padding: 20,
          }}
        >
          {children}
        </div>
      </main>
    </section>
  );
}

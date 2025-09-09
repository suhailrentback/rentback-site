import React from "react";
import Link from "next/link";

const BRAND = {
  primary: "#059669",
  ring: "rgba(5,150,105,0.20)",
  bg: "#f6faf8",
  surface: "#ffffff",
  text: "#0b0b0b",
} as const;

const BrandLogo: React.FC<{ size?: number; stroke?: string }> = ({
  size = 20,
  stroke = BRAND.primary,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
  </svg>
);

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bg, color: BRAND.text }}>
      {/* Header (matches app chrome) */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: BRAND.primary }}>
          <BrandLogo />
          RentBack — Legal
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link
            href="/"
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: `1px solid ${BRAND.ring}`,
              background: BRAND.surface,
              fontWeight: 600,
            }}
          >
            ← Back to App
          </Link>
        </div>
      </header>

      {/* Local nav */}
      <nav
        style={{
          position: "sticky",
          top: 56,
          zIndex: 10,
          background: BRAND.surface,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 12, padding: "10px 14px", flexWrap: "wrap" }}>
          <Link href="/legal/privacy" style={{ fontWeight: 600, color: BRAND.primary }}>
            Privacy Policy
          </Link>
          <Link href="/legal/terms" style={{ fontWeight: 600, color: BRAND.primary }}>
            Terms of Service
          </Link>
          <Link href="/legal/sandbox" style={{ fontWeight: 600, color: BRAND.primary }}>
            Sandbox Plan
          </Link>
        </div>
      </nav>

      <main style={{ padding: 16, maxWidth: 840, margin: "0 auto" }}>{children}</main>
      <footer style={{ padding: 16, opacity: 0.7, fontSize: 12, textAlign: "center" }}>
        © {new Date().getFullYear()} RentBack
      </footer>
    </div>
  );
}

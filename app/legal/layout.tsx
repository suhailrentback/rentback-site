import React from "react";

const BRAND = {
  primary: "#059669",
  ring: "rgba(5,150,105,0.20)",
  bg: "#f6faf8",
  surface: "#fff",
};

const BrandLogo = ({ size = 20, stroke = BRAND.primary }: { size?: number; stroke?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
  </svg>
);

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bg }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#ffffffcc",
          backdropFilter: "saturate(1.8) blur(8px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, color: BRAND.primary }}>
            <BrandLogo />
            RentBack
          </div>
          <a href="/" style={{ border: `1px solid ${BRAND.ring}`, padding: "6px 10px", borderRadius: 10, fontWeight: 700 }}>
            App
          </a>
        </div>
      </header>
      <main style={{ maxWidth: 820, margin: "0 auto", padding: 16 }}>{children}</main>
    </div>
  );
}

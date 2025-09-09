import React from "react";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6faf8",
        color: "#0b0b0b",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 11.5L12 4l9 7.5" />
            <path d="M5 10v9h14v-9" />
          </svg>
          RentBack — Legal
        </div>
      </header>
      <main style={{ flex: 1, padding: 16, maxWidth: 900, margin: "0 auto" }}>{children}</main>
      <footer
        style={{
          padding: 16,
          borderTop: "1px solid rgba(0,0,0,0.06)",
          background: "#fff",
          textAlign: "center",
          fontSize: 12,
          opacity: 0.8,
        }}
      >
        © {new Date().getFullYear()} RentBack
      </footer>
    </div>
  );
}

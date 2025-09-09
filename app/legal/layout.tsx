"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BRAND } from "../../lib/tokens";

const BrandLogo: React.FC<{ size?: number; stroke?: string }> = ({
  size = 20, stroke = BRAND.primary,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
  </svg>
);

const Pill: React.FC<{ active?: boolean; onClick?: () => void; children: React.ReactNode }> = ({
  active, onClick, children,
}) => (
  <button onClick={onClick} style={{
    padding: "8px 12px", borderRadius: 999,
    border: `1px solid ${active ? BRAND.primary : BRAND.ring}`,
    background: active ? "#ecfdf5" : BRAND.surface,
    color: active ? BRAND.primary : BRAND.text, cursor: "pointer", fontWeight: 600,
  }}>
    {children}
  </button>
);

const LangSwitch: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const lang = (sp.get("lang") === "ur" ? "ur" : "en") as "en" | "ur";

  const setLang = (next: "en" | "ur") => {
    const nextParams = new URLSearchParams(sp?.toString() || "");
    nextParams.set("lang", next);
    router.replace(`${pathname}?${nextParams.toString()}`);
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Pill active={lang === "en"} onClick={() => setLang("en")}>English</Pill>
      <Pill active={lang === "ur"} onClick={() => setLang("ur")}>اردو</Pill>
    </div>
  );
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bg, color: BRAND.text, display: "flex", flexDirection: "column" }}>
      <header style={{
        position: "sticky", top: 0, zIndex: 10, height: 56, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 14px", background: "#ffffffcc",
        borderBottom: `1px solid ${BRAND.ring}`, backdropFilter: "saturate(1.8) blur(8px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: BRAND.primary }}>
          <BrandLogo /> <span>RentBack</span>
        </div>
        <LangSwitch />
      </header>

      <main style={{ padding: 14, width: "100%", maxWidth: 860, margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}

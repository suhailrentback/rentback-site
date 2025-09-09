// components/SandboxBanner.tsx
"use client";
import React from "react";

type Props = {
  lang?: "en" | "ur";
};

const styles: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px dashed rgba(5,150,105,0.35)",
  background:
    "linear-gradient(0deg, rgba(236,253,245,0.8), rgba(255,255,255,0.8))",
};

export default function SandboxBanner({ lang = "en" }: Props) {
  const isUr = lang === "ur";
  return (
    <div style={styles} aria-live="polite" role="status">
      <span
        style={{
          fontSize: 12,
          padding: "3px 8px",
          borderRadius: 999,
          background: "#fffbeb",
          color: "#92400e",
          border: "1px solid rgba(146,64,14,0.15)",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        {isUr ? "سینڈ باکس" : "SANDBOX"}
      </span>
      <div style={{ fontSize: 13, opacity: 0.9 }}>
        {isUr
          ? "یہ ایک ابتدائی ڈیمو ہے۔ فیچرز اور پالیسیز سینڈ باکس ٹیسٹنگ کے دوران تبدیل ہو سکتے ہیں۔"
          : "This is an early demo. Features & policies may change during sandbox testing."}
      </div>
      <a
        href="/legal/sandbox"
        style={{
          marginLeft: "auto",
          textDecoration: "underline",
          fontSize: 13,
          whiteSpace: "nowrap",
        }}
      >
        {isUr ? "تفصیل" : "Details"}
      </a>
    </div>
  );
}

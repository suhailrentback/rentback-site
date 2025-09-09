"use client";
import React from "react";

type Props = {
  lang?: "en" | "ur";
  className?: string;
};

const STR = {
  en: {
    title: "Regulatory Sandbox",
    body:
      "We’re preparing our application for the State Bank of Pakistan (SBP) Regulatory Sandbox.",
    link: "Status & details",
  },
  ur: {
    title: "ریگولیٹری سینڈ باکس",
    body:
      "ہم اسٹیٹ بینک آف پاکستان (SBP) کے ریگولیٹری سینڈ باکس کے لیے اپنی درخواست تیار کر رہے ہیں۔",
    link: "اسٹیٹس اور تفصیل",
  },
} as const;

export default function SandboxBanner({ lang = "en", className }: Props) {
  const t = STR[lang];
  return (
    <div
      className={className}
      style={{
        margin: "12px 0 0",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.08)",
        background:
          "linear-gradient(180deg, rgba(16,185,129,0.07), rgba(255,255,255,0.9))",
        padding: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#10b981",
              boxShadow: "0 0 0 3px rgba(16,185,129,0.25)",
            }}
          />
          <div>
            <div style={{ fontWeight: 700 }}>{t.title}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{t.body}</div>
          </div>
        </div>
        <a
          href={`/legal/sandbox?lang=${lang}`}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.1)",
            background: "#fff",
            fontWeight: 600,
            textDecoration: "none",
            color: "#059669",
          }}
        >
          {t.link}
        </a>
      </div>
    </div>
  );
}

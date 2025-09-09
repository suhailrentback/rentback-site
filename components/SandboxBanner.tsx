"use client";
import React from "react";

type Lang = "en" | "ur";

const STR = {
  en: {
    badge: "Sandbox",
    blurb:
      "Pilot under the State Bank of Pakistan Regulatory Sandbox. Features and limits may change.",
    learn: "Learn more",
    statusHref: "/legal/sandbox?lang=en",
  },
  ur: {
    badge: "سینڈ باکس",
    blurb:
      "اسٹیٹ بینک آف پاکستان کے ریگولیٹری سینڈ باکس کے تحت پائلٹ۔ فیچرز اور حدود تبدیل ہو سکتی ہیں۔",
    learn: "مزید جانیں",
    statusHref: "/legal/sandbox?lang=ur",
  },
} as const;

export default function SandboxBanner({
  lang = "en",
  compact = false,
}: {
  lang?: Lang;
  compact?: boolean;
}) {
  const t = STR[lang];
  return (
    <div
      role="status"
      style={{
        margin: compact ? "8px 0 12px" : "12px 0 16px",
        padding: compact ? "8px 10px" : "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(5,150,105,0.20)",
        background: "#ecfdf5",
        color: "#065f46",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          background: "#d1fae5",
          color: "#065f46",
          padding: "3px 8px",
          borderRadius: 999,
          border: "1px solid rgba(5,150,105,0.25)",
          whiteSpace: "nowrap",
        }}
      >
        {t.badge}
      </span>
      <span style={{ fontSize: 13, lineHeight: 1.35 }}>{t.blurb}</span>
      <a
        href={t.statusHref}
        target="_blank"
        rel="noreferrer"
        style={{
          marginLeft: "auto",
          fontSize: 12,
          textDecoration: "underline",
          color: "#065f46",
          fontWeight: 600,
        }}
      >
        {t.learn}
      </a>
    </div>
  );
}

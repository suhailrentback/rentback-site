"use client";
import React, { useEffect, useState } from "react";

// ---- Brand (same palette) ----
const BRAND = {
  primary: "#059669",
  teal: "#14b8a6",
  bg: "#f6faf8",
  surface: "#ffffff",
  text: "#0b0b0b",
  ring: "rgba(5,150,105,0.20)",
} as const;

type I18n = { [k: string]: any };

const copy: Record<"en" | "ur", I18n> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated",
    back: "Back",
    appName: "RentBack",
    sections: [
      {
        h: "What we collect",
        p: "Basic account info (name, email), usage analytics, and content you submit in the app. Payment PAN is never stored by us; processing occurs via licensed partners.",
      },
      {
        h: "How we use data",
        p: "To operate the service, prevent fraud, improve features, and support you. We don’t sell personal data.",
      },
      {
        h: "Retention & deletion",
        p: "We keep only what’s necessary and delete on request within legal/contractual limits.",
      },
      {
        h: "Security",
        p: "Encryption in transit, least-privilege access, planned 2FA/device binding, and audit logs.",
      },
      {
        h: "Contact",
        p: "Questions or requests? Email help@rentback.app",
      },
    ],
  },
  ur: {
    title: "پرائیویسی پالیسی",
    updated: "آخری اپڈیٹ",
    back: "واپس",
    appName: "RentBack",
    sections: [
      {
        h: "ہم کیا اکٹھا کرتے ہیں",
        p: "بنیادی اکاؤنٹ معلومات (نام، ای میل)، استعمال کا اینالیٹکس، اور آپ کی فراہم کردہ معلومات۔ کارڈ کا مکمل نمبر ہم محفوظ نہیں کرتے؛ ادائیگی لائسنس یافتہ پارٹنرز کے ذریعے ہوتی ہے۔",
      },
      {
        h: "ڈیٹا کا استعمال",
        p: "سروس چلانے، دھوکہ دہی سے بچاؤ، فیچر بہتر کرنے اور سپورٹ کے لیے۔ ہم ذاتی ڈیٹا فروخت نہیں کرتے۔",
      },
      {
        h: "رکھاؤ اور حذف",
        p: "صرف ضروری مدت تک رکھتے ہیں اور قانونی حدود میں درخواست پر حذف کرتے ہیں۔",
      },
      {
        h: "سیکورٹی",
        p: "ٹرانزٹ میں انکرپشن، کم از کم رسائی، منصوبہ شدہ 2FA/ڈیوائس بائنڈنگ، اور آڈٹ لاگز۔",
      },
      {
        h: "رابطہ",
        p: "سوالات یا درخواستیں؟ help@rentback.app",
      },
    ],
  },
};

const BrandLogo: React.FC<{ size?: number; stroke?: string }> = ({ size = 20, stroke = BRAND.primary }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
  </svg>
);

const Pill: React.FC<{ onClick?: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 12px",
      borderRadius: 999,
      border: `1px solid ${BRAND.ring}`,
      background: BRAND.surface,
      color: BRAND.primary,
      fontWeight: 600,
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

function initialLang(): "en" | "ur" {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("lang");
    if (q === "en" || q === "ur") return q;
    const saved = localStorage.getItem("rb-lang");
    if (saved === "en" || saved === "ur") return saved;
    if (/^ur/i.test(navigator.language || "")) return "ur";
  } catch {}
  return "en";
}

export default function PrivacyPage() {
  const [lang, setLang] = useState<"en" | "ur">(initialLang());
  const t = copy[lang];
  const dir: "ltr" | "rtl" = lang === "ur" ? "rtl" : "ltr";

  useEffect(() => {
    try {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", dir);
      localStorage.setItem("rb-lang", lang);
    } catch {}
  }, [lang, dir]);

  const goBack = () => {
    if (history.length > 1) history.back();
    else window.location.href = "/";
  };

  return (
    <div style={{ minHeight: "100vh", background: BRAND.bg, color: BRAND.text }} dir={dir}>
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={goBack} style={{ border: "1px solid rgba(0,0,0,0.1)", background: BRAND.surface, borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>
            ← {t.back}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: BRAND.primary }}>
            <BrandLogo />
            RentBack
          </div>
        </div>
        <Pill onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}>{lang === "en" ? "اردو" : "English"}</Pill>
      </header>

      <main style={{ maxWidth: 820, margin: "0 auto", padding: 16 }}>
        <div
          style={{
            padding: 16,
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.06)",
            background: BRAND.surface,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 22 }}>{t.title}</h1>
            <div style={{ opacity: 0.7, fontSize: 12 }}>
              {t.updated}: {new Date().toLocaleDateString("en-PK")}
            </div>
          </div>

          <div style={{ height: 12 }} />

          {t.sections.map((s: any, i: number) => (
            <section key={i} style={{ marginBottom: 14 }}>
              <h2 style={{ margin: "8px 0", fontSize: 16 }}>{s.h}</h2>
              <p style={{ margin: 0, lineHeight: 1.7 }}>{s.p}</p>
            </section>
          ))}

          <div style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
            © {new Date().getFullYear()} {t.appName}
          </div>
        </div>
      </main>
    </div>
  );
}

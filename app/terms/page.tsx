"use client";
import React, { useEffect, useState } from "react";

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
    title: "Terms of Service",
    updated: "Last updated",
    back: "Back",
    appName: "RentBack",
    sections: [
      {
        h: "Acceptance of terms",
        p: "By using RentBack, you agree to these Terms and our Privacy Policy.",
      },
      {
        h: "Use of service",
        p: "Demo experiences may simulate payments or rewards without moving real funds. Real payments, when enabled, are processed by licensed partners.",
      },
      {
        h: "Accounts & KYC",
        p: "You are responsible for the information you provide. Higher limits and payouts may require identity verification (KYC).",
      },
      {
        h: "Prohibited activity",
        p: "No illegal, fraudulent, or abusive behavior. We may suspend accounts that violate these terms.",
      },
      {
        h: "Liability",
        p: "Service is provided “as is”. To the maximum extent permitted by law, we disclaim warranties and limit liability.",
      },
      {
        h: "Contact",
        p: "For questions: help@rentback.app",
      },
    ],
  },
  ur: {
    title: "شرائطِ استعمال",
    updated: "آخری اپڈیٹ",
    back: "واپس",
    appName: "RentBack",
    sections: [
      {
        h: "شرائط کی منظوری",
        p: "RentBack استعمال کرنے سے آپ ان شرائط اور ہماری پرائیویسی پالیسی سے اتفاق کرتے ہیں۔",
      },
      {
        h: "سروس کا استعمال",
        p: "ڈیمو تجربات میں حقیقی رقم کی منتقلی نہیں ہوتی۔ جب فعال ہوں، حقیقی ادائیگیاں لائسنس یافتہ پارٹنرز کے ذریعے ہوں گی۔",
      },
      {
        h: "اکاؤنٹس اور KYC",
        p: "آپ فراہم کردہ معلومات کے ذمہ دار ہیں۔ زیادہ حدیں اور ادائیگیاں شناختی توثیق (KYC) سے مشروط ہوسکتی ہیں۔",
      },
      {
        h: "ممنوعہ سرگرمیاں",
        p: "غیر قانونی، فراڈیانہ یا بدسلوکی ممنوع ہے۔ خلاف ورزی پر اکاؤنٹ معطل کیا جاسکتا ہے۔",
      },
      {
        h: "ذمہ داری",
        p: "سروس ‘جوں کی توں’ فراہم کی جاتی ہے۔ قانون کے مطابق زیادہ سے زیادہ حد تک وارنٹیز اور ذمہ داری محدود ہے۔",
      },
      {
        h: "رابطہ",
        p: "سوالات کے لیے: help@rentback.app",
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

export default function TermsPage() {
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

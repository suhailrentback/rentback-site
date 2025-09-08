// Server component (no "use client")
import { cookies } from "next/headers";

export const dynamic = "force-static";

export const metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack handles your data.",
};

const copy = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 3 September 2025",
    intro:
      "We handle your information under Pakistani law and relevant SBP directives. We collect only what’s needed to operate RentBack and improve the service.",
    collectTitle: "What we collect",
    collect: [
      "Contact details (email, phone), city, language.",
      "Technical data (limited analytics if you consent).",
    ],
    useTitle: "How we use it",
    use: [
      "Waitlist and product updates you request.",
      "Service operations, fraud prevention, and support.",
    ],
    contactTitle: "Contact",
    contact: "help@rentback.app",
  },
  ur: {
    title: "پرائیویسی پالیسی",
    updated: "آخری بار اپڈیٹ: 3 ستمبر 2025",
    intro:
      "ہم آپ کی معلومات پاکستانی قانون اور متعلقہ اسٹیٹ بینک ہدایات کے تحت سنبھالتے ہیں۔ RentBack چلانے اور سروس بہتر بنانے کے لیے صرف ضروری معلومات اکٹھی کی جاتی ہیں۔",
    collectTitle: "ہم کیا جمع کرتے ہیں",
    collect: [
      "رابطہ کی تفصیلات (ای میل، فون)، شہر، زبان۔",
      "ٹیکنیکل ڈیٹا (صرف آپ کی اجازت سے محدود اینالیٹکس)۔",
    ],
    useTitle: "ہم کیسے استعمال کرتے ہیں",
    use: [
      "ویٹ لسٹ اور پروڈکٹ اپڈیٹس جو آپ مانگیں۔",
      "سروس آپریشنز، فراڈ سے بچاؤ، اور سپورٹ۔",
    ],
    contactTitle: "رابطہ",
    contact: "help@rentback.app",
  },
} as const;

export default function PrivacyPage() {
  const lang = cookies().get("rb-lang")?.value === "ur" ? "ur" : "en";
  const t = copy[lang];

  const dir = lang === "ur" ? "rtl" : "ltr";
  const BRAND = {
    primary: "#059669",
    bg: "#f6faf8",
    surface: "#ffffff",
    ring: "rgba(5,150,105,0.20)",
  };

  return (
    <html lang={lang} dir={dir}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: BRAND.bg,
          color: "#0b0b0b",
          fontFamily:
            lang === "ur"
              ? "Noto Nastaliq Urdu, Noto Naskh Arabic, system-ui, -apple-system, Segoe UI, Roboto"
              : "system-ui, -apple-system, Segoe UI, Roboto",
          display: "grid",
          placeItems: "start center",
        }}
      >
        <main style={{ width: "100%", maxWidth: 720, padding: 16 }}>
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.06)",
              background: BRAND.surface,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 12px 30px rgba(5,150,105,0.08)",
            }}
          >
            <header
              style={{
                padding: "16px 18px",
                background:
                  "linear-gradient(120deg, rgba(5,150,105,0.08), rgba(20,184,166,0.06))",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                fontWeight: 800,
              }}
            >
              {t.title}
            </header>

            <section style={{ padding: 18, lineHeight: 1.7 }}>
              <p style={{ opacity: 0.7, marginTop: 0 }}>{t.updated}</p>
              <p>{t.intro}</p>

              <h3 style={{ marginBottom: 8 }}>{t.collectTitle}</h3>
              <ul style={{ paddingInlineStart: 18, marginTop: 6 }}>
                {t.collect.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>

              <h3 style={{ marginBottom: 8, marginTop: 18 }}>{t.useTitle}</h3>
              <ul style={{ paddingInlineStart: 18, marginTop: 6 }}>
                {t.use.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>

              <h3 style={{ marginBottom: 8, marginTop: 18 }}>{t.contactTitle}</h3>
              <p style={{ marginTop: 6 }}>{t.contact}</p>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}

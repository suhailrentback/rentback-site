// Server component (no "use client")
import { cookies } from "next/headers";

export const dynamic = "force-static";

export const metadata = {
  title: "Terms of Service — RentBack",
  description: "Your agreement with RentBack.",
};

const copy = {
  en: {
    title: "Terms of Service",
    updated: "Last updated: 3 September 2025",
    intro:
      "By using RentBack, you agree to these terms. Where applicable, payments are provided through licensed partners in Pakistan.",
    sections: [
      {
        h: "Eligibility",
        p: "You must be able to enter a binding contract under Pakistani law.",
      },
      {
        h: "Use of Service",
        p: "Don’t misuse the service, attempt unauthorized access, or violate applicable laws.",
      },
      {
        h: "Payments",
        p: "Demo flows do not move real funds. Production payments, when enabled, are processed by licensed partners and may be subject to their terms.",
      },
      {
        h: "Privacy",
        p: "See our Privacy Policy for how we handle your data.",
      },
      {
        h: "Contact",
        p: "help@rentback.app",
      },
    ],
  },
  ur: {
    title: "شرائطِ استعمال",
    updated: "آخری بار اپڈیٹ: 3 ستمبر 2025",
    intro:
      "RentBack استعمال کر کے آپ ان شرائط سے اتفاق کرتے ہیں۔ جہاں لاگو ہو، ادائیگیاں پاکستان میں لائسنس یافتہ پارٹنرز کے ذریعے فراہم کی جاتی ہیں۔",
    sections: [
      {
        h: "اہلیت",
        p: "آپ پاکستانی قانون کے تحت معاہدہ کرنے کے اہل ہوں۔",
      },
      {
        h: "سروس کا استعمال",
        p: "سروس کا غلط استعمال، غیر مجاز رسائی یا قوانین کی خلاف ورزی نہ کریں۔",
      },
      {
        h: "ادائیگیاں",
        p: "ڈیمو فلو میں حقیقی رقم منتقل نہیں ہوتی۔ پروڈکشن ادائیگیاں (جب فعال ہوں) لائسنس یافتہ پارٹنرز کے ذریعے اور ان کی شرائط کے مطابق ہوں گی۔",
      },
      {
        h: "پرائیویسی",
        p: "آپ کے ڈیٹا کے بارے میں ہماری پرائیویسی پالیسی دیکھیں۔",
      },
      {
        h: "رابطہ",
        p: "help@rentback.app",
      },
    ],
  },
} as const;

export default function TermsPage() {
  const lang = cookies().get("rb-lang")?.value === "ur" ? "ur" : "en";
  const t = copy[lang];
  const dir = lang === "ur" ? "rtl" : "ltr";
  const BRAND = {
    primary: "#059669",
    bg: "#f6faf8",
    surface: "#ffffff",
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

              {t.sections.map((s, i) => (
                <div key={i} style={{ marginTop: 16 }}>
                  <h3 style={{ marginBottom: 8 }}>{s.h}</h3>
                  <p style={{ marginTop: 6 }}>{s.p}</p>
                </div>
              ))}
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}

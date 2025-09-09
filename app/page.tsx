"use client";
import React, { useEffect, useMemo, useState } from "react";
import SandboxBanner from "./components/SandboxBanner";

/**
 * RentBack — Landing Page (for rentback.app)
 * - Brand tokens aligned with app
 * - EN/UR i18n + RTL for UR
 * - Language persisted to localStorage ("rb-lang")
 * - Simple hero + features + waitlist form (Email, Phone, City)
 * - Form posts to Google Apps Script endpoint (no-cors)
 * - Footer with Privacy / Terms / Founder (modal), Complaints, and Language toggle
 * - No extra deps (inline styles only)
 */

// ---------- Brand ----------
const BRAND = {
  primary: "#059669", // emerald-600
  primarySoft: "#10b981",
  primaryLite: "#34d399",
  teal: "#14b8a6",
  bg: "#f6faf8",
  surface: "#ffffff",
  text: "#0b0b0b",
  ring: "rgba(5,150,105,0.20)",
} as const;

// ---------- Types ----------
type I18n = { [key: string]: any };

// ---------- i18n copy ----------
const copy: Record<"en" | "ur", I18n> = {
  en: {
    appName: "RentBack",
    statusPill: "Waiting approval",
    heroTitle: "Turn your rent into rewards.",
    heroSub:
      "We’re building the RentBack app. Pay by our card, your bank, or any digital bank. Earn points and redeem for bills and shopping.",
    join: "Join",
    email: "Email",
    phone: "Phone (PK)",
    city: "City",
    successTitle: "You’re in!",
    successBody:
      "We’ll email you early access as we open city by city in Pakistan.",
    errors: {
      email: "Please enter a valid email address.",
      phone: "Enter a Pakistani mobile like 03001234567 or +923001234567.",
    },
    howTitle: "How it works",
    how: [
      { t: "Pay rent", d: "Use our card, your bank, or any digital bank." },
      { t: "Earn points", d: "Instant points on every verified payment." },
      { t: "Redeem rewards", d: "Top-ups, utility bills, shopping vouchers." },
    ],
    whyTitle: "Why RentBack",
    why: [
      { t: "Secure", d: "Built with licensed payment partners." },
      { t: "Rewarding", d: "Your biggest expense finally gives back." },
      { t: "Simple", d: "No extra steps or hidden fees." },
    ],
    footerNote:
      "RentBack is preparing an application to the State Bank of Pakistan Regulatory Sandbox. Rewards subject to terms.",
    footer: {
      privacy: "Privacy",
      terms: "Terms",
      founder: "Founder",
      complaints: "Complaints",
      lang: "Language",
      urdu: "اردو",
      english: "English",
    },
    founder: { name: "Suhail Ahmed", email: "help@rentback.app", title: "Founder" },
  },
  ur: {
    appName: "RentBack",
    statusPill: "منظوری کا انتظار",
    heroTitle: "اپنے کرائے کو انعامات میں بدلیں۔",
    heroSub:
      "ہم RentBack ایپ بنا رہے ہیں۔ ہمارے کارڈ، آپ کے بینک یا کسی بھی ڈیجیٹل بینک سے ادائیگی کریں۔ پوائنٹس کمائیں اور بلز و شاپنگ پر ریڈیم کریں۔",
    join: "شامل ہوں",
    email: "ای میل",
    phone: "فون (PK)",
    city: "شہر",
    successTitle: "آپ شامل ہو گئے!",
    successBody:
      "ہم جیسے جیسے شہروں میں لانچ کریں گے، آپ کو ابتدائی رسائی ای میل کریں گے۔",
    errors: {
      email: "براہِ کرم درست ای میل درج کریں۔",
      phone: "پاکستانی موبائل نمبر لکھیں: 03001234567 یا +923001234567",
    },
    howTitle: "طریقہ کار",
    how: [
      { t: "کرایہ ادا کریں", d: "ہمارے کارڈ، آپ کے بینک یا کسی بھی ڈیجیٹل بینک سے۔" },
      { t: "پوائنٹس کمائیں", d: "ہر تصدیق شدہ ادائیگی پر فوری پوائنٹس۔" },
      { t: "انعام حاصل کریں", d: "ٹاپ اپ، یوٹیلیٹی بلز، شاپنگ واؤچرز۔" },
    ],
    whyTitle: "کیوں رینٹ بیک؟",
    why: [
      { t: "محفوظ", d: "لائسنس یافتہ ادائیگی پارٹنرز کے ساتھ بنایا گیا۔" },
      { t: "فائدہ مند", d: "آپ کا سب سے بڑا خرچہ اب واپس دے۔" },
      { t: "آسان", d: "کوئی اضافی مرحلہ یا چُھپی فیس نہیں۔" },
    ],
    footerNote:
      "رینٹ بیک اسٹیٹ بینک آف پاکستان کے ریگولیٹری سینڈ باکس کے لیے درخواست کی تیاری کر رہا ہے۔ ریوارڈز شرائط کے تابع ہیں۔",
    footer: {
      privacy: "پرائیویسی",
      terms: "شرائط",
      founder: "بانی",
      complaints: "شکایات",
      lang: "زبان",
      urdu: "اردو",
      english: "English",
    },
    founder: { name: "سہیل احمد", email: "help@rentback.app", title: "بانی" },
  },
};

// ---------- Helpers ----------
const formatPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(n);

// Simple PK mobile validator
const isValidPkMobile = (s: string) =>
  /^(?:\+?92)?0?3[0-9]{9}$/.test(s.trim());

// Normalize PK phone to +923… format
const normalizePkPhone = (raw: string) => {
  let s = (raw || "").replace(/[^\d+]/g, "");
  if (s.startsWith("00")) s = "+" + s.slice(2);
  if (s.startsWith("92")) s = "+92" + s.slice(2);
  const digits = s.replace(/\D/g, "");
  if (s.startsWith("+92")) return ("+92" + digits.slice(2)).slice(0, 13);
  if (digits.length >= 11 && digits[0] === "0" && digits[1] === "3")
    return "+92" + digits.slice(1, 11);
  if (digits.length === 10 && digits[0] === "3") return "+92" + digits.slice(0, 10);
  let ten = digits.replace(/^0+/, "").slice(0, 10);
  return "+92" + ten;
};

// ---------- Visuals ----------
const BrandLogo: React.FC<{ size?: number; stroke?: string }> = ({
  size = 20,
  stroke = BRAND.primary,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
  </svg>
);

const CardVisual: React.FC = () => (
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: 460,
      height: 230,
      borderRadius: 20,
      overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 12px 30px rgba(5,150,105,0.18)",
      color: BRAND.text,
      background: `linear-gradient(120deg, ${BRAND.primary}, ${BRAND.teal}, ${BRAND.primaryLite})`,
      backgroundSize: "200% 200%",
      animation: "rb-gradient-move 12s ease infinite",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient( to bottom right, rgba(255,255,255,0.14), rgba(255,255,255,0) )",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: 18,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
          <BrandLogo size={22} stroke="#0f172a" />
          <span>RentBack</span>
        </div>
        <span style={{ fontSize: 12, opacity: 0.9, color: "#0f172a" }}>VIRTUAL • Debit</span>
      </div>
      <div
        style={{
          marginTop: "auto",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          letterSpacing: 1,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>**** **** **** 0007</div>
        <div style={{ display: "flex", gap: 20, marginTop: 6, fontSize: 12, color: "#0f172a" }}>
          <span>Exp 12/27</span>
          <span>PKR</span>
        </div>
      </div>
    </div>
  </div>
);

// ---------- Page ----------
export default function LandingPage() {
  // Language (persisted like the app)
  const [lang, setLang] = useState<"en" | "ur">("en");
  const t: I18n = (copy as any)[lang];
  const dir: "ltr" | "rtl" = lang === "ur" ? "rtl" : "ltr";

  // load saved language once
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rb-lang");
      if (saved === "en" || saved === "ur") setLang(saved as any);
    } catch {}
  }, []);
  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem("rb-lang", lang);
    } catch {}
  }, [lang]);

  // reflect on <html>
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.setAttribute("lang", lang);
      root.setAttribute("dir", dir);
    } catch {}
  }, [lang, dir]);

  // Form state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Endpoint (Google Apps Script)
  const ENDPOINT =
    "https://script.google.com/macros/s/AKfycbwCqHgI_5wkWTTorP_803gULbkVDuhLLs_lQnKN9k5dl1NPJx7XKEHj8IOcIyIENZgm/exec";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErr(null);

    const em = email.trim();
    const ph = phone.trim();
    const ct = city.trim();

    const emailOk = /.+@.+\..+/.test(em);
    const phoneOk = isValidPkMobile(ph);

    if (!emailOk) {
      setErr(t.errors.email);
      return;
    }
    if (!phoneOk) {
      setErr(t.errors.phone);
      return;
    }

    setLoading(true);
    try {
      // UTM (best-effort)
      let utmSource = "",
        utmMedium = "",
        utmCampaign = "";
      try {
        const params = new URLSearchParams(window.location.search);
        utmSource = params.get("utm_source") || "";
        utmMedium = params.get("utm_medium") || "";
        utmCampaign = params.get("utm_campaign") || "";
      } catch {}

      const payload = {
        table: "waitlist",
        email: em,
        phone: normalizePkPhone(ph),
        city: ct,
        lang,
        utmSource,
        utmMedium,
        utmCampaign,
        ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
        ts: new Date().toISOString(),
      };

      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
      setEmail("");
      setPhone("");
      setCity("");
    } catch (e) {
      setErr(lang === "ur" ? "عارضی مسئلہ۔ دوبارہ کوشش کریں۔" : "Temporary issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir={dir} style={{ minHeight: "100vh", background: BRAND.bg, color: BRAND.text }}>
      {/* gradient animation keyframes */}
      <style>
        {
          "@keyframes rb-gradient-move {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}"
        }
      </style>

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          background: "#ffffffcc",
          backdropFilter: "saturate(1.8) blur(8px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: BRAND.primary }}>
          <BrandLogo />
          {t.appName}
          <span
            style={{
              marginLeft: 8,
              fontSize: 11,
              padding: "4px 8px",
              borderRadius: 999,
              background: "#fffbeb",
              color: "#92400e",
              border: "1px solid rgba(146,64,14,0.15)",
            }}
          >
            {t.statusPill}
          </span>
        </div>
        <div />
      </header>

      {/* Sandbox banner */}
      <div style={{ maxWidth: 1120, margin: "10px auto 0", padding: "0 16px" }}>
        <SandboxBanner lang={lang} />
      </div>

      {/* Main */}
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: 16 }}>
        {/* Hero */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: 32, lineHeight: 1.2, marginBottom: 8, fontWeight: 800 }}>
              {t.heroTitle}
            </h1>
            <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: 16 }}>{t.heroSub}</p>

            {/* Waitlist form */}
            <form
              onSubmit={onSubmit}
              style={{
                marginTop: 16,
                padding: 14,
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.06)",
                background: BRAND.surface,
                boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
                display: "grid",
                gap: 8,
                maxWidth: 520,
              }}
            >
              {submitted ? (
                <div
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    background: "#ecfdf5",
                    border: `1px solid ${BRAND.ring}`,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{t.successTitle}</div>
                  <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>{t.successBody}</div>
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gap: 8 }}>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.email}
                      inputMode="email"
                      style={{
                        padding: 12,
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.1)",
                        background: BRAND.surface,
                      }}
                    />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={(e) => setPhone(normalizePkPhone(e.target.value))}
                      placeholder={t.phone}
                      inputMode="tel"
                      id="rb-wa"
                      style={{
                        padding: 12,
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.1)",
                        background: BRAND.surface,
                      }}
                    />
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t.city}
                      style={{
                        padding: 12,
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.1)",
                        background: BRAND.surface,
                      }}
                    />
                  </div>

                  {err ? (
                    <div style={{ color: "#b91c1c", fontSize: 13, marginTop: 4 }}>{err}</div>
                  ) : null}

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        border: `1px solid ${BRAND.ring}`,
                        background: BRAND.primary,
                        color: "#fff",
                        fontWeight: 700,
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {t.join}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          <div style={{ display: "grid", placeItems: "center" }}>
            <CardVisual />
          </div>
        </section>

        {/* How it works */}
        <section style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>{t.howTitle}</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            {t.how.map((x: any, i: number) => (
              <div
                key={i}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.06)",
                  background: BRAND.surface,
                }}
              >
                <div style={{ fontWeight: 700 }}>{x.t}</div>
                <div style={{ opacity: 0.8, fontSize: 13, marginTop: 6 }}>{x.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why RentBack */}
        <section style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>{t.whyTitle}</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            {t.why.map((x: any, i: number) => (
              <div
                key={i}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.06)",
                  background: BRAND.surface,
                }}
              >
                <div style={{ fontWeight: 700 }}>{x.t}</div>
                <div style={{ opacity: 0.8, fontSize: 13, marginTop: 6 }}>{x.d}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          marginTop: 24,
          padding: 16,
          borderTop: "1px solid rgba(0,0,0,0.06)",
          background: BRAND.surface,
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ opacity: 0.8, fontSize: 13, maxWidth: 700 }}>{t.footerNote}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => window.open(`/legal/privacy?lang=${lang}`, "_blank")}
              style={linkBtn}
            >
              {t.footer.privacy}
            </button>
            <button
              onClick={() => window.open(`/legal/terms?lang=${lang}`, "_blank")}
              style={linkBtn}
            >
              {t.footer.terms}
            </button>
            <button
              onClick={() => window.open(`/legal/complaints?lang=${lang}`, "_blank")}
              style={linkBtn}
            >
              {t.footer.complaints}
            </button>
            <FounderButton lang={lang} t={t} />
            <div style={{ width: 1, height: 16, background: "rgba(0,0,0,0.08)" }} />
            <span style={{ fontSize: 12, opacity: 0.8 }}>{t.footer.lang}:</span>
            <button
              onClick={() => setLang("en")}
              style={{
                ...pillBtn,
                background: lang === "en" ? "#ecfdf5" : BRAND.surface,
                borderColor: lang === "en" ? BRAND.primary : BRAND.ring,
                color: lang === "en" ? BRAND.primary : BRAND.text,
              }}
            >
              {t.footer.english}
            </button>
            <button
              onClick={() => setLang("ur")}
              style={{
                ...pillBtn,
                background: lang === "ur" ? "#ecfdf5" : BRAND.surface,
                borderColor: lang === "ur" ? BRAND.primary : BRAND.ring,
                color: lang === "ur" ? BRAND.primary : BRAND.text,
              }}
            >
              {t.footer.urdu}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------- Small UI helpers ----------
const linkBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 6,
  fontSize: 13,
  textDecoration: "underline",
};

const pillBtn: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 999,
  border: `1px solid ${BRAND.ring}`,
  background: BRAND.surface,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 12,
};

// Founder button → modal
const FounderButton: React.FC<{ lang: "en" | "ur"; t: I18n }> = ({ lang, t }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} style={linkBtn}>
        {t.footer.founder}
      </button>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.35)",
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 420,
              background: BRAND.surface,
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              padding: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: BRAND.primary }}>
                <BrandLogo /> {t.footer.founder}
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: 6, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>{t.founder.name}</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>{t.founder.title}</div>
              <div style={{ marginTop: 8 }}>
                <a href="mailto:help@rentback.app" style={{ textDecoration: "underline" }}>
                  {t.founder.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

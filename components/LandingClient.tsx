"use client";

import React, { useEffect, useMemo, useState } from "react";
import Logo from "@/components/Logo";

type Lang = "en" | "ur";
type Theme = "light" | "dark";

const COPY = {
  en: {
    title: "RentBack — Pay rent, earn rewards",
    desc: "Pakistan-focused rent payments with rewards.",
    nav: { why: "Why RentBack", how: "How it works", faq: "FAQ", signin: "Sign in" },
    hero: {
      h1: "Pay rent, earn rewards.",
      p: "Pay easily via bank transfer, card, or wallet. Landlords see clear incoming payments. Tenants earn perks with Pakistani brands.",
      ctaPrimary: "Sign in",
      ctaSecondary: "Learn more",
      demo: "Demo preview — no real payments processed.",
      cardTags: ["Pay", "Rewards", "Receipts"],
    },
    why: {
      title: "Why RentBack",
      cards: [
        { h: "Fast payments", p: "Bank transfer, card, or wallet in seconds." },
        { h: "Rewards", p: "Redeem perks with Pakistani brands." },
        { h: "Landlord visibility", p: "Clear view of incoming rent and receipts." },
      ],
      primary: "Create account",
      secondary: "See how it works",
    },
    how: {
      title: "How it works",
      steps: [
        { step: "Step 1", h: "Verify KYC", p: "Quick onboarding to unlock payments & rewards." },
        { step: "Step 2", h: "Pay rent", p: "Pay via bank transfer, card, or wallet — get receipts." },
        { step: "Step 3", h: "Earn & redeem", p: "Collect points and redeem perks on Pakistani brands." },
      ],
      primary: "Start now",
      secondary: "Read FAQ",
    },
    faq: {
      title: "FAQ",
      qas: [
        { q: "Is this live?", a: "This is a demo preview — no real payments are processed yet." },
        { q: "Where do I sign in?", a: "Use the “Sign in” button above to access the app." },
        { q: "Do landlords get receipts?", a: "Yes — tenants get receipts and landlords see clear payment status." },
        { q: "Are rewards in PK?", a: "Rewards catalogue focuses on Pakistani brands and utilities." },
      ],
      primary: "Create account",
      secondary: "Contact support",
    },
    footer: { privacy: "Privacy", founder: "Founder", terms: "Terms" },
    langToggle: "اردو",
    themeToggle: { light: "Light", dark: "Dark" },
  },
  ur: {
    title: "RentBack — کرایہ ادا کریں، انعامات پائیں",
    desc: "پاکستان کے لیے کرایہ ادائیگی اور انعامات۔",
    nav: { why: "کیوں RentBack", how: "کیسے کام کرتا ہے", faq: "سوالات", signin: "سائن اِن" },
    hero: {
      h1: "کرایہ ادا کریں، انعامات پائیں۔",
      p: "بینک ٹرانسفر، کارڈ یا والٹ سے آسان ادائیگی۔ مالکان کو آمدنی واضح نظر آتی ہے۔ کرایہ دار پاکستانی برانڈز پر پرکس حاصل کرتے ہیں۔",
      ctaPrimary: "سائن اِن",
      ctaSecondary: "مزید جانیں",
      demo: "ڈیمو پریویو — کوئی حقیقی ادائیگیاں پروسیس نہیں ہوتیں۔",
      cardTags: ["ادائیگی", "انعامات", "رسیدیں"],
    },
    why: {
      title: "کیوں RentBack",
      cards: [
        { h: "تیز ادائیگیاں", p: "بینک ٹرانسفر، کارڈ یا والٹ — چند سیکنڈز میں۔" },
        { h: "انعامات", p: "پاکستانی برانڈز پر پرکس ریڈیم کریں۔" },
        { h: "مالکان کے لیے وضاحت", p: "آنے والی ادائیگیوں اور رسیدوں کا واضح نظارہ۔" },
      ],
      primary: "اکاؤنٹ بنائیں",
      secondary: "یہ کیسے کام کرتا ہے",
    },
    how: {
      title: "کیسے کام کرتا ہے",
      steps: [
        { step: "قدم 1", h: "KYC کی توثیق", p: "تیز آن بورڈنگ — ادائیگیوں اور انعامات کے لیے۔" },
        { step: "قدم 2", h: "کرایہ ادا کریں", p: "بینک ٹرانسفر، کارڈ یا والٹ — رسید حاصل کریں۔" },
        { step: "قدم 3", h: "کمائیں اور ریڈیم کریں", p: "پوائنٹس کمائیں اور پاکستانی برانڈز پر ریڈیم کریں۔" },
      ],
      primary: "اب شروع کریں",
      secondary: "سوالات پڑھیں",
    },
    faq: {
      title: "سوالات",
      qas: [
        { q: "کیا یہ لائیو ہے؟", a: "یہ ڈیمو پریویو ہے — کوئی حقیقی ادائیگیاں نہیں ہوتیں۔" },
        { q: "میں کہاں سائن اِن کروں؟", a: "اوپر “سائن اِن” بٹن سے ایپ تک رسائی حاصل کریں۔" },
        { q: "کیا مالکان کو رسیدیں ملتی ہیں؟", a: "جی ہاں — کرایہ داروں کو رسیدیں اور مالکان کو واضح اسٹیٹس نظر آتا ہے۔" },
        { q: "کیا انعامات پاکستان میں ہیں؟", a: "انعامات کیٹلاگ پاکستانی برانڈز اور یوٹیلٹیز پر مرکوز ہے۔" },
      ],
      primary: "اکاؤنٹ بنائیں",
      secondary: "سپورٹ سے رابطہ",
    },
    footer: { privacy: "پرائیویسی", founder: "بانی", terms: "شرائط" },
    langToggle: "English",
    themeToggle: { light: "لائٹ", dark: "ڈارک" },
  },
} as const;

export default function LandingClient() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const savedLang = (localStorage.getItem("rb-lang") as Lang) || "en";
      setLang(savedLang);
    } catch {}
    try {
      const savedTheme =
        (localStorage.getItem("rb-theme") as Theme) ||
        (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      setTheme(savedTheme);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.setAttribute("lang", lang);
      root.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
      localStorage.setItem("rb-lang", lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.toggle("dark", theme === "dark");
      localStorage.setItem("rb-theme", theme);
    } catch {}
  }, [theme]);

  const t = useMemo(() => COPY[lang], [lang]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur">
        <div className="flex items-center gap-2"><Logo label="RentBack" /></div>
        <nav className="hidden sm:flex items-center gap-4 text-sm opacity-80">
          <a href="#why" className="hover:opacity-100">{t.nav.why}</a>
          <a href="#how" className="hover:opacity-100">{t.nav.how}</a>
          <a href="#faq" className="hover:opacity-100">{t.nav.faq}</a>
          <a href="/sign-in" className="inline-flex items-center rounded-lg px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700">{t.nav.signin}</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(p => p === "en" ? "ur" : "en")} className="text-xs border border-black/10 dark:border-white/20 rounded px-2 py-1">{t.langToggle}</button>
          <button onClick={() => setTheme(p => p === "light" ? "dark" : "light")} className="text-xs border border-black/10 dark:border-white/20 rounded px-2 py-1">
            {theme === "light" ? t.themeToggle.dark : t.themeToggle.light}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t.hero.h1}</h1>
              <p className="mt-4 text-base md:text-lg opacity-80">{t.hero.p}</p>
              <div className="mt-8 flex gap-3">
                <a href="/sign-in" className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700">{t.hero.ctaPrimary}</a>
                <a href="#why" className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">{t.hero.ctaSecondary}</a>
              </div>
              <div className="mt-4 text-xs opacity-70">{t.hero.demo}</div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-teal-400/10 to-transparent blur-xl" />
              <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6 shadow-[0_12px_40px_rgba(16,185,129,0.18)]">
                <div className="text-sm opacity-80">Virtual Card • PKR</div>
                <div className="mt-4 font-mono text-xl tracking-wider">**** **** **** 0007</div>
                <div className="mt-1 text-xs opacity-70">Exp 12/27 • RentBack</div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {t.hero.cardTags.map((text) => (
                    <div key={text} className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-sm">{text}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CTA: Why */}
        <section id="why" className="py-10">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-400/15 via-teal-300/10 to-transparent blur-xl" />
            <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Why RentBack</h2>
                <a href="/sign-in" className="hidden md:inline-flex items-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">{t.why.primary}</a>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {t.why.cards.map((c, i) => (
                  <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                    <div className="font-semibold mb-1">{c.h}</div>
                    <div className="text-sm opacity-80">{c.p}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/sign-in" className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700">{t.why.primary}</a>
                <a href="#how" className="inline-flex items-center rounded-xl px-5 py-3 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">{t.why.secondary}</a>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CTA: How */}
        <section id="how" className="py-10">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/15 via-emerald-300/10 to-transparent blur-xl" />
            <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">{t.how.title}</h2>
                <a href="/sign-in" className="hidden md:inline-flex items-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">{t.nav.signin}</a>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {t.how.steps.map((s, i) => (
                  <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                    <div className="text-sm opacity-70 mb-1">{s.step}</div>
                    <div className="font-semibold">{s.h}</div>
                    <div className="text-sm opacity-80 mt-1">{s.p}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/sign-in" className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700">{t.how.primary}</a>
                <a href="#faq" className="inline-flex items-center rounded-xl px-5 py-3 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">{t.how.secondary}</a>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CTA: FAQ */}
        <section id="faq" className="py-10">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-teal-400/15 via-emerald-300/10 to-transparent blur-xl" />
            <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">{t.faq.title}</h2>
                <a href="/sign-in" className="hidden md:inline-flex items-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">{t.nav.signin}</a>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {t.faq.qas.map((qa, i) => (
                  <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                    <div className="font-semibold mb-1">{qa.q}</div>
                    <div className="text-sm opacity-80">{qa.a}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/sign-in" className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700">{t.faq.primary}</a>
                <a href="mailto:help@rentback.app" className="inline-flex items-center rounded-xl px-5 py-3 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">{t.faq.secondary}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 py-10 border-t border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo label="RentBack" />
            <span className="text-xs opacity-70">© {new Date().getFullYear()}</span>
          </div>
          <div className="text-xs opacity-80 flex gap-4">
            <a href="/privacy">{t.footer.privacy}</a>
            <a href="/founder">{t.footer.founder}</a>
            <a href="/terms">{t.footer.terms}</a>
            <a href="mailto:help@rentback.app">help@rentback.app</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

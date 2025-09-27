"use client";

import React, { useEffect, useMemo, useState } from "react";
import Logo from "@/components/Logo";

type Lang = "en" | "ur";

const COPY = {
  en: {
    title: "Founder",
    byline: "Building RentBack for Pakistan",
    body:
      "Hi — I’m Suhail Ahmed. RentBack is a simple idea: make rent payments easy, transparent, and rewarding for tenants, while giving landlords clear visibility and faster reconciliation. We’re starting with bank transfer, card, and wallet flows, focused on Pakistani brands and rewards.",
    contact: "Contact",
    email: "Email",
    back: "Back to Home",
  },
  ur: {
    title: "بانی",
    byline: "پاکستان کے لیے RentBack کی تعمیر",
    body:
      "السلام علیکم — میں سہیل احمد ہوں۔ RentBack کا مقصد سادہ ہے: کرایہ داروں کے لیے ادائیگیاں آسان، شفاف اور انعامات کے ساتھ؛ اور مالکان کے لیے واضح منظر اور تیز ری کنسیلی ایشن۔ ہم بینک ٹرانسفر، کارڈ اور والٹ فلو سے شروع کر رہے ہیں، پاکستانی برانڈز اور انعامات پر فوکس کے ساتھ۔",
    contact: "رابطہ",
    email: "ای میل",
    back: "واپس ہوم پر",
  },
} as const;

export default function FounderPage() {
  const [lang, setLang] = useState<Lang>("en");
  // Read current <html lang> (set by landing page toggles or your layout)
  useEffect(() => {
    try {
      const htmlLang = document.documentElement.getAttribute("lang");
      if (htmlLang === "ur" || htmlLang === "en") setLang(htmlLang);
    } catch {}
  }, []);

  const t = useMemo(() => COPY[lang], [lang]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <Logo label="RentBack" />
          </a>
        </div>
        <nav className="text-sm opacity-80">
          <a href="/" className="hover:opacity-100">{t.back}</a>
        </nav>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h1>
        <div className="mt-2 text-base opacity-75">{t.byline}</div>

        <div className="mt-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
          <p className="leading-7">{t.body}</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <a
              href="mailto:help@rentback.app"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {t.contact}: help@rentback.app
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            >
              {t.back}
            </a>
          </div>
        </div>
      </main>

      {/* Footer (simple) */}
      <footer className="px-4 py-8 border-t border-black/10 dark:border-white/10">
        <div className="max-w-3xl mx-auto text-xs opacity-70 flex flex-wrap gap-4">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:help@rentback.app">help@rentback.app</a>
        </div>
      </footer>
    </div>
  );
}

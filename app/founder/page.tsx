"use client";

import React, { useEffect, useMemo, useState } from "react";
import Logo from "@/components/Logo";

type Lang = "en" | "ur";

const COPY = {
  en: {
    title: "Founder",
    name: "Suhail Ahmed",
    tag: "Building RentBack for Pakistan",
    blocks: [
      { h: "What we’re doing", p: "Make rent payments simple, transparent, and rewarding." },
      { h: "Focus", p: "Real tenants & landlords, Pakistani rails, clear receipts, useful rewards." },
    ],
    contact: "Contact",
    back: "Back",
  },
  ur: {
    title: "بانی",
    name: "سہیل احمد",
    tag: "پاکستان کے لیے RentBack",
    blocks: [
      { h: "ہم کیا کر رہے ہیں", p: "کرایہ ادائیگی کو آسان، شفاف اور انعاماتی بنانا۔" },
      { h: "فوکس", p: "حقیقی کرایہ دار و مالکان، پاکستانی چینلز، واضح رسیدیں، مفید انعامات۔" },
    ],
    contact: "رابطہ",
    back: "واپس",
  },
} as const;

export default function FounderPage() {
  const [lang, setLang] = useState<Lang>("en");
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
        <a href="/" className="flex items-center gap-2">
          <Logo label="RentBack" />
        </a>
        <a href="/" className="text-sm opacity-80 hover:opacity-100">{t.back}</a>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-2">
            {/* Simple monogram circle */}
            <div className="w-10 h-10 rounded-full grid place-items-center bg-emerald-600 text-white font-semibold">SA</div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t.title}</h1>
            <div className="text-sm opacity-75">{t.name} • {t.tag}</div>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {t.blocks.map((b, i) => (
            <div key={i} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
              <div className="font-semibold">{b.h}</div>
              <div className="text-sm opacity-80 mt-1">{b.p}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
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
      </main>

      {/* Footer */}
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

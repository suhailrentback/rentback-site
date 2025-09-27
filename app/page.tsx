// app/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const isLight = theme === "light";

  const t = {
    en: {
      title: "Turn rent into rewards.",
      blurb:
        "Pay rent simply (Raast, bank transfer, cards, wallets) and earn Pakistan-focused perks. Landlords get transparent incoming payments, statements, and faster reconciliations.",
      getStarted: "Get started",
      how: "How it works",
      signIn: "Sign in",
      built: "Built for Pakistan • EN/UR + RTL • Demo sandbox available",
      props: [
        {
          t: "Pay rent, earn rewards",
          d: "Raast, bank transfer, card, wallets — you choose. Earn points on eligible payments.",
        },
        {
          t: "Landlord visibility",
          d: "See incoming and outstanding payments with simple reconciliation and statements.",
        },
        {
          t: "SBP sandbox ready",
          d: "KYC-first flows, data minimization, and an audit-friendly ledger from day one.",
        },
      ],
    },
    ur: {
      title: "کرایہ انعامات میں بدلیں۔",
      blurb:
        "راست، بینک ٹرانسفر، کارڈز، یا والٹ سے آسان ادائیگی — اور پاکستان کے لیے منتخب انعامات حاصل کریں۔ مالکان کو آمدنی کی شفاف جھلک، اسٹیٹمنٹس، اور تیز ریکنسیلی ایشن ملتی ہے۔",
      getStarted: "شروع کریں",
      how: "کیسے کام کرتا ہے",
      signIn: "سائن اِن",
      built: "پاکستان کے لیے • EN/UR + RTL • ڈیمو سینڈ باکس",
      props: [
        {
          t: "کرایہ ادا کریں، انعامات پائیں",
          d: "راست، بینک ٹرانسفر، کارڈ، والٹ — آپ کی پسند۔ اہل ادائیگیوں پر پوائنٹس کمائیں۔",
        },
        {
          t: "مالک کے لیے وضاحت",
          d: "آنے والی اور بقیہ ادائیگیاں دیکھیں، سادہ ریکنسیلی ایشن اور اسٹیٹمنٹس کے ساتھ۔",
        },
        {
          t: "SBP سینڈ باکس تیار",
          d: "KYC-فرسٹ فلو، کم از کم ڈیٹا، اور آڈٹ فرینڈلی لیجر شروع دن سے۔",
        },
      ],
    },
  } as const;

  return (
    <html lang={lang} dir={lang === "ur" ? "rtl" : "ltr"}>
      <body
        className={
          isLight ? "min-h-screen bg-white text-slate-900" : "min-h-screen bg-[#0b0b0b] text-white"
        }
      >
        {/* Header */}
        <header
          className={
            "sticky top-0 z-30 h-14 flex items-center justify-between px-4 border-b " +
            (isLight ? "bg-white/85 backdrop-blur border-slate-200" : "bg-[#0b0b0bcc] backdrop-blur border-white/10")
          }
        >
          <div className="flex items-center gap-2 font-bold">
            <BrandLogo stroke={isLight ? "#059669" : "#34d399"} />
            <span className={isLight ? "text-emerald-600" : "text-emerald-400"}>
              RentBack
            </span>
          </div>
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}
              className={
                "px-3 py-1.5 rounded-lg text-sm border " +
                (isLight ? "border-slate-200 hover:bg-slate-50" : "border-white/10 hover:bg-white/5")
              }
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
            <button
              onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
              className={
                "px-3 py-1.5 rounded-lg text-sm border " +
                (isLight ? "border-slate-200 hover:bg-slate-50" : "border-white/10 hover:bg-white/5")
              }
            >
              {isLight ? "🌙 Dark" : "☀️ Light"}
            </button>
            <Link
              href="/sign-in"
              className={
                "px-3 py-1.5 rounded-lg text-sm " +
                (isLight
                  ? "border border-slate-200 hover:bg-slate-50"
                  : "border border-white/10 hover:bg-white/5")
              }
            >
              {t[lang].signIn}
            </Link>
            <Link
              href="/sign-in"
              className={
                "px-3 py-1.5 rounded-lg text-sm " +
                (isLight ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-emerald-600 hover:bg-emerald-700")
              }
            >
              {t[lang].getStarted}
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <main className="max-w-5xl mx-auto px-4">
          <section className="py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
                {t[lang].title}
              </h1>
              <p className="mt-4 text-base md:text-lg opacity-90">
                {t[lang].blurb}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/sign-in"
                  className={
                    "px-4 py-2 rounded-xl font-semibold " +
                    (isLight
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-emerald-600 hover:bg-emerald-700")
                  }
                >
                  {t[lang].getStarted}
                </Link>
                <a
                  href="#how-it-works"
                  className={
                    "px-4 py-2 rounded-xl font-semibold " +
                    (isLight
                      ? "border border-slate-200 hover:bg-slate-50"
                      : "border border-white/10 hover:bg-white/5")
                  }
                >
                  {t[lang].how}
                </a>
              </div>
              <div className="mt-4 text-xs opacity-70">{t[lang].built}</div>
            </div>

            {/* Card mock with old logo */}
            <div className="relative w-full max-w-[460px] h-[260px] rounded-2xl overflow-hidden border shadow-[0_20px_60px_rgba(5,150,105,0.20)] mx-auto rb-animated-bg"
                 style={{ borderColor: isLight ? "rgb(226 232 240)" : "rgba(255,255,255,0.1)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <BrandLogo stroke="#0f172a" />
                    RentBack
                  </div>
                  <span className="text-[12px] text-slate-900/90">
                    VIRTUAL • Debit
                  </span>
                </div>
                <div className="mt-auto font-mono tracking-wider">
                  <div className="text-[20px] font-semibold text-slate-900">
                    **** **** **** 0007
                  </div>
                  <div className="flex gap-5 mt-1 text-[12px] text-slate-900">
                    <span>Exp 12/27</span>
                    <span>PKR</span>
                  </div>
                </div>
              </div>
              <style>{`@keyframes rb-grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
              .rb-animated-bg{background:linear-gradient(120deg,#059669,#14b8a6,#34d399);background-size:200% 200%;animation:rb-grad 12s ease infinite}`}</style>
            </div>
          </section>

          {/* Value props */}
          <section id="how-it-works" className="py-12 grid md:grid-cols-3 gap-4">
            {t[lang].props.map((x) => (
              <div
                key={x.t}
                className={
                  "rounded-2xl p-4 border " +
                  (isLight ? "bg-white border-slate-200" : "bg-white/5 border-white/10")
                }
              >
                <div className="font-semibold">{x.t}</div>
                <div className="text-sm opacity-80 mt-1">{x.d}</div>
              </div>
            ))}
          </section>
        </main>

        <footer
          className={
            "mt-10 py-6 text-center text-sm " +
            (isLight ? "border-t border-slate-200 text-slate-600" : "border-t border-white/10 text-slate-400")
          }
        >
          © {new Date().getFullYear()} RentBack — All rights reserved.
        </footer>
      </body>
    </html>
  );
}

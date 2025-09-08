"use client";
import React from "react";

type Lang = "en" | "ur";
type Kind = "privacy" | "terms";

const COPY = {
  privacy: {
    en: {
      title: "Privacy Policy",
      updated: "Last updated",
      intro:
        "We handle your information under Pakistani law and relevant SBP directives. We collect only what’s needed to operate RentBack and improve the service.",
      what: "What we collect",
      whatList: [
        "Contact details (email, phone), city, language.",
        "Technical data (limited analytics if you consent).",
      ],
      how: "How we use it",
      howList: [
        "Waitlist and product updates you request.",
        "Service operations, fraud prevention, and support.",
      ],
      contact: "Contact",
      contactEmail: "help@rentback.app",
      print: "Print",
      langLabel: "Language",
      en: "English",
      ur: "اردو",
    },
    ur: {
      title: "پرائیویسی پالیسی",
      updated: "آخری اپڈیٹ",
      intro:
        "ہم آپ کی معلومات کو پاکستانی قوانین اور SBP ہدایات کے مطابق سنبھالتے ہیں۔ ہم صرف اتنا ڈیٹا اکٹھا کرتے ہیں جو RentBack چلانے اور بہتر بنانے کے لیے ضروری ہو۔",
      what: "ہم کیا جمع کرتے ہیں",
      whatList: [
        "رابطہ تفصیلات (ای میل، فون)، شہر، زبان۔",
        "تکنیکی معلومات (صرف آپ کی رضامندی سے محدود اینالیٹکس)۔",
      ],
      how: "ہم کیسے استعمال کرتے ہیں",
      howList: [
        "ویٹ لسٹ اور وہ پروڈکٹ اپڈیٹس جن کی آپ نے درخواست کی۔",
        "سروس آپریشنز، فراڈ سے بچاؤ، اور سپورٹ۔",
      ],
      contact: "رابطہ",
      contactEmail: "help@rentback.app",
      print: "پرنٹ",
      langLabel: "زبان",
      en: "English",
      ur: "اردو",
    },
  },
  terms: {
    en: {
      title: "Terms of Service",
      updated: "Last updated",
      intro:
        "These terms govern your use of the RentBack website and app in Pakistan.",
      use: "Use of service",
      useList: [
        "You agree to provide accurate information.",
        "You will comply with applicable Pakistani laws and SBP directives.",
      ],
      rewards: "Rewards",
      rewardsBody:
        "Points are not cash and can only be redeemed for listed rewards. Program terms may change.",
      contact: "Contact",
      contactEmail: "help@rentback.app",
      print: "Print",
      langLabel: "Language",
      en: "English",
      ur: "اردو",
    },
    ur: {
      title: "شرائطِ استعمال",
      updated: "آخری اپڈیٹ",
      intro:
        "یہ شرائط پاکستان میں RentBack ویب سائٹ اور ایپ کے استعمال پر لاگو ہیں۔",
      use: "سروس کا استعمال",
      useList: [
        "آپ درست معلومات فراہم کرنے پر متفق ہیں۔",
        "آپ پاکستانی قوانین اور SBP ہدایات کی پابندی کریں گے۔",
      ],
      rewards: "انعامات",
      rewardsBody:
        "پوائنٹس نقد نہیں ہوتے اور صرف درج شدہ انعامات پر ریڈیم کیے جا سکتے ہیں۔ پروگرام کی شرائط تبدیل ہو سکتی ہیں۔",
      contact: "رابطہ",
      contactEmail: "help@rentback.app",
      print: "پرنٹ",
      langLabel: "زبان",
      en: "English",
      ur: "اردو",
    },
  },
} as const;

export default function LegalText({ kind }: { kind: Kind }) {
  const [lang, setLang] = React.useState<Lang>("en");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("rb-lang") as Lang | null;
      if (saved === "ur" || saved === "en") setLang(saved);
      // reflect on <html>
      const root = document.documentElement;
      root.setAttribute("lang", lang === "ur" ? "ur" : "en");
      root.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    } catch {}
  }, []); // initial read only

  React.useEffect(() => {
    try {
      localStorage.setItem("rb-lang", lang);
      const root = document.documentElement;
      root.setAttribute("lang", lang === "ur" ? "ur" : "en");
      root.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    } catch {}
  }, [lang]);

  const t = COPY[kind][lang];
  const today = new Date().toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative">
      {/* tiny language toggle */}
      <div className="absolute right-0 -top-10 sm:-top-12 flex items-center gap-2 text-sm">
        <span className="text-gray-600 dark:text-gray-400">{t.langLabel}:</span>
        <div className="inline-flex overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 ${lang === "en" ? "bg-emerald-600 text-white" : "bg-white dark:bg-neutral-950"}`}
          >
            {t.en}
          </button>
          <button
            type="button"
            onClick={() => setLang("ur")}
            className={`px-3 py-1.5 ${lang === "ur" ? "bg-emerald-600 text-white" : "bg-white dark:bg-neutral-950"}`}
          >
            {t.ur}
          </button>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="ml-2 rounded-xl px-3 py-1.5 text-sm ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5"
        >
          {t.print}
        </button>
      </div>

      <h1>{t.title}</h1>
      <p>
        <em>
          {t.updated}: {today}
        </em>
      </p>

      <p>{t.intro}</p>

      {kind === "privacy" ? (
        <>
          <h2>{COPY.privacy[lang].what}</h2>
          <ul>
            {COPY.privacy[lang].whatList.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>

          <h2>{COPY.privacy[lang].how}</h2>
          <ul>
            {COPY.privacy[lang].howList.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>

          <h2>{COPY.privacy[lang].contact}</h2>
          <p>{COPY.privacy[lang].contactEmail}</p>
        </>
      ) : (
        <>
          <h2>{COPY.terms[lang].use}</h2>
          <ul>
            {COPY.terms[lang].useList.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>

          <h2>{COPY.terms[lang].rewards}</h2>
          <p>{COPY.terms[lang].rewardsBody}</p>

          <h2>{COPY.terms[lang].contact}</h2>
          <p>{COPY.terms[lang].contactEmail}</p>
        </>
      )}
    </section>
  );
}

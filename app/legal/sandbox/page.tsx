import type { Metadata } from "next";

export const dynamic = "force-static";

type SearchProps = { searchParams?: Record<string, string | string[] | undefined> };
type Lang = "en" | "ur";

const copy = {
  en: {
    title: "Regulatory Sandbox — RentBack",
    updated: "Last updated: 3 September 2025",
    intro:
      "Status and preparation notes for the State Bank of Pakistan (SBP) sandbox. This page summarizes where we are and what’s next.",
    sections: {
      prepTitle: "Preparation",
      prepItems: [
        "Materials complete (architecture, risk, partner outreach).",
        "Draft application ready.",
        "Compliance checklist mapped to SBP guidance.",
      ],
      nextTitle: "What’s next",
      nextItems: [
        "Confirm partner MOUs and finalize flows.",
        "Submit sandbox application in the next window.",
        "Tighten telemetry, logging, and audit trails.",
      ],
      contactTitle: "Contact",
      contact: "help@rentback.app",
    },
  },
  ur: {
    title: "ریگولیٹری سینڈ باکس — RentBack",
    updated: "آخری تازہ کاری: 3 ستمبر 2025",
    intro:
      "اسٹیٹ بینک آف پاکستان (SBP) کے سینڈ باکس کے لیے اسٹیٹس اور تیاری۔ یہ صفحہ ہماری پیش رفت اور اگلے اقدامات کا خلاصہ ہے۔",
    sections: {
      prepTitle: "تیاری",
      prepItems: [
        "مواد مکمل (آرکیٹیکچر، رسک، پارٹنر آؤٹ ریچ)۔",
        "ڈرافٹ درخواست تیار۔",
        "SBP ہدایات کے مطابق کمپلائنس چیک لسٹ تیار۔",
      ],
      nextTitle: "اگلے اقدامات",
      nextItems: [
        "پارٹنر MOUs کی توثیق اور فلو فائنلائز کریں۔",
        "اگلی ونڈو میں سینڈ باکس اپلیکیشن جمع کرائیں۔",
        "ٹیلی میٹری، لاگنگ، اور آڈٹ ٹریل مزید بہتر کریں۔",
      ],
      contactTitle: "رابطہ",
      contact: "help@rentback.app",
    },
  },
} as const;

export const metadata: Metadata = {
  title: "Regulatory Sandbox — RentBack",
  description: "SBP Sandbox preparation & updates.",
};

export default function Page({ searchParams }: SearchProps) {
  const lp = searchParams?.lang;
  const langParam = Array.isArray(lp) ? lp[0] : lp;
  const lang: Lang = langParam === "ur" ? "ur" : "en";
  const t = copy[lang];
  const dir: "ltr" | "rtl" = lang === "ur" ? "rtl" : "ltr";

  return (
    <main
      dir={dir}
      lang={lang}
      className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert"
    >
      <h1>{t.title}</h1>
      <p><em>{t.updated}</em></p>
      <p>{t.intro}</p>

      <h2>{t.sections.prepTitle}</h2>
      <ul>
        {t.sections.prepItems.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>

      <h2>{t.sections.nextTitle}</h2>
      <ul>
        {t.sections.nextItems.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>

      <h2>{t.sections.contactTitle}</h2>
      <p>{t.sections.contact}</p>
    </main>
  );
}

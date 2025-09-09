import type { Metadata } from "next";

export const dynamic = "force-static";

type PageSearchProps = { searchParams?: Record<string, string | string[] | undefined> };

const copy = {
  en: {
    title: "Privacy Policy — RentBack",
    updated: "Last updated: 3 September 2025",
    intro:
      "We handle your information under Pakistani law and relevant SBP directives. We collect only what’s needed to operate RentBack and improve the service.",
    sections: {
      collectTitle: "What we collect",
      collectItems: [
        "Contact details (email, phone), city, language.",
        "Technical data (limited analytics if you consent).",
      ],
      useTitle: "How we use it",
      useItems: [
        "Waitlist and product updates you request.",
        "Service operations, fraud prevention, and support.",
      ],
      contactTitle: "Contact",
      contact: "help@rentback.app",
    },
  },
  ur: {
    title: "پرائیویسی پالیسی — RentBack",
    updated: "آخری تازہ کاری: 3 ستمبر 2025",
    intro:
      "ہم آپ کی معلومات کو پاکستانی قانون اور متعلقہ SBP ہدایات کے تحت سنبھالتے ہیں۔ ہم صرف اتنا ڈیٹا اکٹھا کرتے ہیں جتنا سروس چلانے اور بہتر بنانے کے لیے ضروری ہو۔",
    sections: {
      collectTitle: "ہم کیا اکٹھا کرتے ہیں",
      collectItems: [
        "رابطہ تفصیلات (ای میل، فون)، شہر، زبان۔",
        "ٹیکنیکل ڈیٹا (صرف آپ کی رضامندی سے محدود اینالیٹکس)۔",
      ],
      useTitle: "ہم کیسے استعمال کرتے ہیں",
      useItems: [
        "ویٹ لسٹ اور پروڈکٹ اپڈیٹس جو آپ درخواست کریں۔",
        "سروس آپریشنز، فراڈ سے حفاظت، اور سپورٹ۔",
      ],
      contactTitle: "رابطہ",
      contact: "help@rentback.app",
    },
  },
} as const;

export const metadata: Metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack handles your data in Pakistan.",
};

export default function Page({ searchParams }: PageSearchProps) {
  const lp = searchParams?.lang;
  const lang = Array.isArray(lp) ? lp[0] : lp;
  const l = lang === "ur" ? "ur" : "en";
  const t = copy[l];
  const dir: "ltr" | "rtl" = l === "ur" ? "rtl" : "ltr";

  return (
    <main
      dir={dir}
      lang={l}
      className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert"
    >
      <h1>{t.title}</h1>
      <p>
        <em>{t.updated}</em>
      </p>
      <p>{t.intro}</p>

      <h2>{t.sections.collectTitle}</h2>
      <ul>
        {t.sections.collectItems.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>

      <h2>{t.sections.useTitle}</h2>
      <ul>
        {t.sections.useItems.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>

      <h2>{t.sections.contactTitle}</h2>
      <p>{t.sections.contact}</p>
    </main>
  );
}

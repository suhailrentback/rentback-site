import type { Metadata } from "next";

export const dynamic = "force-static";

type TermsSearchProps = { searchParams?: Record<string, string | string[] | undefined> };

const copy = {
  en: {
    title: "Terms of Service — RentBack",
    updated: "Last updated: 3 September 2025",
    intro:
      "These Terms govern your access to and use of RentBack. By using the service, you agree to these Terms.",
    sections: {
      useTitle: "Use of Service",
      useItems: [
        "You must provide accurate information and comply with applicable laws of Pakistan.",
        "You will not misuse the service, attempt unauthorized access, or interfere with operations.",
      ],
      paymentsTitle: "Payments & Rewards",
      paymentsItems: [
        "Payments are facilitated via licensed partners; demo mode does not move real funds.",
        "Rewards redemptions are subject to availability and partner terms.",
      ],
      legalTitle: "Legal",
      legalItems: [
        "These Terms are governed by the laws of Pakistan.",
        "We may update these Terms; continued use means acceptance of changes.",
      ],
      contactTitle: "Contact",
      contact: "help@rentback.app",
    },
  },
  ur: {
    title: "شرائطِ استعمال — RentBack",
    updated: "آخری تازہ کاری: 3 ستمبر 2025",
    intro:
      "یہ شرائط RentBack تک رسائی اور استعمال کو ریگولیٹ کرتی ہیں۔ سروس استعمال کرنے سے آپ ان شرائط سے اتفاق کرتے ہیں۔",
    sections: {
      useTitle: "سروس کا استعمال",
      useItems: [
        "آپ درست معلومات فراہم کریں گے اور پاکستان کے قابل اطلاق قوانین کی پابندی کریں گے۔",
        "آپ سروس کا غلط استعمال، غیر مجاز رسائی کی کوشش، یا آپریشنز میں مداخلت نہیں کریں گے۔",
      ],
      paymentsTitle: "ادائیگیاں اور انعامات",
      paymentsItems: [
        "ادائیگیاں لائسنس یافتہ پارٹنرز کے ذریعے انجام پاتی ہیں؛ ڈیمو موڈ میں حقیقی رقم منتقل نہیں ہوتی۔",
        "انعامات ریڈیمپشن دستیابی اور پارٹنر کی شرائط کے تابع ہیں۔",
      ],
      legalTitle: "قانونی",
      legalItems: [
        "یہ شرائط پاکستان کے قوانین کے تحت ہیں۔",
        "ہم ان شرائط کو اپ ڈیٹ کر سکتے ہیں؛ سروس کے مسلسل استعمال کا مطلب تبدیلیوں کی قبولیت ہے۔",
      ],
      contactTitle: "رابطہ",
      contact: "help@rentback.app",
    },
  },
} as const;

export const metadata: Metadata = {
  title: "Terms of Service — RentBack",
  description: "The rules for using RentBack.",
};

export default function Page({ searchParams }: TermsSearchProps) {
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

      <h2>{t.sections.useTitle}</h2>
      <ul>
        {t.sections.useItems.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>

      <h2>{t.sections.paymentsTitle}</h2>
      <ul>
        {t.sections.paymentsItems.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>

      <h2>{t.sections.legalTitle}</h2>
      <ul>
        {t.sections.legalItems.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>

      <h2>{t.sections.contactTitle}</h2>
      <p>{t.sections.contact}</p>
    </main>
  );
}

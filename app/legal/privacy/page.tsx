export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const lang = (searchParams?.lang === "ur" ? "ur" : "en") as "en" | "ur";
  const dir = lang === "ur" ? "rtl" : "ltr";

  const t = {
    en: {
      title: "Privacy Policy",
      updated: "Last updated",
      intro:
        "We handle your information under Pakistani law and relevant State Bank of Pakistan (SBP) directives. This policy explains what we collect, how we use it, and your choices.",
      sections: [
        {
          h: "What we collect",
          p: "Contact details (email, phone), basic usage analytics (if you consent), and operational data to provide the service.",
        },
        {
          h: "How we use data",
          p: "To run the waitlist and app, prevent abuse, comply with regulation, and improve products. We never sell your data.",
        },
        {
          h: "Sharing",
          p: "We may share data with licensed payment partners and processors strictly for operations and compliance.",
        },
        {
          h: "Retention & deletion",
          p: "We keep data only as long as needed for operations and legal requirements. You can request deletion at help@rentback.app.",
        },
        {
          h: "Contact",
          p: "Email help@rentback.app for privacy questions.",
        },
      ],
    },
    ur: {
      title: "پرائیویسی پالیسی",
      updated: "آخری اپ ڈیٹ",
      intro:
        "ہم آپ کی معلومات کو پاکستانی قوانین اور اسٹیٹ بینک آف پاکستان (SBP) کی متعلقہ ہدایات کے مطابق سنبھالتے ہیں۔ یہ پالیسی بتاتی ہے کہ ہم کیا جمع کرتے ہیں، کیسے استعمال کرتے ہیں، اور آپ کے اختیارات کیا ہیں۔",
      sections: [
        {
          h: "ہم کیا جمع کرتے ہیں",
          p: "رابطہ تفصیلات (ای میل، فون)، بنیادی استعمال کی اینالیٹکس (اگر آپ رضامند ہوں)، اور سروس کے لیے درکار آپریشنل ڈیٹا۔",
        },
        {
          h: "استعمال کیسے ہوتا ہے",
          p: "ویٹ لسٹ اور ایپ چلانے، غلط استعمال سے بچاؤ، ضوابط کی پابندی، اور پروڈکٹ بہتر بنانے کے لیے۔ ہم آپ کا ڈیٹا فروخت نہیں کرتے۔",
        },
        {
          h: "اشتراک",
          p: "لائسنس یافتہ ادائیگی پارٹنرز اور پروسیسرز کے ساتھ صرف آپریشنز اور کمپلائنس کے لیے شیئر کیا جا سکتا ہے۔",
        },
        {
          h: "محفوظی مدت اور حذف",
          p: "ڈیٹا اتنی مدت تک رکھا جاتا ہے جتنی آپریشن اور قانونی تقاضوں کے لیے ضروری ہو۔ حذف کی درخواست help@rentback.app پر کریں۔",
        },
        {
          h: "رابطہ",
          p: "پرائیویسی سے متعلق سوالات کے لیے help@rentback.app پر ای میل کریں۔",
        },
      ],
    },
  }[lang];

  return (
    <article dir={dir}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>{t.title}</h1>
      <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>
        {t.updated}: {new Date().toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", { year: "numeric", month: "long", day: "numeric" })}
      </div>
      <p style={{ lineHeight: 1.7, marginBottom: 12 }}>{t.intro}</p>
      {t.sections.map((s, i) => (
        <section key={i} style={{ marginTop: 14 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 6 }}>{s.h}</h2>
          <p style={{ lineHeight: 1.7 }}>{s.p}</p>
        </section>
      ))}
    </article>
  );
}

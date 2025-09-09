export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const lang = (searchParams?.lang === "ur" ? "ur" : "en") as "en" | "ur";
  const dir = lang === "ur" ? "rtl" : "ltr";

  const t = {
    en: {
      title: "Terms of Service",
      updated: "Last updated",
      intro:
        "These terms govern your use of RentBack’s website and app in Pakistan. By using the service, you agree to these terms.",
      sections: [
        { h: "Eligibility", p: "You must be legally able to enter contracts in Pakistan." },
        { h: "Accounts", p: "Keep your account details secure and accurate." },
        {
          h: "Payments",
          p: "Payments are processed via licensed partners. Demo flows in the app do not move real funds.",
        },
        {
          h: "Rewards",
          p: "Points are not cash, have no monetary value, and can be redeemed only for listed rewards under Rewards T&Cs.",
        },
        {
          h: "Liability",
          p: "To the extent allowed by law, RentBack is not liable for indirect or consequential losses.",
        },
        { h: "Contact", p: "For any questions, email help@rentback.app." },
      ],
    },
    ur: {
      title: "شرائطِ استعمال",
      updated: "آخری اپ ڈیٹ",
      intro:
        "یہ شرائط پاکستان میں RentBack کی ویب سائٹ اور ایپ کے استعمال پر لاگو ہیں۔ سروس استعمال کرنے سے آپ ان شرائط سے اتفاق کرتے ہیں۔",
      sections: [
        { h: "اہلیت", p: "پاکستان میں قانونی طور پر معاہدہ کرنے کے قابل ہونا ضروری ہے۔" },
        { h: "اکاؤنٹس", p: "اپنی اکاؤنٹ تفصیلات درست اور محفوظ رکھیں۔" },
        {
          h: "ادائیگیاں",
          p: "ادائیگیاں لائسنس یافتہ پارٹنرز کے ذریعے ہوتی ہیں۔ ایپ میں ڈیمو فلو میں حقیقی رقم منتقل نہیں ہوتی۔",
        },
        {
          h: "ریوارڈز",
          p: "پوائنٹس نقد نہیں ہوتے، ان کی مالی قدر نہیں، اور صرف درج شدہ انعامات پر ریڈیم کیے جا سکتے ہیں (ریوارڈز کی شرائط کے مطابق)۔",
        },
        {
          h: "ذمہ داری",
          p: "قانونی حد تک RentBack غیر مستقیم یا نتائجی نقصانات کا ذمہ دار نہیں۔",
        },
        { h: "رابطہ", p: "سوالات کے لیے help@rentback.app پر ای میل کریں۔" },
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

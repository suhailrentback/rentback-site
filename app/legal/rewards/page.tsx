export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const lang = (searchParams?.lang === "ur" ? "ur" : "en") as "en" | "ur";
  const dir = lang === "ur" ? "rtl" : "ltr";

  const t = {
    en: {
      title: "Rewards Terms & Conditions",
      updated: "Last updated",
      bullets: [
        "Points are promotional and not cash; no cash-out.",
        "Points expire; we may change earn/burn rates.",
        "Fraud or abuse can lead to forfeiture.",
        "Redemptions may be fulfilled via third-party partners.",
        "We may modify these terms with notice.",
      ],
    },
    ur: {
      title: "ریوارڈز کی شرائط",
      updated: "آخری اپ ڈیٹ",
      bullets: [
        "پوائنٹس تشہیری ہیں، نقد نہیں؛ نقد نکالنا ممکن نہیں۔",
        "پوائنٹس کی مدت ختم ہو سکتی ہے؛ کمائی/خرچ کے ریٹس بدل سکتے ہیں۔",
        "فراڈ یا غلط استعمال کی صورت میں پوائنٹس ضبط ہو سکتے ہیں۔",
        "ریڈیمپشن تیسرے فریق پارٹنرز کے ذریعے مکمل ہو سکتی ہے۔",
        "ہم نوٹس کے ساتھ ان شرائط میں تبدیلی کر سکتے ہیں۔",
      ],
    },
  }[lang];

  return (
    <article dir={dir}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>{t.title}</h1>
      <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>
        {t.updated}: {new Date().toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", { year: "numeric", month: "long", day: "numeric" })}
      </div>
      <ul style={{ lineHeight: 1.8, paddingInlineStart: 18 }}>
        {t.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

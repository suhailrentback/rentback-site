export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const lang = (searchParams?.lang === "ur" ? "ur" : "en") as "en" | "ur";
  const dir = lang === "ur" ? "rtl" : "ltr";

  const t = {
    en: {
      title: "SBP Regulatory Sandbox Status",
      body:
        "Preparation is complete (materials & partner outreach). Draft application is ready. We’re awaiting the next submission window.",
      list: [
        "Use of licensed PSO/PSP/EMI partners",
        "Data protection controls defined",
        "Testing plan & risk register prepared",
      ],
    },
    ur: {
      title: "SBP ریگولیٹری سینڈ باکس اسٹیٹس",
      body:
        "تیاری مکمل (مواد اور پارٹنر آؤٹ ریچ)۔ ڈرافٹ درخواست تیار۔ اگلی سبمیشن ونڈو کا انتظار ہے۔",
      list: [
        "لائسنس یافتہ PSO/PSP/EMI پارٹنرز کا استعمال",
        "ڈیٹا پروٹیکشن کنٹرولز متعین",
        "ٹیسٹنگ پلان اور رسک رجسٹر تیار",
      ],
    },
  }[lang];

  return (
    <article dir={dir}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>{t.title}</h1>
      <p style={{ lineHeight: 1.7 }}>{t.body}</p>
      <ul style={{ marginTop: 12, lineHeight: 1.8, paddingInlineStart: 18 }}>
        {t.list.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </article>
  );
}

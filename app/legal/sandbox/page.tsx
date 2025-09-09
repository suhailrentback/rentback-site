type PageProps = { searchParams?: { [k: string]: string | string[] | undefined } };
type Lang = "en" | "ur";

const t = {
  en: {
    title: "SBP Sandbox Status",
    points: [
      "Preparation complete (materials & partner outreach).",
      "Draft application ready.",
      "Awaiting sandbox submission window.",
    ],
  },
  ur: {
    title: "SBP سینڈ باکس اسٹیٹس",
    points: [
      "تیاری مکمل (مواد اور پارٹنر آؤٹ ریچ)۔",
      "ڈرافٹ درخواست تیار۔",
      "سینڈ باکس جمع کرانے کی ونڈو کا انتظار۔",
    ],
  },
};

export default function SandboxPage({ searchParams }: PageProps) {
  const lang = (searchParams?.lang === "ur" ? "ur" : "en") as Lang;
  const dir = lang === "ur" ? "rtl" : "ltr";
  const c = t[lang];
  return (
    <div dir={dir}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{c.title}</h1>
      <ul style={{ paddingInlineStart: 18, lineHeight: 1.7 }}>
        {c.points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  );
}

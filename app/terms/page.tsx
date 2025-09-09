// Server component
export const dynamic = "force-static";

type Lang = "en" | "ur";
function getLang(sp?: { [k: string]: string | string[] | undefined }): Lang {
  const v = (sp?.lang ?? "en");
  const s = Array.isArray(v) ? v[0] : v;
  return s === "ur" ? "ur" : "en";
}

const t = {
  en: { title: "Terms of Service" },
  ur: { title: "شرائطِ استعمال" },
} as const;

export default function Page({ searchParams }: { searchParams?: { [k: string]: string | string[] | undefined } }) {
  const lang = getLang(searchParams);
  const dir = lang === "ur" ? "rtl" : "ltr";
  return (
    <main dir={dir} className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <h1>{t[lang].title} — RentBack</h1>
      <p>{lang === "en"
        ? "Demo-only product preview. No real funds move. By using this preview, you agree to the limitations described."
        : "یہ صرف ڈیمو پیشکش ہے؛ حقیقی رقوم منتقل نہیں ہوتیں۔ اس پری ویو کے استعمال سے آپ مذکورہ حدود سے اتفاق کرتے ہیں۔"}
      </p>
      <h2>{lang === "en" ? "Acceptable Use" : "قابلِ قبول استعمال"}</h2>
      <ul>
        <li>{lang === "en" ? "No unlawful activity or abuse." : "غیر قانونی سرگرمی یا غلط استعمال ممنوع۔"}</li>
        <li>{lang === "en" ? "Provide accurate info in forms." : "فارمز میں درست معلومات فراہم کریں۔"}</li>
      </ul>
    </main>
  );
}

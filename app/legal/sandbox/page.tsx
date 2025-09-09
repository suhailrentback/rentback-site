// Server component
export const dynamic = "force-static";

type Lang = "en" | "ur";
function getLang(sp?: { [k: string]: string | string[] | undefined }): Lang {
  const v = (sp?.lang ?? "en");
  const s = Array.isArray(v) ? v[0] : v;
  return s === "ur" ? "ur" : "en";
}

export default function Page({ searchParams }: { searchParams?: { [k: string]: string | string[] | undefined } }) {
  const lang = getLang(searchParams);
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <main dir={dir} className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <h1>{lang === "en" ? "Regulatory Sandbox Status" : "ریگولیٹری سینڈ باکس اسٹیٹس"}</h1>
      <ul>
        <li>{lang === "en" ? "Preparation complete (materials & partner outreach)" : "تیاری مکمل (سامان اور پارٹنر آؤٹ ریچ)"}</li>
        <li>{lang === "en" ? "Draft application ready" : "ڈرافٹ درخواست تیار"}</li>
        <li>{lang === "en" ? "Awaiting sandbox submission window" : "سینڈ باکس جمع کرانے کی ونڈو کا انتظار"}</li>
      </ul>
    </main>
  );
}

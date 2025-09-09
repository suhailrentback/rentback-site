// Server component (no "use client")
export const dynamic = "force-static";

type Lang = "en" | "ur";
function getLang(sp?: { [k: string]: string | string[] | undefined }): Lang {
  const v = (sp?.lang ?? "en");
  const s = Array.isArray(v) ? v[0] : v;
  return s === "ur" ? "ur" : "en";
}

const t = {
  en: { title: "Privacy Policy", updated: "Last updated", contact: "Contact", email: "help@rentback.app" },
  ur: { title: "پرائیویسی پالیسی", updated: "آخری اپ ڈیٹ", contact: "رابطہ", email: "help@rentback.app" },
} as const;

export default function Page({ searchParams }: { searchParams?: { [k: string]: string | string[] | undefined } }) {
  const lang = getLang(searchParams);
  const L = t[lang];
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <main dir={dir} className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <h1>{L.title} — RentBack</h1>
      <p><em>{L.updated}: 9 Sep 2025</em></p>
      <p>{lang === "en"
        ? "We collect only what’s needed to operate RentBack and improve the service. We comply with Pakistani law and relevant SBP guidance."
        : "ہم صرف وہی معلومات اکٹھی کرتے ہیں جو RentBack چلانے اور سروس بہتر بنانے کے لیے درکار ہو۔ پاکستانی قانون اور متعلقہ اسٹیٹ بینک ہدایات کی پابندی کی جاتی ہے۔"}
      </p>

      <h2>{lang === "en" ? "What we collect" : "ہم کیا اکٹھا کرتے ہیں"}</h2>
      <ul>
        <li>{lang === "en" ? "Contact details (email, phone), city, language." : "رابطہ تفصیل (ای میل، فون)، شہر، زبان۔"}</li>
        <li>{lang === "en" ? "Technical data (limited analytics if you consent)." : "تکنیکی ڈیٹا (آپ کی اجازت سے محدود اینالیٹکس)۔"}</li>
      </ul>

      <h2>{lang === "en" ? "How we use it" : "استعمال کیسے ہوتا ہے"}</h2>
      <ul>
        <li>{lang === "en" ? "Waitlist and product updates you request." : "ویٹ لسٹ اور پروڈکٹ اپ ڈیٹس جو آپ مانگیں۔"}</li>
        <li>{lang === "en" ? "Service operations, fraud prevention, and support." : "سروس آپریشنز، فراڈ کی روک تھام، اور سپورٹ۔"}</li>
      </ul>

      <h2>{L.contact}</h2>
      <p>{L.email}</p>
    </main>
  );
}

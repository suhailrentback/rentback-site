type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

type Lang = "en" | "ur";

const t = {
  en: {
    title: "Terms of Service",
    effective: "Effective:",
    intro:
      "Welcome to RentBack. By accessing or using our products, you agree to these Terms.",
    sections: [
      {
        h: "1) Eligibility & Account",
        p: [
          "You must be legally able to enter a contract under Pakistani law.",
          "KYC/identity checks may be required to access certain features and limits.",
        ],
      },
      {
        h: "2) Payments & Rewards (Demo)",
        p: [
          "The current app preview simulates payments and rewards; no real funds move.",
          "Live services, when enabled, will be provided via licensed partners and subject to their terms.",
        ],
      },
      {
        h: "3) Acceptable Use",
        p: [
          "No illegal activity, fraud, or infringement.",
          "Do not attempt to circumvent controls or misuse the platform.",
        ],
      },
      {
        h: "4) Liability",
        p: [
          "To the extent permitted by law, RentBack is not liable for indirect or consequential losses.",
          "Nothing limits liability that cannot be limited by law.",
        ],
      },
      {
        h: "5) Changes",
        p: ["We may update these Terms; continued use means acceptance of the changes."],
      },
      {
        h: "6) Governing Law",
        p: ["These Terms are governed by the laws of Pakistan."],
      },
      {
        h: "7) Contact",
        p: ["help@rentback.app"],
      },
    ],
  },
  ur: {
    title: "شرائطِ استعمال",
    effective: "موثر تاریخ:",
    intro:
      "RentBack میں خوش آمدید۔ ہماری مصنوعات استعمال کرنے سے آپ ان شرائط کو قبول کرتے ہیں۔",
    sections: [
      {
        h: "1) اہلیت اور اکاؤنٹ",
        p: [
          "آپ پاکستانی قانون کے تحت معاہدہ کرنے کے اہل ہوں۔",
          "بعض فیچرز/حدود کے لیے KYC یا شناختی تصدیق درکار ہو سکتی ہے۔",
        ],
      },
      {
        h: "2) ادائیگیاں اور انعامات (ڈیمو)",
        p: [
          "موجودہ ایپ پری ویو میں ادائیگیاں/انعامات کی نقل بنتی ہے؛ حقیقی رقم منتقل نہیں ہوتی۔",
          "لائیو سروسز فعال ہونے پر لائسنس یافتہ پارٹنرز کے ذریعے فراہم ہوں گی اور ان کی شرائط لاگو ہوں گی۔",
        ],
      },
      {
        h: "3) قابلِ قبول استعمال",
        p: [
          "غیر قانونی سرگرمی، فراڈ یا خلاف ورزی ممنوع ہے۔",
          "کنٹرولز سے بچنے یا پلیٹ فارم کے غلط استعمال کی کوشش نہ کریں۔",
        ],
      },
      {
        h: "4) ذمہ داری",
        p: [
          "قانون کے مطابق، RentBack بالواسطہ یا بالاثبات نقصانات کا ذمہ دار نہیں ہوگا۔",
          "ایسی ذمہ داری محدود نہیں کی جائے گی جو قانوناً محدود نہیں کی جا سکتی۔",
        ],
      },
      {
        h: "5) تبدیلیاں",
        p: ["ہم ان شرائط کو اپ ڈیٹ کر سکتے ہیں؛ استعمال جاری رکھنے کا مطلب قبولیت ہے۔"],
      },
      {
        h: "6) نافذ قانون",
        p: ["یہ شرائط پاکستان کے قوانین کے تحت ہیں۔"],
      },
      {
        h: "7) رابطہ",
        p: ["help@rentback.app"],
      },
    ],
  },
};

export default function TermsPage({ searchParams }: PageProps) {
  const lang = (searchParams?.lang === "ur" ? "ur" : "en") as Lang;
  const dir = lang === "ur" ? "rtl" : "ltr";
  const c = t[lang];

  return (
    <div dir={dir}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{c.title}</h1>
      <div style={{ opacity: 0.7, fontSize: 13, marginBottom: 14 }}>
        {c.effective} 01 Oct 2025
      </div>
      <p style={{ lineHeight: 1.7, marginBottom: 16 }}>{c.intro}</p>

      <div style={{ display: "grid", gap: 16 }}>
        {c.sections.map((s, i) => (
          <section key={i} style={{ padding: 12, borderRadius: 12, background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontWeight: 700, marginBottom: 6 }}>{s.h}</h2>
            <ul style={{ paddingInlineStart: 18, lineHeight: 1.7 }}>
              {s.p.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

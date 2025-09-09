type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

type Lang = "en" | "ur";

const t = {
  en: {
    title: "Privacy Policy",
    effective: "Effective:",
    intro:
      "This Privacy Policy explains how RentBack collects, uses, and protects your information. We operate in Pakistan and may work with licensed payment partners and KYC service providers.",
    sections: [
      {
        h: "1) Information We Collect",
        p: [
          "Identity data (e.g., name, CNIC details if required for KYC, contact information).",
          "Usage data (app interactions, device/browser, approximate location, referral UTM).",
          "Payment and rewards metadata (no full card PAN is stored by us).",
        ],
      },
      {
        h: "2) How We Use Information",
        p: [
          "To provide rent payments, rewards, support, and fraud prevention.",
          "To comply with local laws and partner requirements (e.g., SBP sandbox participation).",
          "To improve product performance and user experience.",
        ],
      },
      {
        h: "3) Sharing",
        p: [
          "With licensed payment partners and KYC providers to process transactions and verification.",
          "With service providers (cloud, analytics) under contracts that protect your data.",
          "If required by law, regulation, or legal process.",
        ],
      },
      {
        h: "4) Retention & Deletion",
        p: [
          "We retain data for as long as needed for legal, regulatory, and product purposes.",
          "You may request deletion; we will honor it within legal/regulatory limits.",
        ],
      },
      {
        h: "5) Security",
        p: [
          "Encryption in transit, least-privilege access, audit logging in scope.",
          "Sensitive payments are handled by licensed partners; we avoid storing full PAN.",
        ],
      },
      {
        h: "6) Your Rights",
        p: [
          "You may access, correct, or request deletion of your data, subject to law.",
          "Contact us at help@rentback.app.",
        ],
      },
      {
        h: "7) International Transfers",
        p: [
          "Your data may be processed in or outside Pakistan by our vendors subject to safeguards.",
        ],
      },
      {
        h: "8) Changes",
        p: [
          "We may update this policy. Material changes will be posted on this page.",
        ],
      },
      {
        h: "9) Contact",
        p: ["Email: help@rentback.app"],
      },
    ],
  },
  ur: {
    title: "پرائیویسی پالیسی",
    effective: "موثر تاریخ:",
    intro:
      "یہ پرائیویسی پالیسی واضح کرتی ہے کہ RentBack آپ کی معلومات کیسے جمع، استعمال اور محفوظ کرتا ہے۔ ہم پاکستان میں کام کرتے ہیں اور لائسنس یافتہ پیمنٹ پارٹنرز اور KYC سروس فراہم کنندگان کے ساتھ کام کر سکتے ہیں۔",
    sections: [
      {
        h: "1) ہم کون سی معلومات اکٹھی کرتے ہیں",
        p: [
          "شناختی معلومات (نام، CNIC کی تفصیلات اگر KYC کے لیے ضروری ہو، رابطہ معلومات)۔",
          "استعمال سے متعلق معلومات (ایپ میں سرگرمیاں، ڈیوائس/براؤزر، تخمینی لوکیشن، ریفرل UTM)۔",
          "ادائیگی اور انعامات سے متعلق میٹا ڈیٹا (ہم مکمل کارڈ PAN محفوظ نہیں کرتے)۔",
        ],
      },
      {
        h: "2) معلومات کا استعمال",
        p: [
          "کرایہ ادائیگی، انعامات، مدد اور فراڈ سے بچاؤ کے لیے۔",
          "مقامی قوانین اور پارٹنر تقاضوں (جیسے SBP سینڈ باکس) کی تعمیل کے لیے۔",
          "مصنوعات کی کارکردگی اور صارف تجربہ بہتر بنانے کے لیے۔",
        ],
      },
      {
        h: "3) شیئرنگ",
        p: [
          "لائسنس یافتہ پیمنٹ پارٹنرز اور KYC فراہم کنندگان کے ساتھ لین دین اور تصدیق کے لیے۔",
          "سروس فراہم کنندگان (کلاؤڈ، اینالیٹکس) کے ساتھ ایسے معاہدوں کے تحت جو آپ کے ڈیٹا کا تحفظ کریں۔",
          "قانون، ضابطے یا قانونی تقاضے کی صورت میں۔",
        ],
      },
      {
        h: "4) برقرار رکھنا اور حذف",
        p: [
          "قانونی، ریگولیٹری اور مصنوعات کے مقاصد کے لیے ضروری عرصے تک ڈیٹا محفوظ رکھا جاتا ہے۔",
          "آپ حذف کرنے کی درخواست کر سکتے ہیں؛ قانونی حدود کے مطابق کاروائی کی جائے گی۔",
        ],
      },
      {
        h: "5) سکیورٹی",
        p: [
          "ترسیل کے دوران انکرپشن، محدود رسائی، اور آڈٹ لاگنگ۔",
          "حساس ادائیگیاں لائسنس یافتہ پارٹنرز کے ذریعے؛ مکمل PAN ہم محفوظ نہیں کرتے۔",
        ],
      },
      {
        h: "6) آپ کے حقوق",
        p: [
          "آپ اپنی معلومات تک رسائی، درستگی یا حذف کی درخواست کر سکتے ہیں (قانون کے مطابق)۔",
          "رابطہ: help@rentback.app",
        ],
      },
      {
        h: "7) بین الاقوامی منتقلی",
        p: [
          "آپ کا ڈیٹا پاکستان کے اندر یا باہر ہمارے وینڈرز کے ذریعے حفاظتی انتظامات کے ساتھ پروسیس ہو سکتا ہے۔",
        ],
      },
      {
        h: "8) تبدیلیاں",
        p: [
          "ہم وقتاً فوقتاً اس پالیسی کو اپ ڈیٹ کر سکتے ہیں؛ اہم تبدیلیاں اسی صفحے پر شائع کی جائیں گی۔",
        ],
      },
      {
        h: "9) رابطہ",
        p: ["ای میل: help@rentback.app"],
      },
    ],
  },
};

export default function PrivacyPage({ searchParams }: PageProps) {
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

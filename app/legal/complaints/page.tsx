// app/legal/complaints/page.tsx
type PageProps = { searchParams?: { [key: string]: string | string[] | undefined } };
type Lang = "en" | "ur";

const t = {
  en: {
    title: "Complaints & Grievances",
    updated: "Last updated",
    intro:
      "We take complaints seriously. Please use the steps below so we can resolve your issue quickly.",
    stepsTitle: "How to complain",
    steps: [
      "Email us at help@rentback.app with a clear subject (e.g., “Card charge dispute”). Include your name, phone, and any reference numbers.",
      "We will acknowledge your complaint within 2 business days and provide a tracking reference.",
      "We aim to resolve most issues within 7–10 business days. Complex cases may take longer; we will keep you informed.",
      "If you are not satisfied with our response, you may escalate to our compliance contact listed in the acknowledgement email.",
    ],
    dataTitle: "What to include",
    data: [
      "Your full name and the phone/email registered with RentBack.",
      "Description of the issue, dates, amounts, and screenshots if applicable.",
      "Any bank / wallet references (IBAN, transaction IDs) if related.",
    ],
    regulatoryTitle: "Regulatory note (Pakistan)",
    regulatoryBody:
      "RentBack is preparing an application to the State Bank of Pakistan Regulatory Sandbox. During sandbox testing, some services will be provided via licensed partners.",
    slaTitle: "Our targets",
    sla: [
      "Acknowledgement within 2 business days.",
      "Initial investigation update within 5 business days.",
      "Resolution within 10 business days for most cases.",
    ],
  },
  ur: {
    title: "شکایات اور گِریوینس",
    updated: "آخری اپ ڈیٹ",
    intro:
      "ہم شکایات کو سنجیدگی سے لیتے ہیں۔ براہِ کرم درج ذیل طریقہ استعمال کریں تاکہ ہم آپ کا مسئلہ جلد حل کر سکیں۔",
    stepsTitle: "شکایت کیسے درج کریں",
    steps: [
      "help@rentback.app پر واضح سبجیکٹ کے ساتھ ای میل کریں (مثلاً: \"کارڈ چارج ڈسپیوٹ\"). اپنا نام، فون، اور حوالہ نمبر شامل کریں۔",
      "ہم 2 کاروباری دنوں میں شکایت موصول ہونے کی تصدیق اور ٹریکنگ ریفرنس دیں گے۔",
      "زیادہ تر معاملات 7–10 کاروباری دنوں میں حل کرنے کی کوشش کی جائے گی۔ پیچیدہ معاملات میں زیادہ وقت لگ سکتا ہے؛ آپ کو آگاہ رکھا جائے گا۔",
      "اگر جواب سے مطمئن نہیں ہیں تو تسلیم شدہ ای میل میں دیے گئے کمپلائنس رابطہ پر اسکیلیٹ کریں۔",
    ],
    dataTitle: "کیا معلومات درکار ہیں",
    data: [
      "آپ کا پورا نام اور RentBack پر رجسٹرڈ فون/ای میل۔",
      "مسئلے کی تفصیل، تاریخیں، رقم، اور اسکرین شاٹس (اگر ہوں)۔",
      "بینک/والٹ کے ریفرنس (IBAN، ٹرانزیکشن آئی ڈیز) اگر متعلقہ ہوں۔",
    ],
    regulatoryTitle: "ریگولیٹری نوٹ (پاکستان)",
    regulatoryBody:
      "RentBack اسٹیٹ بینک آف پاکستان کے ریگولیٹری سینڈ باکس کے لیے درخواست کی تیاری کر رہا ہے۔ سینڈ باکس کے دوران چند خدمات لائسنس یافتہ پارٹنرز کے ذریعے فراہم ہوں گی۔",
    slaTitle: "ہمارے ہدف",
    sla: [
      "2 کاروباری دنوں میں شکایت موصول ہونے کی تصدیق۔",
      "5 کاروباری دنوں میں ابتدائی تحقیق کی اپ ڈیٹ۔",
      "زیادہ تر معاملات 10 کاروباری دنوں میں حل۔",
    ],
  },
} as const;

export default function Page({ searchParams }: PageProps) {
  const lang = (searchParams?.lang === "ur" ? "ur" : "en") as Lang;
  const L = t[lang];
  const date = new Date().toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: 16, lineHeight: 1.7 }} dir={lang === "ur" ? "rtl" : "ltr"}>
      <h1 style={{ fontSize: 22, fontWeight: 800 }}>{L.title}</h1>
      <div style={{ opacity: 0.7, fontSize: 13, marginBottom: 12 }}>
        {L.updated}: {date}
      </div>

      <p>{L.intro}</p>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 16 }}>{L.stepsTitle}</h2>
      <ol style={{ paddingInlineStart: 20 }}>
        {L.steps.map((s, i) => (
          <li key={i} style={{ marginTop: 6 }}>{s}</li>
        ))}
      </ol>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 16 }}>{L.dataTitle}</h2>
      <ul style={{ paddingInlineStart: 20 }}>
        {L.data.map((s, i) => (
          <li key={i} style={{ marginTop: 6 }}>{s}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 16 }}>{L.regulatoryTitle}</h2>
      <p>{L.regulatoryBody}</p>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 16 }}>{L.slaTitle}</h2>
      <ul style={{ paddingInlineStart: 20 }}>
        {L.sla.map((s, i) => (
          <li key={i} style={{ marginTop: 6 }}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

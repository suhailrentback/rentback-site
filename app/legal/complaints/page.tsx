export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const lang = (searchParams?.lang === "ur" ? "ur" : "en") as "en" | "ur";
  const dir = lang === "ur" ? "rtl" : "ltr";

  const t = {
    en: {
      title: "Complaints & Customer Care",
      intro:
        "We aim to resolve issues quickly and fairly. Use the channels below. We’ll acknowledge within one business day and resolve most cases within 7–15 days.",
      items: [
        { h: "Email", d: "help@rentback.app (include your phone and brief details)" },
        { h: "WhatsApp", d: "+92 300 0000000 (business hours)" },
        {
          h: "Escalation",
          d: "If not resolved, your case will be escalated to our compliance officer.",
        },
      ],
      note:
        "For payment issues with partner institutions, we will coordinate with the licensed entity and keep you updated.",
    },
    ur: {
      title: "شکایات اور کسٹمر کیئر",
      intro:
        "ہم مسائل کو تیزی اور منصفانہ انداز میں حل کرنے کی کوشش کرتے ہیں۔ نیچے دیے گئے ذرائع استعمال کریں۔ ایک کاروباری دن میں جواب اور عموماً 7–15 دن میں حل کیا جاتا ہے۔",
      items: [
        { h: "ای میل", d: "help@rentback.app (اپنا فون نمبر اور مختصر تفصیل لکھیں)" },
        { h: "واٹس ایپ", d: "+92 300 0000000 (دفتری اوقات)" },
        {
          h: "اسکلیشن",
          d: "اگر مسئلہ حل نہ ہو تو آپ کا کیس ہمارے کمپلائنس آفیسر کو بھیجا جائے گا۔",
        },
      ],
      note:
        "پارٹنر اداروں سے متعلق ادائیگی مسائل کی صورت میں ہم لائسنس یافتہ ادارے کے ساتھ مل کر آپ کو اپ ڈیٹ دیتے رہیں گے۔",
    },
  }[lang];

  return (
    <article dir={dir}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>{t.title}</h1>
      <p style={{ lineHeight: 1.7 }}>{t.intro}</p>
      <div style={{ marginTop: 14 }}>
        {t.items.map((x, i) => (
          <section key={i} style={{ marginTop: 10 }}>
            <h2 style={{ fontWeight: 700 }}>{x.h}</h2>
            <p style={{ lineHeight: 1.7 }}>{x.d}</p>
          </section>
        ))}
      </div>
      <p style={{ marginTop: 14, lineHeight: 1.7, opacity: 0.85 }}>{t.note}</p>
    </article>
  );
}

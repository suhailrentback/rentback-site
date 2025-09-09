// app/legal/terms/page.tsx

export const dynamic = "force-static";

type Lang = "en" | "ur";

export const metadata = {
  title: "Terms of Service — RentBack",
  description:
    "Terms for using RentBack, including pilot/sandbox cohort rules with licensed partners in Pakistan.",
};

export default function TermsPage({
  searchParams,
}: {
  searchParams: { lang?: Lang };
}) {
  const lang: Lang = searchParams?.lang === "ur" ? "ur" : "en";
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <article style={{ lineHeight: 1.7 }} dir={dir} lang={lang}>
      {lang === "en" ? <English /> : <Urdu />}
    </article>
  );
}

function English() {
  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Terms of Service</h1>
      <p style={{ opacity: 0.8 }}>Last updated: {new Date().toLocaleDateString("en-PK")}</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>1. Agreement to Terms</h2>
      <p>By using RentBack (the “Service”), you agree to these Terms.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>2. Service Overview</h2>
      <p>
        Tools to organize rent, generate receipts, and interact with rewards. Some features may be
        demo or pilot/sandbox with licensed partners; demo flows simulate activity and do not move funds.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>3. Eligibility &amp; Accounts</h2>
      <ul>
        <li>You must be legally capable under Pakistani law.</li>
        <li>You’re responsible for your account and activity.</li>
        <li>Identity/KYC checks may be required via partners.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>4. Partner Services</h2>
      <p>Payments, KYC/AML and other regulated activities are provided by licensed partners and subject to their terms.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>5. Pilot/Sandbox Cohorts</h2>
      <ul>
        <li>Closed user groups with caps and limits.</li>
        <li>We may adjust limits, add/remove users, or pause features.</li>
        <li>Provide accurate information and follow cohort rules.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>6. Acceptable Use</h2>
      <ul>
        <li>No illegal activity, fraud, AML/CFT breaches, or sanctions violations.</li>
        <li>No interference, reverse-engineering, or rights violations.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>7. Fees, Taxes, &amp; Rewards</h2>
      <ul>
        <li>Rewards are subject to availability and change.</li>
        <li>Partner fees/taxes may apply.</li>
        <li>Abuse can lead to adjustments or account actions.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>8. Compliance</h2>
      <p>By using the Service, you consent to KYC/AML screening and monitoring as required by law or partners.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>9. IP</h2>
      <p>The Service and content are owned by RentBack or licensors. You get a limited right to use under these Terms.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>10. Termination</h2>
      <p>We may suspend/terminate for any reason, including breach, legal requirements, or risk concerns.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>11. Disclaimers</h2>
      <p>Provided “as is” and “as available” without warranties to the fullest extent permitted by law.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>12. Liability</h2>
      <p>We’re not liable for indirect, incidental, special, consequential, or punitive damages.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>13. Indemnity</h2>
      <p>You will indemnify RentBack for claims arising from your use, breach, or law violations.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>14. Governing Law</h2>
      <p>Pakistan law; courts of Karachi, Sindh, unless otherwise required by law.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>15. Changes</h2>
      <p>We may modify the Service or these Terms; continued use means acceptance.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>16. Contact</h2>
      <p>Email: <a href="mailto:help@rentback.app">help@rentback.app</a></p>

      <p style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
        These Terms are product-oriented, not legal advice. Consult counsel for your specific partner stack.
      </p>
    </>
  );
}

function Urdu() {
  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>شرائطِ استعمال</h1>
      <p style={{ opacity: 0.8 }}>آخری تازہ کاری: {new Date().toLocaleDateString("en-PK")}</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>1۔ اتفاق</h2>
      <p>RentBack استعمال کرنے سے آپ ان شرائط سے اتفاق کرتے ہیں۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>2۔ سروس کا خلاصہ</h2>
      <p>
        کرایہ منظم کرنے، رسیدیں بنانے اور انعامات کے لیے ٹولز۔ بعض فیچرز ڈیمو یا لائسنس یافتہ پارٹنرز کے
        ساتھ پائلٹ/سینڈ باکس موڈ میں ہو سکتے ہیں؛ ڈیمو میں حقیقی رقوم منتقل نہیں ہوتیں۔
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>3۔ اہلیت اور اکاؤنٹس</h2>
      <ul>
        <li>پاکستانی قانون کے تحت معاہدہ کرنے کے اہل ہوں۔</li>
        <li>اکاؤنٹ/سرگرمی کے آپ خود ذمہ دار ہیں۔</li>
        <li>شناخت/‏KYC جانچ پارٹنرز کے ذریعے درکار ہو سکتی ہے۔</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>4۔ پارٹنر سروسز</h2>
      <p>ادائیگیاں، KYC/AML وغیرہ لائسنس یافتہ پارٹنرز فراہم کرتے ہیں اور ان کی شرائط لاگو ہوں گی۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>5۔ پائلٹ/سینڈ باکس</h2>
      <ul>
        <li>بند گروپس، حدیں اور شرکاء کی تعداد محدود ہو سکتی ہے۔</li>
        <li>ہم حدود میں تبدیلی، شامل/حذف یا فیچرز معطل کر سکتے ہیں۔</li>
        <li>درست معلومات فراہم کریں اور قواعد کی پابندی کریں۔</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>6۔ قابلِ قبول استعمال</h2>
      <ul>
        <li>غیر قانونی سرگرمی، فراڈ، AML/CFT خلاف ورزی یا پابندیوں کی خلاف ورزی ممنوع۔</li>
        <li>مداخلت، ریورس انجینئرنگ یا حقوق کی خلاف ورزی نہیں۔</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>7۔ فیس، ٹیکس اور انعامات</h2>
      <ul>
        <li>انعامات دستیابی کے مطابق اور تبدیل ہو سکتے ہیں۔</li>
        <li>پارٹنرز کی فیس/ٹیکس لاگو ہو سکتے ہیں۔</li>
        <li>بداستعمال کی صورت میں ایڈجسٹمنٹ یا اکاؤنٹ کارروائی ہو سکتی ہے۔</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>8۔ تعمیل</h2>
      <p>قانون یا پارٹنرز کے تقاضوں کے مطابق KYC/AML اسکریننگ/مانیٹرنگ سے اتفاق کرتے ہیں۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>9۔ دانشورانہ حقوق</h2>
      <p>سروس اور مواد RentBack یا لائسنس دہندگان کی ملکیت ہے؛ استعمال محدود اور ان شرائط کے مطابق۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>10۔ اختتام</h2>
      <p>خلاف ورزی، قانونی تقاضوں یا رسک کی بنا پر رسائی معطل/ختم کی جا سکتی ہے۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>11۔ دستبرداری</h2>
      <p>سروس “جیسے ہے” کی بنیاد پر فراہم کی جاتی ہے؛ قانونی حد تک تمام ضمانتوں سے دستبرداری۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>12۔ ذمہ داری کی حد</h2>
      <p>بالواسطہ/خصوصی/نتیجہ خیز نقصانات یا منافع/ڈیٹا کے نقصان کی ذمہ داری نہیں۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>13۔ ہرجانہ</h2>
      <p>آپ کے استعمال/خلاف ورزی/قانون شکنی سے پیدا دعووں پر RentBack کو ہرجانہ دیں گے۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>14۔ قابلِ نفاذ قانون</h2>
      <p>پاکستانی قانون؛ دائرہ اختیار کراچی، سندھ کی عدالتیں (جب تک قانون مختلف تقاضا نہ کرے)۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>15۔ تبدیلیاں</h2>
      <p>ہم سروس/شرائط میں تبدیلی کر سکتے ہیں؛ مسلسل استعمال قبولیت تصور ہوگا۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>16۔ رابطہ</h2>
      <p>ای میل: <a href="mailto:help@rentback.app">help@rentback.app</a></p>

      <p style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
        یہ عمومی شرائط ہیں، قانونی مشورہ نہیں۔ اپنے پارٹنر اسٹیک کے لیے قانونی مشاورت کریں۔
      </p>
    </>
  );
}

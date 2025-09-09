// app/legal/privacy/page.tsx

export const dynamic = "force-static";

type Lang = "en" | "ur";

export const metadata = {
  title: "Privacy Policy — RentBack",
  description:
    "How RentBack collects, uses, and protects your information under applicable Pakistani law and partner obligations.",
};

export default function PrivacyPage({
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
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Privacy Policy</h1>
      <p style={{ opacity: 0.8 }}>Last updated: {new Date().toLocaleDateString("en-PK")}</p>

      <p>
        RentBack helps tenants pay rent conveniently while earning rewards, and helps landlords
        track incoming payments. This Privacy Policy explains how we collect, use, disclose, and
        protect information in connection with our website and app (the “Service”).
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Who we are &amp; contact</h2>
      <p>
        Data controller: <b>RentBack</b> (Pakistan). Contact:{" "}
        <a href="mailto:help@rentback.app">help@rentback.app</a>
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Scope</h2>
      <p>
        This Policy applies to information we process when you visit our sites, join our waitlist,
        use demo features, or participate in pilot/sandbox cohorts operated with licensed partners.
        For regulated services (e.g., payments, KYC/AML), partner privacy terms also apply.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Information we collect</h2>
      <ul>
        <li>
          <b>Account &amp; profile:</b> name, email, phone, preferred language, KYC status (not
          started / in-progress / verified).
        </li>
        <li>
          <b>Payment &amp; rewards (demo/pilot data):</b> amounts you enter, landlord labels, timestamps,
          references, payment method labels, statuses, and reward selections.
        </li>
        <li>
          <b>KYC/AML (partner-handled):</b> identity documents and checks by licensed partners;
          RentBack receives status/metadata, not full PAN or raw documents.
        </li>
        <li>
          <b>Support &amp; communications:</b> messages you send us and related metadata.
        </li>
        <li>
          <b>Technical &amp; analytics:</b> device/browser info, IP-derived coarse location, event logs,
          referral/UTM parameters, cookies or similar technologies.
        </li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>How we use information</h2>
      <ul>
        <li>Provide and improve the Service and user experience.</li>
        <li>Support, troubleshoot, secure the Service, and prevent fraud/abuse.</li>
        <li>Comply with legal/regulatory obligations (including SBP/partner requirements).</li>
        <li>Communicate product updates and service notices.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Legal bases (Pakistan-focused)</h2>
      <ul>
        <li><b>Contractual necessity</b> (to provide requested features).</li>
        <li><b>Legitimate interests</b> (product improvement, security, fraud prevention).</li>
        <li><b>Consent</b> (where required, e.g., optional analytics/marketing).</li>
        <li><b>Legal compliance</b> (e.g., financial crime controls via partners).</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Sharing &amp; disclosure</h2>
      <ul>
        <li>
          <b>Service providers:</b> hosting, storage, monitoring, analytics, support tools (under DPAs/confidentiality).
        </li>
        <li>
          <b>Licensed partners:</b> payments and KYC/AML; we minimize what we share and prefer status/metadata.
        </li>
        <li><b>Authorities:</b> where required by law or lawful process.</li>
        <li><b>Business transfers:</b> merger, acquisition, or asset sale.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>International transfers</h2>
      <p>
        Data may be processed or stored outside Pakistan. We use reasonable safeguards consistent with
        our obligations and partner requirements.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Security</h2>
      <ul>
        <li>Encryption in transit; hardened cloud infrastructure.</li>
        <li>Least-privilege access; administrative logging.</li>
        <li>No full card PAN stored by RentBack; tokenized flows via licensed processors.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Retention</h2>
      <p>
        We keep data only as long as needed for the purposes above, to comply with law, or to resolve
        disputes. Demo/test data can be deleted on request subject to legal bounds.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Your choices &amp; rights</h2>
      <ul>
        <li>Access, correct, or delete certain information (subject to legal limits).</li>
        <li>Opt out of non-essential emails or analytics where offered.</li>
        <li>Request information about processors/partners used for your engagement.</li>
        <li>Contact: <a href="mailto:help@rentback.app">help@rentback.app</a></li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Cookies &amp; similar tech</h2>
      <p>We use cookies to remember preferences, secure sessions, and understand usage.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Children</h2>
      <p>The Service is not directed to children under 13.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Changes</h2>
      <p>We may update this Policy and will post the new version with an updated date.</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Contact</h2>
      <p>Email: <a href="mailto:help@rentback.app">help@rentback.app</a></p>
    </>
  );
}

function Urdu() {
  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>پرائیویسی پالیسی</h1>
      <p style={{ opacity: 0.8 }}>آخری تازہ کاری: {new Date().toLocaleDateString("en-PK")}</p>

      <p>
        RentBack کرایہ داروں کو سہولت سے ادائیگی اور انعامات دیتا ہے اور مالکان کو وصولیوں پر بہتر
        نظر فراہم کرتا ہے۔ یہ پالیسی بتاتی ہے کہ ہم آپ کی معلومات کیسے جمع، استعمال اور محفوظ کرتے ہیں۔
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>ہم کون ہیں اور رابطہ</h2>
      <p>
        ڈیٹا کنٹرولر: <b>RentBack</b> (پاکستان). رابطہ:{" "}
        <a href="mailto:help@rentback.app">help@rentback.app</a>
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>دائرہ کار</h2>
      <p>
        یہ پالیسی ہماری ویب سائٹ/ایپ کے استعمال، ویٹ لسٹ میں شامل ہونے، ڈیمو فیچرز استعمال کرنے،
        یا لائسنس یافتہ پارٹنرز کے ساتھ پائلٹ/سینڈ باکس پروگراموں میں شرکت پر لاگو ہوتی ہے۔
        ریگولیٹڈ سروسز (جیسے ادائیگیاں، KYC/AML) کے لیے پارٹنرز کی پرائیویسی شرائط بھی لاگو ہوں گی۔
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>ہم کون سی معلومات لیتے ہیں</h2>
      <ul>
        <li><b>اکاؤنٹ و پروفائل:</b> نام، ای میل، فون، ترجیحی زبان، KYC اسٹیٹس (شروع نہیں/جاری/تصدیق شدہ)۔</li>
        <li><b>ادائیگیاں اور انعامات (ڈیمو/پائلٹ):</b> رقم، مالک/پراپرٹی کے لیبل، وقت، ریفرنس، طریقہ اور اسٹیٹس، ریڈیمپشن انتخاب۔</li>
        <li><b>KYC/AML (پارٹنر):</b> شناختی دستاویزات اور جانچ لائسنس یافتہ پارٹنرز کرتے ہیں؛ RentBack کو عمومی اسٹیٹس/میٹاڈیٹا ملتا ہے۔</li>
        <li><b>سپورٹ و رابطہ:</b> آپ کے پیغامات اور متعلقہ میٹاڈیٹا۔</li>
        <li><b>ٹیکنیکل و اینالیٹکس:</b> ڈیوائس/براؤزر معلومات، IP سے اخذ کردہ لوکیشن، ایونٹ لاگز، UTM/ریفریل، کوکیز وغیرہ۔</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>استعمال کے مقاصد</h2>
      <ul>
        <li>سروس مہیا کرنا اور بہتر بنانا۔</li>
        <li>سیکیورٹی، فراڈ سے بچاؤ اور مدد/ٹرَبل شوٹنگ۔</li>
        <li>قانونی/ریگولیٹری تقاضوں (مثلاً SBP/پارٹنرز) کی پاسداری۔</li>
        <li>پروڈکٹ اپ ڈیٹس اور سروس نوٹس دینا۔</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>قانونی بنیادیں</h2>
      <ul>
        <li><b>معاہدہ جاتی ضرورت</b> (درخواست کردہ فیچرز فراہم کرنے کے لیے)۔</li>
        <li><b>جائز مفاد</b> (بہتری، سیکیورٹی، فراڈ سے بچاؤ)۔</li>
        <li><b>رضامندی</b> (جہاں ضروری ہو، مثلاً اختیاری اینالیٹکس/مارکیٹنگ)۔</li>
        <li><b>قانونی تعمیل</b> (مثلاً مالی جرائم کی روک تھام پارٹنرز کے ذریعے)۔</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>اشتراک و انکشاف</h2>
      <ul>
        <li><b>سروس پرووائیڈرز:</b> ہوسٹنگ، اسٹوریج، مانیٹرنگ، اینالیٹکس، سپورٹ (رازداری معاہدوں کے تحت)۔</li>
        <li><b>لائسنس یافتہ پارٹنرز:</b> ادائیگیاں اور KYC/AML؛ کم سے کم ڈیٹا شیئر اور زیادہ تر اسٹیٹس/میٹاڈیٹا۔</li>
        <li><b>اتھارٹیز:</b> قانونی تقاضوں کے مطابق۔</li>
        <li><b>بزنس ٹرانسفر:</b> انضمام/خریداری/اثاثہ فروخت کی صورت میں۔</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>بین الاقوامی منتقلی</h2>
      <p>ڈیٹا پاکستان سے باہر بھی پروسیس/محفوظ ہو سکتا ہے؛ مناسب حفاظتی اقدامات اپناتے ہیں۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>سیکیورٹی</h2>
      <ul>
        <li>ٹرانزٹ میں انکرپشن؛ مضبوط کلاؤڈ انفراسٹرکچر۔</li>
        <li>کم سے کم رسائی اصول؛ ایڈمنسٹریٹو لاگنگ۔</li>
        <li>کارڈ کا مکمل PAN RentBack پر محفوظ نہیں؛ لائسنس یافتہ پروسیسرز کے ذریعے ٹوکنائزیشن۔</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>محفوظگی کی مدت</h2>
      <p>قانونی تقاضوں/جائز مقاصد تک ڈیٹا محفوظ؛ ڈیمو ڈیٹا حسبِ تقاضا حذف کیا جا سکتا ہے (قانونی حدود کے ساتھ)۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>آپ کے حقوق</h2>
      <ul>
        <li>رسائی، درستگی یا حذف کی درخواست (قانونی حدود کے ساتھ)۔</li>
        <li>غیر ضروری ای میلز/اینالیٹکس سے انکار۔</li>
        <li>مروجہ پروسیسرز/پارٹنرز کی معلومات کی درخواست۔</li>
        <li>رابطہ: <a href="mailto:help@rentback.app">help@rentback.app</a></li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>کوکیز</h2>
      <p>ترجیحات، سیشن سیکیورٹی اور استعمال سمجھنے کے لیے کوکیز/مشابہ ٹیکنالوجی استعمال ہو سکتی ہے۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>بچوں کے لیے نہیں</h2>
      <p>یہ سروس 13 سال سے کم عمر بچوں کے لیے متعین نہیں۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>تبدیلیاں</h2>
      <p>ہم اس پالیسی کو وقتاً فوقتاً اپ ڈیٹ کر سکتے ہیں اور نئی تاریخ کے ساتھ شائع کریں گے۔</p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>رابطہ</h2>
      <p>ای میل: <a href="mailto:help@rentback.app">help@rentback.app</a></p>
    </>
  );
}

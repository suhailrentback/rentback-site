// app/legal/sandbox/page.tsx
export const dynamic = "force-static";

type Lang = "en" | "ur";

export const metadata = {
  title: "Sandbox / Pilot — RentBack",
  description: "Overview of pilot/sandbox cohorts and how we operate with licensed partners.",
};

export default function SandboxPage({
  searchParams,
}: { searchParams: { lang?: Lang } }) {
  const lang: Lang = searchParams?.lang === "ur" ? "ur" : "en";
  const dir = lang === "ur" ? "rtl" : "ltr";
  return (
    <article style={{ lineHeight: 1.7 }} dir={dir} lang={lang}>
      {lang === "en" ? <En /> : <Ur />} 
    </article>
  );
}

function En() {
  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Sandbox / Pilot</h1>
      <p>
        RentBack may run closed pilots with licensed partners. Cohorts are invite-only, capped, and
        subject to limits, KYC/AML, and feature gating. Feedback is welcome at{" "}
        <a href="mailto:help@rentback.app">help@rentback.app</a>.
      </p>
    </>
  );
}
function Ur() {
  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>سینڈ باکس / پائلٹ</h1>
      <p>
        RentBack لائسنس یافتہ پارٹنرز کے ساتھ بند پائلٹس چلا سکتا ہے۔ گروپس دعوتی، محدود اور
        KYC/AML و فیچر حدود کے تابع ہوتے ہیں۔ فیڈبیک:{" "}
        <a href="mailto:help@rentback.app">help@rentback.app</a>
      </p>
    </>
  );
}

export default function PrivacyPage() {
  const updated = new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" });
  return (
    <main style={{ maxWidth: 840, margin: "0 auto", padding: "24px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Privacy Policy</h1>
      <div style={{ opacity: 0.6, marginBottom: 16 }}>Last updated: {updated}</div>
      <p style={{ lineHeight: 1.7 }}>
        We handle your information under Pakistani law and relevant State Bank of Pakistan directives.
        We collect minimal data needed to operate the service, secure payments via licensed partners,
        and improve the product. We do not store full card PANs. You can request deletion subject to
        legal requirements by emailing <a href="mailto:help@rentback.app">help@rentback.app</a>.
      </p>
      <h2 style={{ marginTop: 18, fontWeight: 700 }}>Contact</h2>
      <p style={{ lineHeight: 1.7 }}>
        RentBack — Karachi, PK · <a href="mailto:help@rentback.app">help@rentback.app</a>
      </p>
      <button onClick={() => window.print()} style={{ marginTop: 18, padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)" }}>
        Print / Save PDF
      </button>
    </main>
  );
}

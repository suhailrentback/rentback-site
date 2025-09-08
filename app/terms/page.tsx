export default function TermsPage() {
  const updated = new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" });
  return (
    <main style={{ maxWidth: 840, margin: "0 auto", padding: "24px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Terms of Service</h1>
      <div style={{ opacity: 0.6, marginBottom: 16 }}>Last updated: {updated}</div>
      <p style={{ lineHeight: 1.7 }}>
        These terms govern your use of RentBack’s app and website in Pakistan. By using the service,
        you agree to follow applicable laws and our acceptable use. Rewards points are not cash and may
        be redeemed only for listed rewards. Payments are processed via licensed partners. We may update
        these terms as our regulatory status evolves.
      </p>
      <h2 style={{ marginTop: 18, fontWeight: 700 }}>Support</h2>
      <p style={{ lineHeight: 1.7 }}>
        For questions, email <a href="mailto:help@rentback.app">help@rentback.app</a>.
      </p>
      <button onClick={() => window.print()} style={{ marginTop: 18, padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)" }}>
        Print / Save PDF
      </button>
    </main>
  );
}

// Server page (static)
export const dynamic = "force-static";

export const metadata = {
  title: "Terms of Service — RentBack",
  description: "The terms that govern your use of RentBack.",
};

export default function TermsPage() {
  const card = {
    maxWidth: 880,
    margin: "24px auto",
    padding: 20,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#ffffff",
    boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
  } as const;

  return (
    <main style={{ minHeight: "100vh", background: "#f6faf8", padding: "20px 14px", color: "#0b0b0b" }}>
      <div style={{ position: "sticky", top: 0, background: "#ffffffcc", backdropFilter: "saturate(1.8) blur(8px)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "12px 14px", fontWeight: 700, color: "#059669" }}>
        RentBack
      </div>
      <article style={card}>
        <h1 style={{ margin: 0 }}>Terms of Service</h1>
        <p style={{ opacity: 0.7 }}><em>Last updated: 3 September 2025</em></p>
        <h2>1. Using RentBack</h2>
        <p>RentBack is provided on a demo/preview basis. Production payments are via licensed partners and subject to their terms.</p>
        <h2>2. Your responsibilities</h2>
        <ul>
          <li>Provide accurate information.</li>
          <li>Comply with applicable laws and our partner policies.</li>
        </ul>
        <h2>3. Liability</h2>
        <p>To the extent permitted by law, RentBack and its affiliates are not liable for indirect or consequential losses.</p>
        <h2>4. Contact</h2>
        <p>help@rentback.app</p>
      </article>
    </main>
  );
}

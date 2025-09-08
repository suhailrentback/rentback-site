// Server page (static)
export const dynamic = "force-static";

export const metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack handles your data.",
};

export default function PrivacyPage() {
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
        <h1 style={{ margin: 0 }}>Privacy Policy</h1>
        <p style={{ opacity: 0.7 }}><em>Last updated: 3 September 2025</em></p>
        <p>We handle your information under applicable laws and partner obligations. We collect only what’s needed to operate RentBack and improve the service.</p>
        <h2>What we collect</h2>
        <ul>
          <li>Contact details (email, phone), city, language.</li>
          <li>Technical data (limited analytics if you consent).</li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>Waitlist and product updates you request.</li>
          <li>Service operations, fraud prevention, and support.</li>
        </ul>
        <h2>Contact</h2>
        <p>help@rentback.app</p>
      </article>
    </main>
  );
}

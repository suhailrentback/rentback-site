export const metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack handles your information in Pakistan.",
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 840, margin: "2rem auto", padding: "0 1rem", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: ".25rem" }}>Privacy Policy</h1>
      <div style={{ opacity: .7, marginBottom: "1rem" }}>Last updated: {new Date().toLocaleDateString("en-PK", { year:"numeric", month:"long", day:"numeric" })}</div>
      <p>
        We handle your information under Pakistani law and relevant SBP directives. We minimize data
        collection, encrypt in transit, and work with licensed partners for payments. Contact: <a href="mailto:help@rentback.app">help@rentback.app</a>.
      </p>
      <p>
        This static page is non-interactive for reliability. For a printable version, use your browser’s
        <em> Print / Save as PDF</em>.
      </p>
      <p><a href="/">← Back to Home</a></p>
    </main>
  );
}

export const metadata = {
  title: "Terms of Service — RentBack",
  description: "Terms governing use of RentBack in Pakistan.",
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 840, margin: "2rem auto", padding: "0 1rem", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: ".25rem" }}>Terms of Service</h1>
      <div style={{ opacity: .7, marginBottom: "1rem" }}>Last updated: {new Date().toLocaleDateString("en-PK", { year:"numeric", month:"long", day:"numeric" })}</div>
      <p>
        These terms govern your use of our website and app in Pakistan. Rewards are subject to
        applicable terms; payments flow via licensed partners. If you disagree with these terms, please
        discontinue use.
      </p>
      <p><a href="/">← Back to Home</a></p>
    </main>
  );
}

export const metadata = {
  title: "Status — RentBack",
  description: "Regulatory sandbox preparation & updates.",
};

export default function StatusPage() {
  return (
    <main style={{ maxWidth: 840, margin: "2rem auto", padding: "0 1rem", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: ".25rem" }}>Regulatory Status</h1>
      <p>SBP Sandbox — preparation & updates:</p>
      <ul>
        <li>Preparation complete (materials & partner outreach)</li>
        <li>Draft application ready</li>
        <li>Awaiting sandbox submission window</li>
      </ul>
      <p><a href="/">← Back to Home</a></p>
    </main>
  );
}

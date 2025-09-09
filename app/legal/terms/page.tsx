// app/legal/terms/page.tsx
export const metadata = {
  title: "Terms of Service — RentBack",
  description: "Your agreement with RentBack.",
};

export default function TermsPage() {
  return (
    <>
      <div className="rb-legal-pill">Pilot</div>
      <h1>Terms of Service</h1>
      <p>
        During the sandbox pilot, features are experimental and provided “as is”. By using the site,
        you agree to these terms.
      </p>

      <h2>Use</h2>
      <ul>
        <li>You must provide accurate information.</li>
        <li>No unlawful or abusive activity.</li>
      </ul>

      <h2>Payments</h2>
      <p>
        Payments are simulated in demo mode. No real funds move unless explicitly stated
        otherwise.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for indirect or consequential loss.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms and will post the latest version on this page.</p>

      <h2>Contact</h2>
      <p>help@rentback.app</p>
    </>
  );
}

// app/legal/privacy/page.tsx
export const metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack handles your data in Pakistan.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="rb-legal-pill">Updated: 3 September 2025</div>
      <h1>Privacy Policy</h1>
      <p>
        We handle your information under Pakistani law and relevant SBP directives. We collect only
        what’s needed to operate RentBack and improve the service.
      </p>

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

      <h2>Retention & deletion</h2>
      <p>
        We keep data only as long as needed for the purposes above or to meet legal requirements.
        You can request deletion at any time at <a href="mailto:help@rentback.app">help@rentback.app</a>.
      </p>

      <h2>Contact</h2>
      <p>help@rentback.app</p>
    </>
  );
}

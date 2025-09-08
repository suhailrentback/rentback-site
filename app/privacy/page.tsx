// Pure server page – no client code, no event handlers
export const dynamic = "force-static";

export const metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack handles your data in Pakistan.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: 3 September 2025</em></p>

      <p>
        We handle your information under Pakistani law and relevant SBP directives.
        We collect only what’s needed to operate RentBack and improve the service.
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

      <h2>Contact</h2>
      <p>help@rentback.app</p>
    </main>
  );
}

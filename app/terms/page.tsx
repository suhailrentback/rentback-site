export const dynamic = "force-static";

export const metadata = {
  title: "Terms of Service — RentBack",
  description: "Terms governing your use of RentBack in Pakistan.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <h1>Terms of Service</h1>
      <p><em>Last updated: 3 September 2025</em></p>

      <p>
        These terms govern your use of the app and website in Pakistan. By using
        RentBack, you agree to follow these terms and local law.
      </p>

      <h2>Key points</h2>
      <ul>
        <li>Rewards are not cash; they redeem only for listed rewards.</li>
        <li>Payments are processed via licensed partners; we do not store full PAN.</li>
        <li>We may update these terms with notice.</li>
      </ul>

      <h2>Contact</h2>
      <p>help@rentback.app</p>
    </main>
  );
}

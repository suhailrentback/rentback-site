// Pure server page – static, no client code or event handlers
export const dynamic = "force-static";

export const metadata = {
  title: "Terms of Service — RentBack",
  description: "Terms governing your use of the RentBack website and app.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
      {/* Header / hero */}
      <section className="relative border-b border-black/5 dark:border-white/10 bg-emerald-50/60 dark:bg-emerald-900/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-6 text-emerald-600 dark:text-emerald-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 11.5L12 4l9 7.5" />
              <path d="M5 10v9h14v-9" />
            </svg>
            <span className="font-semibold">RentBack</span>
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Last updated: 8 September 2025 • Pakistan
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              These Terms govern your use of the RentBack website and app in
              Pakistan. By accessing or using our services, you agree to these
              Terms.
            </p>

            <h2>Eligibility</h2>
            <p>You must be legally able to form a binding contract in Pakistan.</p>

            <h2>Accounts &amp; KYC</h2>
            <p>
              You must provide accurate information. Identity verification (KYC)
              may be required to access certain features and limits.
            </p>

            <h2>Payments &amp; Rewards</h2>
            <ul>
              <li>
                Payments are processed via licensed partners. The prototype demo
                does not move real funds.
              </li>
              <li>
                Rewards points are not cash and can be redeemed only for listed
                rewards and subject to availability/terms.
              </li>
            </ul>

            <h2>Acceptable use</h2>
            <p>
              No unlawful, fraudulent, or abusive activity. Do not attempt to
              interfere with or disrupt the service.
            </p>

            <h2>Termination</h2>
            <p>
              We may suspend or terminate access for violations of these Terms or
              legal requirements.
            </p>

            <h2>Liability</h2>
            <p>
              To the extent permitted by law, RentBack is not liable for indirect
              or consequential losses. Nothing limits rights that cannot be
              excluded under applicable law.
            </p>

            <h2>Governing law</h2>
            <p>These Terms are governed by the laws of Pakistan.</p>

            <h2>Changes</h2>
            <p>
              We may update these Terms. Changes will be posted here with an
              updated date.
            </p>

            <h2>Contact</h2>
            <p>
              Email:{" "}
              <a className="underline" href="mailto:help@rentback.app">
                help@rentback.app
              </a>
            </p>

            <hr />
            <p className="text-sm">
              See also our{" "}
              <a className="underline" href="/privacy">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

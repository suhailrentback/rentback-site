// Pure server page – static, no client code or event handlers
export const dynamic = "force-static";

export const metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack handles your data in Pakistan.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
      {/* Header / hero */}
      <section className="relative border-b border-black/5 dark:border-white/10 bg-emerald-50/60 dark:bg-emerald-900/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3">
            {/* inline brand mark (server-safe) */}
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
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold">Privacy Policy</h1>
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
              We handle your information under Pakistani law and relevant State
              Bank of Pakistan (SBP) directives. We collect the minimum needed to
              operate RentBack and improve the service.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>Contact details (email, phone), city, language preference.</li>
              <li>
                Technical data such as device/user-agent. Anonymous analytics are
                used only with your consent.
              </li>
              <li>
                Demo interactions in the prototype (e.g., payments/rewards logs)
                if you use those features.
              </li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>To provide the waitlist, early access, and core app features.</li>
              <li>To prevent fraud, secure accounts, and improve the product.</li>
              <li>To send product updates you request (you can opt out anytime).</li>
            </ul>

            <h2>Sharing &amp; partners</h2>
            <p>
              We may work with licensed payments partners (PSO/PSP/EMI) and service
              providers under contract. We don’t sell your personal data.
            </p>

            <h2>Retention &amp; deletion</h2>
            <p>
              We keep data only as long as needed for the purposes above and legal
              requirements. You can request deletion at any time, subject to
              regulatory constraints.
            </p>

            <h2>Your rights</h2>
            <ul>
              <li>Access, correction, deletion (subject to law).</li>
              <li>Opt-out of marketing updates.</li>
              <li>Withdraw analytics consent.</li>
            </ul>

            <h2>Security</h2>
            <ul>
              <li>Encryption in transit; least-privilege access controls.</li>
              <li>No full card PAN is stored by RentBack.</li>
              <li>Planned: 2FA, device binding, audit logs.</li>
            </ul>

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
              <a className="underline" href="/terms">
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

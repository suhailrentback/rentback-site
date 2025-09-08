// Server-only, static
export const dynamic = "force-static";

export const metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack handles your data in Pakistan.",
};

export default function PrivacyPage() {
  const lastUpdated = "3 September 2025";
  return (
    <main className="min-h-[60vh] text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/5 dark:border-white/10">
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 left-[-8%] h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            {/* Brand mark */}
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11.5L12 4l9 7.5" /><path d="M5 10v9h14v-9" />
            </svg>
            <span className="font-semibold">RentBack</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-10 space-y-8">
        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-950 p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            We handle your information under Pakistani law and relevant SBP directives. We only collect what’s needed to operate RentBack and improve the service.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card title="What we collect" items={[
            "Contact details (email, phone), city, language.",
            "Technical data (limited analytics if you consent).",
          ]} />
          <Card title="How we use it" items={[
            "Waitlist and product updates you request.",
            "Service operations, fraud prevention, and support.",
          ]} />
        </div>

        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-950 p-6">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            For privacy questions or requests: <span className="font-medium">help@rentback.app</span>
          </p>
        </div>
      </section>
    </main>
  );
}

/** Small server helper component (no interactivity) */
function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-950 p-6">
      <h3 className="text-base font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 size-4 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

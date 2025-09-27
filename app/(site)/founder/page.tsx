// app/(site)/founder/page.tsx
export const dynamic = "force-static";

export default function FounderPage() {
  return (
    <main className="min-h-[70vh] max-w-5xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Founder
          </h1>
          <p className="mt-3 text-base/7 text-neutral-600 dark:text-neutral-300">
            RentBack is building the easiest way to pay rent in Pakistan—and earn
            rewards while you do it. We’re focused on simple UX, local rails,
            and trust.
          </p>
          <div className="mt-6 space-y-2 text-sm/6">
            <div><span className="font-semibold">Name:</span> Suhail Ahmed</div>
            <div><span className="font-semibold">Role:</span> CEO & Founder</div>
            <div><span className="font-semibold">Contact:</span>{" "}
              <a className="underline hover:opacity-80" href="mailto:help@rentback.app">
                help@rentback.app
              </a>
            </div>
          </div>
        </div>

        {/* Simple founder card */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-lg">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">About</div>
          <h2 className="mt-2 text-xl font-semibold">Why RentBack?</h2>
          <p className="mt-2 text-sm/6 text-neutral-600 dark:text-neutral-300">
            Paying rent should be as easy as sending a message. With RentBack,
            tenants get choice (bank, card, wallet) and rewards; landlords get
            clarity and faster payouts.
          </p>
          <div className="mt-5 text-sm">
            <a href="/sign-in" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">
              Get started
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

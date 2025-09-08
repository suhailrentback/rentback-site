// Server-only, static
export const dynamic = "force-static";

export const metadata = {
  title: "Status — RentBack",
  description: "Sandbox preparation & updates.",
};

export default function StatusPage() {
  return (
    <main className="min-h-[60vh] text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/5 dark:border-white/10">
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 left-[-8%] h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-300/20 dark:text-emerald-300 px-3 py-1 text-xs font-medium">
            Waiting approval
            <span className="inline-block size-2 rounded-full bg-emerald-500 ml-1" />
          </div>
          <h1 className="mt-3 text-3xl font-bold">Status</h1>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">SBP Sandbox — preparation & updates.</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-4 py-10">
        <ol className="relative border-s border-black/10 dark:border-white/10 pl-6 space-y-8">
          <Item done title="Preparation" desc="Materials ready; partner outreach completed." date="Aug 2025" />
          <Item done title="Draft application" desc="Internal review complete." date="Sep 2025" />
          <Item title="Submission window" desc="Awaiting next SBP sandbox intake." date="TBD" />
          <Item title="Sandbox decision" desc="Pending after submission." date="TBD" />
        </ol>
      </section>
    </main>
  );
}

function Item({ title, desc, date, done = false }: { title: string; desc: string; date: string; done?: boolean }) {
  return (
    <li className="ml-2">
      <span className="absolute -left-[9px] mt-1 block size-3 rounded-full ring-4 ring-white dark:ring-neutral-950"
        style={{ backgroundColor: done ? "#059669" : "#9ca3af" }} aria-hidden />
      <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-950 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="text-xs text-gray-600 dark:text-gray-400">{date}</span>
        </div>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{desc}</p>
      </div>
    </li>
  );
}

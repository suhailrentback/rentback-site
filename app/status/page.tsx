import Link from "next/link";

export const metadata = {
  title: "Status — RentBack",
  description: "Regulatory journey and product readiness updates.",
};

type Step = {
  date: string;
  title: string;
  detail: string;
  status: "done" | "active" | "upcoming";
};

const timeline: Step[] = [
  {
    date: "2025-08-15",
    title: "Initial application drafted",
    detail: "Prepared documentation and compliance notes for the SBP Regulatory Sandbox.",
    status: "done",
  },
  {
    date: "2025-09-01",
    title: "Submitted to SBP Regulatory Sandbox",
    detail: "Submitted core proposal and supporting materials.",
    status: "active",
  },
  {
    date: "TBD",
    title: "Sandbox acceptance",
    detail: "Awaiting review outcome and next steps from SBP.",
    status: "upcoming",
  },
  {
    date: "TBD",
    title: "Limited pilot (sandbox)",
    detail: "Closed-beta with selected users and monitored volumes.",
    status: "upcoming",
  },
  {
    date: "TBD",
    title: "General availability",
    detail: "Gradual rollout by city across Pakistan.",
    status: "upcoming",
  },
];

function Dot({ status }: { status: Step["status"] }) {
  const base = "inline-block size-2 rounded-full";
  const color =
    status === "done"
      ? "bg-emerald-500"
      : status === "active"
      ? "bg-amber-500"
      : "bg-gray-400 dark:bg-gray-600";
  return <span className={`${base} ${color}`} aria-hidden />;
}

export default function StatusPage() {
  const lastUpdated = new Date().toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-[70vh]">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">RentBack Status</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Regulatory journey & product readiness. Last updated: {lastUpdated}
          </p>
        </header>

        <div className="space-y-6">
          {timeline.map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="mt-1">
                  <Dot status={s.status} />
                </div>
                {i < timeline.length - 1 && (
                  <div className="flex-1 w-px bg-gray-200 dark:bg-white/10 my-2" />
                )}
              </div>
              <div className="flex-1 rounded-xl p-4 ring-1 ring-black/5 dark:ring-white/10 bg-white/80 dark:bg-white/5">
                <div className="text-xs text-gray-600 dark:text-gray-400">{s.date}</div>
                <div className="font-medium mt-0.5">{s.title}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl px-4 py-2 text-sm ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

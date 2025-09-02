import React, { useEffect, useState } from "react";

// Simple status page preview for https://status.rentback.app
// Shows SBP Regulatory Sandbox milestones + updates
// Follows system theme (no manual toggle)

const PHASES = [
  { key: "prep",    title: "Preparation",           desc: "Drafting materials and partners.",                          status: "complete",    date: "2025-08-15" },
  { key: "submit",  title: "Application Submitted", desc: "Submitted to SBP Regulatory Sandbox.",                      status: "in_progress", date: "2025-09-01" },
  { key: "review",  title: "Under Review",          desc: "Awaiting SBP feedback.",                                     status: "pending" },
  { key: "sandbox", title: "Sandbox Entry",         desc: "Testing with limited users under SBP oversight.",            status: "pending" },
  { key: "pilot",   title: "Pilot Expansion",       desc: "Broader pilot and operational hardening.",                   status: "pending" },
  { key: "graduate",title: "Graduation",            desc: "Graduation from sandbox and go-to-market.",                  status: "pending" },
];

const UPDATES: { date: string; title: string; body: string }[] = [
  { date: "2025-09-01", title: "Application submitted", body: "We sent our sandbox application to SBP. We’ll post updates as we hear back." },
  { date: "2025-08-28", title: "Partner docs finalized", body: "Completed docs with licensed payment partners and refined compliance checklist." },
];

type PhaseStatus = "complete" | "in_progress" | "pending";

function Badge({ status }: { status: PhaseStatus }) {
  const label = status === "complete" ? "Complete" : status === "in_progress" ? "In progress" : "Pending";
  const cls =
    status === "complete"
      ? "bg-emerald-600 text-white"
      : status === "in_progress"
      ? "bg-amber-500 text-white"
      : "bg-gray-300 text-gray-800 dark:bg-white/10 dark:text-gray-100";
  return <span className={`text-xs px-2 py-1 rounded-full ${cls}`}>{label}</span>;
}

export default function StatusPreview() {
  // Follow system theme automatically
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = () => setDark(mq.matches);
      apply();
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.toggle("dark", dark);
      (root as HTMLElement).style.colorScheme = dark ? "dark" : "light";
      document.title = "RentBack — Regulatory Status";
    } catch {}
  }, [dark]);

  const lastUpdated = UPDATES[0]?.date ?? "—";

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
      <section className="px-6 py-12 sm:py-16 mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Regulatory Status — State Bank of Pakistan</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Transparent updates on our application to the SBP Regulatory Sandbox.
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Last updated: {lastUpdated}</p>
        </header>

        {/* Current status card */}
        <div className="rounded-2xl p-6 ring-1 ring-black/5 dark:ring-white/10 mb-10">
          <div className="flex items-center gap-3">
            <div className="size-2.5 rounded-full bg-amber-500 animate-pulse" />
            <div className="font-semibold">Waiting approval</div>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Our sandbox application is with SBP. We’ll announce the next milestone as soon as we have it.
          </p>
        </div>

        {/* Milestone timeline */}
        <h2 className="text-lg font-semibold mb-4">Milestones</h2>
        <ol className="space-y-4 mb-10">
          {PHASES.map((p) => (
            <li key={p.key} className="rounded-2xl p-5 ring-1 ring-black/5 dark:ring-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium">{p.title}</div>
                <Badge status={p.status as PhaseStatus} />
              </div>
              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{p.desc}</p>
              {p.date && (
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Date: {p.date}</p>
              )}
            </li>
          ))}
        </ol>

        {/* Transparency log */}
        <h2 className="text-lg font-semibold mb-4">Transparency log</h2>
        <div className="space-y-4">
          {UPDATES.map((u) => (
            <article key={u.date} className="rounded-2xl p-5 ring-1 ring-black/5 dark:ring-white/10">
              <div className="text-sm text-gray-500 dark:text-gray-400">{u.date}</div>
              <h3 className="font-medium mt-1">{u.title}</h3>
              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{u.body}</p>
            </article>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 text-sm text-gray-700 dark:text-gray-300">
          Questions? <a className="underline" href="mailto:help@rentback.app">help@rentback.app</a>
        </div>
      </section>
    </main>
  );
}


"use client";

export default function SandboxPlan() {
  const BRAND = { ring: "rgba(5,150,105,0.20)" };
  return (
    <article>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>SBP Sandbox Test Plan (Demo)</h1>
        <button
          onClick={() => window.print()}
          style={{ border: `1px solid ${BRAND.ring}`, padding: "6px 10px", borderRadius: 10, fontWeight: 700 }}
        >
          Print
        </button>
      </div>
      <ol style={{ lineHeight: 1.7, marginTop: 12 }}>
        <li><b>Identity:</b> From Home, start KYC → complete toggle → verify banner disappears.</li>
        <li>
          <b>Payments:</b> Create “Bank Transfer” payment → mark as Sent → open Receipt → print. Then create “Card”
          payment → auto Succeeded → Refund (Demo).
        </li>
        <li>
          <b>Rewards:</b> Redeem Daraz 1,000 PKR → receipt printable → mark Fulfilled → CSV export from Rewards.
        </li>
        <li><b>Rate limits:</b> Attempt >5 creates in 1 min → client-side limit blocks further attempts.</li>
        <li><b>Logging:</b> Confirm events are visible in QA Panel; download CSV/JSON.</li>
        <li><b>Admin:</b> Open /admin → enter code → view read-only aggregates; export CSV; Print.</li>
      </ol>
      <p style={{ marginTop: 12, opacity: 0.75 }}>
        Note: All flows are simulated; no real funds move. External logging depends on the configured Sheet endpoint.
      </p>
    </article>
  );
}

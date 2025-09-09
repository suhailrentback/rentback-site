export const metadata = {
  title: "SBP Sandbox Plan — RentBack",
  description: "Proposed scope, controls, and exit criteria for SBP sandbox participation.",
};

export default function SandboxPlanPage() {
  return (
    <article style={{ lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>SBP Sandbox Plan (Draft)</h1>
      <p style={{ opacity: 0.8 }}>
        Last updated: {new Date().toLocaleDateString("en-PK")}
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Objectives</h2>
      <ul>
        <li>Validate rent payment orchestration with licensed partners.</li>
        <li>Measure tenant adoption, payment success rates, and support SLAs.</li>
        <li>Demonstrate controls for KYC, fraud prevention, and data protection.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Scope</h2>
      <ul>
        <li>Tenant-to-landlord payments (PKR) via bank transfer, card, or wallet (partner-led).</li>
        <li>Digital receipts and rewards accrual/redemption with caps.</li>
        <li>Limited cohort (closed user group), transaction and balance limits.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Controls & Risk Mitigation</h2>
      <ul>
        <li>KYC/AML through partner stack; risk scoring; watchlists.</li>
        <li>Transaction limits: per-txn, daily, and monthly caps; velocity checks.</li>
        <li>Device binding, step-up auth for sensitive actions, audit logs.</li>
        <li>Data minimization; encryption in transit; deletion on request (legal bounds).</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Test Users & Limits</h2>
      <ul>
        <li>Closed cohort (&lt;= 500 users) across Karachi/Lahore/Islamabad.</li>
        <li>Per-user monthly cap (e.g., PKR 300,000) and per-txn cap (e.g., PKR 150,000).</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Data Handling</h2>
      <ul>
        <li>No storage of full card PAN; tokenized flows via licensed processors.</li>
        <li>Access controls and logging with least privilege.</li>
        <li>Vendor due diligence and DPAs where applicable.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Success & Exit Criteria</h2>
      <ul>
        <li>&gt;= 95% successful payment completion in cohort.</li>
        <li>&lt; 0.2% confirmed fraud/loss; no material incidents.</li>
        <li>Support SLA &lt; 24h first response; CSAT &gt;= 4.5/5.</li>
        <li>Regulatory reporting complete and accepted.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Timeline</h2>
      <ol>
        <li>Preparation & partner integration</li>
        <li>Cohort onboarding</li>
        <li>Limited go-live</li>
        <li>Evaluation & exit</li>
      </ol>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Contacts</h2>
      <p>
        Compliance & Support: <a href="mailto:help@rentback.app">help@rentback.app</a>
      </p>

      <p style={{ marginTop: 24, fontSize: 12, opacity: 0.7 }}>
        This document is a product draft for sandbox readiness and may change with partner and regulator feedback.
      </p>
    </article>
  );
}

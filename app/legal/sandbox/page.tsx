// app/legal/sandbox/page.tsx
export const metadata = {
  title: "Sandbox Notice — RentBack",
  description: "Important information about the SBP sandbox pilot.",
};

export default function SandboxNotice() {
  return (
    <>
      <div className="rb-legal-pill">SBP Sandbox</div>
      <h1>Sandbox Notice</h1>
      <p>
        This pilot runs under the State Bank of Pakistan’s sandbox framework. Features may be
        limited, monitored, or changed without notice. The purpose is to test consumer outcomes,
        risk controls, and operational readiness.
      </p>

      <h2>What this means</h2>
      <ul>
        <li>Some flows are simulated or capped.</li>
        <li>Monitoring is enabled to detect and prevent misuse.</li>
        <li>You can exit the pilot at any time and request data deletion.</li>
      </ul>

      <h2>Issues & complaints</h2>
      <p>
        Email <a href="mailto:help@rentback.app">help@rentback.app</a>. We aim to acknowledge within
        1 business day and resolve within 7 business days.
      </p>
    </>
  );
}

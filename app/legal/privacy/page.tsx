export default function PrivacyPage() {
  return (
    <article>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ opacity: 0.75 }}>Last updated: Sept 2024 (demo)</p>
      <p style={{ marginTop: 12, lineHeight: 1.7 }}>
        This demo does not process real payments. We store minimal local data in your browser for feature functionality
        (demo payments, redemptions, event log) and optional analytics if you consent. You may clear your data anytime
        via the QA Panel (Reset Demo Data).
      </p>
      <h2 style={{ marginTop: 16, fontWeight: 700 }}>Data We Store</h2>
      <ul style={{ lineHeight: 1.7 }}>
        <li>LocalStorage entries for demo flows (client-side only).</li>
        <li>Optional logging to our Sheet endpoint when configured.</li>
      </ul>
      <h2 style={{ marginTop: 16, fontWeight: 700 }}>Contact</h2>
      <p>help@rentback.app</p>
    </article>
  );
}

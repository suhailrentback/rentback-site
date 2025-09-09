export const metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <article style={{ lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Privacy Policy</h1>
      <p style={{ opacity: 0.8 }}>
        Last updated: {new Date().toLocaleDateString("en-PK")}
      </p>

      <p>
        RentBack helps tenants pay rent conveniently while earning rewards, and helps landlords
        track incoming payments. This policy explains what information we collect and how we use it.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Information We Collect</h2>
      <ul>
        <li><b>Account & Profile:</b> name, email, basic KYC status (where applicable).</li>
        <li><b>Payment Demo Data:</b> amounts, landlord labels, timestamps, and status (demo only).</li>
        <li><b>Rewards Demo Data:</b> catalog items, redemptions, timestamps, and status.</li>
        <li><b>Technical:</b> browser/OS, device info, and UTM parameters for analytics.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>How We Use Information</h2>
      <ul>
        <li>To operate the app (including demo features) and improve UX.</li>
        <li>To analyze usage, performance, and troubleshoot issues.</li>
        <li>To communicate updates, security notices, and support responses.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Sharing & Disclosure</h2>
      <p>
        We do not sell personal data. We may share limited information with service providers
        (e.g., hosting/analytics) under strict contractual controls. We may disclose information to comply
        with applicable law, regulation, or legal process.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Security</h2>
      <p>
        Data in transit is protected with encryption. We apply least-privilege access and plan additional
        controls (2FA, device binding, audit logs) as we scale.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Retention & Deletion</h2>
      <p>
        We retain data only as long as needed for the purposes above or as required by law.
        You can request deletion of your information (subject to legal obligations).
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Children</h2>
      <p>
        RentBack is not directed to children under 13. If you believe a child has provided us personal data,
        please contact us to delete it.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Your Rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, or delete your information.
        Contact us to exercise these rights.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>Contact</h2>
      <p>
        Email: <a href="mailto:help@rentback.app">help@rentback.app</a>
      </p>
    </article>
  );
}

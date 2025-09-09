export const metadata = {
  title: "Terms of Service — RentBack",
  description: "Terms and conditions for using RentBack.",
};

export default function TermsPage() {
  return (
    <article style={{ lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Terms of Service</h1>
      <p style={{ opacity: 0.8 }}>
        Last updated: {new Date().toLocaleDateString("en-PK")}
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>1. Agreement</h2>
      <p>
        By accessing or using RentBack, you agree to these Terms. If you do not agree, do not use the Service.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>2. Eligibility</h2>
      <p>
        You must be of legal age and able to form a binding contract. You are responsible for maintaining the
        confidentiality of your account.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>3. Service Description</h2>
      <p>
        RentBack provides a way to track rent and interact with rewards. The current app includes demo flows only.
        No real charges or fund movements occur unless explicitly stated in future releases.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>4. Payments & Rewards</h2>
      <ul>
        <li>Demo payments and redemptions are simulated for product preview.</li>
        <li>Any offers are subject to availability and may change without notice.</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>5. Acceptable Use</h2>
      <p>
        You agree not to misuse the Service, including interfering with operation, attempting unauthorized access,
        or violating applicable laws.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>6. Intellectual Property</h2>
      <p>
        RentBack trademarks, logos, and content are owned by us or our licensors. You may not use them without permission.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>7. Disclaimers</h2>
      <p>
        The Service is provided “as is” without warranties of any kind. We disclaim all warranties to the fullest extent permitted by law.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, RentBack shall not be liable for indirect, incidental, special, or consequential damages.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>9. Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use after changes constitutes acceptance of the new Terms.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 20 }}>10. Contact</h2>
      <p>
        Email: <a href="mailto:help@rentback.app">help@rentback.app</a>
      </p>
    </article>
  );
}

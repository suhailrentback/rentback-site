// app/legal/layout.tsx
import "./legal.css";

export const metadata = {
  title: "Legal — RentBack",
  description: "Legal pages for RentBack.",
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="rb-legal-header">
          <div className="rb-legal-brand">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 11.5L12 4l9 7.5" />
              <path d="M5 10v9h14v-9" />
            </svg>
            RentBack
          </div>
          <a className="rb-legal-link" href="/" aria-label="Back to App">← Back to App</a>
        </header>
        <main className="rb-legal-main">
          <div className="rb-legal-card">{children}</div>
        </main>
      </body>
    </html>
  );
}

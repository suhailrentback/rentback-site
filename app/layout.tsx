Layout page code:   // app/layout.tsx
import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RentBack — Turn your rent into rewards",
  description: "Join the waitlist for early access.",
  metadataBase: new URL("https://rentback.app"), // adjust if you want
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#10b981" }],
  },
  openGraph: {
    title: "RentBack — Turn your rent into rewards",
    description:
      "Pay rent by our card, your bank, or any digital bank. Earn points and redeem for bills & shopping.",
    url: "https://rentback.app",
    type: "website",
    images: [{ url: "/og.png" }],
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentBack — Turn your rent into rewards",
    description:
      "Pay rent by our card, your bank, or any digital bank. Earn points and redeem for bills & shopping.",
    images: ["/og.png"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Configure your waitlist endpoint before any scripts run */}
        <Script id="rb-config" strategy="beforeInteractive">{`
          window.RB_WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbyGuYedmT5BLI9DXsb1DbqFTj5b86I7URHR1O6XeMuyd1fWAOxkID-lbqePiGNNKN0axg/exec";
          window.RB_WAITLIST_SECRET = "";
        `}</Script>

        {children}
      </body>
    </html>
  );
}

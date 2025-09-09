// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://rentback.app"),
  title: {
    default: "RentBack",
    template: "%s — RentBack",
  },
  description: "Turn your rent into rewards. Fast, simple payments with perks.",
  applicationName: "RentBack",
  appleWebApp: { capable: true, title: "RentBack" },
  formatDetection: { telephone: false },
  openGraph: {
    title: "RentBack",
    description: "Turn your rent into rewards.",
    url: "https://rentback.app",
    siteName: "RentBack",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentBack",
    description: "Turn your rent into rewards.",
    creator: "@rentback",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

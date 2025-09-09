// Server layout (no "use client")
import "./globals.css";
import type { Metadata } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://app.rentback.app";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "RentBack",
  description: "Turn your rent into rewards.",
  applicationName: "RentBack",
  openGraph: {
    title: "RentBack",
    description: "Turn your rent into rewards.",
    url: site,
    siteName: "RentBack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentBack",
    description: "Turn your rent into rewards.",
  },
  alternates: { canonical: site },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

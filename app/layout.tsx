import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RentBack — Turn your rent into rewards",
  description: "Join the waitlist for early access.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 antialiased">
        {/* Apps Script endpoint + optional shared secret */}
        <Script id="rb-config" strategy="beforeInteractive">
          {`
            window.RB_WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbyGuYedmT5BLI9DXsb1DbqFTj5b86I7URHR1O6XeMuyd1fWAOxkID-lbqePiGNNKN0axg/exec";
            window.RB_WAITLIST_SECRET = "";
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

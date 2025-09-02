import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "RentBack — Turn your rent into rewards",
  description: "Join the waitlist for early access.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="rb-config" strategy="beforeInteractive">
  {`window.RB_WAITLIST_ENDPOINT="https://script.google.com/macros/s/AKfycbw7CbAIzQZZSLP37YEmRQA5ySu-Z-J9Obizt8HEDWvP0gbN_FHPyqe1wrW8ejihVy6lQg/exec";
    window.RB_WAITLIST_SECRET="";`}
</Script>
        {children}
      </body>
    </html>
  );
}

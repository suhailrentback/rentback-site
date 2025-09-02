export const metadata = {
  title: "RentBack — Turn your rent into rewards",
  description: "Join the waitlist for early access.",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        import Script from "next/script";
// ...
<body>
  <Script id="rb-config" strategy="beforeInteractive">
    {`window.RB_WAITLIST_ENDPOINT="https://script.google.com/macros/s/XXXX/exec";
      window.RB_WAITLIST_SECRET="";`}
  </Script>
  {children}
</body>

        {children}</body>
    </html>
  );
}

import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="rb-payments" strategy="beforeInteractive">
          {`window.RB_PAYMENTS_ENDPOINT="https://script.google.com/macros/s/AKfycbwCqHgI_5wkWTTorP_803gULbkVDuhLLs_lQnKN9k5dl1NPJx7XKEHj8IOcIyIENZgm/exec";`}
        </Script>
        {children}
      </body>
    </html>
  );
}

// /app/layout.tsx
import React from "react";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Global RentBack config (before hydration) */}
        <Script id="rb-config" strategy="beforeInteractive">
          {`
            // Unified Apps Script endpoint (waitlist + payments + future redemptions)
            window.RB_WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbwCqHgI_5wkWTTorP_803gULbkVDuhLLs_lQnKN9k5dl1NPJx7XKEHj8IOcIyIENZgm/exec";
            window.RB_PAYMENTS_ENDPOINT  = "https://script.google.com/macros/s/AKfycbwCqHgI_5wkWTTorP_803gULbkVDuhLLs_lQnKN9k5dl1NPJx7XKEHj8IOcIyIENZgm/exec";
            // Optional shared secret (leave "" unless you set one in Apps Script)
            window.RB_WAITLIST_SECRET = "";
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}

// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RentBack",
  description: "Pay rent, earn rewards.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Don’t lock colors here; page controls theme */}
      <body>{children}</body>
    </html>
  );
}

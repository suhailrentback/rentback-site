// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RentBack",
  description: "Pay rent, earn rewards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // NOTE: do NOT set bg/text colors here. Let pages control them with Tailwind utilities.
    <html lang="en" suppressHydrationWarning>
      {/* Keep this neutral so page-level dark: classes can take effect */}
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

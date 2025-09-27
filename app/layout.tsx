// app/layout.tsx
import React from "react";

export const metadata = {
  title: "RentBack",
  description: "Pay rent. Earn rewards.",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
        {children}
      </body>
    </html>
  );
}

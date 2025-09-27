// app/layout.tsx
import "./globals.css"; // <-- this line makes Tailwind styles apply
import React from "react";

export const metadata = {
  title: "RentBack — Pay rent, earn rewards",
  description: "Pakistan-focused rent payments with rewards.",
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

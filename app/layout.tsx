export const metadata = {
  title: "RentBack — Turn your rent into rewards",
  description: "Join the waitlist for early access.",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

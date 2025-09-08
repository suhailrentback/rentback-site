// Server layout (no "use client")
import "./globals.css";

export const metadata = {
  title: "RentBack",
  description: "Turn your rent into rewards.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

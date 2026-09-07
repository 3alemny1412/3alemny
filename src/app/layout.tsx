import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3alemny",
  description: "Learn the terms. Speak the slang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="animate-enter">{children}</body>
    </html>
  );
}

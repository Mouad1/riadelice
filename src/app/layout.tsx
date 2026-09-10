import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LE RIAD DES DELICES | Fine Dining Restaurant",
  description: "Experience exquisite cuisine in an elegant atmosphere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

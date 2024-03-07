import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const inter2 = inter.className;

export const metadata: Metadata = {
  title: "Url Shortener",
  description: "Demonstration URL Shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#171717]">{children}</body>
    </html>
  );
}

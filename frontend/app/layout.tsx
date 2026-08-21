import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Critical Research Workflow",
  description:
    "Check a suspicious message or call with a calm, step-by-step research workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} bg-stone-100 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}

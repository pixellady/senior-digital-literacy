import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn the Signs, Protect Yourself",
  description:
    "Check a suspicious message or call. You're safe here, and you're never wrong to ask.",
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

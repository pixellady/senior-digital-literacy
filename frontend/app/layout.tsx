import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "500", "600"],
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
      <body
        className={`${lexend.variable} ${lexend.className} bg-white font-light text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

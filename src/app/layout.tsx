import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import link from "next/link";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lost & Found @ SDSU",
  description: "Locating lost items across the san diego state campus",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}
        <Link href="/reports" className="fixed bottom-4 right-4 rounded-full bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700">
        Create Item Report
        </Link>

      </body>
    </html>

  );
}

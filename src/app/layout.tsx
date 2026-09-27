import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { supabase } from "../lib/supabase/supabaseClient";
import Navbar from "../components/Navbar";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { data: { user } } = await supabase.auth.getUser()

  const loggedIn = (user ? true : false);
  return (
    <html
      lang="en"
      className={`font-sans h-full w-full antialiased bg-(--bg-primary) text-(--text-primary)`}
    >
      <body className="w-screen min-h-screen flex max-w-screen flex-col md:px-20.5 px-3">
        <Navbar loggedIn = {loggedIn}/>
        {children}
      </body>
    </html>
  );
}
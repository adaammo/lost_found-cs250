import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { supabase } from "../lib/supabase/supabaseClient";
import Navbar from "../components/Navbar";
import { callProfileService } from "../lib/fastapiClient";
import { UserDatabaseProfile } from "../lib/types";
import { authService } from "../lib/authConstant";
// OURS. NOT SUPABASES.
import { createClient } from "../lib/supabase/supabaseServer";

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
  {/** Very very specific. Layout.tsx AND page.tsx are server only files. */}
  {/** Supabase server allows access to cookies which is where session is stored. THIS ONLY WORKS WITH SERVER VERSION. */}
  const supabaseServer = await createClient();
  const { data: { session }, error } = await supabaseServer.auth.getSession();
  let user: UserDatabaseProfile | null = null;
  if (session) {
    const data = await authService.getProfile(session.access_token ?? "");
    if (data.ok) {
      user = data.profile;
    }
  }
  return (
    <html
      lang="en"
      className={`font-sans h-full w-full antialiased bg-(--bg-primary) text-(--text-primary)`}
    >
      <body className="w-screen min-h-screen flex max-w-screen flex-col md:px-20.5 px-3">
        <Navbar user={user} />
        {children}
      </body>
    </html>

  );
}
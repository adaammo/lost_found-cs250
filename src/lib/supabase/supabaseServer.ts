"use server"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
{/** 
    This code was copied directly from supabase's docs

    For reference, this is needed to handle cookie logic on server side only pages.
    An example of this for log in, when you want to check session on SSR page, it might return null due to the lack of access.
    This file is made to read cookies from 
    @return a supabase server client.
     */}
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet, _headers) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            console.error("COOKIE_ERROR")
          }
        },
      },
    }
  )
}


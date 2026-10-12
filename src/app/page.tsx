"use server"
import { fetchItems } from "../lib/fastapiClient"
import { getUser } from "../lib/supabase/getUser";
import HomePage from "../components/HomePage"
import { createClient } from "../lib/supabase/supabaseServer";
import { authService } from "../lib/authConstant";
import { UserDatabaseProfile } from "../lib/types";

export default async function Home() {
  const data = await fetchItems()
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
  if(!data.ok){
    return (
      <div className = "flex w-full h-full items-center justify-center">
        {data.error}
        </div>
    )
  }

  // Attach a isOwner logic for boolean evaluations like can they edit or can they delete?
  const isOwner = !!data.profiles[user?.user_id ?? '']
 return(
  <HomePage items = {data.items} user = {user} profiles = {data.profiles}/>
 )
}

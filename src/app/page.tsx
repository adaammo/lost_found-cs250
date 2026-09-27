"use server"
import { fetchItems } from "../lib/fastapiClient"
import { getUser } from "../lib/supabase/getUser";
import HomePage from "../components/HomePage"

export default async function Home() {
  const data = await fetchItems()
  const isUser = await getUser();
  if(!data.ok){
    return (
      <div className = "flex w-full h-full items-center justify-center">
        {data.error}
        </div>
    )
  }
 return(
  <HomePage items = {data.items} isUser = {isUser}/>
 )
}

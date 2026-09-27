import { User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

export async function getUser(): Promise<boolean> {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
        return false
    }
    return true
}
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../supabase/supabaseClient";
import { SignUp, LogIn } from "../supabase/sessions/client";
class UserAuthService {
    private supabase: SupabaseClient;
    private isAuthenticated: boolean;
    constructor(){
        this.supabase = supabase;
        // in reality though, supabase has a .getUser method thatll tell you immediatley if it find a valid jwt token or not
        this.isAuthenticated = false;
    }
    async registerAccount(email: string, password: string) : Promise<{ok: true} | {ok: false, error: string}>{
        const res = await SignUp(email, password);
        if(res.ok){
            this.isAuthenticated = true;
            // calls API service to create a createBasicProfile()
            return {ok: true}
        }
        return {ok: false, error: res.error};
    }
    async signIn(email: string, password: string) : Promise<{ ok: false, error: string } | { ok: true }> {
        const result = await LogIn(email, password);
        if (result.ok) {
            this.isAuthenticated = true;
        }
        return result;
    }

    async logout(): Promise<void> {
        await this.supabase.auth.signOut();
        this.isAuthenticated = false;
        return;
    }
}

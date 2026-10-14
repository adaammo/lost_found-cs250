import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../supabase/supabaseClient";
import { SignUp, LogIn } from "../supabase/sessions/client";
import { generateUsername } from "unique-username-generator";
import { callDefaultProfileService, callProfileService } from "../fastapiClient";
import { UserDatabaseProfile } from "../types";
export class UserAuthService {
    private supabase: SupabaseClient;
    private isAuthenticated: boolean;
    constructor() {
        this.supabase = supabase;
        // in reality though, supabase has a .getUser method thatll tell you immediatley if it find a valid jwt token or not
        this.isAuthenticated = false;
    }
    /** When a user signs up, 
     * to need to register them a basic
     *  profile thatll have a generated 
     * username and user_id
     * UPDATE: 10/12/2026
     * This now adds first and last to register form.
     * @return a promise of an ok, boolean, and an error if nessessary 
     * */
    async registerAccount(email: string, password: string, first_name: string, last_name: string | null): Promise<{ ok: true } | { ok: false, error: string }> {
        const res = await SignUp(email, password);
        if (res.ok) {
            this.isAuthenticated = true;
            const fake_username = generateUsername("-", 1, 15);
            // SINCE RES.OK HIT, THEY HAVE A SESSION. use supabase.getSession() FOR THEIR JWT

            const { data: { session } } = await this.supabase.auth.getSession();
            if (!session) {
                return { ok: false, error: "Something happened making a session. Please try to log in." }
            }
            // Session token
            const token = session.access_token
            const result = await callDefaultProfileService(fake_username, token, first_name, last_name)
            if (!result.ok) {
                return { ok: false, error: result.error }
            }
            return { ok: true }
        }
        return { ok: false, error: res.error };
    }
    /** Handled by supabase on nextjs. 
     * This is a very easy way to get a user to log in fast and simple
    * @return a promise of an ok, boolean, and an error if nessessary .
    * */
    async signIn(email: string, password: string): Promise<{ ok: false, error: string } | { ok: true }> {
        const result = await LogIn(email, password);
        if (result.ok) {
            this.isAuthenticated = true;
        }
        return result;
    }
    /**
     * New functions not yet added to UML diagrams. Added code 10/11/2026
     * wraps FastAPI client calls to make it simpler getting the profile everywhere.
     * @return A users database profile
     */

    async getProfile(token: string): Promise<{ok: true, profile: UserDatabaseProfile | null} | {ok: false, error: string}> {
        const data = await callProfileService(token)
        if(!data.ok){
            return {ok: false, error: data.error}
        }
        return {ok: true, profile: data.profile}
    }
    async logout(): Promise<void> {
        await this.supabase.auth.signOut();
        this.isAuthenticated = false;
        return;
    }
}

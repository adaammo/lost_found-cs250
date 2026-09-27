import { supabase } from "../supabaseClient";

export async function LogIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return {
            ok: false,
            error: error.message,
        };
    }
    return {
        ok: true,
        user: data.user,
    };
}
export async function SignUp(first_name: string, last_name: string | null, email: string, password: string): Promise<{ ok: false, error: string } | { ok: true }> {
    if (!email || !password) {
        return {
            ok: false,
            error: "All required fields not filled."
        }
    }
    if (password.length < 6) {
        return {
            ok: false,
            error: "Password must be at least 6 characters."
        }
    }
    const passCheck = /[!@#$%^&*(),.?":{}|<>]/
    if (!passCheck.test(password)) {
        return {
            ok: false,
            error: "Password must include a special character."
        }
    }
    const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
            data: {
                first_name: first_name.trim(),
                last_name: last_name?.trim(),
            },
        }
    });
    if (error) {
        return { ok: false, error: error.message };
    }
    return { ok: true }
}
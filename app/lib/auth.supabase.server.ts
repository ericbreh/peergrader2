import { redirect } from "react-router";
import { createSupabaseServerClient } from "./supabase.server";
import setUser from "./queries.server";

export const signUp = async (
    request: Request,
    successRedirectPath: string
) => {
    const supabase = createSupabaseServerClient(request);
    const formData = await request.formData();
    const { data, error } = await supabase.client.auth.signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    })

    if (error) {
        return { error: error.message };
    }

    // If sign up is successful, add the user to the accounts table
    let databaseError;
    if (data.user) {
        const isTeacher = formData.get("accountType") as string === "teacher";
        databaseError = await setUser(supabase, {
            uid: data.user.id,
            email: data.user.email!,
            is_teacher: isTeacher,
            first_name: formData.get("firstName") as string,
            last_name: formData.get("lastName") as string,
            profile_image: undefined,
        });

        if (!databaseError) {
            throw redirect(successRedirectPath, { headers: supabase.headers });
        }
    }
    return { error: databaseError };
}

export const signInWithPassword = async (
    request: Request,
    credentials: { email: string; password: string },
    successRedirectPath: string
) => {
    const supabase = createSupabaseServerClient(request);
    const { error } = await supabase.client.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
    });

    if (!error) {
        throw redirect(successRedirectPath, { headers: supabase.headers });
    }

    return { error: error.message };
};

export const signInWithOAuth = async (
    request: Request,
    successRedirectPath: string
) => {
    const supabase = createSupabaseServerClient(request);
    const { error } = await supabase.client.auth.signInWithOAuth({
        provider: "google",
    })

    if (!error) {
        throw redirect(successRedirectPath, { headers: supabase.headers });
    }

    return { error: error.message };
};

export const signOut = async (
    request: Request,
    successRedirectPath: string = "/"
) => {
    const supabase = createSupabaseServerClient(request);
    const { error } = await supabase.client.auth.signOut();

    if (!error) {
        throw redirect(successRedirectPath, { headers: supabase.headers });
    }

    return { error: error.message };
};

export const getUser = async (request: Request) => {
    const supabase = createSupabaseServerClient(request);

    const { data: { user } } = await supabase.client.auth.getUser();
    return user || null;
};

export async function requireUser(request: Request) {
    const user = await getUser(request);
    if (!user) {
        throw redirect("/login");
    }
    return user;
}

export const isUserLoggedIn = async (request: Request) => {
    const supabase = createSupabaseServerClient(request);

    const {
        data: { user },
    } = await supabase.client.auth.getUser();

    return !!user;
};
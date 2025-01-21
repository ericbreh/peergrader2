import { createSupabaseServerClient } from "~/utils/supabase.server.js";
import { redirect } from "react-router";
import type { Route } from ".react-router/types/app/routes/auth/+types/callback.ts";

export const loader = async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const next = url.searchParams.get("next") ?? "/";

    if (!code) {
        console.error("No code received in callback");
        return redirect("/login?error=no_code");
    }

    const supabase = createSupabaseServerClient(request);
    const { data, error } = await supabase.client.auth.exchangeCodeForSession(code);

    if (error) {
        console.error("Error exchanging code for session:", error);
        return redirect("/login?error=auth_failed");
    }

    if (!data.session) {
        console.error("No session received");
        return redirect("/login?error=no_session");
    }

    return redirect(next);
};
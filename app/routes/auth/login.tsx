import { redirect, useActionData } from "react-router";
import { LoginForm } from "../../components/login-form"
import { isUserLoggedIn, signInWithPassword } from "~/lib/auth.supabase.server";
import {
    Alert,
    AlertTitle,
} from "~/components/ui/alert"
import type { Route } from ".react-router/types/app/routes/auth/+types/login.ts";

// Loader function to check if the user is already logged in
export const loader = async ({ request }: Route.LoaderArgs) => {
    if (await isUserLoggedIn(request)) {
        throw redirect("/dashboard");
    }

    return null;
};

// Action function to handle user login
export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const actionType = formData.get("_action");

    if (actionType === "google") {
        return {
            error: "Google sign-in is not yet available"
        };
    }

    const credentials = {
        email: formData.get("email") as string,
        password: formData.get("password") as string
    };
    return await signInWithPassword(request, credentials, "/dashboard");
};

export default function Login() {
    const actionResponse = useActionData<typeof action>();
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                {actionResponse?.error && (
                    <Alert variant="destructive" className="mb-2">
                        <AlertTitle>{actionResponse.error}</AlertTitle>
                    </Alert>
                )}
                <LoginForm />
            </div>
        </div>
    )
}

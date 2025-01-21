import { redirect, useActionData } from "react-router";
import { isUserLoggedIn, signUp } from "~/lib/auth.supabase.server.js";
import {
    Alert,
    AlertTitle,
} from "~/components/ui/alert"
import type { Route } from ".react-router/types/app/routes/auth/+types/signup";
import { SignupForm } from "~/components/signup-form";

// Loader function to check if the user is already logged in
export const loader = async ({ request }: Route.LoaderArgs) => {
    if (await isUserLoggedIn(request)) {
        throw redirect("/dashboard");
    }

    return null;
};

// Action function to handle user sign up
export const action = async ({ request }: Route.ActionArgs) => {
    const error = await signUp(request, "/dashboard");

    return error;
};

export default function Signup() {
    const actionResponse = useActionData<typeof action>();
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                {actionResponse?.error && (
                    <Alert variant="destructive" className="mb-2">
                        <AlertTitle>{actionResponse.error}</AlertTitle>
                    </Alert>
                )}
                <SignupForm />
            </div>
        </div>
    )
}

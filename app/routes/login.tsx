import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { LoginForm } from "../components/login-form"
import { isUserLoggedIn, signInWithPassword } from "~/lib/auth.supabase.server";
import { useActionData } from "@remix-run/react";
import {
    Alert,
    AlertTitle,
} from "~/components/ui/alert"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    if (await isUserLoggedIn(request)) {
        throw redirect("/dashboard");
    }

    return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const error = await signInWithPassword(request, "/dashboard");

    return error;
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

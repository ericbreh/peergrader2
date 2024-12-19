import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { LoginForm } from "../components/login-form"
import { isUserLoggedIn, signInWithPassword } from "~/lib/auth.supabase.server";
import { useActionData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    if (await isUserLoggedIn(request)) {
        throw redirect("/user");
    }

    return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const error = await signInWithPassword(request, "/user");

    return error;
};

export default function Page() {
    const actionResponse = useActionData<typeof action>();
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                {!actionResponse ? null : <h3>{actionResponse?.error}</h3>}
                <LoginForm />
            </div>
        </div>
    )
}

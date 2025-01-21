import { Outlet, redirect } from "react-router";
import { requireUser } from "~/utils/auth.supabase.server";
import type { Route } from ".react-router/types/app/routes/layouts/+types/authenticated";

export async function loader({ request }: Route.LoaderArgs) {
    try {
        await requireUser(request);
        return null;
    } catch {
        throw redirect("/login");
    }
}

export default function AuthenticatedLayout() {
    return <Outlet />;
}

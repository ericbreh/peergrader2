import { Navigation } from "../../components/navigation";
import { Outlet, useLoaderData } from "react-router";
import { getUser } from "~/lib/auth.supabase.server";
import { getUserById } from "~/lib/queries.server";
import type { Route } from ".react-router/types/app/components/layouts/+types/navbar-layout";

export async function loader({ request }: Route.LoaderArgs) {
    const supabaseUser = await getUser(request);
    let user = null;
    if (supabaseUser) {
        user = await getUserById(supabaseUser.id);
    }
    return { user };
}

export default function NavbarLayout() {
    const { user } = useLoaderData<typeof loader>();
    return (
        <>
            <Navigation user={user} />
            <Outlet />
        </>
    );
}
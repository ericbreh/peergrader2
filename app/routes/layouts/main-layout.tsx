import { Navigation } from "../../components/navigation";
import { Outlet, useLoaderData } from "react-router";
import { getUser } from "~/lib/auth.supabase.server";
import { createSupabaseServerClient } from "~/lib/supabase.server";
import { getUserById } from "~/lib/queries.server";
import type { Route } from ".react-router/types/app/routes/layouts/+types/main-layout";

export async function loader({ request }: Route.LoaderArgs) {
    const supabaseUser = await getUser(request);
    let user = null;
    if (supabaseUser) {
        const supabase = createSupabaseServerClient(request);
        user = await getUserById(supabase, supabaseUser.id);
    }
    return { user };
}

export default function MainLayout() {
    const { user } = useLoaderData<typeof loader>();
    return (
        <>
            <Navigation user={user} />
            <Outlet />
        </>
    );
}

interface PageHeaderProps {
    children: React.ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
    return (
        <header className="border-b py-6">
            <div className="max-w-7xl mx-auto px-4">
                {children}
            </div>
        </header>
    );
}

export function PageContent({ children }: PageHeaderProps) {
    return (
        <main className="max-w-7xl mx-auto px-4 py-6">
            {children}
        </main>
    );
}

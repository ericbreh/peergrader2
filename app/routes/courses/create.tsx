import { createSupabaseServerClient } from "~/lib/supabase.server.js";
import { useLoaderData } from "react-router";
import type { Route } from ".react-router/types/app/routes/courses/+types/create";
import { PageHeader, PageContent } from "~/routes/layouts/main-layout";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { requireUser } from "~/lib/auth.supabase.server";
import { getUserById } from "~/lib/queries.server";

export async function loader({ request }: Route.LoaderArgs) {
    const supabaseUser = await requireUser(request);
    const supabase = createSupabaseServerClient(request);
    const user = await getUserById(supabase, supabaseUser.id);
    return {
        user: user,
    }
}

export default function Create() {
    const data = useLoaderData<typeof loader>();

    if (!data.user?.is_teacher) {
        return (
            <PageContent>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        You are not authorized to create courses.
                    </AlertDescription>
                </Alert>
            </PageContent>
        );
    }

    return (
        <>
            <PageHeader>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Create Course</h1>
                {/* name, number, start, end */}
            </PageHeader>
        </>
    );
}

import { createSupabaseServerClient } from "~/lib/supabase.server";
import { useLoaderData } from "react-router";
import { getCourseData } from "~/lib/queries.server";
import type { Route } from "../routes/+types/dashboard.ts";
import { PageHeader, PageContent } from "~/components/layouts/main-layout";

// Loader function to fetch user courses
export async function loader({ request, params }: Route.LoaderArgs) {
    if (!params.id) {
        throw new Error("Course ID is required");
    }
    const supabase = createSupabaseServerClient(request);
    return getCourseData(supabase, params.id);
}

export default function Dashboard() {
    const course = useLoaderData<typeof loader>();

    return (
        <>
            <PageHeader>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{course.name}</h1>
            </PageHeader>
        </>
    );
}

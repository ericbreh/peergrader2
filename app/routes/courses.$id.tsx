import { createSupabaseServerClient } from "~/lib/supabase.server";
import { useLoaderData } from "react-router";
import { getCourseData } from "~/lib/queries.server";
import type { Route } from "../routes/+types/dashboard.ts";
import { PageHeader, PageContent } from "~/components/layouts/main-layout";
import type { Course } from "~/types";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Loader function to fetch user courses
export async function loader({ request, params }: Route.LoaderArgs): Promise<Course> {
    if (!params.id) {
        throw new Error("Course ID is required");
    }
    const supabase = createSupabaseServerClient(request);
    return getCourseData(supabase, params.id);
}

export default function Dashboard() {
    const course = useLoaderData<typeof loader>();

    if (!course) {
        return (
            <PageContent>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Course not found. The course might have been deleted or you don't have access to it.
                    </AlertDescription>
                </Alert>
            </PageContent>
        );
    }

    return (
        <>
            <PageHeader>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{course.name}</h1>
            </PageHeader>
        </>
    );
}

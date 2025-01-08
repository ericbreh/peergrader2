import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { createSupabaseServerClient } from "~/lib/supabase.server";
import { Link, useLoaderData } from "react-router";
import type { Course } from "~/types";
import { requireUser } from "~/lib/auth.supabase.server";
import { getUserCourses } from "~/lib/queries.server";
import type { Route } from "../routes/+types/dashboard.ts";
import { PageHeader, PageContent } from "~/components/layouts/main-layout";

// Loader function to fetch user courses
export async function loader({ request }: Route.LoaderArgs) {
    const user = await requireUser(request);
    const supabase = createSupabaseServerClient(request);
    return getUserCourses(supabase, user.id);
}

export default function Dashboard() {
    const courses = useLoaderData<typeof loader>();

    return (
        <>
            <PageHeader>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Dashboard</h1>
            </PageHeader>
            <PageContent>
                <div className="grid grid-cols-3 gap-8">
                    {courses.map((course: Course) => (
                        <Link to={`/courses/${course.course_id}`} key={course.course_id}>
                            <Card className="transition-colors hover:bg-muted">
                                <CardHeader>
                                    <CardTitle>{course.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <span className="break-all">{course.course_id}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </PageContent>
        </>
    );
}

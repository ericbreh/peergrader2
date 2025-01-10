import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { createSupabaseServerClient } from "~/lib/supabase.server";
import { Link, useLoaderData } from "react-router";
import type { Course } from "~/types";
import { requireUser } from "~/lib/auth.supabase.server";
import { getUserById, getUserCourses } from "~/lib/queries.server";
import type { Route } from "../routes/+types/dashboard.ts";
import { PageHeader, PageContent } from "~/components/layouts/main-layout";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Loader function to fetch user courses
export async function loader({ request }: Route.LoaderArgs) {
    const supabaseUser = await requireUser(request);
    const supabase = createSupabaseServerClient(request);
    const user = await getUserById(supabase, supabaseUser.id);
    const courses = await getUserCourses(supabase, user);
    return {
        courses: courses,
        user: user,
    }
}

export default function Dashboard() {
    const data = useLoaderData<typeof loader>();

    if (data.courses.length === 0) {
        return (
            <PageContent>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        No courses availible.
                    </AlertDescription>
                </Alert>
            </PageContent>
        );
    }

    return (
        <>
            <PageHeader>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"> {data.user?.is_teacher ? 'Teacher Dashboard' : 'Student Dashboard'}</h1>
            </PageHeader>
            <PageContent>
                <div className="grid grid-cols-3 gap-8">
                    {/* Filter out null courses */}
                    {data.courses.filter((course): course is NonNullable<Course> => course !== null).map((course) => (
                        <Link to={`/courses/${course.course_id}`} key={course.course_id}>
                            <Card className="transition-colors hover:bg-muted">
                                <CardHeader>
                                    <CardTitle>{course.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <span className="break-all line-clamp-1">{course.course_id}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </PageContent>
        </>
    );

}

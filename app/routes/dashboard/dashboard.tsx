import { createSupabaseServerClient } from "~/lib/supabase.server.js";
import { useLoaderData } from "react-router";
import type { Course } from "~/types";
import { requireUser } from "~/lib/auth.supabase.server.js";
import { getUserById, getUserCourses } from "~/lib/queries.server.js";
import type { Route } from ".react-router/types/app/routes/dashboard/+types/dashboard";
import { PageHeader, PageContent } from "~/routes/layouts/main-layout";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import CourseCard from "~/components/course-card";
import { Separator } from "~/components/ui/separator";

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

    // sort courses into current and past
    const now = new Date();
    const { currentCourses, pastCourses } = data.courses
        .filter((course): course is NonNullable<Course> => course !== null)
        .reduce((acc, course) => {
            if (!course.end_date || new Date(course.end_date) > now) {
                acc.currentCourses.push(course);
            } else {
                acc.pastCourses.push(course);
            }
            return acc;
        }, { currentCourses: [] as NonNullable<Course>[], pastCourses: [] as NonNullable<Course>[] });

    return (
        <>
            <PageHeader>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {data.user?.is_teacher ? 'Teacher Dashboard' : 'Student Dashboard'}
                </h1>
            </PageHeader>
            <PageContent>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Current Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentCourses.map((course) => (
                            <CourseCard key={course.course_id} course={course} />
                        ))}
                    </div>
                </div>

                {pastCourses.length > 0 && (
                    <>
                        <Separator className="my-8" />
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight">Past Courses</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {pastCourses.map((course) => (
                                    <CourseCard key={course.course_id} course={course} />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </PageContent>
        </>
    );

}

import { createSupabaseServerClient } from "~/lib/supabase.server.js";
import type { Course } from "~/types";
import { requireUser } from "~/lib/auth.supabase.server.js";
import { getUserById, getUserCourses } from "~/lib/queries.server.js";
import type { Route } from ".react-router/types/app/routes/dashboard/+types/dashboard";
import { PageHeader, PageContent } from "~/routes/layouts/main-layout";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import CourseCard from "~/components/course-card";
import { Separator } from "~/components/ui/separator";
import { Link, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";

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

const CourseGrid = ({ title, courses }: { title: string, courses: NonNullable<Course>[] }) => (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
                <CourseCard key={course.course_id} course={course} />
            ))}
        </div>
    </div>
);

export default function Dashboard() {
    const data = useLoaderData<typeof loader>();

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

    const hasCourses = currentCourses.length > 0 || pastCourses.length > 0;

    return (
        <>
            <PageHeader>
                <div className="flex justify-between items-center">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {data.user?.is_teacher ? 'Teacher Dashboard' : 'Student Dashboard'}
                    </h1>
                    {data.user?.is_teacher && (
                        <Button asChild>
                            <Link to="/courses/create">Create Course</Link>
                        </Button>
                    )}
                </div>
            </PageHeader>

            {!hasCourses && (
                <PageContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>No courses yet</AlertTitle>
                        <AlertDescription>
                            {data.user?.is_teacher ? 'Create a course to get started.' : 'Join a course to get started.'}
                        </AlertDescription>
                    </Alert>
                </PageContent>
            )}

            {hasCourses && (
                <PageContent>
                    {currentCourses.length > 0 && (
                        <CourseGrid title="Current Courses" courses={currentCourses} />
                    )}

                    {currentCourses.length > 0 && pastCourses.length > 0 && (
                        <Separator className="my-8" />
                    )}

                    {pastCourses.length > 0 && (
                        <CourseGrid title="Past Courses" courses={pastCourses} />
                    )}
                </PageContent>
            )}
        </>
    );
}

import type { Course } from "~/types";
import { requireUser } from "~/lib/auth.supabase.server.js";
import { getUserById, getUserCourses } from "~/lib/queries.server.js";
import type { Route } from ".react-router/types/app/routes/dashboard/+types/dashboard";
import { PageContent, PageTitle } from "~/components/layouts/main-layout";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import CourseCard from "~/components/course-card";
import { Separator } from "~/components/ui/separator";
import { Link, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { JoinCourseDialog } from "~/components/join-course-dialog";

// Loader function to fetch user courses
export async function loader({ request }: Route.LoaderArgs) {
  const supabaseUser = await requireUser(request);
  const user = await getUserById(supabaseUser.id);
  const courses = await getUserCourses(user);
  return {
    courses: courses,
    user: user,
  }
}

const CourseGrid = ({ title, courses }: { title: string, courses: Course[] }) => (
  <div className="space-y-4">
    <p className="text-xl text-muted-foreground">{title}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course.course_id} course={course} />
      ))}
    </div>
  </div>
);

// teacher and student
export default function Dashboard() {
  const data = useLoaderData<typeof loader>();

  // sort courses into current and past
  const now = new Date();
  const { currentCourses, pastCourses } = data.courses
    .filter((course): course is Course => course !== null)
    .reduce((acc, course) => {
      if (!course.end_date || new Date(course.end_date) > now) {
        acc.currentCourses.push(course);
      } else {
        acc.pastCourses.push(course);
      }
      return acc;
    }, { currentCourses: [] as Course[], pastCourses: [] as Course[] });

  const hasCourses = currentCourses.length > 0 || pastCourses.length > 0;

  return (
    <>
      <PageContent>
        <div className="flex justify-between items-center">
          <PageTitle>Dashboard</PageTitle>
          {data.user?.is_teacher ? (
            <Button asChild>
              <Link to="/courses/create">Create Course</Link>
            </Button>
          ) : (
            <JoinCourseDialog />
          )}
        </div>

        {!hasCourses && (
          <div>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No courses yet</AlertTitle>
              <AlertDescription>
                {data.user?.is_teacher ? 'Create a course to get started.' : 'Join a course to get started.'}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {hasCourses && (
          <div>
            {currentCourses.length > 0 && (
              <CourseGrid title="Current Courses" courses={currentCourses} />
            )}

            {currentCourses.length > 0 && pastCourses.length > 0 && (
              <Separator className="my-8" />
            )}

            {pastCourses.length > 0 && (
              <CourseGrid title="Past Courses" courses={pastCourses} />
            )}
          </div>
        )}
      </PageContent>
    </>
  );
}

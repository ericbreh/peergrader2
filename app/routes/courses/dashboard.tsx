import { useLoaderData } from "react-router";
import { getCourseData } from "~/lib/queries.server.js";
import type { Route } from ".react-router/types/app/routes/courses/+types/dashboard";
import type { Course } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { format } from "date-fns";
import { PageTitle } from "~/components/layouts/main-layout";

// Loader function to fetch user courses
export async function loader({ params }: Route.LoaderArgs): Promise<Course> {
  return getCourseData(params.course_id);
}

// teacher and student
export default function CourseDashboard() {
  const course = useLoaderData<typeof loader>();

  return (
    <>
      <PageTitle>{course.name}</PageTitle>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Course Number</p>
              <p className="font-medium">{course.number}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Join Code</p>
              <p className="font-medium">{course.join_code}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">{format(new Date(course.start_date), 'PP')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">End Date</p>
              <p className="font-medium">{format(new Date(course.end_date), 'PP')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

import { useLoaderData } from "react-router";
import { getCourseData } from "~/lib/queries.server.js";
import type { Route } from ".react-router/types/app/routes/courses/+types/dashboard";
import type { Course } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PageTitle } from "~/components/layouts/main-layout";
import { Progress } from "~/components/ui/progress";
import { Calendar } from "~/components/ui/calendar";
import { format, differenceInCalendarMonths } from "date-fns";

// Loader function to fetch user courses
export async function loader({ params }: Route.LoaderArgs): Promise<Course> {
  return getCourseData(params.course_id);
}

// teacher and student
export default function CourseDashboard() {
  const course = useLoaderData<typeof loader>();

  const today = new Date();
  const startDate = new Date(course.start_date);
  const endDate = new Date(course.end_date);
  const progress = Math.max(0, Math.min(100,
    ((today.getTime() - startDate.getTime()) /
      (endDate.getTime() - startDate.getTime())) * 100
  ));

  const monthsNeeded = Math.min(differenceInCalendarMonths(endDate, startDate) + 1, 5);

  const dateRange = {
    before: { from: startDate, to: new Date(today.setHours(0,0,0,0) - 86400000) },
    after: { from: new Date(today.setHours(0,0,0,0) + 86400000), to: endDate }
  };

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <div className="grid gap-6">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Course Number</p>
                <p className="font-medium">{course.number}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Join Code</p>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-meduim">{course.join_code}</code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} />
              <div className="flex justify-between mt-2">
                <div>
                  <p className="font-medium">{format(startDate, 'PP')}</p>
                  <p className="text-sm text-muted-foreground">Start</p>
                </div>
                <div>
                  <p className="font-medium">{format(today, 'PP')}</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div>
                  <p className="font-medium">{format(endDate, 'PP')}</p>
                  <p className="text-sm text-muted-foreground">End</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={today}
              selected={today}
              modifiers={{ 
                range: [dateRange.before, dateRange.after]
              }}
              modifiersStyles={{
                range: {
                  backgroundColor: 'hsl(var(--accent))',
                }
              }}
              numberOfMonths={monthsNeeded}
              disabled={{ before: startDate, after: endDate }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

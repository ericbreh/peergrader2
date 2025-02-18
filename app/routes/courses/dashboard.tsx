import { useLoaderData } from "react-router";
import { getCourseData } from "~/lib/queries.server.js";
import type { Route } from ".react-router/types/app/routes/courses/+types/dashboard";
import type { Course } from "~/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { format } from "date-fns";
import { H2, InlineCode, Muted, P } from "~/components/ui/typography";

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

  // const monthsNeeded = Math.min(differenceInCalendarMonths(endDate, startDate) + 1, 5);

  // const dateRange = {
  //   before: { from: startDate, to: new Date(today.setHours(0, 0, 0, 0) - 86400000) },
  //   after: { from: new Date(today.setHours(0, 0, 0, 0) + 86400000), to: endDate }
  // };

  return (
    <>
      <H2 className="pb-4">Dashboard</H2>
      <div className="flex flex-1 flex-col gap-4 ">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div className="flex-1">
                <Muted>Join Code </Muted>
                <InlineCode>{course.join_code}</InlineCode>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Course Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} />
              <div className="flex justify-between mt-2">
                <div>
                  <P>{format(startDate, 'PP')}</P>
                  <Muted>Start</Muted>
                </div>
                <div>
                  <P>{format(today, 'PP')}</P>
                  <Muted>Today</Muted>
                </div>
                <div>
                  <P>{format(endDate, 'PP')}</P>
                  <Muted>End</Muted>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Time Sensative Tasks</CardTitle>
          </CardHeader>
        </Card>
        {/* <Card>
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
        </Card> */}
      </div>
    </>
  );
}

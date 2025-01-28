import { useLoaderData } from "react-router";
import { getCourseData } from "~/lib/queries.server.js";
import type { Route } from ".react-router/types/app/routes/courses/+types/dashboard";
import { PageContent } from "~/components/layouts/main-layout";
import type { Course } from "~/types";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { format } from "date-fns";

// Loader function to fetch user courses
export async function loader({ params }: Route.LoaderArgs): Promise<Course> {
    return getCourseData(params.id);
}

export default function Course() {
    const course = useLoaderData<typeof loader>();

    if (!course) {
        return (
            <PageContent>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Course not found. The course might have been deleted or you don&apos;t have access to it.
                    </AlertDescription>
                </Alert>
            </PageContent>
        );
    }

    return (
        <>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
                {course.name}
            </h2>
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

                <Card>
                    <CardHeader>
                        <CardTitle>Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Assignments table will go here */}
                    </CardContent>
                </Card>
            </div>

        </>
    );
}

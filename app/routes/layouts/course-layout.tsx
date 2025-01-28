import { SidebarProvider } from "~/components/ui/sidebar"
import { CourseSidebar } from "~/components/course-sidebar"
import { Outlet, redirect, useLoaderData } from "react-router"
import { PageContent } from "./main-layout";
import type { Route } from ".react-router/types/app/routes/layouts/+types/course-layout";
import { getCourseData } from "~/lib/queries.server";
import { Course } from "~/types";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";

export async function loader({ params }: Route.LoaderArgs): Promise<Course> {
    if (!params.id) throw redirect("/courses");
    return getCourseData(params.id);
}

export default function CourseLayout() {
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
            <SidebarProvider>
                <div className="relative flex h-full w-full">
                    <CourseSidebar course={course} />
                    <div className="w-full max-w-7xl px-4 py-6 mx-14">
                        <Outlet />
                    </div>
                </div>
            </SidebarProvider>
        </>
    );
}

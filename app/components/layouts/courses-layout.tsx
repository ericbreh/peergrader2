import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { CourseSidebar } from "~/components/course-sidebar"
import { Outlet, redirect, useLoaderData } from "react-router"
import { PageContent } from "~/components/layouts/main-layout";
import type { Route } from ".react-router/types/app/components/layouts/+types/courses-layout";
import { getCourseData, getUserById } from "~/lib/queries.server";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { requireUser } from "~/lib/auth.supabase.server";
import { Separator } from "../ui/separator";
import { Muted } from "../ui/typography";

export async function loader({ params, request }: Route.LoaderArgs) {
    if (!params.course_id) throw redirect("/courses");
    const supabaseUser = await requireUser(request);
    const user = await getUserById(supabaseUser.id);
    const course = await getCourseData(params.course_id);
    return {
        course: course,
        user: user,
    }
}

export default function CoursesLayout() {
    const data = useLoaderData<typeof loader>();

    if (!data.course) {
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
                    <CourseSidebar course={data.course} user={data.user} />
                    <div className="w-full px-6 py-4">
                        <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear pb-4">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Muted>{data.course.name}</Muted>
                            </div>
                        </header>
                        <Outlet />
                    </div>
                </div>
            </SidebarProvider>
        </>
    );
}

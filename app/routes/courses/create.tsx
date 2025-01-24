import { useLoaderData, redirect, useActionData } from "react-router";
import crypto from "crypto";
import type { Route } from ".react-router/types/app/routes/courses/+types/create";
import { PageHeader, PageContent } from "~/routes/layouts/main-layout";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { requireUser } from "~/lib/auth.supabase.server";
import { createCourse, getUserById } from "~/lib/queries.server";
import { CreateCourseForm } from "~/components/create-course-form";

export const loader = async ({ request }: Route.LoaderArgs) => {
    const supabaseUser = await requireUser(request);
    const user = await getUserById(supabaseUser.id);
    return {
        user: user,
    }
}

export const action = async ({ request }: Route.ActionArgs) => {
    const supabaseUser = await requireUser(request);
    const formData = await request.formData();

    const course_id = crypto.randomUUID();

    const { error } = await createCourse(
        course_id,
        formData.get("name") as string,
        supabaseUser.id,
        formData.get("number") as string,
        formData.get("start_date") as string,
        formData.get("end_date") as string
    );

    if (error) {
        return { error: error.message };
    }

    return redirect(`/courses/${course_id}`);
}

export default function Create() {
    const data = useLoaderData<typeof loader>();
    const actionResponse = useActionData<typeof action>();

    if (!data.user?.is_teacher) {
        return (
            <PageContent>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        You are not authorized to create courses.
                    </AlertDescription>
                </Alert>
            </PageContent>
        );
    }

    return (
        <>
            <PageHeader>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Create Course</h1>
            </PageHeader>
            <PageContent>
                <div className="flex-1 lg:max-w-2xl">
                    {actionResponse?.error && (
                        <Alert variant="destructive" className="mb-2">
                            <AlertTitle>{actionResponse.error}</AlertTitle>
                        </Alert>
                    )}
                    <CreateCourseForm /> {/* name, number, start, end */}
                </div>
            </PageContent>

        </>
    );
}

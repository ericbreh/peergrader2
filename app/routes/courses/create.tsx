import { useLoaderData } from "react-router";
import type { Route } from ".react-router/types/app/routes/courses/+types/create";
import { PageHeader, PageContent } from "~/routes/layouts/main-layout";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { requireUser } from "~/lib/auth.supabase.server";
import { getUserById } from "~/lib/queries.server";
import { CreateCourseForm } from "~/components/create-course-form";

export const loader = async ({ request }: Route.LoaderArgs) => {
    const supabaseUser = await requireUser(request);
    const user = await getUserById(supabaseUser.id);
    return {
        user: user,
    }
}

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const data = {
        name: formData.get("name") as string,
        number: formData.get("number") as string,
        start_date: formData.get("start_date") as string,
        end_date: formData.get("end_date") as string,
    };
    console.log(data);
}

export default function Create() {
    const data = useLoaderData<typeof loader>();

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
                    <CreateCourseForm /> {/* name, number, start, end */}
                </div>
            </PageContent>

        </>
    );
}

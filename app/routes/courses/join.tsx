import { redirect } from "react-router";
import { joinCourseFromCode } from "~/lib/queries.server";
import { requireUser } from "~/lib/auth.supabase.server";
import type { Route } from ".react-router/types/app/routes/courses/+types/join";
import { getValidatedFormData } from "remix-hook-form";
import { JoinCourseDialogFormData, resolver } from "~/components/join-course-dialog";


export async function action({ request }: Route.ActionArgs) {
    console.log("action");
    const { errors, data, receivedValues: defaultValues } =
        await getValidatedFormData<JoinCourseDialogFormData>(request, resolver);
    if (errors) {
        return ({ errors, defaultValues });
    }
    const user = await requireUser(request);
    const result = await joinCourseFromCode(data.joinCode, user.id);
    // TODO: test an error from this
    // 606923

    if (result.error) {
        console.log("error", result.error);
        return { error: "Invalid course code" };
    }

    return redirect(`/courses/${result.course_id}`);
}

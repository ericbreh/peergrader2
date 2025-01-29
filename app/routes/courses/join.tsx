import { redirect } from "react-router";
import { getUserById, joinCourseFromCode } from "~/lib/queries.server";
import { requireUser } from "~/lib/auth.supabase.server";
import type { Route } from ".react-router/types/app/routes/courses/+types/join";
import { getValidatedFormData } from "remix-hook-form";
import { JoinCourseDialogFormData, resolver } from "~/components/join-course-dialog";

// student only
export async function action({ request }: Route.ActionArgs) {
    const { errors, data, receivedValues: defaultValues } =
        await getValidatedFormData<JoinCourseDialogFormData>(request, resolver);
    if (errors) {
        return ({ errors, defaultValues });
    }
    const supabaseUser = await requireUser(request);
    const user = await getUserById(supabaseUser.id);
    if (user.is_teacher) {
        return { error: "Only students can join courses" };
    }
    const result = await joinCourseFromCode(data.joinCode, user.uid);

    if (result.error) {
        return { error: "Invalid course code" };
    }

    return redirect(`/courses/${result.course_id}`);
}

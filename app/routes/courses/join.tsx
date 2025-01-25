import { redirect } from "react-router";
import { joinCourseFromCode } from "~/lib/queries.server";
import { requireUser } from "~/lib/auth.supabase.server";
import type { Route } from ".react-router/types/app/routes/courses/+types/join";

export async function action({ request }: Route.ActionArgs) {
    const user = await requireUser(request);
    const formData = await request.formData();
    const joinCode = formData.get("joinCode") as string;

    const result = await joinCourseFromCode(joinCode, user.id);

    if (result.error) {
        return { error: "Invalid course code" };
    }

    return redirect(`/courses/${result.course_id}`);
}

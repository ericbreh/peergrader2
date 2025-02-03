import { useLoaderData } from "react-router";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/assignment";
import type { Assignment } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PageTitle } from "~/components/layouts/main-layout";
import { getAssignmentData, getUserById } from "~/lib/queries.server";
import { AssignmentTimeline } from "~/components/assignment-timeline";
import { requireUser } from "~/lib/auth.supabase.server";

// Loader function to fetch user courses
export async function loader({ params, request }: Route.LoaderArgs) {
    const supabaseUser = await requireUser(request);
    const user = await getUserById(supabaseUser.id);
    const assignment = await getAssignmentData(params.asgn_id);
    return {
        user: user,
        assignment: assignment
    }
}

// teacher and student
export default function Assignment() {
    const data = useLoaderData<typeof loader>();

    return (
        <>
            <PageTitle>
                {data.assignment.name}
            </PageTitle>
            <div className="flex flex-1 flex-col gap-4 pt-0">
                <Card>
                    <CardHeader>
                        <CardTitle>Assignment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {data.assignment.description}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AssignmentTimeline assignment={data.assignment} />
                    </CardContent>
                </Card>
                {!data.user.is_teacher && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Submit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Submit your assignment here</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

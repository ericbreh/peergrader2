import { useFetcher, useLoaderData } from "react-router";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/assignment";
import type { Assignment } from "~/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PageTitle } from "~/components/layouts/main-layout";
import { getAssignmentData, getUserById } from "~/lib/queries.server";
import { AssignmentTimeline } from "~/components/assignment-timeline";
import { requireUser } from "~/lib/auth.supabase.server";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { Loader2 } from "lucide-react";

// Loader function to fetch user courses
export async function loader({ params, request }: Route.LoaderArgs) {
    const supabaseUser = await requireUser(request);
    const user = await getUserById(supabaseUser.id);
    const assignment = await getAssignmentData(params.asgn_id);
    return {
        user: user,
        assignment: assignment,
        course_id: params.course_id,
    }
}

// teacher and student
export default function Assignment() {
    const data = useLoaderData<typeof loader>();
    const fetcher = useFetcher();
    const busy = fetcher.state !== "idle";

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
                            <p>Upload a file here to submit your assignment</p>
                            <fetcher.Form method="post" encType="multipart/form-data" action={`/courses/${data.course_id}/assignments/${data.assignment.asgn_id}/upload`}>
                                <Input type="file" name="submission" accept="application/pdf" required/>
                                <Button type="submit" disabled={busy}>
                                    {busy ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        "Upload"
                                    )}
                                </Button>
                                {fetcher.data?.error && (
                                    <Alert variant="destructive" className="mt-4">
                                        <AlertTitle>{fetcher.data.error}</AlertTitle>
                                    </Alert>
                                )}
                                {fetcher.data?.metadata && (
                                    <Alert variant="destructive" className="mt-4">
                                        <AlertTitle>{fetcher.data.metadata.name}</AlertTitle>
                                    </Alert>
                                )}
                            </fetcher.Form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

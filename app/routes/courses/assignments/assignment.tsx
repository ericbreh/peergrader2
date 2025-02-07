import { useFetcher, useLoaderData } from "react-router";
import { useEffect } from "react";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/assignment";
import type { Assignment } from "~/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { PageTitle } from "~/components/layouts/main-layout";
import { getAssignmentData, getUserById } from "~/lib/queries.server";
import { AssignmentTimeline } from "~/components/assignment-timeline";
import { requireUser } from "~/lib/auth.supabase.server";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { Label } from "~/components/ui/label";

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
    const { toast } = useToast();

    useEffect(() => {
        if (fetcher.data?.success) {
            toast({
                title: "Success",
                description: "Your file has been uploaded successfully.",
            });
        }
        if (fetcher.data?.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: fetcher.data.error,
            });
        }
    }, [fetcher.data, toast]);

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
                        <fetcher.Form method="post" encType="multipart/form-data" action={`/courses/${data.course_id}/assignments/${data.assignment.asgn_id}/upload`}>
                            <CardHeader>
                                <CardTitle>Submit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="grid gap-2">
                                        <p className="text-sm text-muted-foreground">Please upload your assignment as a PDF file. Make sure your submission is complete before uploading.</p>
                                        <Input
                                            type="file"
                                            name="submission"
                                            accept="application/pdf"
                                            className="max-w-sm"
                                        />
                                        {fetcher.data?.validationError && (
                                            <Label className="text-destructive">{fetcher.data?.validationError}</Label>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div>
                                    <Button className="self-start" type="submit" disabled={busy}>
                                        {busy ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardFooter>
                        </fetcher.Form>
                    </Card>
                )}
            </div>
        </>
    );
}

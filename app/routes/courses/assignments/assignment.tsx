import { useFetcher, useLoaderData } from "react-router";
import { useEffect } from "react";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/assignment";
import type { Assignment } from "~/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { getAssignmentData, getMostRecentSubmission, getStudentsInCourse, getUserById } from "~/lib/queries.server";
import { AssignmentTimeline } from "~/components/assignment-timeline";
import { requireUser } from "~/lib/auth.supabase.server";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { Label } from "~/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { H2, H3, Muted, Small } from "~/components/ui/typography";
import { format } from "date-fns";

// Loader function to fetch user courses
export async function loader({ params, request }: Route.LoaderArgs) {
    const supabaseUser = await requireUser(request);
    const user = await getUserById(supabaseUser.id);
    const assignment = await getAssignmentData(params.asgn_id);

    // this is bad, teacher/student should be seperated
    let mostRecentSubmission = null;
    if (!user.is_teacher) {
        mostRecentSubmission = await getMostRecentSubmission(user.uid, params.asgn_id);
    }

    let studentSubmissions = null;
    if (user.is_teacher) {
        const students = await getStudentsInCourse(params.course_id);
        studentSubmissions = await Promise.all(
            students.map(async (student) => {
                const submission = await getMostRecentSubmission(student.uid, params.asgn_id);
                return {
                    student: student,
                    submission: submission
                };
            })
        );
    }

    return {
        user: user,
        course_id: params.course_id,
        assignment: assignment,
        mostRecentSubmission: mostRecentSubmission,
        studentSubmissions: studentSubmissions,
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
            <H2 className="pb-4">{data.assignment.name}</H2>
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
                        <CardTitle>Assignment Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AssignmentTimeline assignment={data.assignment} />
                    </CardContent>
                </Card>
                {!data.user.is_teacher &&
                    <Card>
                        <fetcher.Form method="post" encType="multipart/form-data" action={`/courses/${data.course_id}/assignments/${data.assignment.asgn_id}/upload`}>
                            <CardHeader>
                                <CardTitle>Submit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="grid gap-2">
                                        {data.mostRecentSubmission ? <Muted>{data.mostRecentSubmission.filename} submitted! Feel free to resubmit up until the deadline.</Muted> : <Muted>Please upload your assignment as a PDF file. Make sure your submission is complete before uploading.</Muted>}
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
                }
                {data.user.is_teacher &&
                    <div>
                        <H3>Submissions</H3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Submission</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.studentSubmissions?.map((studentSubmission) => (
                                    <TableRow key={studentSubmission.student.uid}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={studentSubmission.student.profile_image} />
                                                    <AvatarFallback>
                                                        {studentSubmission.student.first_name[0]}
                                                        {studentSubmission.student.last_name[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <Small>{`${studentSubmission.student.first_name} ${studentSubmission.student.last_name}`}</Small>
                                            </div>
                                        </TableCell>
                                        <TableCell>{studentSubmission.submission && `${format(studentSubmission.submission.created_at, "MMM dd 'at' h:mm a")}`}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                }
            </div>
        </>
    );
}

import { useLoaderData } from "react-router";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/assignment";
import type { Assignment } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PageTitle } from "~/components/layouts/main-layout";
import { getAssignmentData } from "~/lib/queries.server";

// Loader function to fetch user courses
export async function loader({ params }: Route.LoaderArgs): Promise<Assignment> {
    return getAssignmentData(params.asgn_id);
}

// teacher and student
export default function Assignment() {
    const assignment = useLoaderData<typeof loader>();

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <PageTitle>
                {assignment.name}
            </PageTitle>
            <div className="flex flex-1 flex-col gap-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Assignment Information</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p><strong>Description:</strong> {assignment.description}</p>
                            <p><strong>Maximum Score:</strong> {assignment.max_score}</p>
                            <p><strong>Required Peer Grades:</strong> {assignment.num_peergrades}</p>
                            <p><strong>Number of Annotations:</strong> {assignment.num_annotations}</p>
                            <p><strong>Anonymous Grading:</strong> {assignment.anonymous_grading ? "Yes" : "No"}</p>
                            <p><strong>Numeric Input:</strong> {assignment.number_input ? "Yes" : "No"}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Important Dates</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <div>
                                <h3 className="font-semibold">Submission Period</h3>
                                <p>Start: {formatDate(assignment.start_date_submission)}</p>
                                <p>End: {formatDate(assignment.end_date_submission)}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold">Grading Period</h3>
                                <p>Start: {formatDate(assignment.start_date_grading)}</p>
                                <p>End: {formatDate(assignment.end_date_grading)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

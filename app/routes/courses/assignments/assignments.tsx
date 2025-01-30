import { useLoaderData } from "react-router";
import { Assignment } from "~/types";
import { getCourseAssignments } from "~/lib/queries.server";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/assignments";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { format } from "date-fns";
import { PageTitle } from "~/components/layouts/main-layout";

export async function loader({ params }: Route.LoaderArgs): Promise<Assignment[]> {
    return getCourseAssignments(params.course_id);
}

// teacher and student
export default function Assignments() {
    const assignments = useLoaderData<typeof loader>();

    return (
        <div >
            <PageTitle>
                Assignments
            </PageTitle>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Submission Period</TableHead>
                        <TableHead>Grading Period</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assignments.map((assignment) => (
                        <TableRow key={assignment.asgn_id}>
                            <TableCell className="font-medium">{assignment.name}</TableCell>
                            <TableCell>{assignment.max_score}</TableCell>
                            <TableCell>
                                {format(new Date(assignment.start_date_submission), "MMM d")} - {format(new Date(assignment.end_date_submission), "MMM d")}
                            </TableCell>
                            <TableCell>
                                {format(new Date(assignment.start_date_grading), "MMM d")} - {format(new Date(assignment.end_date_grading), "MMM d")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
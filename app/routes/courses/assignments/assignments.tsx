import { Link, useLoaderData } from "react-router";
import { getCourseAssignments, getUserById } from "~/lib/queries.server";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/assignments";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { requireUser } from "~/lib/auth.supabase.server";
import { AssignmentTimeline } from "~/components/assignment-timeline";
import { H2 } from "~/components/ui/typography";

export async function loader({ params, request }: Route.LoaderArgs) {
    const supabaseUser = await requireUser(request);
    const user = await getUserById(supabaseUser.id);
    const assignments = await getCourseAssignments(params.course_id);
    return {
        user: user,
        assignments: assignments
    }
}

// teacher and student
export default function Assignments() {
    const data = useLoaderData<typeof loader>();

    return (
        <div >
            <div className="flex justify-between items-center">
                <H2 className="pb-4">Assignments</H2>
                {data.user?.is_teacher && (
                    <Button asChild>
                        <Link to="./create">New Assignment</Link>
                    </Button>
                )}
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>
                            <div className="grid grid-cols-2">
                                <div>Submission</div>
                                <div>Grading</div>
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.assignments.map((assignment) => (
                        <TableRow key={assignment.asgn_id}>
                            <TableCell className="font-medium">
                                <Link to={`./${assignment.asgn_id}`}>{assignment.name}</Link>
                            </TableCell>
                            <TableCell>{assignment.max_score}</TableCell>
                            <TableCell>
                                <AssignmentTimeline assignment={assignment} minimal />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
import { useLoaderData } from "react-router";
import { User } from "~/types";
import { getStudentsInCourse } from "~/lib/queries.server";
import type { Route } from ".react-router/types/app/routes/courses/+types/students";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

export async function loader({ params }: Route.LoaderArgs): Promise<User[]> {
    return getStudentsInCourse(params.course_id);
}

// owner only
export default function Students() {
    const students = useLoaderData<typeof loader>();

    return (
        <div className="space-y-4">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                Students
            </h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.uid}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={student.profile_image} />
                                        <AvatarFallback>
                                            {student.first_name[0]}
                                            {student.last_name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{`${student.first_name} ${student.last_name}`}</span>
                                </div>
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
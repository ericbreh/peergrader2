import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Link } from "react-router";
import { CalendarIcon, HashIcon } from "lucide-react";
import type { Course } from "~/lib/types";
import { format } from "date-fns";

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <Link to={`/courses/${course.course_id}`}>
            <Card className="transition-colors hover:bg-muted h-full">
                <CardHeader>
                    <CardTitle className="line-clamp-1">{course.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {course.number && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <HashIcon className="h-4 w-4" />
                            <span>{course.number}</span>
                        </div>
                    )}
                    {course.start_date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                                {format(new Date(course.start_date), 'PP')}
                                {course.end_date && ` - ${format(new Date(course.end_date), 'PP')}`}
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
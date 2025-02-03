import { Progress } from "~/components/ui/progress";
import { format } from "date-fns";
import type { Assignment } from "~/types";

interface AssignmentTimelineProps {
    assignment: Assignment;
    minimal?: boolean;
}

export function AssignmentTimeline({ assignment, minimal = false }: AssignmentTimelineProps) {
    const today = new Date();

    const submissionStart = new Date(assignment.start_date_submission);
    const submissionEnd = new Date(assignment.end_date_submission);
    const gradingStart = new Date(assignment.start_date_grading);
    const gradingEnd = new Date(assignment.end_date_grading);

    const submissionProgress = Math.max(0, Math.min(100,
        ((today.getTime() - submissionStart.getTime()) /
            (submissionEnd.getTime() - submissionStart.getTime())) * 100
    ));

    const gradingProgress = Math.max(0, Math.min(100,
        ((today.getTime() - gradingStart.getTime()) /
            (gradingEnd.getTime() - gradingStart.getTime())) * 100
    ));

    return (
        <div className="grid gap-4 grid-cols-2">
            <div className="space-y-1">
                {!minimal && (<p className="text-sm font-medium">Submission</p>)}
                <Progress value={submissionProgress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{format(submissionStart, minimal ? 'MMM d' : 'PP')}</span>
                    <span>{format(submissionEnd, minimal ? 'MMM d' : 'PP')}</span>
                </div>
            </div>

            <div className="space-y-1">
                {!minimal && (<p className="text-sm font-medium">Grading</p>)}
                <Progress value={gradingProgress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{format(gradingStart, minimal ? 'MMM d' : 'PP')}</span>
                    <span>{format(gradingEnd, minimal ? 'MMM d' : 'PP')}</span>
                </div>
            </div>
        </div>
    );
}

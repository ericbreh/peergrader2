import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Form, useNavigation } from "react-router";
import { Loader2, CalendarIcon } from "lucide-react"
import * as React from "react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "~/lib/utils"
import { Calendar } from "~/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"

export function CreateCourseForm() {
    const navigation = useNavigation();
    const isSubmitting = navigation.formAction === "/courses/create";
    const [date, setDate] = React.useState<DateRange | undefined>();

    return (
        <Form method="post">
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Course Name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Intro to Computer Science"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Course Number</Label>
                    <Input
                        id="number"
                        type="text"
                        name="number"
                        placeholder="CSE 101"
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Course Duration</Label>
                    <input type="hidden" name="start_date" value={date?.from?.toISOString() ?? ''} />
                    <input type="hidden" name="end_date" value={date?.to?.toISOString() ?? ''} />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Select course dates</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <Button className="self-start" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Course...
                        </>
                    ) : (
                        "Create Course"
                    )}
                </Button>
            </div>
        </Form>
    )
}

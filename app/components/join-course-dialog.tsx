import { useState } from "react";
import { Form, useNavigation } from "react-router";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Button } from "./ui/button"


export function JoinCourseDialog() {
    const [open, setOpen] = useState(false);
    const navigation = useNavigation();
    const isLoading = navigation.state === "submitting";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Join Course</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join a Course</DialogTitle>
                </DialogHeader>
                <Form method="post" action="/courses/join">
                    <div className="grid gap-4 py-4">
                        <Input
                            name="joinCode"
                            placeholder="Enter course code"
                            className="col-span-3"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Joining..." : "Join"}
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
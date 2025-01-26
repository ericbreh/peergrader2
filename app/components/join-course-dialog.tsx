import { useFetcher } from "react-router"
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Alert, AlertTitle } from "./ui/alert";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "~/components/ui/input-otp"
import { useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";


export const JoinCourseDialogSchema = zod.object({
    joinCode: zod.string().min(6, {
        message: "Course join code must be 6 characters.",
    }),
})

export type JoinCourseDialogFormData = zod.infer<typeof JoinCourseDialogSchema>;
export const resolver = zodResolver(JoinCourseDialogSchema);

export function JoinCourseDialog() {
    const fetcher = useFetcher();
    const busy = fetcher.state !== "idle";

    const {
        handleSubmit,
        formState: { errors },
        setValue,
    } = useRemixForm<JoinCourseDialogFormData>({
        mode: "onSubmit",
        resolver,
        fetcher
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Join Course</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Join a Course</DialogTitle>
                    <DialogDescription>
                        Enter the course code to join a course
                    </DialogDescription>
                </DialogHeader>
                <fetcher.Form onSubmit={handleSubmit} method="post" action="/courses/join">
                    <div className="grid gap-4 py-4">
                        <InputOTP
                            maxLength={6}
                            onChange={(value) => setValue('joinCode', value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                < InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                < InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {errors.joinCode && (
                            <Label className="text-destructive">{errors.joinCode.message}</Label>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={busy}>
                            {busy ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Joining...
                                </>
                            ) : (
                                "Join"
                            )}
                        </Button>
                    </DialogFooter>

                    {fetcher.data?.error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertTitle>{fetcher.data.error}</AlertTitle>
                        </Alert>
                    )}
                </fetcher.Form>
            </DialogContent>
        </Dialog>
    )
}

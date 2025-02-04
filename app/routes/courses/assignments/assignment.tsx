import { Form, useLoaderData } from "react-router";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/assignment";
import type { Assignment } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PageTitle } from "~/components/layouts/main-layout";
import { getAssignmentData, getUserById, uploadFile } from "~/lib/queries.server";
import { AssignmentTimeline } from "~/components/assignment-timeline";
import { requireUser } from "~/lib/auth.supabase.server";
import { Input } from "~/components/ui/input";
import {
    type FileUpload,
    parseFormData,
} from "@mjackson/form-data-parser";
import { Button } from "~/components/ui/button";

// Loader function to fetch user courses
export async function loader({ params, request }: Route.LoaderArgs) {
    const supabaseUser = await requireUser(request);
    const user = await getUserById(supabaseUser.id);
    const assignment = await getAssignmentData(params.asgn_id);
    return {
        user: user,
        assignment: assignment
    }
}

// upload assignment doc
export async function action({ request, params }: Route.ActionArgs) {
    const supabaseUser = await requireUser(request);

    const uploadHandler = async (fileUpload: FileUpload) => {
        if (fileUpload.fieldName === "submission") {
            // Don't stream for now, maybe look into in the future
            const buffer = await fileUpload.arrayBuffer();
            const file = new File([buffer], fileUpload.name, {
                type: fileUpload.type
            });

            // Validate file
            if (!file.name || file.size === 0 || file.size > 6 * 1024 * 1024) {
                throw new Error("Invalid file");
            }

            try {
                await uploadFile(file, supabaseUser.id, params.asgn_id);
                return file;
            } catch (error) {
                throw new Error(`Upload failed: ${error}`);
            }
        }
        return null;
    };

    const formData = await parseFormData(request, uploadHandler);
    const fileMetadata = formData.get("submission");

    return { success: true, metadata: fileMetadata };
}

// teacher and student
export default function Assignment() {
    const data = useLoaderData<typeof loader>();

    return (
        <>
            <PageTitle>
                {data.assignment.name}
            </PageTitle>
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
                        <CardTitle>Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AssignmentTimeline assignment={data.assignment} />
                    </CardContent>
                </Card>
                {!data.user.is_teacher && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Submit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Upload a file here to submit your assignment</p>
                            <Form method="post" encType="multipart/form-data">
                                <Input type="file" name="submission" />
                                <Button type="submit">Submit</Button>
                            </Form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

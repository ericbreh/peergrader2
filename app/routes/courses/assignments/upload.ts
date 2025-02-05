import {
    type FileUpload,
    parseFormData,
} from "@mjackson/form-data-parser";
import { requireUser } from "~/lib/auth.supabase.server";
import { uploadFile } from "~/lib/queries.server";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/upload";


// student only
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
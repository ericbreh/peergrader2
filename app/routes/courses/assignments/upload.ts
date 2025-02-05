import {
    type FileUpload,
    parseFormData,
} from "@mjackson/form-data-parser";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/upload";
import { requireUser } from "~/lib/auth.supabase.server";
import { uploadFile } from "~/lib/queries.server";


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

// student only
export async function action({ request, params }: Route.ActionArgs) {
    const supabaseUser = await requireUser(request);
    let uploadError: string | null = null;

    const uploadHandler = async (fileUpload: FileUpload) => {
        if (fileUpload.fieldName === "submission") {
            // Don't stream for now, maybe look into in the future
            const buffer = await fileUpload.arrayBuffer();
            const file = new File([buffer], fileUpload.name, {
                type: fileUpload.type
            });

            // Validate file
            if (!file.name || file.size === 0) {
                uploadError = "Invalid file";
                return null;
            }
            if (file.size > MAX_FILE_SIZE) {
                uploadError = "File size must be less than 5MB";
                return null;
            }
            if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
                uploadError = "Please upload a PDF file";
                return null;
            }
            try {
                await uploadFile(file, supabaseUser.id, params.asgn_id);
                return file;
            } catch (error) {
                uploadError = `Upload failed: ${error}`
                return null;
            }
        }
        return null;
    };

    const formData = await parseFormData(request, uploadHandler);
    const result = formData.get("submission");

    if (uploadError) {
        return { error: uploadError };
    }

    if (!result) {
        return { error: "No file submitted" };
    }

    return { success: true, metadata: result };
}
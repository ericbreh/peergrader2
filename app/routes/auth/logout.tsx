import { redirect } from "react-router";
import { signOut } from "~/lib/auth.supabase.server.js";
import type { Route } from ".react-router/types/app/routes/auth/+types/logout.ts";

export const loader = async () => redirect("/");

export const action = async ({ request }: Route.ActionArgs) => signOut(request);

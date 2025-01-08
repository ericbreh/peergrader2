import { redirect } from "react-router";
import { signOut } from "~/lib/auth.supabase.server";
import type { Route } from "../routes/+types/logout.ts";

export const loader = async () => redirect("/");

export const action = async ({ request }: Route.ActionArgs) => signOut(request);

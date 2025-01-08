import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { signOut } from "~/lib/auth.supabase.server";

export const loader = async () => redirect("/");

export const action = async ({ request }: ActionFunctionArgs) => signOut(request);

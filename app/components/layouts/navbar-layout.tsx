import { Navbar } from "../navbar";
import { Outlet, useLoaderData } from "react-router";
import { getUser } from "~/lib/auth.supabase.server";
import { getCourseData, getUserById } from "~/lib/queries.server";
import type { Route } from ".react-router/types/app/components/layouts/+types/navbar-layout";

export async function loader({ request, params }: Route.LoaderArgs) {
    const supabaseUser = await getUser(request);
    let user = null;
    if (supabaseUser) {
        user = await getUserById(supabaseUser.id);
    }
    let course = null;
    if (params.course_id) {
        course = await getCourseData(params.course_id);
    }
    // TODO: add assignment id
    return {
        user: user,
        course: course,
    }
}


export default function NavbarLayout() {
    const data = useLoaderData<typeof loader>();
    return (
        <>
            <Navbar user={data.user} course={data.course}/>
            <Outlet />
        </>
    );
}
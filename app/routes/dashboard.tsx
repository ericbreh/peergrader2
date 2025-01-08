import { LoaderFunctionArgs } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { createSupabaseServerClient } from "~/lib/supabase.server";
import { useLoaderData } from "react-router";
import type { Course } from "~/types";
import { requireUser } from "~/lib/auth.supabase.server";
import { getUserCourses } from "~/lib/queries.server";


// Loader function to fetch user courses
export async function loader({ request }: LoaderFunctionArgs) {
    const user = await requireUser(request);
    const supabase = createSupabaseServerClient(request);
    return getUserCourses(supabase, user.id);
}

export default function Dashboard() {
    const courses = useLoaderData<typeof loader>();

    return (
        <><div>
            <header className="py-6 pl-10 border-b">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Dashboard</h1>
            </header>
            <main className="p-6">
                <div className="grid grid-cols-3 gap-8">
                    {courses.map((course: Course) => (
                        <Card key={course.course_id}>
                            <CardHeader>
                                <CardTitle>{course.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{course.number}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div></>
    );
}

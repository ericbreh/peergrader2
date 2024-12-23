import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { createSupabaseServerClient } from "~/lib/supabase.server";
import { useLoaderData } from "@remix-run/react";
import type { Course } from "~/types";


// Loader function to fetch user courses
export async function loader({ request }: LoaderFunctionArgs) {
    const supabase = createSupabaseServerClient(request);
    const { data: { user } } = await supabase.client.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    const { data: courses, error } = await supabase.client
        .from('courses')
        .select('course_id, name, number')
        .eq('owner', user.id);

    if (error) {
        console.error('Error fetching courses:', error);
        return [];
    }

    return courses;
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

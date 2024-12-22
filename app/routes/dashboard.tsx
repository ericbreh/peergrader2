import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { createSupabaseServerClient } from "~/lib/supabase.server";
import { useLoaderData } from "@remix-run/react";


type Course = {
    course_id: string;
    name: string;
    number: string;
}


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
            <header className="text-center py-48 border-b">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Dashboard</h1>
            </header>
            <main>
                <div className="grid grid-cols-3 gap-8 p-6">
                    {courses.map((course: Course) => (
                        <Card key={course.course_id}>
                            <CardHeader>
                                <CardTitle>{course.name}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </main>
        </div></>
    );
}

import { Link, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { isUserLoggedIn } from "~/lib/auth.supabase.server.js";
import type { Route } from "./+types/landing.js";

export async function loader({ request }: Route.LoaderArgs): Promise<boolean> {
  const loggedIn = await isUserLoggedIn(request);
  return loggedIn;
}

export default function Index() {
  const loggedIn = useLoaderData<typeof loader>()
  return (
    <div>
      <header className="border-b py-48">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">PeerGrader</h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">Revolutionize Grading with PeerGrader: A Modern Platform for Streamlined Feedback</p>

          {loggedIn ? (
            <div className="py-10">
              <Button asChild className="mx-2">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          ) : (
            <div className="py-10">
              <Button asChild className="mx-2">
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button asChild className="mx-2">
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          )}

        </div>
      </header>
      <main>
        <section className="border-b">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center my-8 pb-8">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">How it Works</h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">PeerGrader simplifies student assessments by allowing teachers to create courses and assignments, and enabling students to submit and receive peer feedback seamlessly.</p>
          </div>
        </section>
        <section>
          <div className="max-w-7xl mx-auto px-4 my-16">
            <div className="flex flex-col lg:flex-row lg:gap-8">
              <div className="lg:w-1/3 flex flex-col justify-center items-start">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Solution</h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  PeerGrader transforms the grading process by enabling seamless peer reviews and providing a comprehensive platform for managing assignments and feedback.
                </p>
              </div>
              <div className="lg:w-2/3 flex flex-col space-y-8 justify-center">
                <Card>
                  <CardHeader>
                    <CardTitle>Effortless Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      Integrate PeerGrader with your existing learning management system easily, enhancing your educational environment without any disruption.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Widespread Application</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      Suitable for a variety of educational settings, PeerGrader adapts to both small classrooms and large online courses.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

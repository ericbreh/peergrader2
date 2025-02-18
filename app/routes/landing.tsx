import { Link, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { isUserLoggedIn } from "~/lib/auth.supabase.server.js";
import type { Route } from "./+types/landing.js";
import { H1, H2, P } from "~/components/ui/typography";

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
          <H1>PeerGrader</H1>
          <P>Revolutionize Grading with PeerGrader: A Modern Platform for Streamlined Feedback</P>

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
            <H2 className="border-b py-2">How it Works</H2>
            <P>
              PeerGrader simplifies student assessments by allowing teachers to create courses and assignments, and enabling students to submit and receive peer feedback seamlessly.
              </P>
          </div>
        </section>
        <section>
          <div className="max-w-7xl mx-auto px-4 my-16">
            <div className="flex flex-col lg:flex-row lg:gap-8">
              <div className="lg:w-1/3 flex flex-col justify-center items-start">
                <H2 className="border-b py-2">Solution</H2>
                <P>
                  PeerGrader transforms the grading process by enabling seamless peer reviews and providing a comprehensive platform for managing assignments and feedback.</P>
              </div>
              <div className="lg:w-2/3 flex flex-col space-y-8 justify-center">
                <Card>
                  <CardHeader>
                    <CardTitle>Effortless Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P>
                      Integrate PeerGrader with your existing learning management system easily, enhancing your educational environment without any disruption.</P>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Widespread Application</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P>
                      Suitable for a variety of educational settings, PeerGrader adapts to both small classrooms and large online courses.
                    </P>
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

import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export default function Index() {
  return (
    <><div>
      <header className="text-center py-48 border-b">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">PeerGrader</h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">Revolutionize Grading with PeerGrader: A Modern Platform for Streamlined Feedback</p>
        <div className="py-10">
          <Button asChild className="mx-2">
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button asChild className="mx-2">
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </header>
      <main>
        <section className="flex flex-col items-center border-b my-8 pb-8">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">How it Works</h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">PeerGrader simplifies student assessments by allowing teachers to create courses and assignments, and enabling students to submit and receive peer feedback seamlessly.</p>
        </section>
        <section className="my-16 max-w-7xl mx-auto">
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
        </section>
      </main>
    </div></>
  );
}

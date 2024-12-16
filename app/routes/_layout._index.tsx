import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "PeerGrader" },
    { name: "description", content: "Welcome to PeerGrader!" },
  ];
};

export const Header = () => (
  <header className="flex flex-col items-center justify-center text-center w-full py-64 bg-primary text-primary-foreground">
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">PeerGrader</h1>
    <p className="leading-7 [&:not(:first-child)]:mt-6">Revolutionize Grading with PeerGrader: A Modern Platform for Streamlined Feedback</p>
    <div className="flex items-center justify-center py-10">
    <Button className="bg-secondary text-secondary-foreground mx-2 hover:text-primary-foreground"><Link to="/signup">Sign Up</Link></Button>
    <Button className="bg-secondary text-secondary-foreground mx-2 hover:text-primary-foreground"><Link to="/login">Login</Link></Button>
    </div>
  </header>
);

export const HowItWorks = () => (
  <section className="py-10 bg-background text-foreground">
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">How it Works</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">PeerGrader simplifies student assessments by allowing teachers to create courses and assignments, and enabling students to submit and receive peer feedback seamlessly.</p>
    </div>
  </section>
);

export const Solution = () => (
  <section className="bg-background py-10 px-4 text-foreground">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="lg:w-1/3 flex flex-col justify-center items-left">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Solution</h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            PeerGrader transforms the grading process by enabling seamless peer reviews and providing a comprehensive platform for managing assignments and feedback.
          </p>
        </div>
        <div className="lg:w-2/3 flex flex-col space-y-8 justify-center">
          <div className="p-6 bg-card text-card-foreground rounded-lg shadow-lg">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Effortless Integration</h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Integrate PeerGrader with your existing learning management system easily, enhancing your educational environment without any disruption.
            </p>
          </div>
          <div className="p-6 bg-card text-card-foreground rounded-lg shadow-lg">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Widespread Application</h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Suitable for a variety of educational settings, PeerGrader adapts to both small classrooms and large online courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="w-full font-bold bg-primary text-primary-foreground p-6 text-center">
    <p>&copy;2024 PeerGrader</p>
  </footer>
);

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-grow w-full bg-white">
        <HowItWorks />
        <Solution />
      </main>
      <Footer />
    </div>
  );
}

import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export default function Dashboard() {
    return (
        <><div>
            <header className="text-center py-48 border-b">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Dashboard</h1>
            </header>
            <main>
            </main>
            <footer className="w-full font-bold p-6 text-center bg-muted text-muted-foreground">
                <p>&copy;2024 PeerGrader</p>
            </footer>
        </div></>
    );
}

import { Form } from "@remix-run/react";

export default function Dashboard() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                Dashboard
                <div>
                    <p>
                        <Form action="/logout" method="post">
                            <button className="bg-sky-500 rounded p-2" type="submit">
                                Sign Out
                            </button>
                        </Form>
                    </p>
                </div>
            </div>
        </div>
    )
}

import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import "./tailwind.css";
import clsx from "clsx"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"
import { themeSessionResolver } from "./sessions.server"
import type { Route } from "./+types/root.ts";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";


export async function loader({ request }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return {
    theme: getTheme(),
  }
}

// Links function to include external stylesheets
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Meta function to include meta tags
export const meta: MetaFunction = () => {
  return [
    { title: "PeerGrader" },
    { name: "description", content: "Welcome to PeerGrader!" },
  ];
};

// Main App component
export function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

// Wrap app with theme
export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/set-theme">
      <App />
    </ThemeProvider>
  )
}

export function ErrorBoundary({
  error,
}: Route.ErrorBoundaryProps) {

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex items-center justify-center p-4 bg-background dark">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>
              {isRouteErrorResponse(error)
                ? `${error.status} - ${error.statusText}`
                : 'Application Error'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isRouteErrorResponse(error) ? (
              <Alert variant="destructive">
                <AlertTitle>Error {error.status}</AlertTitle>
                <AlertDescription>{error.data}</AlertDescription>
              </Alert>
            ) : error instanceof Error ? (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertTitle>Something went wrong!</AlertTitle>
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Stack trace:</h3>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto">
                    {error.stack}
                  </pre>
                </div>
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertTitle>Unknown Error</AlertTitle>
                <AlertDescription>An unexpected error occurred.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        <Scripts />
      </body>
    </html>
  );
}
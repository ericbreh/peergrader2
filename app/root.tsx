import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import "./tailwind.css";
import clsx from "clsx"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"
import { themeSessionResolver } from "./sessions.server"
import { getUser } from "./lib/auth.supabase.server";
import { createSupabaseServerClient } from "./lib/supabase.server";
import getUserById from "./lib/queries.server";
import type { Route } from "./+types/root.ts";
import { MainLayout } from "./components/layouts/main-layout";


export async function loader({ request }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request)

  // Fetch user details if user is logged in
  const userId = await getUser(request);
  let user = null;
  if (userId) {
    const supabase = createSupabaseServerClient(request);
    const response = await getUserById(supabase, userId.id);
    user = response.data;
  }

  return {
    theme: getTheme(),
    user: user
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
        <MainLayout user={data.user}>
          <Outlet />
        </MainLayout>
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
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  )
}
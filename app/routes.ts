import {
    type RouteConfig,
    route,
    index,
    layout,
} from "@react-router/dev/routes";

export default [
    // nav bar
    layout("./routes/layouts/main-layout.tsx", [
        index("./routes/landing.tsx"),

        // routes where you need to be logged in
        layout("./routes/layouts/authenticated.tsx", [
            route("dashboard", "./routes/dashboard/dashboard.tsx"),
            route("courses/:id", "./routes/courses/course-id.tsx"),
            route("courses/create", "./routes/courses/create.tsx"),
        ]),
    ]),

    // routes without nav bar
    route("login", "./routes/auth/login.tsx"),
    route("signup", "./routes/auth/signup.tsx"),
    route("logout", "./routes/auth/logout.tsx"),
    route("login/callback", "./routes/auth/callback.tsx"),
    route("set-theme", "./routes/set-theme.ts"),
] satisfies RouteConfig;
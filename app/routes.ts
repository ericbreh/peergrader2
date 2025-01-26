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
        // no need for teacher/student/course-owner layouts, just protect on the page
        layout("./routes/layouts/authenticated.tsx", [
            route("dashboard", "./routes/dashboard/dashboard.tsx"),

            // course page sidebar
            layout("./routes/layouts/course-layout.tsx", [
                route("courses/:id", "./routes/courses/course-id.tsx"),
            ]),
            route("courses/create", "./routes/courses/create.tsx"),
            route("courses/join", "./routes/courses/join.tsx"),
        ]),
    ]),

    // routes without nav bar
    route("login", "./routes/auth/login.tsx"),
    route("signup", "./routes/auth/signup.tsx"),
    route("logout", "./routes/auth/logout.tsx"),
    route("login/callback", "./routes/auth/callback.tsx"),
    route("set-theme", "./routes/set-theme.ts"),
] satisfies RouteConfig;
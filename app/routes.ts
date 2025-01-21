import {
    type RouteConfig,
    route,
    index,
    layout,
} from "@react-router/dev/routes";

export default [
    // Public routes
    index("./routes/landing.tsx"),
    route("login", "./routes/auth/login.tsx"),
    route("signup", "./routes/auth/signup.tsx"),
    route("logout", "./routes/auth/logout.tsx"),
    route("login/callback", "./routes/auth/callback.tsx"),
    route("set-theme", "./routes/set-theme.ts"),

    // Protected routes
    layout("./routes/layouts/authenticated.tsx", [
        route("dashboard", "./routes/dashboard/dashboard.tsx"),
        route("courses/:id", "./routes/courses/course.tsx"),
    ]),
] satisfies RouteConfig;
import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    // nav bar
    layout("./components/layouts/navbar-layout.tsx", [
        index("./routes/landing.tsx"),

        // routes where you need to be logged in
        layout("./components/layouts/authenticated-layout.tsx", [
            route("dashboard", "./routes/dashboard/dashboard.tsx"), // teacher and student
            route("courses/create", "./routes/courses/create.tsx"), // teacher only
            route("courses/join", "./routes/courses/join.ts"),     // student only

            // courses page
            ...prefix("courses", [
                // index("./routes/courses/courses.tsx"),
                layout("./components/layouts/courses-layout.tsx", [
                    route(":course_id", "./routes/courses/dashboard.tsx"),          // owner and enrolled student TODO
                    route(":course_id/students", "./routes/courses/students.tsx"),  // owner only TODO
                    route(":course_id/settings", "./routes/courses/settings.tsx"),  // owner only TODO

                    ...prefix(":course_id/assignments", [
                        index("./routes/assignments/assignments.tsx"),              // owner and enrolled student TODO
                        route("create", "./routes/assignments/create.tsx"),         // owner only TODO
                        route(":asgn_id", "./routes/assignments/assignment.tsx"),   // owner and enrolled student TODO
                        route(":asgn_id/upload", "./routes/assignments/upload.ts"), // student only TODO
                        route(":asgn_id/grade", "./routes/grade/grade.tsx"),        // owner and enrolled student TODO
                        
                    ]),
                ]),
            ]),
        ]),
    ]),

    // routes without nav bar
    route("login", "./routes/auth/login.tsx"),
    route("signup", "./routes/auth/signup.tsx"),
    route("logout", "./routes/auth/logout.tsx"),
    route("login/callback", "./routes/auth/callback.tsx"),
    route("set-theme", "./routes/set-theme.ts"),
] satisfies RouteConfig;
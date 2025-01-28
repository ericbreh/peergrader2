import {
<<<<<<< HEAD
  type RouteConfig,
  route,
  index,
  layout,
=======
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
>>>>>>> 9b69feabbe9aed74562372163bf2359b5ba8d86e
} from "@react-router/dev/routes";

export default [
  // nav bar
  layout("./routes/layouts/main-layout.tsx", [
    index("./routes/landing.tsx"),

<<<<<<< HEAD
    // routes where you need to be logged in
    // no need for teacher/student/course-owner layouts, just protect on the page
    layout("./routes/layouts/authenticated.tsx", [
      route("dashboard", "./routes/dashboard/dashboard.tsx"),

      // course page sidebar
      layout("./routes/layouts/course-layout.tsx", [
        route("courses/assignments/create", "./routes/courses/assignment/create.tsx"),
        route("courses/:id", "./routes/courses/course-id.tsx"),
      ]),
      route("courses/create", "./routes/courses/create.tsx"),
      route("courses/join", "./routes/courses/join.tsx"),
=======
        // routes where you need to be logged in
        layout("./routes/layouts/authenticated-layout.tsx", [
            route("dashboard", "./routes/dashboard/dashboard.tsx"),
            route("courses/create", "./routes/courses/create.tsx"),
            route("courses/join", "./routes/courses/join.tsx"),

            // courses page
            ...prefix("courses", [
                // index("./routes/courses/courses.tsx"),
                layout("./routes/layouts/course-layout.tsx", [
                    route(":id", "./routes/courses/dashboard.tsx"),
                    route(":id/students", "./routes/courses/students.tsx"),
                    route(":id/settings", "./routes/courses/settings.tsx"),

                    ...prefix(":id/assignments", [
                        index("./routes/courses/assignments/assignments.tsx"),
                        // route("create", "./routes/courses/assignments/create.tsx"),
                        // route(":assignment_id", "./routes/courses/assignments/assignment.tsx"),
                    ]),
                ]),
            ]),
        ]),
>>>>>>> 9b69feabbe9aed74562372163bf2359b5ba8d86e
    ]),
  ]),

  // routes without nav bar
  route("login", "./routes/auth/login.tsx"),
  route("signup", "./routes/auth/signup.tsx"),
  route("logout", "./routes/auth/logout.tsx"),
  route("login/callback", "./routes/auth/callback.tsx"),
  route("set-theme", "./routes/set-theme.ts"),
] satisfies RouteConfig;

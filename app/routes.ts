import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  // nav bar
  layout("./components/layouts/main-layout.tsx", [
      index("./routes/landing.tsx"),

      // routes where you need to be logged in
      layout("./components/layouts/authenticated-layout.tsx", [
          route("dashboard", "./routes/dashboard/dashboard.tsx"),
          route("courses/create", "./routes/courses/create.tsx"),
          route("courses/join", "./routes/courses/join.tsx"),

          // courses page
          ...prefix("courses", [
              // index("./routes/courses/courses.tsx"),
              layout("./components/layouts/courses-layout.tsx", [
                  route(":id", "./routes/courses/dashboard.tsx"),
                  route(":id/students", "./routes/courses/students.tsx"),
                  route(":id/settings", "./routes/courses/settings.tsx"),

                  ...prefix(":id/assignments", [
                      index("./routes/courses/assignments/assignments.tsx"),
                      route("create", "./routes/courses/assignments/create.tsx"),
                      // route(":assignment_id", "./routes/courses/assignments/assignment.tsx"),
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
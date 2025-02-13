import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes"

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production"

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "app_session",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "development_secret"],
    // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "your-production-domain.com", secure: true }
      : {}),
  },
})


// Theme resolver
export const themeSessionResolver = createThemeSessionResolver(sessionStorage)
